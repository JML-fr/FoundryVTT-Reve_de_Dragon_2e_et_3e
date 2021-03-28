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
	static argentSD (montant){
		console.log(`RdD | RdDIntrfc.argentSD : ` + montant);
		if (isNaN(montant)) {
			montant = 0;
		}
		const sols = Math.floor(montant);
		const deniers = Math.round((montant - sols) * 100);
		
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
	static sdArgent (sols, deniers){
		console.log(`RdD | RdDIntrfc.sdArgent : ${sols} ${deniers}`);
		if (isNaN(sols)) {
			sols = 0;
		}
		if (isNaN(deniers)) {
			deniers = 0;
		}
		
		return Math.floor(sols) + (Math.floor(deniers) / 100);
	}
	
	/**
	 * Traduit une somme exprimée en pièces en un montant décimal
	 *
	 * @static
	 * @param {number} or
	 * @param {number} argent
	 * @param {number} bronze
	 * @param {number} étain
	 * @returns {number} montant
	 * @memberof RdDIntrfc
	 */
	static piècesArgent (or, argent, bronze, étain){
		console.log(`RdD | RdDIntrfc.piècesArgent : ${or} ${argent} ${bronze} ${étain}`);
		if (isNaN(or)) {
			or = 0;
		}
		if (isNaN(argent)) {
			argent = 0;
		}
		if (isNaN(bronze)) {
			bronze = 0;
		}
		if (isNaN(étain)) {
			étain = 0;
		}
		
		return  (Math.floor(or) * 10) + Math.floor(argent) + (Math.floor(bronze) / 10) + (Math.floor(étain) / 100);
	}
	
	/**
	 * Traduit un montant en pièces en sols et deniers
	 *
	 * @static
	 * @param {number} or
	 * @param {number} argent
	 * @param {number} bronze
	 * @param {number} étain
	 * @returns {object} sols, deniers
	 * @memberof RdDIntrfc
	 */
	static piècesSD (or, argent, bronze, étain){
		console.log(`RdD | RdDIntrfc.piècesSD : ${or} ${argent} ${bronze} ${étain}`);
		if (isNaN(or)) {
			or = 0;
		}
		if (isNaN(argent)) {
			argent = 0;
		}
		if (isNaN(bronze)) {
			bronze = 0;
		}
		if (isNaN(étain)) {
			étain = 0;
		}
		let sols = Math.floor(or * 10 + argent);
		let deniers = Math.floor(bronze * 10 + étain);
		let excédent = Math.floor(deniers / 100) * 100;
		deniers -= excédent;
		sols += (excédent / 100);
		
		return {sols, deniers};
	}
	
	/**
	 * Traduit une somme exprimée en sols et deniers en un montant en pièces
	 *
	 * @static
	 * @param {number} sols
	 * @param {number} deniers
	 * @returns {number} or, argent, bronze, étain
	 * @memberof RdDIntrfc
	 */
	static sdPièces (sols, deniers){
		console.log(`RdD | RdDIntrfc.sdPièces : ${sols} ${deniers}`);
		if (isNaN(sols)) {
			sols = 0;
		}
		if (isNaN(deniers)) {
			deniers = 0;
		}

		const or = Math.floor(sols / 10);
		const argent = Math.floor(sols - or * 10);
		const bronze = Math.floor(deniers / 10);
		const étain = Math.floor(deniers - bronze * 10);

		return {or, argent, bronze, étain};
	}
}