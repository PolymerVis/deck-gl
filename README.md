## deck-gl

[deck.gl](http://deck.gl) is a WebGL-powered framework for visual exploratory data analysis of large datasets.

`deck-gl` is the Polymer element equivalent to the React component provided by Uber.

`deck-gl` has its own webgl-renderer powered by [luma.gl](http://luma.gl).
And does not necessarily requires a base map. However, like its React equivalent,
you will need to implement your own pan and zoom functions.

The easiest way to use `deck-gl`, is to data-bind it to a `mapbox-gl` element as
should in the example below.

deck.gl layers can be added by adding the corresponding layer element to `deck-gl`.
Note that the layer element MUST have the attribute `deck-gl-layer` for `deck-gl` to
recognize it.
```
<mapbox-gl id="map" access-token="[[key]]"
  latitude="{{lat}}" longitude="{{lng}}"
  zoom="{{zoom}}" pitch="{{pitch}}" bearing="{{bearing}}">

    <deck-gl id="deck"
      latitude="[[lat]]" longitude="[[lng]]"
      zoom="[[zoom]]" pitch="[[pitch]]" bearing="[[bearing]]"
      on-layer-tap="_onTap"
      on-layer-hover="_onHover">

      <choropleth-layer deck-gl-layer
        layer-id="outline"
        draw-contour
        hide="[[_hideContour(zoom)]]"
        data="[[geojson]]"></choropleth-layer>

      <scatterplot-layer deck-gl-layer
        layer-id="plot"
        pickable radius=5
        accessor-functions="[[accessorFunctions]]"
        data="[[points]]"></scatterplot-layer>

    </deck-gl>

</mapbox-gl>
```

## Available layers
- scatterplot-layer
- line-layer
- arc-layer
- choropleth-layer
- screen-grid-layer
