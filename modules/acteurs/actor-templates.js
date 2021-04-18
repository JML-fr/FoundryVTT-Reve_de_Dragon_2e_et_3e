import {RdDIntrfc} from "../utils/interface.js";

/**
 * Gère les compteurs d'un acteur
 *
 * @export
 * @class CompteursRdD
 */
export class CompteursRdD {
	constructor(seuilHR = 10, valueHR = 10, refoulementHR = 0, colonneHR = "A", ligneHR = 1, queuesEtSoufflesHR = [],
	maxVie = 10, valueVie = 10,
	maxEnd = 10, valueEnd = 10,
	niveauActuelFat = 0, niveauxFat = [],
	blsrLégères = [], blsrGraves = [], blsrCritique = [],
	valueÉth = 0, dateAcqÉth = "", heureAcqÉth = "", dateProÉth = "", heureProÉth = "",
	répartitionAutoArgent = true, solsArgent = 0, deniersArgent = 0, orArgent = 0, argentArgent = 0, bronzeArgent = 0, étainArgent = 0) {
		this.hautRêve = {
			seuil: seuilHR,
			value: valueHR,
			refoulement: refoulementHR,
			demiRêve: {
				colonne: colonneHR,
				ligne: ligneHR
			},
			queuesEtSouffles: queuesEtSoufflesHR
		};

		this.vie = {
			max: maxVie,
			value: valueVie
		};

		this.endurance = {
			max: maxEnd,
			value: valueEnd
		};

		if (niveauxFat.length == 0) {
			const segment = {value: 0, max: 4};
			for (let i = 0; i < 8; i++) {
				let tablSeg = [];
				if (i < 2) {
					for (let j = 0; j < 3; j++) {
						tablSeg.push(segment);
					}
				} else {
					tablSeg.push(segment);
				}
				let niveau = {complet: false, segments: tablSeg};
				niveauxFat.push(niveau);
			}
		}
		this.fatigue = {
			niveauActuel: niveauActuelFat,
			niveaux: niveauxFat
		};

		const blessure = {
			blessé: false,
			premiersSoins: false,
			soinsComplets: false,
			ptTâcheRestants: 0,
			bonusMalus: 0,
			prochainTestDeGuérison: {
				date: "",
				heure: ""
			},
			notes: ""
		};
		if (blsrLégères.length == 0) {
			for (let i = 0; i < 5; i++) {
				blsrLégères.push(blessure);
			}			
		}
		if (blsrGraves.length == 0) {
			for (let i = 0; i < 2; i++) {
				blsrGraves.push(blessure);
			}			
		}
		if (blsrCritique.length == 0) {
			blsrCritique.push(blessure);
		}
		this.blessures = {
			légères: blsrLégères,
			graves: blsrGraves,
			critique: blsrCritique
		};
		this.éthylisme = {
			value: valueÉth,
			acquisitionFatigue: {
				date: dateAcqÉth,
				heure: heureAcqÉth
			},
			prochaineRécupération: {
				date: dateProÉth,
				heure: heureProÉth
			}
		};
		this.argent = {
			répartitionAuto: répartitionAutoArgent,
			sols: solsArgent,
			deniers: deniersArgent,
			or: orArgent,
			argent: argentArgent,
			bronze: bronzeArgent,
			étain: étainArgent
		};
	}

	/**
	 * Mise à jour d'un segment de fatigue
	 *
	 * @param {number} [niveau=0]
	 * @param {number} [segment=0]
	 * @param {number} [pvalue=0]
	 * @param {number} [pmax=0]
	 * @memberof CompteursRdD
	 */
	ftgMàjSegmt(niveau = 0, segment = 0, pvalue = 0, pmax = 0) {
		let niveauTemp = this.fatigue.niveaux[niveau];
		const psegment = {value: pvalue, max: pmax};
		niveauTemp.segments[segment] = psegment;
		this.fatigue.niveaux[niveau] = niveauTemp;
		// ===RàF=== Reporter l'état réel du niveau
		this.fatigue.niveaux[niveau].complet = false;
		// ===RàF=== Reporter le niveau de fatigue réel
		this.fatigue.niveauActuel = 0;
	}

