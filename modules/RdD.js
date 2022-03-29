/* eslint-disable no-console */
/**
 * Prise en charge des règles de Rêve de Dragon, 2de édition
 */

/**
 * Importation des modules
 */
import {RdD} from "./utils/init.js";
import * as RdDTemplates from "./acteurs/actor-templates.js";
import RdDHooks from "./utils/hooks.js";
import {préchargePartialsHandlebars} from "./utils/précharge-templates.js";
import * as Acteurs from "./acteurs/actor.js";
import * as Objets from "./objets/item.js";
import * as RdDFPJ from "./interfaces/feuille-pj.js";
import {RdDFeuilleCptc} from "./interfaces/feuille-cptc.js";
import {RdDFeuilleÉqpmt} from "./interfaces/feuille-éqpmt.js";

/* -------------------------------------------- */
/* Initialisations                              */
/* -------------------------------------------- */

Hooks.once("init", async function() {
	console.log(`RdD | Initialisation du système Rêve de Dragon`);
	// Mémorise la configuration
	CONFIG.Actor.documentClass = Acteurs.ActorRdD;
	CONFIG.Item.documentClass = Objets.ItemRdD;

	// Mémorise les paramètres du système de jeu
  
	// Référence les classes applicative des différentes feuilles
	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("RdD", RdDFPJ.RdDFeuillePJ, { types: ["pj"], makeDefault: true });
	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("RdD", RdDFeuilleCptc, { types: ["compétence"], makeDefault: true});
	Items.registerSheet("RdD", RdDFeuilleÉqpmt, { types: ["équipement"], makeDefault: true});

	// Définit les utilitaires d'affichage
	/**
	 * Remplace dans le premier paramètre la chaîne de caractères "&&&" par les paramètres successifs suivants
	 * pour la restituer à un autre Helper de Handlebars
	 * @param {String} expression La chaîne de caractère dans laquelle il faut insérer un ou des éléments
	 * @param {Array} listeÉléments Liste des éléments à insérer en remplacement de la chaîne de caractère "&&&"
	 */
	Handlebars.registerHelper('RdDRemplaceExpression', function (expression, ...listeÉléments) {
		for (let index = 0; index < listeÉléments.length - 1; index++) {
			expression = expression.replace("&&&", listeÉléments[index]);
		}
		return expression;
	});
	
	/**
	 * Mise en forme des nombres
	 * @param {Number} valeur La variable contenant le nombre à afficher
	 * @param {} options Liste des options d'affichage :
	 *                   signe=true : il faut afficher le signe
	 *                   décimales=x : nombre de décimales à afficher
	 */
	Handlebars.registerHelper('RdDNumFormat', function (valeur, options) {

		// Récupération et mise en forme des paramètres
		let déc = (options.hash['décimales'] !== undefined) ? options.hash['décimales'] : 0,
			signe = options.hash['signe'] || false;
	
		// Chiffres après la virgule
		valeur = parseFloat(valeur).toFixed(déc);
	
		// Afficher le signe
		if (signe) {
			return ( valeur > 0 ) ? "+"+valeur : valeur;
		} else {
			return valeur;
		}
	});
	
	/**
	 * Inversion d'un booléen
	 * @param {Boolean} valeur La variable contenant le booléen à inverser
	 */
	Handlebars.registerHelper('RdDNot', function (valeur) {
		
		return !valeur;
	});

	/**
	 * Renvoie le libellé correspondant à une valeur à partir d'une Map
	 * @param {Map} map Liste des valeurs possibles et des références des libellés correspondants
	 * @param {} valeur Valeur correspondant au libellé à afficher
	 */
	Handlebars.registerHelper('RdDValeurLibellé', function (map, valeur) {
		const listeLibellés = eval(map);
		const libellé = game.i18n.localize(listeLibellés.get(valeur));
		return new Handlebars.SafeString(libellé);
	});

	/**
	 * Génère les options d'une liste déroulante à partir d'une Map et précise l'option sélectionnée
	 * @param {Map} map Liste des valeurs possibles et des références des libellés correspondants
	 * @param {} valeur Valeur actuellement sélectionnée pour la variable affichée
	 */
	Handlebars.registerHelper('RdDSelect', function (map, valeur) {
		let options = "";
		let lexique = eval(map);
		for (const [clef, libellé] of lexique) {
			let sélectionné = "";
			if (clef == valeur) {
				sélectionné = " selected";
			}
			options += `<option value="${clef}"${sélectionné}>${game.i18n.localize(libellé)}</option>
			`;
		}
		return new Handlebars.SafeString(options);
	});

	/**
	 * Détermine si la compétence affichée peut être dupliquée ou supprimée
	 * @param {Map} tableau Liste des compétences de la catégorie en cours
	 * @param {} indice Indice de la compétence à afficher
	 */
	Handlebars.registerHelper('RdDPlusMoins', function (plusMoins) {
		let action = "";
		switch (plusMoins) {
			case "+":
				action = `<a class="cptc-ajout"><i class="fas fa-plus-square"></i></a>`;
				break;
			case "-":
				action = `<a class="cptc-suppr"><i class="fas fa-minus-square"></i></a>`;
				break;
			default:
				break;
		}
		return new Handlebars.SafeString(action);
	});

	// Précharge les partials Handlebars utilisés
	préchargePartialsHandlebars();
});

/* ------------------------------------ */
/* Setup system							*/
/* ------------------------------------ */
// Hooks.once('setup', function () {
// 	// Do anything after initialization but before
// 	// ready
// });
/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
// Hooks.once('ready', function () {
// 	// Do anything once the system is ready
// });

Hooks.on('dropActorSheetData', (actor, sheet, data) => RdDHooks.onDropActorSheetData(actor, sheet, data));

/* ------------------------------------ */
/* À la création des acteurs					*/
/* ------------------------------------ */
// Hooks.on('preCreateActor', (createData, options, userId) => {
// 	console.log(`RdD | preCreateActor ${createData.type} -- ${options} -- ${userId}`);
// 	return true;
// });

/* ------------------------------------ */
/* À la création des objets					*/
/* ------------------------------------ */
// Hooks.on('preCreateItem', (createData, options, userId) => {
// 	return true;
// });