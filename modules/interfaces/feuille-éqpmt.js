 /*
 * Importation des modules
 */
import {RdDIntrfc} from "../utils/interface.js";
// import * as Tmplt from "../acteurs/actor-templates.js"
import {ItemRdD} from "../objets/item.js";

/**
 * La feuille d'équipement est basée sur la classe ItemSheet
 * @class
 */
export class RdDFeuilleÉqpmt extends ItemSheet {
	/**
	 * Étend et remplace les options d'affichage par défaut
	 * @function defaultOptions
	 * @returns {object}
	 * @static
	 * @memberof RdDFeuilleÉqpmt
	 */
	static get defaultOptions() {
		console.log(`RdD | RdDFeuilleÉqpmt.defaultOptions`);
		/**
		 * @property {string} options.classes classes CSS appliquées à la feuille
		 * @property {string} options.template chemin d'accès au squelette HTML de la feuille
		 * @property {number} options.width largeur de la fenêtre
		 * @property {number} options.height hauteur de la fenêtre
		 * @property {boolean} options.tabs liste des onglets à gérer
		 */
		return mergeObject(super.defaultOptions, {
			classes: ["RdD", "feuille", "item", "éqpmt"],
			template: "systems/RdD/templates/feuille-éqpmt.html",
			width: 470,
			height: 400
		});
	}

	/* -------------------------------------------- */

	/**
	 * Prepare les données pour l'affichage de la feuille d'équipement
	 * L'objet de données préparé contient les données de l'objet et les options de la feuille
	 * @function getData
	 * @returns {object} Données à afficher
	 * @memberof RdDFeuilleÉqpmt
	 */
	getData() {
		let data = super.getData();
		console.log(`RdD | RdDFeuilleÉqpmt.getData`, data);

		data.isGM = game.user.isGM;
		return data;
	}

	/* -------------------------------------------- */

	/**
	 * Active les détecteurs d'évènements depuis la page HTML préparée
	 * @param html {HTML}   L'objet HTML préparé prêt à être rendu dans le DOM
	 * @memberof RdDFeuilleÉqpmt
	 */
	activateListeners(html) {
		console.log(`RdD | RdDFeuilleÉqpmt.activateListeners`);
		super.activateListeners(html);

		// Tout ce qui suit n'est nécessaire que si la feuille est éditable
		if (!this.options.editable) return;
	}

	/**
	 * Redéfinit la fonction d'envoi de la saisie
	 * Contrôle la saisie
	 *
	 * @method _onChangeInput
	 * @param {Event} event L'évènement à l'origine du contrôle
	 * @memberof RdDFeuilleÉqpmt
	 * @private
	 */
	_onChangeInput(event) {
		const input = event.target;
		const value = input.value;
		const id = input.id;
		const classList = input.classList;
		console.log(`RdD | RdDFeuilleÉqpmt._onChangeInput ${id}, ${classList[0]}`);

		// On ne valide que les saisies qui ont besoin de l'être.
		let erreur = "";
		switch (id) {
			case "encombrement":
				erreur = ItemRdD.ctrlencombrement(value);
				break;
			case "sols":
			case "deniers":
				erreur = ItemRdD.ctrlprixUnitaire(value);
				break;
			case "quantité":
				erreur = ItemRdD.ctrlquantité(value);
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
			console.log("RdD | RdDFeuilleÉqpmt._onChangeInput – Appel _onSubmit");
			this._onSubmit(event);
		} catch (erreur) {
			console.log(`RdD | RdDFeuilleÉqpmt._onChangeInput ${erreur}`);
		}
	}

	/**
	 * Redéfinit la fonction de préparation des données de l'équipement
	 * On n'effectue de mise à jour que s'il n'y a pas d'erreur restante sur la feuille de compétence
	 *
	 * @method _onSubmit
	 * @param {Event} event
	 * @param {Object|null} updateData
	 * @param {Boolean} preventClose
	 * @async
	 * @memberof RdDFeuilleÉqpmt
	 */
	async _onSubmit(event, {updateData=null, preventClose=false}={}) {
		console.log(`RdD | RdDFeuilleÉqpmt._onSubmit`);
		const form = this.element.find("form").first()[0];
		if (form.querySelector(".erreur")) {
			console.log("RdD | RdDFeuilleÉqpmt._onSubmit – erreur");
			ui.notifications.error(game.i18n.localize("RdD.erreurs.pasDeMàJ"));
		}
		else {
			console.log(`RdD | RdDFeuilleÉqpmt._onSubmit – pas d'erreur`, updateData);
			super._onSubmit(event, {updateData, preventClose});
		}
	}
	
	/**
	 * Redéfinit la fonction de mise à jour de l'équipement
	 * Débogage
	 *
	 * @method _updateObject
	 * @param {*} event
	 * @param {*} formData
	 * @async
	 * @memberof RdDFeuilleÉqpmt
	 */
	async _updateObject(event, formData) {
		console.log(`RdD | RdDFeuilleÉqpmt._updateObject`, formData);
		super._updateObject(event, formData);
	}	
}