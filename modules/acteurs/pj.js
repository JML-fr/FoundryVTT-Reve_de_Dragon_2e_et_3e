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

    /**
     * Contrôle que la valeur fournie pour la propriété est valide
     *
     * @static
     * @param {*} valeur
     * @memberof RdDPJ
     */
    static ctrlHeureNaissance (valeur){
        console.log(`RdD | RdDPJ.ctrlHeureNaissance : ` + valeur);
        // En attente d'unn mode de saisie permettant de renvoyer le numéro de l'heure
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
        console.log(`RdD | RdDPJ.ctrlÂge : `+valeur);
        return "";
    }

    /**
     * Contrôle que la valeur fournie pour la propriété est valide
     *
     * @static
     * @param {*} valeur
     * @memberof RdDPJ
     */
    static ctrlTaille (valeur){
        console.log(`RdD | RdDPJ.ctrlTaille : `+valeur);
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
        console.log(`RdD | RdDPJ.ctrlPoids : `+valeur);
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
        console.log(`RdD | RdDPJ.ctrlBeauté : `+valeur);
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
        console.log(`RdD | RdDPJ.ctrlLatéralité : `+valeur);
        return "";
    }
}