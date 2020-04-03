/**
 * Prise en charge des règles de Rêve de Dragon, 2de édition
 */

/**
 * Importation des modules
 */
import * as RdDFPJ from "./interfaces/feuille-pj.js";
import * as RdDFObjet from "./interfaces/feuille-objet.js";

/* -------------------------------------------- */
/* Initialisations                              */
/* -------------------------------------------- */

Hooks.once("init", async function() {
	console.log(`RdD | Initialisation du système Rêve de Dragon`);
	// Mémorise la configuration

	// Mémorise les paramètres du système de jeu
  
	// Référence les classes applicative des différentes feuilles
	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("RdD", RdDFPJ.RdDFeuillePJ, { types: ["pj"], makeDefault: true });
	/*
	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("RdD", RdDFObjet.RdDFeuilleObjet, { types: ["équipement"], makeDefault: true});
	*/
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