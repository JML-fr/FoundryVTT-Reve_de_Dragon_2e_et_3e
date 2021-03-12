import { RdDIntrfc } from "../utils/interface.js";

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
	 * Mise à jour des données dérivées de l'objet
	 *
	 * @memberof ItemRdD
	 */
	prepareData() {
		console.log(`RdD | ItemRdD.prepareData`);
		super.prepareData();
		const objet = this.data;

		console.log(
			`RdD | ItemRdD.prepareData ${objet.type} ${objet.name} ${objet._id}`
		);

		switch (objet.type) {
			case "compétence":
				if (!this.isOwned) {
					this._calcBase();
				}
				break;

			default:
				break;
		}
	}

	/**
	 * prepareEmbeddedEntities - Débogage
	 * Met à jour la collection des effets actifs de l'objet
	 *
	 * @memberof ItemRdD
	 */
	prepareEmbeddedEntities() {
		console.log(`RdD | ItemRdD.prepareEmbeddedEntities`);
		super.prepareEmbeddedEntities();
	}

	/**
	 * Opérations spécifiques à la création d'un objet
	 *
	 * @memberof ItemRdD
	 */
	static async create(data, options = {}) {
		console.log(`RdD | ItemRdD.create`);

		// Attribution de l'image liée au type d'objet créé
		if (!data.img) {
			data.img = `systems/RdD/assets/icons/${data.type}.svg`;
		}
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
	 * Détermination du niveau de base de la compétence en fonction de son type
	 *
	 * @memberof ItemRdD
	 * @private
	 */
	_calcBase() {
		const data = this.data.data;
		console.log(`RdD | ItemRdD._calcBase`, data);
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

	/* -------------------------------------------------- */
	/* Compétences */
	/* -------------------------------------------------- */

	/**
	 * Contrôle que la valeur fournie pour le code libellé de la compétence est valide
	 *
	 * @static
	 * @param {*} valeur
	 * @memberof ItemRdD
	 */
	static ctrlCodeLibellé(valeur) {
		console.log(`RdD | ItemRdD.ctrlCodeLibellé : ` + valeur);
		if (RdDIntrfc.ctrlPrésence(valeur)) {
			return game.i18n.localize("RdD.erreurs.codeLibelléVide");
		}
		return "";
	}

	/**
	 * Contrôle que la valeur fournie pour la spécialité de la compétence est valide
	 *
	 * @static
	 * @param {*} valeur
	 * @memberof ItemRdD
	 */
	static ctrlSpécialité(valeur) {
		console.log(`RdD | ItemRdD.ctrlSpécialité : ` + valeur);
		if (RdDIntrfc.ctrlPrésence(valeur)) {
			return game.i18n.localize("RdD.erreurs.spécialitéVide");
		}
		return "";
	}

	/**
	 * Contrôle que la valeur fournie pour la compétence est valide
	 *
	 * @static
	 * @param {*} valeur
	 * @memberof ItemRdD
	 */
	static ctrlNiveau(valeur, type) {
		console.log(`RdD | ItemRdD.ctrlCptcGnrl : ` + valeur);
		if (RdDIntrfc.ctrlPrésence(valeur)) {
			return game.i18n.localize("RdD.erreurs.cptcVide");
		}
		let nombre = Number(valeur);
		if (RdDIntrfc.ctrlNuméricité(nombre)) {
			return game.i18n.localize("RdD.erreurs.cptcGnlInvalide");
		}
		switch (type) {
			case "générale":
				if (!Number.isInteger(nombre) || nombre < -4) {
					return game.i18n.localize("RdD.erreurs.cptcGnlInvalide");
				}
				break;
			case "mêlée":
				if (!Number.isInteger(nombre) || nombre < -6) {
					return game.i18n.localize("RdD.erreurs.cptcMlInvalide");
				}
				break;
			case "tirLancer":
				if (!Number.isInteger(nombre) || nombre < -8) {
					return game.i18n.localize("RdD.erreurs.cptcTLInvalide");
				}
				break;
			case "particulière":
				if (!Number.isInteger(nombre) || nombre < -8) {
					return game.i18n.localize("RdD.erreurs.cptcPartInvalide");
				}
				break;
			case "spécialisée":
				if (!Number.isInteger(nombre) || nombre < -11) {
					return game.i18n.localize("RdD.erreurs.cptcSpéInvalide");
				}
				break;
			case "connaissance":
				if (!Number.isInteger(nombre) || nombre < -11) {
					return game.i18n.localize("RdD.erreurs.cptcCnscInvalide");
				}
				break;
			case "draconic":
				if (!Number.isInteger(nombre) || nombre < -11) {
					return game.i18n.localize("RdD.erreurs.cptcDracInvalide");
				}
				break;
			default:
				break;
		}

		// Pas d'erreur trouvée
		return "";
	}

	/**
	 * Contrôle les contraintes sur la valeur d'un archétype
	 *
	 * @static
	 * @param {*} valeur Valeur à contrôler
	 * @returns {String} Message d'erreur
	 * @memberof ItemRdD
	 */
	static ctrlArchétype(valeur) {
		console.log(`RdD | RdDIntrfc.ctrlArchétype : ` + valeur);
		if (RdDIntrfc.ctrlPrésence(valeur)) {
			return game.i18n.localize("RdD.erreurs.archtpVide");
		}
		let nombre = Number(valeur);
		if (RdDIntrfc.ctrlNuméricité(nombre)) {
			return game.i18n.localize("RdD.erreurs.archtpInvalide");
		}
		if (!Number.isInteger(nombre) || nombre < 0) {
			return game.i18n.localize("RdD.erreurs.archtpInvalide");
		}

		// Pas d'erreur trouvée
		return "";
	}

	/**
	 * Contrôle les contraintes sur les points de sort acquis
	 *
	 * @static
	 * @param {*} valeur Valeur à contrôler
	 * @returns {String} Message d'erreur
	 * @memberof ItemRdD
	 */
	static ctrlPtSort(valeur) {
		console.log(`RdD | ItemRdD.ctrlPtSort : ` + valeur);
		if (RdDIntrfc.ctrlPrésence(valeur)) {
			return game.i18n.localize("RdD.erreurs.ptSortVide");
		}
		let nombre = Number(valeur);
		if (RdDIntrfc.ctrlNuméricité(nombre)) {
			return game.i18n.localize("RdD.erreurs.ptSortInvalide");
		}
		if (!Number.isInteger(nombre) || nombre < 0) {
			return game.i18n.localize("RdD.erreurs.ptSortInvalide");
		}

		// Pas d'erreur trouvée
		return "";
	}
	
	/* -------------------------------------------------- */
	/* Équipements */
	/* -------------------------------------------------- */

	/**
	 * Contrôle les contraintes sur les points d'encombrement
	 *
	 * @static
	 * @param {*} valeur Valeur à contrôler
	 * @returns {String} Message d'erreur
	 * @memberof ItemRdD
	 */
	static ctrlencombrement(valeur) {
		console.log(`RdD | ItemRdD.ctrlencombrement : ` + valeur);
		if (RdDIntrfc.ctrlPrésence(valeur)) {
			return game.i18n.localize("RdD.erreurs.encombrementVide");
		}
		let nombre = Number(valeur);
		if (RdDIntrfc.ctrlNuméricité(nombre)) {
			return game.i18n.localize("RdD.erreurs.encombrementInvalide");
		}
		if (nombre < 0) {
			return game.i18n.localize("RdD.erreurs.encombrementInvalide");
		}

		// Pas d'erreur trouvée
		return "";
	}

	/**
	 * Contrôle les contraintes sur le prix unitaire
	 *
	 * @static
	 * @param {*} valeur Valeur à contrôler
	 * @returns {String} Message d'erreur
	 * @memberof ItemRdD
	 */
	static ctrlprixUnitaire(valeur) {
		console.log(`RdD | ItemRdD.ctrlprixUnitaire : ` + valeur);
		if (RdDIntrfc.ctrlPrésence(valeur)) {
			return game.i18n.localize("RdD.erreurs.prixUVide");
		}
		let nombre = Number(valeur);
		if (RdDIntrfc.ctrlNuméricité(nombre)) {
			return game.i18n.localize("RdD.erreurs.prixUInvalide");
		}
		if (nombre < 0) {
			return game.i18n.localize("RdD.erreurs.prixUInvalide");
		}

		// Pas d'erreur trouvée
		return "";
	}

	/**
	 * Contrôle les contraintes sur les quantités
	 *
	 * @static
	 * @param {*} valeur Valeur à contrôler
	 * @returns {String} Message d'erreur
	 * @memberof ItemRdD
	 */
	static ctrlquantité(valeur) {
		console.log(`RdD | ItemRdD.ctrlquantité : ` + valeur);
		if (RdDIntrfc.ctrlPrésence(valeur)) {
			return game.i18n.localize("RdD.erreurs.qtéVide");
		}
		let nombre = Number(valeur);
		if (RdDIntrfc.ctrlNuméricité(nombre)) {
			return game.i18n.localize("RdD.erreurs.qtéInvalide");
		}
		if (!Number.isInteger(nombre) || nombre < 0) {
			return game.i18n.localize("RdD.erreurs.qtéInvalide");
		}

		// Pas d'erreur trouvée
		return "";
	}
}
