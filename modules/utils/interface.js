export class RdDIntrfc {
	/* ================================================== */
	/* Contrôles de données */
	/* ================================================== */

	/**
	 * Contrôle de la présence d'une valeur
	 *
	 * @static
	 * @param {*} valeur Valeur à contrôler
	 * @returns {Boolean} true: erreur trouvée, false: pas d'erreur
	 * @memberof RdDIntrfc
	 */
	static ctrlPrésence (valeur){
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
	 * @memberof RdDIntrfc
	 */
	static ctrlNuméricité (valeur){
		console.log(`RdD | ctrlNuméricité : ` + typeof(valeur));
		if (isNaN(valeur)) {
			// Une erreur trouvée
			return true;
		}
		// Pas d'erreur trouvée
		return false;
	}

	/**
	 * Contrôle les contraintes sur les xp d'une caractéristique
	 *
	 * @static
	 * @param {*} valeur Valeur à contrôler
	 * @returns {String} Message d'erreur
	 * @memberof RdDIntrfc
	 */
	static  ctrlXp (valeur){
		console.log(`RdD | RdDIntrfc.ctrlXp : ` + valeur);
		if (this.ctrlPrésence(valeur)) {
			return "";
		}
		let nombre = Number(valeur);
		if (this.ctrlNuméricité(nombre)) {
			return game.i18n.localize("RdD.erreurs.xpInvalide");
		}
		if (!Number.isInteger(nombre) || nombre < 0) {
			return game.i18n.localize("RdD.erreurs.xpInvalide");
		}

		// Pas d'erreur trouvée
		return "";
	}
}