require('babel-polyfill');
if (window !== undefined) {
  window.LumaGL = require('luma.gl');
  window.DeckGL = require('deck.gl');
}
