 /*
 * Importation des modules
 */
import * as Intrfc from "../utils/interface.js";
import * as Tmplt from "../acteurs/actor-templates.js"
import {ActorRdD} from "../acteurs/actor.js";

/**
 * La feuille de PJ est basée sur la classe ActorSheet
 * @class
 */
export class RdDFeuillePJ extends ActorSheet {

	/* -------------------------------------------- */

	/**
	 * Étend et remplace les options d'affichage par défaut
	 * @function defaultOptions
	 * @returns {object}
	 * @static
	 */
	static get defaultOptions() {
		console.log(`RdD | RdDFeuillePJ.defaultOptions`);
		/**
		 * @property {string} options.classes classes CSS appliquées à la feuille
		 * @property {string} options.template chemin d'accès au squelette HTML de la feuille
		 * @property {number} options.width largeur de la fenêtre
		 * @property {number} options.height hauteur de la fenêtre
		 * @property {boolean} options.tabs liste des onglets à gérer
		 */
		return mergeObject(super.defaultOptions, {
			classes: ["RdD", "feuille", "actor", "pj"],
			template: "systems/RdD/templates/feuille-pj.html",
			width: 900,
			height: 600,
			tabs: [{navSelector: ".tabs", contentSelector: ".content", initial: "états"}]
		});
	}

	/* -------------------------------------------- */

	/**
	 * Prepare les données pour l'affichage de la feuille de PJ
	 * L'objet de données préparé contient les données de l'acteur et les options de la feuille
	 * @function getData
	 * @returns {object} Données à afficher
	 */
	getData() {
		let data = super.getData();
		console.log(`RdD | RdDFeuillePJ.getData ${JSON.stringify(data)}`);
		// ===RàF=== *** Utilité à déterminer ***
		//data.dtypes = ["String", "Number", "Boolean"];
		//for ( let attr of Object.values(data.data.attributes) ) {
		//	attr.isCheckbox = attr.dtype === "Boolean";
		//}
		return data;
	}

	/* -------------------------------------------- */

	/**
	 * Active les détecteurs d'évènements depuis la page HTML préparée
	 * @param html {HTML}   L'objet HTML préparé prêt à être rendu dans le DOM
	 */
	activateListeners(html) {
		console.log(`RdD | RdDFeuillePJ.activateListeners`);
		super.activateListeners(html);

		// Everything below here is only needed if the sheet is editable
		if (!this.options.editable) return;

		// Update Inventory Item
		/* ===RàF=== ==> plus tard
		html.find(".item-edit").click(ev => {
			let itemId = Number(
				$(ev.currentTarget)
				.parents(".item")
				.attr("data-item-id")
				);
				console.log(itemId);
				let Item = CONFIG.Item.entityClass;
				const item = new Item(
					this.actor.items.find(i => i.id === itemId),
					this.actor
					);
					item.sheet.render(true);
				});
				
				// Delete Inventory Item
				html.find(".item-delete").click(ev => {
					let li = $(ev.currentTarget).parents(".item"),
					itemId = Number(li.attr("data-item-id"));
					this.actor.deleteOwnedItem(itemId, true);
					li.slideUp(200, () => this.render(false));
				});
				*/
	}

	/**
	 * Met en forme les données du PJ avant d'envoyer la demande de mise à jour au serveur.
	 * En particulier, prend en charge le traitement des tableaux de données.
	 *
	 * @method
	 * @param {*} [updateData=null]
	 * @memberof RdDFeuillePJ
	 * @private
	 */
	_miseEnFormeAvMàJ(updateData = null) {
		console.log(`RdD | RdDFeuillePJ._miseEnFormeAvMàJ`);
		if (!updateData) {
			updateData = {};
		}

		// Mise en forme des compteurs
		let cptTrav = new Tmplt.CompteursRdD();

		//Fatigue
		const fatSaisie = this.element.find(".fatigue input");
		const fatMax = this.element.find(".fatigue .max");
		let indSaisie = 0;
		for (let i = 0; i < 8; i++) {
			if (i < 2) {
				for (let j = 0; j < 3; j++) {
					cptTrav.ftgMàjSegmt(i, j, fatSaisie[indSaisie].valueAsNumber, parseInt(fatMax[indSaisie].innerText, 10));
					indSaisie++;
				}
			} else {
				cptTrav.ftgMàjSegmt(i, 0, fatSaisie[indSaisie].valueAsNumber, parseInt(fatMax[indSaisie].innerText, 10));
				indSaisie++;
			}
		}
		updateData[`data.cptr.fatigue`] = cptTrav.fatigue;

		//Blessures
		const blSaisie = this.element.find(".blessures.légères input");
		let i = 0;
		for (const blessure of blSaisie) {
			cptTrav.blsrMàJ("légère", i++, blessure.checked)
		}
		updateData[`data.cptr.blessures.légères`] = cptTrav.blessures.légères.slice();
		const bgSaisie = this.element.find(".blessures.graves input");
		i = 0;
		for (const blessure of bgSaisie) {
			cptTrav.blsrMàJ("grave", i++, blessure.checked)
		}
		updateData[`data.cptr.blessures.graves`] = cptTrav.blessures.graves.slice();
		const bcSaisie = this.element.find(".blessures.critiques input");
		cptTrav.blsrMàJ("critique", 0, bcSaisie[0].checked)
		updateData[`data.cptr.blessures.critique`] = cptTrav.blessures.critique.slice();
		
		return updateData;
	}

