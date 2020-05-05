/**
 * Complète la classe de base Actor avec les mécanismes spécifiques à RdD.
 * @class
 */
export class ActorRdD extends Actor {
	constructor(...args) {
        super(...args);
    }

    /* ================================================== */
    /* ************************************************** */
    /* ================================================== */
    /* Redéfinition des méthodes de Actor                 */
    /* ================================================== */
    /* ************************************************** */
    /* ================================================== */

    /**
     * initialize - Débogage
     *
     * @memberof ActorRdD
     */
    initialize() {
        console.log(`RdD | ActorRdD.initialize`);
        super.initialize();
    }

    /**
     * Mise à jour des données dérivées de l'acteur
     *
     * @memberof ActorRdD
     */
    prepareData() {
        console.log(`RdD | ActorRdD.prepareData`);
        super.prepareData();
        const acteur = this.data;
        const data = acteur.data;

        console.log(`RdD | ActorRdD.prepareData ` + acteur.type);
		      
        switch (acteur.type) {
            case "pj":
                this._calcCaracsDérivées();
                this._calcSeuils();
                this._calcCptr();
                break;
        
            default:
                break;
        }
    }

    /**
     * create - Débogage
     *
     * @memberof ActorRdD
     */
    static async create(data, options={}) {
        console.log(`RdD | ActorRdD.create`);
        super.create(data, options);
    }

    /**
     * update - Débogage
     *
     * @memberof ActorRdD
     */
    async update(data, options = {}) {
        console.log(`RdD | ActorRdD.update`);
        super.update(data, options);
    }

    /**
     * delete - Débogage
     *
     * @memberof ActorRdD
     */
    async delete(options) {
        console.log(`RdD | ActorRdD.delete`);
        super.delete(options);
    }
    
    /* ================================================== */
    /* Calcul des données dérivées */
    /* ================================================== */

	/**
	 * Mise à jour des caractéristiques dérivées
	 *
	 * @memberof ActorRdD
	 * @private
	 */
	_calcCaracsDérivées () {
        const data = this.data.data;
        console.log(`RdD | ActorRdD._calcCaracsDérivées`);
        let agilité   = parseInt(data.caracs.agilité.value);
        let force     = parseInt(data.caracs.force.value);
        let vue       = parseInt(data.caracs.vue.value);
        let dextérité = parseInt(data.caracs.dextérité.value);
        let taille    = parseInt(data.caracs.taille.value);
        
		data.caracsDériv.mêlée.value = Math.floor((agilité + force) / 2);
		data.caracsDériv.tir.value = Math.floor((vue + dextérité) / 2);
		data.caracsDériv.lancer.value = Math.floor((data.caracsDériv.tir.value + force) / 2);
		data.caracsDériv.dérobée.value = Math.floor(((21 - taille) + agilité) / 2);
    }

	/**
	 * Mise à jour des seuils
	 *
	 * @memberof ActorRdD
	 * @private
	 */
	_calcSeuils () {
        const data = this.data.data;
        console.log(`RdD | ActorRdD._calcSeuils`);

        // Seuil de constitution
        let constitution = parseInt(data.caracs.constitution.value);
		if (constitution < 9) {
            data.seuils.sc.value = 2;			
		} else if (constitution < 12) {
            data.seuils.sc.value = 3;			
		} else if (constitution < 15) {
            data.seuils.sc.value = 4;			
		} else {
            data.seuils.sc.value = 5;			
		}
		
		// Seuil de sustentiation
        let taille = parseInt(data.caracs.taille.value);
		if (taille < 10) {
            data.seuils.sust.value = 2;			
		} else if (taille < 14) {
            data.seuils.sust.value = 3;			
		} else {
            data.seuils.sust.value = 4;			
		}
        
		// +dom
        let force = parseInt(data.caracs.force.value);
		let référence = Math.floor((taille + force) / 2);
		if (référence < 8) {
			data.seuils.plusDom.value = -1;			
		} else if (référence < 12) {
			data.seuils.plusDom.value = 0;			
		} else if (référence < 14) {
			data.seuils.plusDom.value = 1;			
		} else {
			data.seuils.plusDom.value = 2;			
		}

		// Seuil d'encombrement
        data.seuils.encombrement.value = (taille + force) / 2;
        
        // ===RàF=== La protection dépend de l'équipement (armure portée)
	}

