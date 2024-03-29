/* eslint-disable no-console */
export  default class RdDHooks {
	/**
	 * Actions avant parachutage sur un actor
	 *
	 * @static
	 * @param {*} actor
	 * @param {*} sheet
	 * @param {*} data
	 * @memberof RdDHooks
	 */
	static onDropActorSheetData(actor, sheet, data) {
		console.log(`RdD | RdDHooks.onDropActorSheetData - actor, data`, actor, data);
		if (actor.data.type === "pj") {
			let itemFromData = game.items.get(data.id);
			// On évite de dupliquer une compétence non spécialisable
			if (itemFromData.data.type === "compétence" && !itemFromData.data.data.spécialisable) {
				if (actor.data.items.some((item) => itemFromData.data.name === item.name)) {
					// ui.notifications.console.error(game.i18n.localize("RdD.erreurs.cptcExistante"));
					return false;
				}
			}
		}
		return true;
	}
}