export  default class RdDHooks {
	// onSetup, onReady, onPreCreateItem, onPreCreateOwnedItem, onPreCreateActor, onCreateActor, onRenderActorDirectory, onRenderCompendium,
	// onPreUpdateActor, onUpdateActor, onRenderCombatTracker, onPreUpdateCombat, onUpdateCombat, onDeleteCombat,
	// onRenderChatMessage, onRenderPlayerList, onRenderChatLog, onGetUserContextOptions, onGetSceneControlButtons,
	// onRenderCombatantConfig, onDiceSoNiceInit, onDiceSoNiceReady,
	// onUpdateWorldTime

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
		// On évite de dupliquer une compétence non spécialisable
		console.log(`RdD | RdDHooks.onDropActorSheetData - actor, data`, actor, data);
		if (actor.data.type === "pj") {
			let itemFromData = game.items.get(data.id);
			if (!itemFromData.data.data.spécialisable) {
				if (actor.data.items.some((item) => itemFromData.data.name === item.name)) {
					// ui.notifications.console.error(game.i18n.localize("RdD.erreurs.cptcExistante"));
					return false;
				}
			}
		}
		return true;
	}
}