	/**
	 * Mise à jour des compteurs généraux
	 *
	 * @memberof ActorRdD
	 * @private
	 */
	_calcCptr () {
        const data = this.data.data;
        console.log(`RdD | ActorRdD._calcCptr`);

        let taille = parseInt(data.caracs.taille.value);
        let constitution = parseInt(data.caracs.constitution.value);
        let volonté = parseInt(data.caracs.volonté.value);

        // Points de vie maximum
        data.cptr.vie.max = Math.ceil((taille + constitution) / 2);
        
        // Endurance maximum
        data.cptr.endurance.max = Math.max((taille + constitution), (data.cptr.vie.max + volonté));

        // Fatigue
        // ===RàF=== Mettre en constante globale pour ne pas redéfinir à chaque passage
        const répartitionFatigue = new Map([
            [16, [2, 3, 3, 2, 3, 3]],
            [17, [2, 3, 3, 3, 3, 3]],
            [18, [3, 3, 3, 3, 3, 3]],
            [19, [3, 3, 3, 3, 3, 4]],
            [20, [3, 3, 4, 3, 3, 4]],
            [21, [3, 3, 4, 3, 4, 4]],
            [22, [3, 4, 4, 3, 4, 4]],
            [23, [3, 4, 4, 4, 4, 4]],
            [24, [4, 4, 4, 4, 4, 4]],
            [25, [4, 4, 4, 4, 4, 5]],
            [26, [4, 4, 5, 4, 4, 5]],
            [27, [4, 4, 5, 4, 5, 5]],
            [28, [4, 5, 5, 4, 5, 5]],
            [29, [4, 5, 5, 5, 5, 5]],
            [30, [5, 5, 5, 5, 5, 5]],
        ]);
        let segmentsFatigue = répartitionFatigue.get(data.cptr.endurance.max);
        let élt = 0;
        for (let niveau = 0; niveau < 8; niveau++) {
            switch (niveau) {
                case 0:
                    for (let segment = 0; segment < 3; segment++) {
                        eval("data.cptr.fatigue.niveaux.élt_0.segments.élt_" + segment.toString() + ".max = segmentsFatigue[" + élt.toString() + "]");
                        élt++;
                    }
                    break;
                case 1:
                    for (let segment = 0; segment < 3; segment++) {
                        eval("data.cptr.fatigue.niveaux.élt_1.segments.élt_" + segment.toString() + ".max = segmentsFatigue[" + élt.toString() + "]");
                        élt++;
                    }
                    élt = 0;
                    break;
                default:
                    eval("data.cptr.fatigue.niveaux.élt_" + niveau.toString() + ".segments.élt_0.max = segmentsFatigue[" + élt.toString() + "]");
                    élt++;
                    break;
            }
        }
    }
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
    static ctrlPrésence (valeur){
        console.log(`RdD | ActorRdD.ctrlPrésence : ` + valeur);
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
    static ctrlNuméricité (valeur){
        console.log(`RdD | ActorRdD.ctrlNuméricité : ` + typeof(valeur));
        if (isNaN(valeur)) {
            // Une erreur trouvée
            return true;
        }
        // Pas d'erreur trouvée
        return false;
    }

    /**
     * Contrôle les contraintes sur la valeur d'une caractéristique
     *
     * @static
     * @param {*} valeur Valeur à contrôler
     * @returns {String} Message d'erreur
     * @memberof ActorRdD
     */
    static ctrlCarac (valeur){
        console.log(`RdD | ActorRdD.ctrlCarac : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.caracVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.caracInvalide");
        }
        if (!Number.isInteger(nombre) || nombre <= 0) {
            return game.i18n.localize("RdD.erreurs.caracInvalide");
        }
        // ===RàF=== En attente des cas particuliers : "création de perso"/"perso en activité", race

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la propriété est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlHeureNaissance (valeur){
        console.log(`RdD | ActorRdD.ctrlHeureNaissance : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.hnVide");
        }
        // ===RàF=== En attente d'unn mode de saisie permettant de renvoyer le numéro de l'heure
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la propriété est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlSexe (valeur){
        console.log(`RdD | ActorRdD.ctrlSexe : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.sexeVide");
        }
        if (valeur.length != 1 || !/m|f/i.test(valeur)) {
            return game.i18n.localize("RdD.erreurs.sexeValeurs");
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la propriété est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlÂge (valeur){
        console.log(`RdD | ActorRdD.ctrlÂge : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.âgeVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.âgeInvalide");
        }
        if (!Number.isInteger(nombre) || nombre <= 0) {
            return game.i18n.localize("RdD.erreurs.âgeInvalide");
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la propriété est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlSPTaille (valeur){
        console.log(`RdD | ActorRdD.ctrlSPTaille : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.tailleVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.tailleInvalide");
        }
        if (nombre <= 0) {
            return game.i18n.localize("RdD.erreurs.tailleInvalide");
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la propriété est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlPoids (valeur){
        console.log(`RdD | ActorRdD.ctrlPoids : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.poidsVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.poidsInvalide");
        }
        if (nombre <= 0) {
            return game.i18n.localize("RdD.erreurs.poidsInvalide");
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la propriété est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlBeauté (valeur){
        console.log(`RdD | ActorRdD.ctrlBeauté : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.signesPart.beauté") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la propriété est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlLatéralité (valeur){
        console.log(`RdD | ActorRdD.ctrlLatéralité : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.latéralitéVide");
        }
        // ===RàF=== En attente d'unn mode de saisie permettant de limiter le choix
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlTaille (valeur){
        console.log(`RdD | ActorRdD.ctrlTaille : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.taille") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlApparence (valeur){
        console.log(`RdD | ActorRdD.ctrlApparence : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.apparence") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlConstitution (valeur){
        console.log(`RdD | ActorRdD.ctrlConstitution : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.constitution") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlForce (valeur){
        console.log(`RdD | ActorRdD.ctrlForce : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.force") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlAgilité (valeur){
        console.log(`RdD | ActorRdD.ctrlAgilité : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.agilité") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlDextérité (valeur){
        console.log(`RdD | ActorRdD.ctrlDextérité : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.dextérité") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlVue (valeur){
        console.log(`RdD | ActorRdD.ctrlVue : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.vue") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlOuïe (valeur){
        console.log(`RdD | ActorRdD.ctrlOuïe : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.ouïe") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlOdorat_goût (valeur){
        console.log(`RdD | ActorRdD.ctrlOdorat_goût : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.odorat_goût") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlVolonté (valeur){
        console.log(`RdD | ActorRdD.ctrlVolonté : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.volonté") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlIntellect (valeur){
        console.log(`RdD | ActorRdD.ctrlIntellect : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.intellect") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlEmpathie (valeur){
        console.log(`RdD | ActorRdD.ctrlEmpathie : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.empathie") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlRêve (valeur){
        console.log(`RdD | ActorRdD.ctrlRêve : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.rêve") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la caractéristique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlChance (valeur){
        console.log(`RdD | ActorRdD.ctrlChance : ` + valeur);
        let erreur = this.ctrlCarac(valeur);
        if (erreur != "") {
            return game.i18n.localize("RdD.actor.caracs.chance") + " : " + erreur;
        }
        return "";
    }

    /**
     * Contrôle les contraintes sur les xp d'une caractéristique
     *
     * @static
     * @param {*} valeur Valeur à contrôler
     * @returns {String} Message d'erreur
     * @memberof ActorRdD
     */
    static ctrlXp (valeur){
        console.log(`RdD | ActorRdD.ctrlXp : ` + valeur);
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

    /**
     * Contrôle les contraintes sur les points de sort acquis
     *
     * @static
     * @param {*} valeur Valeur à contrôler
     * @returns {String} Message d'erreur
     * @memberof ActorRdD
     */
    static ctrlPtSort (valeur){
        console.log(`RdD | ActorRdD.ctrlPtSort : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return "";
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.ptSortInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < 0) {
            return game.i18n.localize("RdD.erreurs.ptSortInvalide");
        }

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la compétence générale est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlCptcGnrl (valeur){
        console.log(`RdD | ActorRdD.ctrlCptcGnrl : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.cptcVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.cptcGnlInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < -4) {
            return game.i18n.localize("RdD.erreurs.cptcGnlInvalide");
        }

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la compétence de mêlée est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlCptcMl (valeur){
        console.log(`RdD | ActorRdD.ctrlCptcMl : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.cptcVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.cptcMlInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < -6) {
            return game.i18n.localize("RdD.erreurs.cptcMlInvalide");
        }

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la compétence de tir et lancer est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlCptcTL (valeur){
        console.log(`RdD | ActorRdD.ctrlCptcTL : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.cptcVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.cptcTLInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < -8) {
            return game.i18n.localize("RdD.erreurs.cptcTLInvalide");
        }

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la compétence particulière est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlCptcPart (valeur){
        console.log(`RdD | ActorRdD.ctrlCptcPart : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.cptcVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.cptcPartInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < -8) {
            return game.i18n.localize("RdD.erreurs.cptcPartInvalide");
        }

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la compétence spécialisée est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlCptcSpé (valeur){
        console.log(`RdD | ActorRdD.ctrlCptcSpé : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.cptcVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.cptcSpéInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < -11) {
            return game.i18n.localize("RdD.erreurs.cptcSpéInvalide");
        }

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la connaissance est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlCptcCnsc (valeur){
        console.log(`RdD | ActorRdD.ctrlCptcCnsc : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.cptcVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.cptcCnscInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < -11) {
            return game.i18n.localize("RdD.erreurs.cptcCnscInvalide");
        }

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la compétence draconique est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlCptcDrac (valeur){
        console.log(`RdD | ActorRdD.ctrlCptcDrac : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.cptcVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.cptcDracInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < -11) {
            return game.i18n.localize("RdD.erreurs.cptcDracInvalide");
        }

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour les points de vie est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlVie (valeur){
        // ===RàF=== Passer object.data.data depuis feuille-pj.js
        //const data = this.data.data;
        console.log(`RdD | ActorRdD.ctrlVie : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.vieVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.vieInvalide");
        }
        //if (!Number.isInteger(nombre) || nombre < -data.seuils.sc.value || nombre > data.cptr.vie.max) {
        if (!Number.isInteger(nombre)) {
            return game.i18n.localize("RdD.erreurs.vieInvalide");
        }

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour les points d'endurance est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlEndurance (valeur){
        // ===RàF=== Passer object.data.data depuis feuille-pj.js
        //const data = this.data.data;
        console.log(`RdD | ActorRdD.ctrlEndurance : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.enduranceVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.enduranceInvalide");
        }
        //if (!Number.isInteger(nombre) || nombre < 0 || nombre > data.cptr.endurance.max) {
        if (!Number.isInteger(nombre) || nombre < 0) {
            return game.i18n.localize("RdD.erreurs.enduranceInvalide");
        }

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour les points de fatigue est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlFatigue (valeur){
        // ===RàF=== Passer object.data.data depuis feuille-pj.js
        //const data = this.data.data;
        console.log(`RdD | ActorRdD.ctrlFatigue : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.fatigueVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.fatigueInvalide");
        }
        // ===RàF=== Comparer au max du segment
        if (!Number.isInteger(nombre) || nombre < 0) {
            return game.i18n.localize("RdD.erreurs.fatigueInvalide");
        }

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour les points de sustentation est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlSustentation (valeur){
        console.log(`RdD | ActorRdD.ctrlSustentation : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.sustentationVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.sustentationInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < 0) {
            return game.i18n.localize("RdD.erreurs.sustentationInvalide");
        }

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour le degré d'éthylisme est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlÉthylisme (valeur){
        console.log(`RdD | ActorRdD.ctrlÉthylisme : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.éthylismeVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.éthylismeInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < 0 || nombre > 7) {
            return game.i18n.localize("RdD.erreurs.éthylismeInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour le seuil de rêve est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlSeuilHR (valeur){
        console.log(`RdD | ActorRdD.ctrlSeuilHR : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.seuilHRVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.seuilHRInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < 0) {
            return game.i18n.localize("RdD.erreurs.seuilHRInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour les points de rêve est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlPtRêve (valeur){
        console.log(`RdD | ActorRdD.ctrlPtRêve : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.ptRêveVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.ptRêveInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < 0) {
            return game.i18n.localize("RdD.erreurs.ptRêveInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la colonne des TMR est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlTMRCol (valeur){
        console.log(`RdD | ActorRdD.ctrlTMRCol : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.colTMRVide");
        }
        if (valeur.length != 1 || !/[a-m]/i.test(valeur)) {
            return game.i18n.localize("RdD.erreurs.colTMRInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la ligne des TMR est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlTMRLig (valeur){
        console.log(`RdD | ActorRdD.ctrlTMRLig : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.ligTMRVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.ligTMRInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < 1 || nombre > 15) {
            return game.i18n.localize("RdD.erreurs.ligTMRInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour les points de refoulement est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlRefoulement (valeur){
        console.log(`RdD | ActorRdD.ctrlRefoulement : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.refoulementVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.refoulementInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < 0) {
            return game.i18n.localize("RdD.erreurs.refoulementInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour les points de chance est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlPtChance (valeur){
        // ===RàF=== Passer object.data.data depuis feuille-pj.js
        //const data = this.data.data;
        console.log(`RdD | ActorRdD.ctrlPtChance : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.ptChanceVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.ptChanceInvalide");
        }
        //if (!Number.isInteger(nombre) || nombre < 0 || nombre > data.caracs.chance.value) {
        if (!Number.isInteger(nombre) || nombre < 0) {
            return game.i18n.localize("RdD.erreurs.ptChanceInvalide");
        }

        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour le niveau de moral est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlMoral (valeur){
        console.log(`RdD | ActorRdD.ctrlMoral : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.moralVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.moralInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < -3 || nombre > 3) {
            return game.i18n.localize("RdD.erreurs.moralInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour les points d'exaltation/dissolution est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlExaltDissol (valeur){
        console.log(`RdD | ActorRdD.ctrlExaltDissol : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.exaltDissolVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.exaltDissolInvalide");
        }
        if (!Number.isInteger(nombre)) {
            return game.i18n.localize("RdD.erreurs.exaltDissolInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour les points de cœur est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlCœur (valeur){
        console.log(`RdD | ActorRdD.ctrlCœur : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.cœurVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.cœurInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < 0 || nombre > 4) {
            return game.i18n.localize("RdD.erreurs.cœurInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour les points de destinée est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlPtDestinée (valeur){
        console.log(`RdD | ActorRdD.ctrlPtDestinée : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.ptDestinéeVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.ptDestinéeInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < 0 || nombre > 7) {
            return game.i18n.localize("RdD.erreurs.ptDestinéeInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour les points de voyage est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlPtVoyage (valeur){
        console.log(`RdD | ActorRdD.ctrlPtVoyage : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.ptVoyageVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.ptVoyageInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < 0) {
            return game.i18n.localize("RdD.erreurs.ptVoyageInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour les points de stress est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlStress (valeur){
        console.log(`RdD | ActorRdD.ctrlStress : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.stressVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.stressInvalide");
        }
        if (!Number.isInteger(nombre) || nombre < 0) {
            return game.i18n.localize("RdD.erreurs.stressInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour les points d'encombrement est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlEncombrement (valeur){
        console.log(`RdD | ActorRdD.ctrlEncombrement : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.encombrementVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.encombrementInvalide");
        }
        if (nombre < 0) {
            return game.i18n.localize("RdD.erreurs.encombrementInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour le montant de l'argent est valide
     *
     * @static
     * @param {*} valeur
     * @memberof ActorRdD
     */
    static ctrlArgent (valeur){
        console.log(`RdD | ActorRdD.ctrlArgent : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.argentVide");
        }
        let nombre = Number(valeur);
        if (this.ctrlNuméricité(nombre)) {
            return game.i18n.localize("RdD.erreurs.argentInvalide");
        }
        if (nombre < 0) {
            return game.i18n.localize("RdD.erreurs.argentInvalide");
        }
        
        // Pas d'erreur trouvée
        return "";
    }
}