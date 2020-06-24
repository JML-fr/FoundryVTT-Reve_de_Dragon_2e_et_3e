	/* ================================================== */
	/* Contrôles de données */
	/* ================================================== */

	/**
	 * Contrôle de la présence d'une valeur
	 *
	 * @static
	 * @param {*} valeur Valeur à contrôler
	 * @returns {Boolean} true: erreur trouvée, false: pas d'erreur
	 * @memberof ActorRdD
	 */
	export function ctrlPrésence (valeur){
		console.log(`RdD | ctrlPrésence : ` + valeur);
		if (valeur == null || valeur == "") {
			// Une erreur trouvée
			return true;
		}
		// Pas d'erreur trouvée
		return false;
	}

	/**
	 * Contrôle la numéricité d'une valeur
	 *
	 * @static
	 * @param {*} valeur Valeur à contrôler
	 * @returns {Boolean} true: erreur trouvée, false: pas d'erreur
	 * @memberof ActorRdD
	 */
	export function ctrlNuméricité (valeur){
		console.log(`RdD | ctrlNuméricité : ` + typeof(valeur));
		if (isNaN(valeur)) {
			// Une erreur trouvée
			return true;
		}
		// Pas d'erreur trouvée
		return false;
	}
