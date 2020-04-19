/**
 * Complète la classe de base Actor avec les mécanismes spécifiques à RdD.
 * @class
 */
export class ActorRdD extends Actor {
	constructor(...args) {
        super(...args);
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

    /* ================================================== */
    /* Calcul des données dérivées */
    /* ================================================== */

}