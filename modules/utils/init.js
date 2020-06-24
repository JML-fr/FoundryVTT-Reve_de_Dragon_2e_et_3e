// Regroupe les constantes générales dans l'espace de nommage RdD
export const RdD = {};

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

RdD.sexe = new Map([
	["F", "RdD.sexe.F"],
	["M", "RdD.sexe.M"]
])

RdD.latéralité = new Map([
	["D", "RdD.latéralité.D"],
	["G", "RdD.latéralité.G"],
	["A", "RdD.latéralité.A"]
])

RdD.typesCompétences = new Map([
	["générale", "RdD.typeCompétence.générale"],
	["mêlée", "RdD.typeCompétence.mêlée"],
	["tirLancer", "RdD.typeCompétence.tirLancer"],
	["particulière", "RdD.typeCompétence.particulière"],
	["spécialisée", "RdD.typeCompétence.spécialisée"],
	["connaissance", "RdD.typeCompétence.connaissance"],
	["draconic", "RdD.typeCompétence.draconic"]
])