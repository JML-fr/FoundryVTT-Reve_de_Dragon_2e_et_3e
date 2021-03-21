/**
 * Charge à l'avance les partials utilisés :
 *   ils sont compilés et mis en cache pour un accès rapide en affichage
 * @return {Promise}
 */
 export const préchargePartialsHandlebars = async function() {

	// Liste de templates à charger
	const templatePaths = [
	  "systems/RdD/templates/partials/carac-saisie.html",
	  "systems/RdD/templates/partials/cptc-ligne.html"
	];
  
	// Charge les partials
	return loadTemplates(templatePaths);
  };