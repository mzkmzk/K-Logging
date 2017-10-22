'use strict';

exports.__esModule = true;

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _Options = require('./Options');

var _Options2 = _interopRequireDefault(_Options);

var _singleKLogging = require('./singleKLogging');

var _singleKLogging2 = _interopRequireDefault(_singleKLogging);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Display = function () {
    function Display(options) {
        _classCallCheck(this, Display);

        var div_display = document.getElementById('k-logging');

        if (div_display == null) {
            div_display = document.createElement('div');
            div_display.style.cssText = 'position:fixed;top:0;left:0;z-index:999';
            div_display.style.position = 'fixed';
            div_display.setAttribute('id', 'k-logging');
            document.body.appendChild(div_display);

            var div_display_html = '\n            <h3>K-Logging \n                <span onclick="document.getElementById(\'k-logging\').style.display = \'none\';" style=\'float: right;cursor: pointer;\'>\u5173\u95ED\n                </span>\n            </h3>\n            <textarea id=\'k-logging-msg\' style=\'resize:auto;width:200px;height:200px\' placeholder=\'k-logging display\'></textarea>';
            div_display.innerHTML = div_display_html;

            if (options.evel_js === true) {

                div_display.innerHTML += '\n                    <textarea id=\'k-logging-evel\'  style=\'resize:auto;width:100px;height:200px\' placeholder=\'eval_js\'></textarea>\n                    <buttom id=\'eval_js_buttom\'>\u786E\u5B9A</buttom>\n                ';
                document.getElementById('eval_js_buttom').addEventListener('click', function () {
                    eval(document.getElementById('k-logging-evel').value);
                });
            }
        }

        if (options.method.indexOf('display') === -1) {
            div_display.style.display = 'none';
        } else {
            div_display.style.display = 'block';
        }
    }

    Display.prototype.sendMsg = function sendMsg(msg) {
        var k_logging_msg = document.getElementById('k-logging-msg');
        k_logging_msg.value += msg + '\n';
    };

    return Display;
}();

exports['default'] = Display;