/// <reference path="../bower_components/polymer/types/polymer-element.d.ts" />

export type IColor = [number, number, number, number];

namespace PolymerVis {
  export namespace DeckGl {
    export const InteractiveLayer = (superClass: any) => class extends superClass {
      static properties = {
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
      };

      pickable: boolean = false;
      autoHighlight: boolean = false;
      highlightColor: IColor = [0, 0, 128, 128];
      highlightedObjectIndex: number = -1;
    }
  }
}
