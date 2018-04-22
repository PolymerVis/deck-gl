/// <reference path="../bower_components/polymer/types/polymer-element.d.ts" />


namespace PolymerVis {
  export namespace DeckGl {
    export const RenderLayer = (superClass: any) => class extends superClass {
      static properties = {
        /**
         * The `parameters` allows applications to specify values for WebGL
         * `parameters` such as blending mode, depth testing etc. Any
         * `parameters` will be applied temporarily while rendering this layer
         * only.
         *
         * Please refer to the
         * [luma.gl v4 setParameters API](http://uber.github.io/luma.gl/#/documentation/api-reference/get-parameter)
         * for documentation on supported parameters and values.
         * @type {Function}
         */
        parameters: {
          type: Function
        },
        /**
         * When multiple layers are rendered on the same plane, z-fighting may
         * create undesirable artifacts. To improve the visual quality of
         * composition, deck.gl allows layers to use gl.polygonOffset to apply
         * an offset to its depth. By default, each layer is offset a small
         * amount by its index so that layers are cleanly stacked from bottom
         * to top.
         *
         * This accessor takes a single parameter uniform - an object that
         * contains the current render uniforms, and returns an array of two
         * numbers factor and units. Negative values pull layer towards the
         * camera, and positive values push layer away from the camera. For
         * more information, refer to the documentation and FAQ.
         *
         * If the accessor is assigned a falsy value, polygon offset will be
         * set to [0, 0].
         *
         * Remarks: While this feature helps mitigate z-fighting, at close up
         * zoom levels the issue might return because of the precision error of
         * 32-bit projection matrices. Try set the fp64 prop to true in this
         * case.
         * @type {Function}
         */
        getPolygonOffset: {
          type: Function
        },
        /**
         * When creating layers, animation can be enabled by supplying an
         * transitions prop. Animation parameters are defined per attribute by
         * using attribute names or accessor names as keys.
         *
         * As a shorthand, if an accessor key maps to a number rather than an
         * object, then the number is assigned to the duration parameter.
         *
         * Example:
         * ```js
         * {
         *    getPositions: 600,
         *    getColors: {
         *      duration: 300,
         *      easing: d3.easeCubicInOut
         *    }
         *  }
         * ```
         *
         * Refer http://uber.github.io/deck.gl/#/documentation/api-reference/layers/layer?section=render-properties
         * for details.
         * @type {Object}
         */
        transitions: {
          type: Object
        }
      };

      getPolygonOffset: (o: {layerIndex: number}) => [number, number] = ({layerIndex}) => [0, -layerIndex * 100];

    }
  }
}
