/// <reference path="../bower_components/polymer/types/polymer-element.d.ts" />
var PolymerVis;
(function (PolymerVis) {
    let DeckGl;
    (function (DeckGl) {
        DeckGl.InteractiveLayer = (superClass) => { return _a = class extends superClass {
                constructor() {
                    super(...arguments);
                    this.pickable = false;
                    this.autoHighlight = false;
                    this.highlightColor = [0, 0, 128, 128];
                    this.highlightedObjectIndex = -1;
                }
            },
            _a.properties = {
                /**
                 * Whether the layer responds to mouse pointer picking events.
                 * @type {Boolean}
                 */
                pickable: {
                    type: Boolean
                },
                /**
                 * When true, current object pointed by mouse pointer (when hovered
                 * over) is highlighted with `highlightColor`.
                 *
                 * Requires `pickable` to be true.
                 * @type {Boolean}
                 */
                autoHighlight: {
                    type: Boolean
                },
                /**
                 * RGBA color to be used to render highlighted object.
                 * @type {Array}
                 */
                highlightColor: {
                    type: Array
                },
                /**
                 * When provided a valid value corresponding object (one instance in
                 * instanced rendering or group of primitives with same picking color) * will be highlighted with `highlightColor`.
                 * @type {Number}
                 */
                highlightedObjectIndex: {
                    type: Number
                }
            },
            _a; var _a; };
    })(DeckGl = PolymerVis.DeckGl || (PolymerVis.DeckGl = {}));
})(PolymerVis || (PolymerVis = {}));