	/**
	 * Mise à jour d'une blessure
	 *
	 * @param {string} [type=""]
	 * @param {number} [indice=0]
	 * @param {boolean} [pblessé=false]
	 * @memberof CompteursRdD
	 */
	blsrMàJ(type = "", indice = 0, pblessé = false) {
		if (type.length == 0 || (type != "légère" && type != "grave" && type != "critique")) {
			return;
		}
		let blessureTemp = {};
		switch (type) {
			case "légère":
				blessureTemp = {
					blessé: pblessé,
					premiersSoins: this.blessures.légères[indice].premiersSoins,
					soinsComplets: this.blessures.légères[indice].soinsComplets,
					ptTâcheRestants: this.blessures.légères[indice].ptTâcheRestants,
					bonusMalus: this.blessures.légères[indice].bonusMalus,
					prochainTestDeGuérison: this.blessures.légères[indice].prochainTestDeGuérison,
					notes: this.blessures.légères[indice].notes
				};
				this.blessures.légères[indice] = blessureTemp;
				break;
			case "grave":
				blessureTemp = {
					blessé: pblessé,
					premiersSoins: this.blessures.graves[indice].premiersSoins,
					soinsComplets: this.blessures.graves[indice].soinsComplets,
					ptTâcheRestants: this.blessures.graves[indice].ptTâcheRestants,
					bonusMalus: this.blessures.graves[indice].bonusMalus,
					prochainTestDeGuérison: this.blessures.graves[indice].prochainTestDeGuérison,
					notes: this.blessures.graves[indice].notes
				};
				this.blessures.graves[indice] = blessureTemp;
				break;
			case "critique":
				blessureTemp = {
					blessé: pblessé,
					premiersSoins: this.blessures.critique[indice].premiersSoins,
					soinsComplets: this.blessures.critique[indice].soinsComplets,
					ptTâcheRestants: this.blessures.critique[indice].ptTâcheRestants,
					bonusMalus: this.blessures.critique[indice].bonusMalus,
					prochainTestDeGuérison: this.blessures.critique[indice].prochainTestDeGuérison,
					notes: this.blessures.critique[indice].notes
				};
				this.blessures.critique[indice] = blessureTemp;
				break;
			default:
				break;
		}
	}

	/**
	 * Mise à jour des montants décrivant l'argent possédé
	 *
	 * @param {boolean} [répartitionAutoArgent=true]
	 * @param {number} [solsArgent=0]
	 * @param {number} [deniersArgent=0]
	 * @param {number} [orArgent=0]
	 * @param {number} [argentArgent=0]
	 * @param {number} [bronzeArgent=0]
	 * @param {number} [étainArgent=0]
	 * @memberof CompteursRdD
	 */
	argentMàJ(répartitionAutoArgent = true, solsArgent = 0, deniersArgent = 0, orArgent = 0, argentArgent = 0, bronzeArgent = 0, étainArgent = 0) {
		if (répartitionAutoArgent) {
			// Normalisation de la répartition en sols et deniers
			const normalisé = RdDIntrfc.argentSD(RdDIntrfc.sdArgent(solsArgent, deniersArgent));
			this.argent.sols = normalisé.sols;
			this.argent.deniers = normalisé.deniers;
			// Vérifier que le total (or + argent + bronze + étain) ≠ total (sols + deniers) avant de modifier la répartition en pièces
			if (RdDIntrfc.sdArgent(solsArgent, deniersArgent) !== RdDIntrfc.piècesArgent(orArgent, argentArgent, bronzeArgent, étainArgent)) {
				let conv = RdDIntrfc.sdPièces(normalisé.sols, normalisé.deniers);
				this.argent.or = conv.or;
				this.argent.argent = conv.argent;
				this.argent.bronze = conv.bronze;
				this.argent.étain = conv.étain;
			}
		} else {
			let conv = RdDIntrfc.piècesSD(orArgent, argentArgent, bronzeArgent, étainArgent);
			this.argent.sols = conv.sols;
			this.argent.deniers = conv.deniers;
		}

	}
}

/**
 * Gère l'inventaire d'un acteur
 *
 * @export
 * @class InventaireRdD
 */
export class InventaireRdD {
	constructor(valueEnc = 0, valueQté = 1, listeInv = []) {
		this.encombrement = {
			value: valueEnc
		};
		this.quantité = {
			value: valueQté
		};
		this.liste = listeInv;
	}

	ajouter() {

	}

	supprimer() {

	}

	transférer() {
		
	}
}