	/**
	 * Redéfinit la fonction d'envoi de la saisie
	 * Contrôle la saisie
	 *
	 * @method
	 * @param {Event} event L'évènement à l'origine du contrôle
	 * @memberof RdDFeuillePJ
	 * @private
	 */
	_onChangeInput(event) {
		const input = event.target;
		const value = input.value;
		const id = input.id;
		const classList = input.classList;
		console.log(`RdD | RdDFeuillePJ._onChangeInput ${id}, ${classList[0]}`);

		// On ne valide que les saisies qui ont besoin de l'être.
		let erreur = "";
		switch (id) {
			case "heureNaissance":
				erreur = ActorRdD.ctrlHeureNaissance(value);
				break;
			case "sexe":
				erreur = ActorRdD.ctrlSexe(value);
				break;
			case "âge":
				erreur = ActorRdD.ctrlÂge(value);
				break;
			case "spTaille":
				erreur = ActorRdD.ctrlSPTaille(value);
				break;
			case "poids":
				erreur = ActorRdD.ctrlPoids(value);
				break;
			case "beauté":
				erreur = ActorRdD.ctrlBeauté(value);
				break;
			case "latéralité":
				erreur = ActorRdD.ctrlLatéralité(value);
				break;
			case "taille":
				erreur = ActorRdD.ctrlTaille(value);
				break;
			case "apparence":
				erreur = ActorRdD.ctrlApparence(value);
				break;
			case "constitution":
				erreur = ActorRdD.ctrlConstitution(value);
				break;
			case "force":
				erreur = ActorRdD.ctrlForce(value);
				break;
			case "agilité":
				erreur = ActorRdD.ctrlAgilité(value);
				break;
			case "dextérité":
				erreur = ActorRdD.ctrlDextérité(value);
				break;
			case "vue":
				erreur = ActorRdD.ctrlVue(value);
				break;
			case "ouïe":
				erreur = ActorRdD.ctrlOuïe(value);
				break;
			case "odorat_goût":
				erreur = ActorRdD.ctrlOdorat_goût(value);
				break;
			case "volonté":
				erreur = ActorRdD.ctrlVolonté(value);
				break;
			case "intellect":
				erreur = ActorRdD.ctrlIntellect(value);
				break;
			case "empathie":
				erreur = ActorRdD.ctrlEmpathie(value);
				break;
			case "rêve":
				erreur = ActorRdD.ctrlRêve(value);
				break;
			case "chance":
				erreur = ActorRdD.ctrlChance(value);
				break;
			case "apparence-xp":
			case "constitution-xp":
			case "force-xp":
			case "agilité-xp":
			case "dextérité-xp":
			case "vue-xp":
			case "ouïe-xp":
			case "odorat_goût-xp":
			case "volonté-xp":
			case "intellect-xp":
			case "empathie-xp":
			case "rêve-xp":
			case "chance-xp":
				erreur = ActorRdD.ctrlXp(value);
				break;
			case "vie":
				erreur = ActorRdD.ctrlVie(value);
				break;
			case "endurance":
				erreur = ActorRdD.ctrlEndurance(value);
				break;
			case "sust":
			case "eau":
				erreur = ActorRdD.ctrlSustentation(value);
				break;
			case "éthylisme":
				erreur = ActorRdD.ctrlÉthylisme(value);
				break;
			case "seuilHR":
				erreur = ActorRdD.ctrlSeuilHR(value);
				break;
			case "ptRêve":
				erreur = ActorRdD.ctrlPtRêve(value);
				break;
			case "TMRCol":
				erreur = ActorRdD.ctrlTMRCol(value);
				break;
			case "TMRLig":
				erreur = ActorRdD.ctrlTMRLig(value);
				break;
			case "refoulement":
				erreur = ActorRdD.ctrlRefoulement(value);
				break;
			case "ptChance":
				erreur = ActorRdD.ctrlPtChance(value);
				break;
			case "moral":
				erreur = ActorRdD.ctrlMoral(value);
				break;
			case "exalt_dissol":
				erreur = ActorRdD.ctrlExaltDissol(value);
				break;
			case "cœur":
				erreur = ActorRdD.ctrlCœur(value);
				break;
			case "ptDestinée":
				erreur = ActorRdD.ctrlPtDestinée(value);
				break;
			case "ptVoyage":
				erreur = ActorRdD.ctrlPtVoyage(value);
				break;
			case "stress":
				erreur = ActorRdD.ctrlStress(value);
				break;
			case "encombrement":
				erreur = ActorRdD.ctrlEncombrement(value);
				break;
			case "argent":
				erreur = ActorRdD.ctrlArgent(value);
				break;
			default:
				if(classList.contains("cptcGnrl")) {
					erreur = ActorRdD.ctrlCptcGnrl(value);
					break;
				}
				if(classList.contains("cptcMl")) {
					erreur = ActorRdD.ctrlCptcMl(value);
					break;
				}
				if(classList.contains("cptcTL")) {
					erreur = ActorRdD.ctrlCptcTL(value);
					break;
				}
				if(classList.contains("cptcPart")) {
					erreur = ActorRdD.ctrlCptcPart(value);
					break;
				}
				if(classList.contains("cptcSpé")) {
					erreur = ActorRdD.ctrlCptcSpé(value);
					break;
				}
				if(classList.contains("ctrlCptcCnsc")) {
					erreur = ActorRdD.ctrlCptcSpé(value);
					break;
				}
				if(classList.contains("cptcDrac")) {
					erreur = ActorRdD.ctrlCptcDrac(value);
					break;
				}
				if(classList.contains("cptcXp")) {
					erreur = ActorRdD.ctrlXp(value);
					break;
				}
				if(classList.contains("ptSort")) {
					erreur = ActorRdD.ctrlPtSort(value);
					break;
				}
				if(classList.contains("fatigue")) {
					erreur = ActorRdD.ctrlFatigue(value);
					break;
				}
		}
		try {
			if (erreur != "") {
				$(event.target).addClass("erreur");
				$(event.target).focus();
				ui.notifications.warn(erreur);
				throw new Error(erreur);
			}
			else {
				$(event.target).removeClass("erreur");
			}
			console.log("RdD | RdDFeuillePJ._onChangeInput – Appel _onSubmit");
			this._onSubmit(event);
		} catch (erreur) {
			console.log(`RdD | RdDFeuillePJ._onChangeInput ${erreur}`);
		}
	}

