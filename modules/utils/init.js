// Regroupe les constantes générales dans l'espace de nommage RdD
export const RdD = {};

/**
 * Tableau de répartition de la fatigue en fonction de l'endurance
 */
RdD.répartitionFatigue = new Map([
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

/**
 * Correspondance entre les valeurs des heures draconiques et leurs libellés
 */
RdD.heuresDeNaissance = new Map([
	[1, "RdD.heuresNaissance.1"],
	[2, "RdD.heuresNaissance.2"],
	[3, "RdD.heuresNaissance.3"],
	[4, "RdD.heuresNaissance.4"],
	[5, "RdD.heuresNaissance.5"],
	[6, "RdD.heuresNaissance.6"],
	[7, "RdD.heuresNaissance.7"],
	[8, "RdD.heuresNaissance.8"],
	[9, "RdD.heuresNaissance.9"],
	[10, "RdD.heuresNaissance.10"],
	[11, "RdD.heuresNaissance.11"],
	[12, "RdD.heuresNaissance.12"]
]);

/**
 * Correspondance entre les valeurs du sexe du personnage et leurs libellés
 */
RdD.sexe = new Map([
	["F", "RdD.sexe.F"],
	["M", "RdD.sexe.M"]
]);

/**
 * Correspondance entre les valeurs de la latéralité du personnage et leurs libellés
 */
RdD.latéralité = new Map([
	["D", "RdD.latéralité.D"],
	["G", "RdD.latéralité.G"],
	["A", "RdD.latéralité.A"]
]);

/**
 * Correspondance entre les différents type de compétences et leurs libellés
 */
RdD.typesCompétences = new Map([
	["générale", "RdD.typeCompétence.générale"],
	["mêlée", "RdD.typeCompétence.mêlée"],
	["tirLancer", "RdD.typeCompétence.tirLancer"],
	["particulière", "RdD.typeCompétence.particulière"],
	["spécialisée", "RdD.typeCompétence.spécialisée"],
	["connaissance", "RdD.typeCompétence.connaissance"],
	["draconic", "RdD.typeCompétence.draconic"]
]);

/**
 * Correspondance entre les différents type de compétences et les noms des compendiums donnant leur liste de base
 */
RdD.compendiumsCompétences = new Map([
	["générale", "RdD.rdd-competences-generales"],
	["mêlée", "RdD.rdd-competences-de-melee"],
	["tirLancer", "RdD.rdd-competences-de-tir-et-lancer"],
	["particulière", "RdD.rdd-competences-particulieres"],
	["spécialisée", "RdD.rdd-competences-specialisees"],
	["connaissance", "RdD.rdd-connaissances"],
	["draconic", "RdD.rdd-draconic"]
]);

/**
 * Liste des compétences de départ d'un PJ
 */
RdD.cptcDépartPJ = [
	"Escalade",
	"Cuisine",
	"Course",
	"Séduction",
	"Dessin",
	"Bricolage",
	"Danse",
	"Vigilance",
	"Saut",
	"Discrétion",
	"Chant",
	"Masse à 2 mains",
	"Hache à 1 main",
	"Épée à 1 main",
	"Masse à 1 main",
	"Lances",
	"Épée à 2 mains",
	"Corps à corps",
	"Dague de mêlée",
	"Fléau",
	"Armes d'hast",
	"Esquive",
	"Bouclier",
	"Hache à 2 mains",
	"Arc",
	"Fouet",
	"Javelot",
	"Arbalète",
	"Dague de jet",
	"Hache de jet",
	"Fronde",
	"Équitation",
	"Commerce",
	"Survie en Désert",
	"Musique",
	"Charpenterie",
	"Survie en Forêt",
	"Travestissement",
	"Survie en Cité",
	"Survie en Montagne",
	"Survie en Sous-sol",
	"Maçonnerie",
	"Survie en Glaces",
	"Pickpocket",
	"Survie en Marais",
	"Comédie",
	"Survie en Extérieur",
	"Métalurgie",
	"Serrurerie",
	"Chirurgie",
	"Jeu",
	"Orfèvrerie",
	"Maroquinerie",
	"Jonglerie",
	"Natation",
	"Navigation",
	"Acrobatie",
	"Botanique",
	"Légendes",
	"Astrologie",
	"Écriture",
	"Zoologie",
	"Alchimie",
	"Médecine",
	"Hypnos",
	"Thanatos",
	"Oniros",
	"Narcos"
];

/**
 * Correspondance entre les unités de mesure et leurs libellés
 */
RdD.unitésMesureLibellés = new Map([
	["kg", "RdD.unitésMesure.kg"],
	["livre", "RdD.unitésMesure.livre"],
	["écaille", "RdD.unitésMesure.écaille"],
	["brin", "RdD.unitésMesure.brin"],
	["pinte", "RdD.unitésMesure.pinte"],
	["demi-pinte", "RdD.unitésMesure.demi-pinte"],
	["mesure", "RdD.unitésMesure.mesure"],
	["demi-mesure", "RdD.unitésMesure.demi-mesure"],
	["doigt", "RdD.unitésMesure.doigt"],
	["déhacoudre", "RdD.unitésMesure.déhacoudre"],
	["pépin", "RdD.unitésMesure.pépin"],
	["sust", "RdD.unitésMesure.sust"],
	["dose", "RdD.unitésMesure.dose"]
]);

/**
 * Correspondance entre les différentes unités de mesure et leur coût en points d'encombrement
 */
RdD.unitésMesureEncombrement = new Map([
	["kg", 0.5],
	["livre", 0.25],
	["écaille", 0.005],
	["brin", 0.00005],
	["pinte", 0.5],
	["demi-pinte", 0.25],
	["mesure", 0.1],
	["demi-mesure", 0.05],
	["doigt", 0.005],
	["déhacoudre", 0.0005],
	["pépin", 0.00005],
	["sust", 0.1],
	["dose", 0.1]
]);
