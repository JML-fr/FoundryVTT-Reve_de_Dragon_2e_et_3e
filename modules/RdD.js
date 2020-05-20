/**
 * Prise en charge des règles de Rêve de Dragon, 2de édition
 */

/**
 * Importation des modules
 */
import {RdD} from "./utils/init.js";
import * as RdDTemplates from "./acteurs/actor-templates.js";
import * as Acteurs from "./acteurs/actor.js";
import * as RdDFPJ from "./interfaces/feuille-pj.js";
import * as RdDFObjet from "./interfaces/feuille-objet.js";

/* -------------------------------------------- */
/* Initialisations                              */
/* -------------------------------------------- */

Hooks.once("init", async function() {
	console.log(`RdD | Initialisation du système Rêve de Dragon`);
	// Mémorise la configuration
	CONFIG.Actor.entityClass = Acteurs.ActorRdD;

	// Mémorise les paramètres du système de jeu
  
	// Référence les classes applicative des différentes feuilles
	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("RdD", RdDFPJ.RdDFeuillePJ, { types: ["pj"], makeDefault: true });
	/*
	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("RdD", RdDFObjet.RdDFeuilleObjet, { types: ["équipement"], makeDefault: true});
	*/

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
	})
	
	/**
	 * Mise en forme des nombres
	 * @param {String} expression La chaîne de caractère dans laquelle il faut insérer un ou des éléments
	 * @param {Array} listeÉléments Liste des éléments à insérer en remplacement de la chaîne de caractère "&&&"
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
});

/* ------------------------------------ */
/* Setup system							*/
/* ------------------------------------ */
Hooks.once('setup', function () {
	// Do anything after initialization but before
	// ready
});
/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once('ready', function () {
	// Do anything once the system is ready
});
// Add any additional hooks if necessary