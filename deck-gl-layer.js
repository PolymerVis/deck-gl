/// <reference path="./bower_components/polymer/types/polymer-element.d.ts" />
/// <reference path="./types/polymer/types/lib/utils/flattened-nodes-observer.d.ts" />
/// <reference path="./bower_components/polymer-decorators/polymer-decorators.d.ts" />
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const { customElement, property } = Polymer.decorators;
let DeckGlLayer = class DeckGlLayer extends Polymer.Element {
    constructor() {
        super(...arguments);
        /**
         * Whether the layer is hidden.
         */
        this.hidden = false;
        /** The opacity of the layer. deck.gl automatically applies gamma to the
         * opacity in an attempt to make opacity changes appear linear (i.e. the
         * opacity is visually proportional to the value of the prop).
         */
        this.opacity = 1.0;
    }
};
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], DeckGlLayer.prototype, "layerName", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], DeckGlLayer.prototype, "layerId", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Boolean)
], DeckGlLayer.prototype, "hidden", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], DeckGlLayer.prototype, "opacity", void 0);
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], DeckGlLayer.prototype, "data", void 0);
__decorate([
    property({ type: Number }),
    __metadata("design:type", Number)
], DeckGlLayer.prototype, "coordinateSystem", void 0);
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], DeckGlLayer.prototype, "coordinateOrigin", void 0);
__decorate([
    property({ type: Array }),
    __metadata("design:type", Array)
], DeckGlLayer.prototype, "modelMatrix", void 0);
DeckGlLayer = __decorate([
    customElement('deck-gl-layer')
], DeckGlLayer);
export { DeckGlLayer };
