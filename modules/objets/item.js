import * as RdDIntrfc from "../utils/interface.js";

/**
 * Complète la classe de base Item avec les mécanismes spécifiques à RdD.
 * @class
 */
export class ItemRdD extends Item {
	constructor(...args) {
		super(...args);
	}

	/* ================================================== */
	/* ************************************************** */
	/* ================================================== */
	/* Redéfinition des méthodes de Item                  */
	/* ================================================== */
	/* ************************************************** */
	/* ================================================== */

	/**
	 * initialize - Débogage
	 *
	 * @memberof ItemRdD
	 */
	initialize() {
		console.log(`RdD | ItemRdD.initialize`);
		super.initialize();
	}

	/**
	 * Mise à jour des données dérivées de l'objet
	 *
	 * @memberof ItemRdD
	 */
	prepareData() {
		console.log(`RdD | ItemRdD.prepareData`);
		super.prepareData();
		const objet = this.data;

		console.log(`RdD | ItemRdD.prepareData ` + objet.type);

		switch (objet.type) {
			case "compétence":
				this._calcBase();
				break;

			default:
				break;
		}
	}

	/**
	 * create - Débogage
	 *
	 * @memberof ItemRdD
	 */
	static async create(data, options={}) {
		console.log(`RdD | ItemRdD.create`);
		super.create(data, options);
	}

	/**
	 * update - Débogage
	 *
	 * @memberof ItemRdD
	 */
	async update(data, options = {}) {
		console.log(`RdD | ItemRdD.update ${JSON.stringify(data)}`);
		super.update(data, options);
	}

	/**
	 * delete - Débogage
	 *
	 * @memberof ItemRdD
	 */
	async delete(options) {
		console.log(`RdD | ItemRdD.delete`);
		super.delete(options);
	}
	
	/**
	 * Détermination du niveau de base en fonction du type de compétence
	 * 
	 * @memberof ItemRdD
	 * @private
	 */
	_calcBase() {
		const data = this.data.data;
		console.log(`RdD | ItemRdD._calcBase`);
		switch (data.type) {
			case "générale":
				data.value = -4;
				break;
			case "mêlée":
				data.value = -6;
				break;
			case "tirLancer":
			case "particulière":
				data.value = -8;
				break;
			case "spécialisée":
			case "connaissance":
			case "draconic":
				data.value = -11;
				break;
			default:
				break;
		}
	}
	
	/* ================================================== */
	/* Contrôles de données */
	/* ================================================== */

	/**
	 * Contrôle que la valeur fournie pour la propriété est valide
	 *
	 * @static
	 * @param {*} valeur
	 * @memberof ItemRdD
	 */
	static ctrlCodeLibellé (valeur){
		console.log(`RdD | ItemRdD.ctrlCodeLibellé : ` + valeur);
		if (RdDIntrfc.ctrlPrésence(valeur)) {
			return game.i18n.localize("RdD.erreurs.codeLibelléVide");
		}
		return "";
	}
}