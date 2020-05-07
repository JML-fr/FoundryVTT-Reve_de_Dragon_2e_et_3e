 /*
 * Importation des modules
 */
import * as Intrfc from "../utils/interface.js";
import {ActorRdD} from "../acteurs/actorRdD.js";

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
		 * @property {boolean} options.popOut contenant de type pop-out
		 * @property {boolean} options.resizable fenêtre redimentionable
		 */
		return mergeObject(super.defaultOptions, {
			classes: ["RdD", "feuille", "actor", "pj"],
			template: "systems/RdD/templates/feuille-pj.html",
			width: 900,
			height: 600,
			submitOnChange: false,
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
		console.log(`RdD | RdDFeuillePJ.getData`);
		let data = super.getData();
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

		// Active le MCE
		/*
		let editor = html.find(".editor-content");
		TextEditor.create({
			target: editor[0],
			height: this.position.height - 260,
			setup: (ed) => {
				this._mce = ed;
			},
			save_onsavecallback: (ed) => {
				let target = editor.attr("data-edit");
				this.actor.update({ [target]: ed.getContent() }, true);
			},
		}).then((ed) => {
			this.mce = ed[0];
			this.mce.focus();
		});
		*/

		// ---------------------
		// Contrôle de la saisie
		// ---------------------
		// Signes particuliers :
		html.find("#heureNaissance").on("change.RdD", {fctCtrl: "ctrlHeureNaissance"}, this._ctrlSaisie.bind(this));
		html.find("#sexe").on("change.RdD", {fctCtrl: "ctrlSexe"}, this._ctrlSaisie.bind(this));
		html.find("#âge").on("change.RdD", {fctCtrl: "ctrlÂge"}, this._ctrlSaisie.bind(this));
		html.find("#spTaille").on("change.RdD", {fctCtrl: "ctrlSPTaille"}, this._ctrlSaisie.bind(this));
		html.find("#poids").on("change.RdD", {fctCtrl: "ctrlPoids"}, this._ctrlSaisie.bind(this));
		html.find("#beauté").on("change.RdD", {fctCtrl: "ctrlBeauté"}, this._ctrlSaisie.bind(this));
		html.find("#latéralité").on("change.RdD", {fctCtrl: "ctrlLatéralité"}, this._ctrlSaisie.bind(this));

		// Caractéristiques :
		html.find("#taille").on("change.RdD", {fctCtrl: "ctrlTaille"}, this._ctrlSaisie.bind(this));
		html.find("#apparence").on("change.RdD", {fctCtrl: "ctrlApparence"}, this._ctrlSaisie.bind(this));
		html.find("#apparence-xp").on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));
		html.find("#constitution").on("change.RdD", {fctCtrl: "ctrlConstitution"}, this._ctrlSaisie.bind(this));
		html.find("#constitution-xp").on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));
		html.find("#force").on("change.RdD", {fctCtrl: "ctrlForce"}, this._ctrlSaisie.bind(this));
		html.find("#force-xp").on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));
		html.find("#agilité").on("change.RdD", {fctCtrl: "ctrlAgilité"}, this._ctrlSaisie.bind(this));
		html.find("#agilité-xp").on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));
		html.find("#dextérité").on("change.RdD", {fctCtrl: "ctrlDextérité"}, this._ctrlSaisie.bind(this));
		html.find("#dextérité-xp").on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));
		html.find("#vue").on("change.RdD", {fctCtrl: "ctrlVue"}, this._ctrlSaisie.bind(this));
		html.find("#vue-xp").on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));
		html.find("#ouïe").on("change.RdD", {fctCtrl: "ctrlOuïe"}, this._ctrlSaisie.bind(this));
		html.find("#ouïe-xp").on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));
		html.find("#odorat_goût").on("change.RdD", {fctCtrl: "ctrlOdorat_goût"}, this._ctrlSaisie.bind(this));
		html.find("#odorat_goût-xp").on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));
		html.find("#volonté").on("change.RdD", {fctCtrl: "ctrlVolonté"}, this._ctrlSaisie.bind(this));
		html.find("#volonté-xp").on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));
		html.find("#intellect").on("change.RdD", {fctCtrl: "ctrlIntellect"}, this._ctrlSaisie.bind(this));
		html.find("#intellect-xp").on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));
		html.find("#empathie").on("change.RdD", {fctCtrl: "ctrlEmpathie"}, this._ctrlSaisie.bind(this));
		html.find("#empathie-xp").on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));
		html.find("#rêve").on("change.RdD", {fctCtrl: "ctrlRêve"}, this._ctrlSaisie.bind(this));
		html.find("#rêve-xp").on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));
		html.find("#chance").on("change.RdD", {fctCtrl: "ctrlChance"}, this._ctrlSaisie.bind(this));
		html.find("#chance-xp").on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));

		// Compétences :
		for (let index = 0; index < 11; index++) {
			let élémentRecherché = "#cptcGnrl\\.élt_" + index + "\\.value";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlCptcGnrl"}, this._ctrlSaisie.bind(this));			
			élémentRecherché = "#cptcGnrl\\.élt_" + index + "\\.xp";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));			
		}
		for (let index = 0; index < 13; index++) {
			let élémentRecherché = "#cptcMl\\.élt_" + index + "\\.value";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlCptcMl"}, this._ctrlSaisie.bind(this));			
			élémentRecherché = "#cptcMl\\.élt_" + index + "\\.xp";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));			
		}
		for (let index = 0; index < 6; index++) {
			let élémentRecherché = "#cptcTL\\.élt_" + index + "\\.value";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlCptcTL"}, this._ctrlSaisie.bind(this));			
			élémentRecherché = "#cptcTL\\.élt_" + index + "\\.xp";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));			
		}
		for (let index = 0; index < 16; index++) {
			let élémentRecherché = "#cptcPart\\.élt_" + index + "\\.value";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlCptcPart"}, this._ctrlSaisie.bind(this));			
			élémentRecherché = "#cptcPart\\.élt_" + index + "\\.xp";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));			
		}
		for (let index = 0; index < 10; index++) {
			let élémentRecherché = "#cptcSpé\\.élt_" + index + "\\.value";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlCptcSpé"}, this._ctrlSaisie.bind(this));			
			élémentRecherché = "#cptcSpé\\.élt_" + index + "\\.xp";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));			
		}
		for (let index = 0; index < 7; index++) {
			let élémentRecherché = "#cptcCnsc\\.élt_" + index + "\\.value";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlCptcCnsc"}, this._ctrlSaisie.bind(this));			
			élémentRecherché = "#cptcCnsc\\.élt_" + index + "\\.xp";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));			
		}
		for (let index = 0; index < 4; index++) {
			let élémentRecherché = "#cptcDrac\\.élt_" + index + "\\.value";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlCptcDrac"}, this._ctrlSaisie.bind(this));			
			élémentRecherché = "#cptcDrac\\.élt_" + index + "\\.xp";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlXp"}, this._ctrlSaisie.bind(this));			
			élémentRecherché = "#cptcDrac\\.élt_" + index + "\\.ptSort";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlPtSort"}, this._ctrlSaisie.bind(this));			
		}

		// Santé
		html.find("#vie").on("change.RdD", {fctCtrl: "ctrlVie"}, this._ctrlSaisie.bind(this));
		html.find("#endurance").on("change.RdD", {fctCtrl: "ctrlEndurance"}, this._ctrlSaisie.bind(this));
		for (let index = 0; index < 3; index++) {
			let élémentRecherché = "#data\\.cptr\\.fatigue\\.niveaux\\.élt_0\\.segments\\.élt_" + index + "\\.value";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlFatigue"}, this._ctrlSaisie.bind(this));			
			élémentRecherché = "#data\\.cptr\\.fatigue\\.niveaux\\.élt_1\\.segments\\.élt_" + index + "\\.value";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlFatigue"}, this._ctrlSaisie.bind(this));			
		}
		for (let index = 2; index < 8; index++) {
			let élémentRecherché = "#data\\.cptr\\.fatigue\\.niveaux\\.élt_" + index + "\\.segments\\.élt_0\\.value";
			html.find(élémentRecherché).on("change.RdD", {fctCtrl: "ctrlFatigue"}, this._ctrlSaisie.bind(this));			
		}
		html.find("#sust").on("change.RdD", {fctCtrl: "ctrlSustentation"}, this._ctrlSaisie.bind(this));
		html.find("#eau").on("change.RdD", {fctCtrl: "ctrlSustentation"}, this._ctrlSaisie.bind(this));
		html.find("#éthylisme").on("change.RdD", {fctCtrl: "ctrlÉthylisme"}, this._ctrlSaisie.bind(this));

		// Haut-rêve
		html.find("#seuilHR").on("change.RdD", {fctCtrl: "ctrlSeuilHR"}, this._ctrlSaisie.bind(this));
		html.find("#ptRêve").on("change.RdD", {fctCtrl: "ctrlPtRêve"}, this._ctrlSaisie.bind(this));
		html.find("#TMRCol").on("change.RdD", {fctCtrl: "ctrlTMRCol"}, this._ctrlSaisie.bind(this));
		html.find("#TMRLig").on("change.RdD", {fctCtrl: "ctrlTMRLig"}, this._ctrlSaisie.bind(this));
		html.find("#refoulement").on("change.RdD", {fctCtrl: "ctrlRefoulement"}, this._ctrlSaisie.bind(this));
		
		// Vécu
		html.find("#ptChance").on("change.RdD", {fctCtrl: "ctrlPtChance"}, this._ctrlSaisie.bind(this));
		html.find("#moral").on("change.RdD", {fctCtrl: "ctrlMoral"}, this._ctrlSaisie.bind(this));
		html.find("#exalt_dissol").on("change.RdD", {fctCtrl: "ctrlExaltDissol"}, this._ctrlSaisie.bind(this));
		html.find("#cœur").on("change.RdD", {fctCtrl: "ctrlCœur"}, this._ctrlSaisie.bind(this));
		html.find("#ptDestinée").on("change.RdD", {fctCtrl: "ctrlPtDestinée"}, this._ctrlSaisie.bind(this));
		html.find("#ptVoyage").on("change.RdD", {fctCtrl: "ctrlPtVoyage"}, this._ctrlSaisie.bind(this));
		html.find("#stress").on("change.RdD", {fctCtrl: "ctrlStress"}, this._ctrlSaisie.bind(this));
		
		// Inventaire
		html.find("#encombrement").on("change.RdD", {fctCtrl: "ctrlEncombrement"}, this._ctrlSaisie.bind(this));
		html.find("#argent").on("change.RdD", {fctCtrl: "ctrlArgent"}, this._ctrlSaisie.bind(this));

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
	 * Contrôle la saisie
	 *
	 * @function
	 * @param {Event} event L'évènement à l'origine du contrôle
	 * @memberof RdDFeuillePJ
	 * @async
	 * @private
	 */
	async _ctrlSaisie(event) {
		const input = event.currentTarget;
		const value = input.value;
		const id = input.id;
		console.log(`RdD | RdDFeuillePJ._ctrlSaisie ${id}`);
		try {
			let erreur = eval(`ActorRdD.${event.data.fctCtrl}(value)`);
			if (erreur != "") {
				$(event.currentTarget).addClass("erreur");
				$(event.currentTarget).focus();
				ui.notifications.warn(erreur);
				throw new Error(erreur);
			}
			else {
				$(event.currentTarget).removeClass("erreur");
			}
			console.log("RdD | RdDFeuillePJ._ctrlSaisie – Appel _onSubmit");
			this._onSubmit(event);
		} catch (erreur) {
			console.log(`RdD | RdDFeuillePJ._ctrlSaisie ${erreur}`);
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
			console.log("RdD | RdDFeuillePJ._onSubmit – pas d'erreur");
			if (!updateData) {
				updateData = {};
			}
			updateData[`data.cptr.hautRêve.queuesEtSouffles`] = [{"titre": "Inertie draconique", "dateFin": "22 Couronne"}];
			super._onSubmit(event, {updateData, preventClose});
		}
	}
	
	/** Débogage */
	async _updateObject(event, formData) {
		console.log(`RdD | RdDFeuillePJ._updateObject`);
		super._updateObject(event, formData);
	}	
}