	/**
	 * Redéfinit la fonction de préparation des données du PJ
	 * On n'effectue de mise à jour que s'il n'y a pas d'erreur restante sur la feuille de PJ
	 *
	 * @param {Event} event
	 * @param {Object|null} updateData
	 * @param {Boolean} preventClose
	 * @memberof RdDFeuillePJ
	 */
	async _onSubmit(event, {updateData=null, preventClose=false}={}) {
		console.log(`RdD | RdDFeuillePJ._onSubmit`);
		const form = this.element.find("form").first()[0];
		if (form.querySelector(".erreur")) {
			console.log("RdD | RdDFeuillePJ._onSubmit – erreur");
			ui.notifications.error(game.i18n.localize("RdD.erreurs.pasDeMàJ"));
		}
		else {
			// Mise en forme des données avant mise à jour
			updateData = this._miseEnFormeAvMàJ(updateData);
			console.log(`RdD | RdDFeuillePJ._onSubmit – pas d'erreur ${JSON.stringify(updateData)}`);
			super._onSubmit(event, {updateData, preventClose});
		}
	}
	
	/** Débogage */
	async _updateObject(event, formData) {
		// Suppression des variables de travail
		delete formData.RdDtemp;
		console.log(`RdD | RdDFeuillePJ._updateObject ${JSON.stringify(formData)}`);
		super._updateObject(event, formData);
	}	
}