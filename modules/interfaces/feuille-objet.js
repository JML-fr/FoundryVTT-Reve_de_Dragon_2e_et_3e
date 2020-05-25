/**
 * Extend the basic ItemSheet with some very simple modifications
 */
export class RdDFeuilleObjet extends ItemSheet {
	/**
	 * Extend and override the default options used by the 5e Actor Sheet
	 */
	static get defaultOptions() {
		const options = super.defaultOptions;
		/*
		options.classes = options.classes.concat(["RdD", "item-sheet"]);
		options.template =
			"public/systems/Rêve_de_Dragon/templates/item-sheet.html";
		options.height = 400;
		*/
		return options;
	}

	/* -------------------------------------------- */

	/**
	 * Activate event listeners using the prepared sheet HTML
	 * @param html {HTML}   The prepared HTML object ready to be rendered into the DOM
	 */
	activateListeners(html) {
		super.activateListeners(html);

		// Everything below here is only needed if the sheet is editable
		if (!this.options.editable) return;
		/*

		// Activate MCE
		let editor = html.find(".editor-content");
		createEditor({
			target: editor[0],
			height: this.position.height - 180,
			setup: ed => {
				this._mce = ed;
			},
			save_onsavecallback: ed => {
				let target = editor.attr("data-edit");
				this.item.update({ [target]: ed.getContent() }, true);
			}
		}).then(ed => {
			this.mce = ed[0];
			this.mce.focus();
		});
		*/
	}
}