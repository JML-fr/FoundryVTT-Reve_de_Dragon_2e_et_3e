/* eslint-disable no-console */
import {RdDIntrfc} from "../utils/interface.js";

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

		console.log(`RdD | ItemRdD.prepareData ${objet.type} ${objet.name} ${objet._id}`);
	}
	
	/**
	 * prepareBaseData - Débogage
	 * Calcul des variables dérivées ne nécessitant que les informations de base du document (pas les documents intégrés)
	 *
	 * @memberof ItemRdD
	 */
	prepareBaseData() {
		super.prepareBaseData();
		const objet = this.data;
		console.log(`RdD | ItemRdD.prepareBaseData ${objet.type} ${objet.name} ${objet._id}`);
	}
	
	
	/**
	 * prepareEmbeddedDocuments - Débogage
	 * Préparation des données des documents intégrés à l'objet sur le même principe que l'objet lui-même (prepareData)
	 *
	 * @memberof ItemRdD
	 */
	prepareEmbeddedDocuments() {
		const objet = this.data;
		console.log(`RdD | ItemRdD.prepareEmbeddedDocuments ${objet.type} ${objet.name} ${objet._id}`);
		super.prepareEmbeddedDocuments();
	}
	
	/**
	 * prepareDerivedData - Débogage
	 * Calcul des variables dérivées nécessitant l'intégralité des informations du document (y compris les documents intégrés)
	 *
	 * @memberof ItemRdD
	 */
	prepareDerivedData() {
		const objet = this.data;
		console.log(`RdD | ItemRdD.prepareDerivedData ${objet.type} ${objet.name} ${objet._id}`);
		super.prepareDerivedData();
	}
	
	/**
	 * _preCreate - Débogage
	 * Opérations préparant la création d'un objet
	 *
	 * @param {*} data
	 * @param {*} options
	 * @param {*} user
	 * @memberof ItemRdD
	 */
	async _preCreate(data, options, user) {
		console.log(`RdD | ItemRdD._preCreate`, data);

		// Attribution de l'image liée au type d'objet créé
		if (!data.img) {
			this.data.update({img: `systems/RdD/assets/icons/${data.type}.svg`});
		}
		super._preCreate(data, options, user);
	}
	
	/**
	 * Opérations spécifiques à la création d'un objet
	 *
	 * @param {*} data
	 * @param {*} options
	 * @param {*} userId
	 * @memberof ItemRdD
	 */
	_onCreate(data, options, userId) {
		console.log(`RdD | ItemRdD._onCreate`);
		super._onCreate(data, options, userId);
	}
	
	/**
	 * _preUpdate - Débogage
	 * Opérations préparant la création d'un objet
	 *
	 * @param {*} changed
	 * @param {*} options
	 * @param {*} user
	 * @memberof ItemRdD
	 */
	async _preUpdate(changed, options, user) {
		console.log(`RdD | ItemRdD._preUpdate`, changed);

		// La fonction peut être appelée pour un autre motif qu'un changment de données. Ex: déplacement dans un dossier
		if ("data" in changed) {
			switch (this.data.type) {
				case "compétence":
					if (!this.isEmbedded) {
						changed.data = this._calcBase(changed.data);
					}
					break;
	
				default:
					break;
			}
		}
		super._preUpdate(changed, options, user);
	}
	
	/**
	 * _onUpdate - Débogage
	 *
	 * @param {*} changed
	 * @param {*} options
	 * @param {*} userId
	 * @memberof ItemRdD
	 */
	_onUpdate(changed, options, userId) {
		console.log(`RdD | ItemRdD._onUpdate ${JSON.stringify(changed)}`);
		super._onUpdate(changed, options, userId);
	}

	/**
	 * _onDelete - Débogage
	 *
	 * @static
	 * @param {*} options
	 * @param {*} userId
	 * @memberof ItemRdD
	 */
	_onDelete(options, userId) {
		console.log(`RdD | ItemRdD._onDelete`);
		super._onDelete(options, userId);
	}
	
	/**
	 * Détermination du niveau de base en fonction du type de compétence
	 * 
	 * @param {*} data Données à mettre à jour
	 * @memberof ItemRdD
	 * @private
	 */
	_calcBase(data) {
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
		return data;
	}
	
	/* ================================================== */
	/* Contrôles de données */
	/* ================================================== */

	/**
	 * Contrôle que la valeur fournie pour le code libellé est valide
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

	/**
	 * Contrôle que la valeur fournie pour la spécialité est valide
	 *
	 * @static
	 * @param {*} valeur
	 * @memberof ItemRdD
	 */
	static ctrlSpécialité (valeur){
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
	static ctrlNiveau (valeur, type){
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
	static  ctrlArchétype (valeur){
		console.log(`RdD | RdDIntrfc.ctrlArchétype : ` + valeur);
		if (RdDIntrfc.ctrlPrésence(valeur)) {
			return "";
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
	static ctrlPtSort (valeur){
		console.log(`RdD | ItemRdD.ctrlPtSort : ` + valeur);
		if (RdDIntrfc.ctrlPrésence(valeur)) {
			return "";
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
}