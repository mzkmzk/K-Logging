//import 'babel-polyfill'
import './polyfill'
import KLogging from './singleKLogging'

let singple = new KLogging()
window.singleKLogging = singple //兼容之前

module.exports = singple
