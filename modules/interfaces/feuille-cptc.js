/* eslint-disable no-console */
 /*
 * Importation des modules
 */
import {RdDIntrfc} from "../utils/interface.js";
import {ItemRdD} from "../objets/item.js";

/**
 * La feuille de compétence est basée sur la classe ItemSheet
 * @class
 */
export class RdDFeuilleCptc extends ItemSheet {
	/**
	 * Étend et remplace les options d'affichage par défaut
	 * @function defaultOptions
	 * @returns {object}
	 * @static
	 * @memberof RdDFeuilleCptc
	 */
	static get defaultOptions() {
		console.log(`RdD | RdDFeuilleCptc.defaultOptions`);
		/**
		 * @property {string} options.classes classes CSS appliquées à la feuille
		 * @property {string} options.template chemin d'accès au squelette HTML de la feuille
		 * @property {number} options.width largeur de la fenêtre
		 * @property {number} options.height hauteur de la fenêtre
		 * @property {boolean} options.tabs liste des onglets à gérer
		 */
		return mergeObject(super.defaultOptions, {
			classes: ["RdD", "feuille", "item", "cptc"],
			template: "systems/RdD/templates/feuille-cptc.hbs",
			width: 470,
			height: 400
		});
	}

	/**
	 * Choisit la feuille à afficher en fonction du contexte
	 *
	 * @readonly
	 * @memberof RdDFeuilleCptc
	 * @override
	 */
	get classes() {
		if (this.object.isEmbedded) {
			return ["RdD", "feuille", "item", "cptcPJ"];
		} else {
			return ["RdD", "feuille", "item", "cptc"];
		}
	}

	/**
	 * Choisit la feuille à afficher en fonction du contexte
	 *
	 * @readonly
	 * @memberof RdDFeuilleCptc
	 * @override
	 */
	get template() {
		if (this.object.isEmbedded) {
			return "systems/RdD/templates/feuille-cptc-pj.hbs";
		} else {
			return "systems/RdD/templates/feuille-cptc.hbs";
		}
	}

	/* -------------------------------------------- */

	/**
	 * Prepare les données pour l'affichage de la feuille de compétences
	 * L'objet de données préparé contient les données de l'objet et les options de la feuille
	 * @function getData
	 * @returns {object} Données à afficher
	 * @memberof RdDFeuilleCptc
	 */
	getData() {
		let data = super.getData();
		console.log(`RdD | RdDFeuilleCptc.getData`, data);
		return data;
	}

	/* -------------------------------------------- */

	/**
	 * Active les détecteurs d'évènements depuis la page HTML préparée
	 * @param html {HTML}   L'objet HTML préparé prêt à être rendu dans le DOM
	 * @memberof RdDFeuilleCptc
	 */
	activateListeners(html) {
		console.log(`RdD | RdDFeuilleCptc.activateListeners`);
		super.activateListeners(html);

		// Tout ce qui suit n'est nécessaire que si la feuille est éditable
		if (!this.isEditable) return;

		// ---> À faire : supprimer le libellé de spécialité si la compétence n'est plus spécialisable
		//
		//
	}

	/**
	 * Redéfinit la fonction d'envoi de la saisie
	 * Contrôle la saisie
	 *
	 * @method _onChangeInput
	 * @param {Event} event L'évènement à l'origine du contrôle
	 * @memberof RdDFeuilleCptc
	 * @async
	 * @private
	 */
	async _onChangeInput(event) {
		const input = event.target;
		const value = input.value;
		const id = input.id;
		const classList = input.classList;
		console.log(`RdD | RdDFeuilleCptc._onChangeInput ${id}, ${classList[0]}`);

		// On ne valide que les saisies qui ont besoin de l'être.
		let erreur = "";
		switch (id) {
			case "codeLibellé":
				erreur = ItemRdD.ctrlCodeLibellé(value);
				break;
			case "spécialité":
				erreur = ItemRdD.ctrlSpécialité(value);
				break;
			case "niveau":
				erreur = ItemRdD.ctrlNiveau(value, this.object.data.data.type);
				break;
			case "xp":
				erreur = RdDIntrfc.ctrlXp(value);
				break;
			case "archétype":
				erreur = ItemRdD.ctrlArchétype(value);
				break;
			case "ptSort":
				erreur = ItemRdD.ctrlPtSort(value);
				break;
			default:
				break;
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
			console.log("RdD | RdDFeuilleCptc._onChangeInput – Appel _onSubmit");
			this._onSubmit(event);
		} catch (erreur) {
			console.log(`RdD | RdDFeuilleCptc._onChangeInput ${erreur}`);
		}
	}

	/**
	 * Redéfinit la fonction de préparation des données de la compétence
	 * On n'effectue de mise à jour que s'il n'y a pas d'erreur restante sur la feuille de compétence
	 *
	 * @method _onSubmit
	 * @param {Event} event L'évènement à l'origine de l'envoi
	 * @param {Object|null} updateData Données mises à jour
	 * @param {Boolean} preventClose Empêche la fermeture de la fenêtre suite à l'envoi de données
	 * @async
	 * @memberof RdDFeuilleCptc
	 */
	async _onSubmit(event, {updateData=null, preventClose=false}={}) {
		console.log(`RdD | RdDFeuilleCptc._onSubmit`);
		const form = this.element.find("form").first()[0];
		if (form.querySelector(".erreur")) {
			console.log("RdD | RdDFeuilleCptc._onSubmit – erreur");
			ui.notifications.error(game.i18n.localize("RdD.erreurs.pasDeMàJ"));
		}
		else {
			console.log(`RdD | RdDFeuilleCptc._onSubmit – pas d'erreur`, updateData);
			super._onSubmit(event, {updateData, preventClose});
		}
	}
	
	/**
	 * Redéfinit la fonction de mise à jour de la compétence
	 * Débogage
	 *
	 * @method _updateObject
	 * @param {*} event
	 * @param {*} formData
	 * @async
	 * @memberof RdDFeuilleCptc
	 */
	async _updateObject(event, formData) {
		console.log(`RdD | RdDFeuilleCptc._updateObject`, formData);
		super._updateObject(event, formData);
	}	
}