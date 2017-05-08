(function(DeckGLPolymer) {
  var Layer = DeckGL.Layer;
  var assembleShaders = DeckGL.assembleShaders;

  var Model = LumaGL.Model;
  var Program = LumaGL.Program;
  var Geometry = LumaGL.Geometry;

  var tripsFragment = `
#define SHADER_NAME trips-layer-fragment-shader
#ifdef GL_ES
precision highp float;
#endif

varying float vTime;
varying vec4 vColor;

void main(void) {
  if (vTime > 1.0 || vTime < 0.0) {
    discard;
  }
  gl_FragColor = vec4(vColor.rgb, vColor.a * vTime);
}`;

  var tripsVertex = `
#define SHADER_NAME trips-layer-vertex-shader

attribute vec3 positions;
attribute vec3 colors;

uniform float opacity;
uniform float currentTime;
uniform float trailLength;

varying float vTime;
varying vec4 vColor;

void main(void) {
  vec2 p = preproject(positions.xy);
  // the magic de-flickering factor
  vec4 shift = vec4(0., 0., mod(positions.z, trailLength) * 1e-4, 0.);

  gl_Position = project(vec4(p, 1., 1.)) + shift;

  vColor = vec4(colors / 255.0, opacity);
  vTime = 1.0 - (currentTime - positions.z) / trailLength;
}`;

  var defaultProps = {
    trailLength: 120,
    currentTime: 0,
    getPath: function(d) {
      return d.path;
    },
    getColor: function(d) {
      return d.color;
    }
  };

  class TripsLayer extends Layer {
    initializeState() {
      var gl = this.context.gl;
      var model = this.getModel(gl);

      this.state.attributeManager.add({
        indices: { size: 1, update: this.calculateIndices, isIndexed: true },
        positions: { size: 3, update: this.calculatePositions },
        colors: { size: 3, update: this.calculateColors }
      });

      gl.getExtension('OES_element_index_uint');
      this.setState({ model: model });
    }

    updateState(state) {
      if (state.changeFlags.dataChanged) {
        this.countVertices(state.props.data);
        this.state.attributeManager.invalidateAll();
      }
    }

    getModel(gl) {
      return new Model({
        program: new Program(
          gl,
          assembleShaders(gl, {
            vs: tripsVertex,
            fs: tripsFragment
          })
        ),
        geometry: new Geometry({
          id: this.props.id,
          drawMode: 'LINES'
        }),
        vertexCount: 0,
        isIndexed: true,
        onBeforeRender: function() {
          gl.enable(gl.BLEND);
          gl.enable(gl.POLYGON_OFFSET_FILL);
          gl.polygonOffset(2.0, 1.0);
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
          gl.blendEquation(gl.FUNC_ADD);
        },
        onAfterRender: function() {
          gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
          gl.disable(gl.POLYGON_OFFSET_FILL);
        }
      });
    }

    countVertices(data) {
      if (!data) {
        return;
      }
      var getPath = this.props.getPath;
      var vertexCount = 0;
      var pathLengths = data.reduce(function(acc, d) {
        var l = getPath(d).length;
        vertexCount += l;
        acc.push(l);
        return acc;
      }, []);
      this.setState({ pathLengths: pathLengths, vertexCount: vertexCount });
    }

    draw(opts) {
      this.state.model.render(
        Object.assign({}, opts.uniforms, {
          trailLength: this.props.trailLength,
          currentTime: this.props.currentTime
        })
      );
    }

    calculateIndices(attribute) {
      var pathLengths = this.state.pathLengths;
      var vertexCount = this.state.vertexCount;
      var indicesCount = (vertexCount - pathLengths.length) * 2;
      var indices = new Uint32Array(indicesCount);

      var offset = 0;
      var index = 0;
      for (var i = 0; i < pathLengths.length; i++) {
        var l = pathLengths[i];
        indices[index++] = offset;
        for (var j = 1; j < l - 1; j++) {
          indices[index++] = j + offset;
          indices[index++] = j + offset;
        }
        indices[index++] = offset + l - 1;
        offset += l;
      }
      attribute.value = indices;
      this.state.model.setVertexCount(indicesCount);
    }

    calculatePositions(attribute) {
      var data = this.props.data;
      var getPath = this.props.getPath;
      var vertexCount = this.state.vertexCount;
      var positions = new Float32Array(vertexCount * 3);

      var index = 0;
      for (var i = 0; i < data.length; i++) {
        var path = getPath(data[i]);
        for (var j = 0; j < path.length; j++) {
          var pt = path[j];
          positions[index++] = pt[0];
          positions[index++] = pt[1];
          positions[index++] = pt[2];
        }
      }
      attribute.value = positions;
    }

    calculateColors(attribute) {
      var data = this.props.data;
      var getColor = this.props.getColor;
      var pathLengths = this.state.pathLengths;
      var vertexCount = this.state.vertexCount;

      var colors = new Float32Array(vertexCount * 3);

      var index = 0;
      for (var i = 0; i < data.length; i++) {
        var color = getColor(data[i]);
        var l = pathLengths[i];
        for (var j = 0; j < l; j++) {
          colors[index++] = color[0];
          colors[index++] = color[1];
          colors[index++] = color[2];
        }
      }
      attribute.value = colors;
    }
  }

  TripsLayer.layerName = 'TripsLayer';
  TripsLayer.defaultProps = defaultProps;

  DeckGLPolymer.TripsLayer = TripsLayer;
})((DeckGLPolymer = window.DeckGLPolymer || {}));
