'use strict';

require('./polyfill');

var _singleKLogging = require('./singleKLogging');

var _singleKLogging2 = _interopRequireDefault(_singleKLogging);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

//import 'babel-polyfill'
var singple = new _singleKLogging2['default']();
window.singleKLogging = singple; //兼容之前

module.exports = singple;