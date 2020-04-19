 /*
 * Importation des modules
 */
import * as Acteurs from "./actorRdD.js";

/**
 * Complète la classe de base Actor avec les mécanismes spécifiques à RdD.
 * @class
 * @exports
 */
export class RdDPJ extends Acteurs.ActorRdD {
	constructor(...args) {
        super(...args);
    }

    /* ================================================== */
    /* Contrôles de données */
    /* ================================================== */

    /**
     * Contrôle que la valeur fournie pour la propriété est valide
     *
     * @static
     * @param {*} valeur
     * @memberof RdDPJ
     */
    static ctrlHeureNaissance (valeur){
        console.log(`RdD | RdDPJ.ctrlHeureNaissance : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlSexe (valeur){
        console.log(`RdD | RdDPJ.ctrlSexe : ` + valeur);
        if (this.ctrlPrésence(valeur)) {
            return game.i18n.localize("RdD.erreurs.sexeVide");
        }
        if (!/m|f/i.test(valeur)) {
            return game.i18n.localize("RdD.erreurs.sexeValeurs");
        }
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la propriété est valide
     *
     * @static
     * @param {*} valeur
     * @memberof RdDPJ
     */
    static ctrlÂge (valeur){
        console.log(`RdD | RdDPJ.ctrlÂge : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlSPTaille (valeur){
        console.log(`RdD | RdDPJ.ctrlSPTaille : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlPoids (valeur){
        console.log(`RdD | RdDPJ.ctrlPoids : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlBeauté (valeur){
        console.log(`RdD | RdDPJ.ctrlBeauté : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlLatéralité (valeur){
        console.log(`RdD | RdDPJ.ctrlLatéralité : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlTaille (valeur){
        console.log(`RdD | RdDPJ.ctrlTaille : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlApparence (valeur){
        console.log(`RdD | RdDPJ.ctrlApparence : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlConstitution (valeur){
        console.log(`RdD | RdDPJ.ctrlConstitution : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlForce (valeur){
        console.log(`RdD | RdDPJ.ctrlForce : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlAgilité (valeur){
        console.log(`RdD | RdDPJ.ctrlAgilité : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlDextérité (valeur){
        console.log(`RdD | RdDPJ.ctrlDextérité : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlVue (valeur){
        console.log(`RdD | RdDPJ.ctrlVue : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlOuïe (valeur){
        console.log(`RdD | RdDPJ.ctrlOuïe : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlOdorat_goût (valeur){
        console.log(`RdD | RdDPJ.ctrlOdorat_goût : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlVolonté (valeur){
        console.log(`RdD | RdDPJ.ctrlVolonté : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlIntellect (valeur){
        console.log(`RdD | RdDPJ.ctrlIntellect : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlEmpathie (valeur){
        console.log(`RdD | RdDPJ.ctrlEmpathie : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlRêve (valeur){
        console.log(`RdD | RdDPJ.ctrlRêve : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlChance (valeur){
        console.log(`RdD | RdDPJ.ctrlChance : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlXp (valeur){
        console.log(`RdD | RdDPJ.ctrlXp : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlPtSort (valeur){
        console.log(`RdD | RdDPJ.ctrlPtSort : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlCptcGnrl (valeur){
        console.log(`RdD | RdDPJ.ctrlCptcGnrl : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlCptcMl (valeur){
        console.log(`RdD | RdDPJ.ctrlCptcMl : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlCptcTL (valeur){
        console.log(`RdD | RdDPJ.ctrlCptcTL : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlCptcPart (valeur){
        console.log(`RdD | RdDPJ.ctrlCptcPart : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlCptcSpé (valeur){
        console.log(`RdD | RdDPJ.ctrlCptcSpé : ` + valeur);
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
     * @memberof RdDPJ
     */
    static ctrlCptcCnsc (valeur){
        console.log(`RdD | RdDPJ.ctrlCptcCnsc : ` + valeur);
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
     * @memberof RdDPJ
     */
    static cptcDrac (valeur){
        console.log(`RdD | RdDPJ.cptcDrac : ` + valeur);
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

    /* ================================================== */
    /* Calcul des données dérivées */
    /* ================================================== */

    /**
     * Mise à jour des données dérivées du PJ
     *
     * @memberof RdDPJ
     */
    prepareData() {
        console.log(`RdD | RdDPJ.prepareData`);
        super.prepareData();
    }
}