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
	static ctrlXp (valeur){
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
	
	/* ================================================== */
	/* Mises en forme de données */
	/* ================================================== */
	
	/**
	 * Traduit un montant décimal en sols et deniers
	 *
	 * @static
	 * @param {number} montant
	 * @returns {object} sols, deniers
	 * @memberof RdDIntrfc
	 */
	static mefArgent (montant){
		console.log(`RdD | RdDIntrfc.mefArgent : ` + montant);
		let sols = parseInt(montant);
		let deniers = parseInt((montant - sols) * 100);
		
		return {sols, deniers};
	}
	
	/**
	 * Traduit une somme exprimée en sols et deniers en un montant décimal
	 *
	 * @static
	 * @param {number} sols
	 * @param {number} deniers
	 * @returns {number} montant
	 * @memberof RdDIntrfc
	 */
	static calcArgent (sols, deniers){
		console.log(`RdD | RdDIntrfc.mefArgent : ${sols} ${deniers}`);

		return parseInt(sols) + (parseInt(deniers) / 100);
	}
}