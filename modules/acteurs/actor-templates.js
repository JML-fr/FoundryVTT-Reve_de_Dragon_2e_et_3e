export class CompteursRdD {
	constructor(seuilHR = 10, valueHR = 10, refoulementHR = 0, colonneHR = "A", ligneHR = 1, queuesEtSoufflesHR = [],
	maxVie = 10, valueVie = 10,
	maxEnd = 10, valueEnd = 10,
	niveauActuelFat = 0, niveauxFat = [],
	blsrLégères = [], blsrGraves = [], blsrCritique = [],
	valueÉth = 0, dateAcqÉth = "", heureAcqÉth = "", dateProÉth = "", heureProÉth = "",
	valueEnc = 0,
	totalArgent = 0) {
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
		this.encombrement = {
			value: valueEnc
		};
		this.argent = {
			total: totalArgent
		};
	}

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
}
export class CompétencesRdD {
	constructor() {

	}
}
export class ArchétypeRdD {
	constructor() {

	}
}