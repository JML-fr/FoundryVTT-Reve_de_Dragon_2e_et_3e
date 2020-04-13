 /*
 * Importation des modules
 */
import * as RdDPJ from "../acteurs/pj.js";
import * as Intrfc from "../utils/interface.js";

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
			width: 800,
			height: 600,
			popOut: true,
			submitOnChange: false,
			resizable: true,
			tabs: [{navSelector: ".tabs", contentSelector: ".content", initial: this._sheetTab}]
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

		// Everything below here is only needed if the sheet is editable
		if (!this.options.editable) return;

		// Active le MCE
		let editor = html.find(".editor-content");
		TextEditor.create({
			target: editor[0],
			height: this.position.height - 260,
			setup: (ed) => {
				this._mce = ed;
			},
			save_onsavecallback: (ed) => {
				let target = editor.attr("data-edit");
				this.actor.update({ [target]: ed.getContent() }, true);
			},
		}).then((ed) => {
			this.mce = ed[0];
			this.mce.focus();
		});

		// ---------------------
		// Contrôle de la saisie
		// ---------------------
		html.find("#data\\.signesPart\\.hn\\.value").on("change.rêvededragon", {fctCtrl: "ctrlHeureNaissance"}, this._ctrlSaisie.bind(this));
		html.find("#data\\.signesPart\\.sexe\\.value").on("change.rêvededragon", {fctCtrl: "ctrlSexe"}, this._ctrlSaisie.bind(this));
		html.find("#data\\.signesPart\\.âge\\.value").on("change.rêvededragon", {fctCtrl: "ctrlÂge"}, this._ctrlSaisie.bind(this));
		html.find("#data\\.signesPart\\.taille\\.value").on("change.rêvededragon", {fctCtrl: "ctrlTaille"}, this._ctrlSaisie.bind(this));
		html.find("#data\\.signesPart\\.poids\\.value").on("change.rêvededragon", {fctCtrl: "ctrlPoids"}, this._ctrlSaisie.bind(this));
		html.find("#data\\.signesPart\\.beauté\\.value").on("change.rêvededragon", {fctCtrl: "ctrlBeauté"}, this._ctrlSaisie.bind(this));
		html.find("#data\\.signesPart\\.latéralité\\.value").on("change.rêvededragon", {fctCtrl: "ctrlLatéralité"}, this._ctrlSaisie.bind(this));

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

	/**
	 * Contrôle la saisie
	 *
	 * @function
	 * @param {Event} event L'évènement à l'origine du contrôle
	 * @memberof RdDFeuillePJ
	 * @async
	 * @private
	 */
	async _ctrlSaisie(event) {
		const input = event.target;
		const value = input.value;
		console.log("RdD | RdDFeuillePJ._ctrlSaisie " + event.data.fctCtrl);
		try {
			let erreur = eval("RdDPJ.RdDPJ." + event.data.fctCtrl + "(value)");
			console.log("RdD | RdDFeuillePJ._ctrlSaisie après contrôle " + erreur);
			if (erreur != "") {
				$(event.currentTarget).addClass("erreur");
				$(event.currentTarget).focus();
				ui.notifications.error(erreur);
				throw new Error(erreur);
			}
			else {
				$(event.currentTarget).removeClass("erreur");
			}
			console.log("RdD | RdDFeuillePJ._ctrlSaisie – Appel _onSubmit");
			this._onSubmit(event);
		} catch (erreur) {
			console.log("RdD | RdDFeuillePJ._ctrlSaisie " + erreur);
		}
	}

	/**
	 * Surcharge la fonction de préparation des données du PJ
	 *
	 * @param {Event} event
	 * @param {Object|null} updateData
	 * @param {Boolean} preventClose
	 * @memberof RdDFeuillePJ
	 */
	async _onSubmit(event, {updateData=null, preventClose=false}={}) {
		console.log("RdD | RdDFeuillePJ._onSubmit");
		const form = this.element.find("form").first()[0];
		if (form.querySelector(".erreur")) {
			console.log("RdD | RdDFeuillePJ._onSubmit – erreur");
			ui.notifications.error(game.i18n.localize("RdD.erreurs.pasDeMàJ"));
		}
		else {
			console.log("RdD | RdDFeuillePJ._onSubmit – pas d'erreur");
			super._onSubmit(event, {updateData, preventClose});
		}
	}
}