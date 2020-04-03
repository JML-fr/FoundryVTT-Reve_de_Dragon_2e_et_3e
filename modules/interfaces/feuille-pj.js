/**
 * La feuille de PJ est basée sur la classe ActorSheet
 * @class
 */
export class RdDFeuillePJ extends ActorSheet {
	constructor(...args) {
		super(...args);
	
		/**
		 * Garde trace de l'onglet actif
		 * @type {string}
		 * @default "états" Onglet affiché par défaut
		 */
		this._sheetTab = "états";
	  }
	
	/* -------------------------------------------- */
	
	/**
	 * Étend et remplace les options d'affichage par défaut
	 * @function defaultOptions
	 * @returns {object}
	 * @static
	 */
	static get defaultOptions() {
		console.log(`RdD | RdDFeuillePJ.defaultOptions`);
		/**
		 * @property {string} options.classes classes CSS appliquées à la feuille
		 * @property {string} options.template chemin d'accès au squelette HTML de la feuille
		 * @property {number} options.width largeur de la fenêtre
		 * @property {number} options.height hauteur de la fenêtre
		 * @property {boolean} options.popOut contenant de type pop-out
		 * @property {boolean} options.resizable fenêtre redimentionable
		 */
		return mergeObject(super.defaultOptions, {
			classes: ["RdD", "sheet", "actor"],
			template: "systems/rêvededragon/templates/feuille-pj.html",
			width: 600,
			height: 600,
			popOut: true,
			resizable: true
		});
	}

	/* -------------------------------------------- */

	/**
	* Prepare les données pour l'affichage de la feuille de PJ
	* L'objet de données préparé contient les données de l'acteur et les options de la feuille
	* @function getData
	* @returns {object} Données à afficher
	*/
	getData() {
		console.log(`RdD | RdDFeuillePJ.getData`);
		let data = super.getData();
		// *** Utilité à déterminer ***
		//data.dtypes = ["String", "Number", "Boolean"];
		//for ( let attr of Object.values(data.data.attributes) ) {
		//	attr.isCheckbox = attr.dtype === "Boolean";
		//}
		return data;
	}

	/* -------------------------------------------- */

	/**
	 * Active les détecteurs d'évènements depuis la page HTML préparée
	 * @param html {HTML}   L'objet HTML préparé prêt à être rendu dans le DOM
	 */
	activateListeners(html) {
		console.log(`RdD | RdDFeuillePJ.activateListeners`);
		super.activateListeners(html);

		// Active les onglets
        let onglets = html.find('.tabs');
        let initial = this._sheetTab;
        new Tabs(onglets, {
            initial: initial,
            callback: clicked => this._sheetTab = clicked.data('tab')
        });

		// Everything below here is only needed if the sheet is editable
		if (!this.options.editable) return;

		// Activate MCE
		/* ==> plus tard
		let editor = html.find(".editor-content");
		createEditor({
			target: editor[0],
			height: this.position.height - 260,
			setup: ed => {
				this._mce = ed;
			},
			save_onsavecallback: ed => {
				let target = editor.attr("data-edit");
				this.actor.update({ [target]: ed.getContent() }, true);
			}
		}).then(ed => {
			this.mce = ed[0];
			this.mce.focus();
		});
		*/

		// Update Inventory Item
		/* ==> plus tard
		html.find(".item-edit").click(ev => {
			let itemId = Number(
				$(ev.currentTarget)
					.parents(".item")
					.attr("data-item-id")
			);
			console.log(itemId);
			let Item = CONFIG.Item.entityClass;
			const item = new Item(
				this.actor.items.find(i => i.id === itemId),
				this.actor
			);
			item.sheet.render(true);
		});

		// Delete Inventory Item
		html.find(".item-delete").click(ev => {
			let li = $(ev.currentTarget).parents(".item"),
				itemId = Number(li.attr("data-item-id"));
			this.actor.deleteOwnedItem(itemId, true);
			li.slideUp(200, () => this.render(false));
		});
		*/
	}
}