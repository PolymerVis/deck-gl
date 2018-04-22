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
import { Deck } from '@deck.gl/core';
const { customElement, property } = Polymer.decorators;
let DeckGl = class DeckGl extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.layers = null;
        this._childrenObserver = null;
    }
    static get template() {
        return Polymer.html `
    <style>
      :host {
        position: absolute;
        left: 0;
        top: 0;
      }
    </style>
    <slot></slot>
    <canvas id="deckCanvas"></canvas>
    `;
    }
    connectedCallback() {
        super.connectedCallback();
        var slot = this.shadowRoot && this.shadowRoot.querySelector('slot');
        if (!slot)
            return;
        this._childrenObserver = new Polymer.FlattenedNodesObserver(slot, this._slotChanged.bind(this));
        this.deck = new Deck(Object.assign({}, this.props, {
            canvas: this.$.deckCanvas,
            onResize: size => this.forceUpdate()
        }));
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (this._childrenObserver) {
            this._childrenObserver.disconnect();
            this._childrenObserver = null;
        }
        this.deck.finalize();
    }
    _slotChanged() {
        if (!this.shadowRoot)
            return;
        var slot = this.shadowRoot && this.shadowRoot.querySelector('slot');
        if (!slot)
            return;
        this.layers = slot.assignedNodes({ flatten: true })
            .filter(n => n.nodeName.slice(0, 7) === 'DECK-GL');
    }
    pickObject(e) {
        e = Object.assign({ radius: 0, layerIds: null }, e);
        return this.deck.pickObject(e);
    }
    pickObjects(e) {
        e = Object.assign({ width: 1, height: 1, layerIds: null }, e);
        return this.deck.pickObjects(e);
    }
    // Private Helpers
    // 1. Extract any JSX layers from the react children
    // 2. Handle any backwards compatiblity props for React layer
    // Needs to be called both from initial mount, and when new props arrive
    _updateFromProps(nextProps) {
        // Support old "geospatial view state as separate props" style (React only!)
        let { viewState } = nextProps;
        if (!viewState) {
            const { latitude, longitude, zoom, pitch, bearing } = nextProps;
            viewState = nextProps.viewState || { latitude, longitude, zoom, pitch, bearing };
        }
        // Support old `viewports` prop (React only!)
        const views = nextProps.views || nextProps.viewports || (nextProps.viewport && [nextProps.viewport]);
        if (nextProps.viewports) {
            log.deprecated('DeckGL.viewports', 'DeckGL.views')();
        }
        if (nextProps.viewport) {
            log.deprecated('DeckGL.viewport', 'DeckGL.views')();
        }
        // extract any deck.gl layers masquerading as react elements from props.children
        const { layers, children } = this._extractJSXLayers(nextProps.children);
        if (this.deck) {
            this.deck.setProps(Object.assign({}, nextProps, {
                views,
                viewState,
                // Avoid modifying layers array if no JSX layers were found
                layers: layers ? [...layers, ...nextProps.layers] : nextProps.layers
            }));
        }
        this.layers = children;
    }
    // extracts any deck.gl layers masquerading as react elements from props.children
    _extractJSXLayers(children) {
        const reactChildren = []; // extract real react elements (i.e. not deck.gl layers)
        let layers = null; // extracted layer from react children, will add to deck.gl layer array
        React.Children.forEach(children, reactElement => {
            if (reactElement) {
                // For some reason Children.forEach doesn't filter out `null`s
                const LayerType = reactElement.type;
                if (inheritsFrom(LayerType, Layer)) {
                    const layer = new LayerType(reactElement.props);
                    layers = layers || [];
                    layers.push(layer);
                }
                else {
                    reactChildren.push(reactElement);
                }
            }
        });
        return { layers, children: reactChildren };
    }
    // Iterate over views and reposition children associated with views
    // TODO - Can we supply a similar function for the non-React case?
    _renderChildrenUnderViews(children) {
        // Flatten out nested views array
        const views = this.deck ? this.deck.getViewports() : [];
        // Build a view id to view index
        const viewMap = {};
        views.forEach((view) => {
            if (view.id) {
                viewMap[view.id] = view;
            }
        });
        return children.map(
        // If child specifies props.viewId, position under view, otherwise render as normal
        (child, i) => child.viewId || child.viewId ? this._positionChild(child, viewMap, i) : child);
    }
    _positionChild(child, viewMap, i) {
        const view = viewMap[child.viewId];
        // Drop (auto-hide) elements with viewId that are not matched by any current view
        if (!view) {
            return null;
        }
        // Resolve potentially relative dimensions using the deck.gl container size
        const { x, y, width, height } = view;
        // Clone the element with width and height set per view
        const newProps = Object.assign({}, child.props, { width, height });
        // Inject map properties
        // TODO - this is too react-map-gl specific
        Object.assign(newProps, view.getMercatorParams(), {
            visible: view.isMapSynched()
        });
        child.id = `view-child-${child.viewId}-${i}`;
        child.width = width;
        child.height = height;
        child.left = x;
        child.top = y;
        return child;
    }
    render() {
        // Render the background elements (typically react-map-gl instances)
        // using the view descriptors
        const children = this._renderChildrenUnderViews(this.layers || []);
        // Note that width and height are handled by deck.gl
        const { id } = this.props;
        // TODO - this styling is enforced for correct positioning with children
        // It can override the styling set by `Deck`, this should be consolidated.
        const style = Object.assign({}, { position: 'absolute', left: 0, top: 0 }, this.props.style);
        const canvas = createElement('canvas', {
            ref: c => (this.deckCanvas = c),
            key: 'deck-canvas',
            id,
            style
        });
        // Render deck.gl as last child
        children.push(canvas);
        return createElement('div', { id: 'deckgl-wrapper' }, children);
    }
};
DeckGl.is = 'my-element';
__decorate([
    property({ type: Object, notify: true, readOnly: true }),
    __metadata("design:type", Object)
], DeckGl.prototype, "deck", void 0);
__decorate([
    property({ type: Array, readOnly: true }),
    __metadata("design:type", Object)
], DeckGl.prototype, "layers", void 0);
__decorate([
    property({ type: Object, readOnly: true }),
    __metadata("design:type", Object)
], DeckGl.prototype, "_childrenObserver", void 0);
DeckGl = __decorate([
    customElement('deck-gl')
], DeckGl);
export { DeckGl };
customElements.define(DeckGl.is, DeckGl);
