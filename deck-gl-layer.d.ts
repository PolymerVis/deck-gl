/// <reference path="bower_components/polymer/types/polymer-element.d.ts" />
/// <reference path="types/polymer/types/lib/utils/flattened-nodes-observer.d.ts" />
/// <reference path="bower_components/polymer-decorators/polymer-decorators.d.ts" />
export declare type IColor = [number, number, number, number];
export declare class DeckGlLayer extends Polymer.Element {
    /** Name for the layer. */
    layerName: string;
    /**
     * The id must be unique among all your layers at a given time. The default
     * value of id is the `layerName`. If more than one instance of a specific
     * type of layer exist at the same time, they must possess different id
     * strings for deck.gl to properly distinguish them.
     */
    layerId: string;
    /**
     * Whether the layer is hidden.
     */
    hidden: boolean;
    /** The opacity of the layer. deck.gl automatically applies gamma to the
     * opacity in an attempt to make opacity changes appear linear (i.e. the
     * opacity is visually proportional to the value of the prop).
     */
    opacity: number;
    data: Array<any>;
    /**
     * Specifies how layer positions and offsets should be geographically
     * interpreted.
     *
     * The default is to interpret positions as latitude and longitude, however
     * it is also possible to interpret positions as meter offsets added to
     * projection center specified by the coordinateOrigin prop.
     */
    coordinateSystem?: number;
    /**
     * Required when the coordinateSystem is set to
     * `COORDINATE_SYSTEM.METER_OFFSETS`.
     *
     * Specifies a longitude and a latitude from which meter offsets are
     * calculated. See the article on Coordinate Systems for details.
     */
    coordinateOrigin?: [number, number];
    /**
     * An optional `4x4 matrix` (pass in as an `Array` of length 16) that is
     * multiplied into the affine projection matrices used by shader project GLSL
     * function and the Viewport's project and unproject JavaScript function.
     *
     * Allows local coordinate system transformations to be applied to a layer,
     * which is useful when composing data from multiple sources that use
     * different coordinate systems.
     *
     * Note that the matrix projection is applied after the non-linear mercator
     * projection calculations are resolved, so be careful when using model
     * matrices with longitude/latitude encoded coordinates. They normally work
     * best with non-mercator viewports or meter offset based mercator layers.
     *
     */
    modelMatrix?: Array<number>;
}
