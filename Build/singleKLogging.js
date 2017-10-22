'use strict';

require('./polyfill');

var _Options = require('./Options');

var _Options2 = _interopRequireDefault(_Options);

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _Display = require('./Display');

var _Display2 = _interopRequireDefault(_Display);

var _singleDeepStream = require('./singleDeepStream');

var _singleDeepStream2 = _interopRequireDefault(_singleDeepStream);

var _CONSTANT = require('./CONSTANT');

var _CONSTANT2 = _interopRequireDefault(_CONSTANT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) {}

var K_Logging = function () {
    function K_Logging() {
        _classCallCheck(this, K_Logging);

        try {
            var localstrage_uuid = window.localStorage && localStorage.getItem('k_logging_uuid');
            this.data = {
                'info': [],
                'warn': [],
                'error': []
            };
            this.options = _Options2['default'].getDefaultOptions();

            this.url = window.location.href;
            if (localstrage_uuid) {
                this.uuid = localstrage_uuid;
            } else {
                var uuid = _Utils2['default'].getUuid();
                localStorage.setItem('k_logging_uuid', uuid);
                this.uuid = uuid;
            }
        } catch (e) {}
    }

    K_Logging.prototype.setOptions = function setOptions(options) {
        this.options = _Options2['default'].repleaceOptions(options);

        //if(this.options.method.indexOf('display') !== -1 ) { 为了正式环境下没开也可以看调试信息
        this.k_display = new _Display2['default'](this.options);
        //}

        this.deepStream = _singleDeepStream2['default'];

        if (this.options.open_level.indexOf('error') !== -1) {
            this.listenWindowError();
        }

        if (this.options.evel_js === true && this.options.method.indexOf('website') !== -1) {
            this.deepStream.subscribeJS();
        }

        if (this.options.no_listen_jquery_ajax === false) {
            this.listenJqueryAjax();
        }

        if (this.options.switch_listener === true) {
            this.openSwitchListneer();
        }
    };

    K_Logging.prototype.listenJqueryAjax = function listenJqueryAjax() {
        var _this = this;

        var jqueryDocument = $ && $(document);
        if (jqueryDocument.ajaxComplete) {
            jQuery.ajaxPrefilter("script", function (s) {
                s.global = true;
            });
            jqueryDocument.ajaxComplete(function (event, request, settings) {
                if (!request) request = {};
                var result = {
                    category: 'k-logging',
                    name: 'jqueryAjaxComplete',
                    data: {
                        url: settings.url,
                        responseJSON: request.responseJSON,
                        readyState: request.readyState,
                        status: request.status
                    }
                };
                _this.info(JSON.stringify(result));
            });
        }
    };
    /*
     * 监听浏览器自己的error,并捕抓出来
     */


    K_Logging.prototype.listenWindowError = function listenWindowError() {
        var _self = this;
        window.onerror = function (msg, url, lineNo, columnNo, error) {
            var string = msg.toLowerCase();
            var substring = 'script error';
            if (string.indexOf(substring) > -1) {
                _self.error('Script Error: See Browser Console for Detail');
            } else {
                var message = ['Message: ' + msg, 'URL: ' + url, 'Line: ' + lineNo, 'Column: ' + columnNo, 'Error object: ' + JSON.stringify(error)].join(' - ');

                _self.error(message);
            }

            return false;
        };
    };

    /*
     * 监听keyup事件,当密钥输入正确时,启动配置全开
     */


    K_Logging.prototype.openSwitchListneer = function openSwitchListneer() {
        window.k_logging_key = '';
        window.k_logging_click_key = '';
        var _self = this,
            switchKeyupListenerFunction = function switchKeyupListenerFunction(event) {
            window.k_logging_key += _Utils2['default'].asciiToInt(event.keyCode);
            if (window.k_logging_key.toLowerCase().indexOf(_self.options.app_key.toLowerCase()) !== -1) {
                _self.setOptions(_Options2['default'].layerOpenOptions());
                document.body.removeEventListener('keyup', switchKeyupListenerFunction);
            }
        },
            clickNum = 432112344321,
            switchClickListenerFunction = function switchClickListenerFunction(event) {
            window.k_logging_click_key += _Utils2['default'].clickToNum(event);
            if (window.k_logging_click_key.indexOf(clickNum) !== -1) {
                _self.setOptions(_Options2['default'].layerOpenOptions());
                document.body.removeEventListener('click', switchClickListenerFunction);
            }
        };

        document.body.addEventListener && document.body.addEventListener('keyup', switchKeyupListenerFunction);
        document.body.addEventListener && document.addEventListener('click', switchClickListenerFunction);
    };

    K_Logging.prototype.log = function log() {
        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var row_msg = msg;
        msg = this.packagingMsg(msg, level);

        //屏蔽级别
        if (this.options.open_level.indexOf(level) === -1) return;

        //选择输出口
        if (this.options.method.indexOf('console') !== -1) {
            this.console(msg, level);
        }

        if (this.options.method.indexOf('k_report') !== -1) {
            this.k_report(msg, level);
        }

        //if(this.options.method.indexOf('display') !== -1) { 无论有无都输出到display,只不过把框框隐藏起来
        this.display(row_msg, level);
        //}
        if (this.options.method.indexOf('website') !== -1) {
            this.website(msg, level);
        }
    };

    K_Logging.prototype.packagingMsg = function packagingMsg() {
        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var packagingMsg = {
            'date': _Utils2['default'].getDate(),
            level: level,
            msg: msg,
            'uuid': this.uuid,
            'url': this.url
        };
        return JSON.stringify(packagingMsg);
    };

    K_Logging.prototype.console = function (_console) {
        function console() {
            return _console.apply(this, arguments);
        }

        console.toString = function () {
            return _console.toString();
        };

        return console;
    }(function () {
        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (level === 'info') {
            console.log(msg);
        } else if (level === 'warn') {
            console.warn(msg);
        } else if (level === 'error') {
            console.error(msg);
        }
    });

    K_Logging.prototype.display = function display() {
        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        this.k_display.sendMsg(msg);
    };

    K_Logging.prototype.website = function website() {
        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        this.deepStream.sendMsg(msg);
        //this.deepStream.record.set('firstname', msg)
    };

    K_Logging.prototype.k_report = function k_report() {
        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        new Image().src = _CONSTANT2['default'].URL.LOG_INSERT + "?" + "message=" + encodeURIComponent(message) + "&" + "type=" + level + "&" + "referer=" + window.location.href + "&" + "t=" + new Date().getTime();
    };

    K_Logging.prototype.info = function info() {
        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        this.log(msg, 'info');
    };

    K_Logging.prototype.warn = function warn() {
        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        this.log(msg, 'warn');
    };

    K_Logging.prototype.error = function error() {
        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        this.log(msg, 'error');
    };

    return K_Logging;
}();

var singple = new K_Logging();
window.singleKLogging = singple; //兼容之前

module.exports = singple;