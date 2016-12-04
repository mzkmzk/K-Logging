/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _singleKLogging = __webpack_require__(1);

	var _singleKLogging2 = _interopRequireDefault(_singleKLogging);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (typeof module != 'undefined' && module.exports) {
	    module.exports = _singleKLogging2.default;
	} else if (true) {
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	        return _singleKLogging2.default;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
	    window.singleKLogging = _singleKLogging2.default;
	}
	window.singleKLogging = _singleKLogging2.default;
	//window.K_Logging = K_Logging

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Options = __webpack_require__(2);

	var _Options2 = _interopRequireDefault(_Options);

	var _Utils = __webpack_require__(3);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _Display = __webpack_require__(4);

	var _Display2 = _interopRequireDefault(_Display);

	var _singleDeepStream = __webpack_require__(5);

	var _singleDeepStream2 = _interopRequireDefault(_singleDeepStream);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var K_Logging = function () {
	    function K_Logging() {
	        _classCallCheck(this, K_Logging);

	        var localstrage_uuid = localStorage.getItem('k_logging_uuid');
	        this.data = {
	            'info': [],
	            'warn': [],
	            'error': []
	        };
	        this.options = _Options2.default.getDefaultOptions();

	        this.url = window.location.href;
	        if (localstrage_uuid) {
	            this.uuid = localstrage_uuid;
	        } else {
	            var uuid = _Utils2.default.getUuid();
	            localStorage.setItem('k_logging_uuid', uuid);
	            this.uuid = uuid;
	        }
	    }

	    _createClass(K_Logging, [{
	        key: 'setOptions',
	        value: function setOptions(options) {
	            this.options = _Options2.default.repleaceOptions(options);

	            //if(this.options.method.indexOf('display') !== -1 ) { 为了正式环境下没开也可以看调试信息
	            this.k_display = new _Display2.default(this.options);
	            //}

	            this.deepStream = _singleDeepStream2.default;

	            if (this.options.open_level.indexOf('error') !== -1) {
	                this.listenWindowError();
	            }

	            if (this.options.evel_js === true) {
	                this.deepStream.subscribeJS();
	            }

	            if (this.options.switch_listener === true) {
	                this.openSwitchListneer();
	            }
	        }

	        /*
	         * 监听浏览器自己的error,并捕抓出来
	         */

	    }, {
	        key: 'listenWindowError',
	        value: function listenWindowError() {
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
	        }

	        /*
	         * 监听keyup事件,当密钥输入正确时,启动配置全开
	         */

	    }, {
	        key: 'openSwitchListneer',
	        value: function openSwitchListneer() {
	            window.k_logging_key = '';
	            var _self = this,
	                switchListneerFunction = function switchListneerFunction(event) {
	                window.k_logging_key += _Utils2.default.asciiToInt(event.keyCode);
	                if (window.k_logging_key.toLowerCase().indexOf(_self.options.app_key.toLowerCase()) !== -1) {
	                    _self.setOptions(_Options2.default.layerOpenOptions());
	                    document.body.removeEventListener('keyup', switchListneerFunction);
	                }
	            };

	            document.body.addEventListener('keyup', switchListneerFunction);
	        }
	    }, {
	        key: 'log',
	        value: function log() {
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
	            //if(this.options.method.indexOf('display') !== -1) { 无论有无都输出到display,只不过把框框隐藏起来
	            this.display(row_msg, level);
	            //}
	            if (this.options.method.indexOf('website') !== -1) {
	                this.website(msg, level);
	            }
	        }
	    }, {
	        key: 'packagingMsg',
	        value: function packagingMsg() {
	            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	            var packagingMsg = {
	                'date': _Utils2.default.getDate(),
	                level: level,
	                msg: msg,
	                'uuid': this.uuid,
	                'url': this.url
	            };
	            return JSON.stringify(packagingMsg);
	        }
	    }, {
	        key: 'console',
	        value: function (_console) {
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
	        })
	    }, {
	        key: 'display',
	        value: function display() {
	            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	            var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	            this.k_display.sendMsg(msg);
	        }
	    }, {
	        key: 'website',
	        value: function website() {
	            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	            this.deepStream.sendMsg(msg);
	            //this.deepStream.record.set('firstname', msg)
	        }
	    }, {
	        key: 'info',
	        value: function info() {
	            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	            this.log(msg, 'info');
	        }
	    }, {
	        key: 'warn',
	        value: function warn() {
	            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	            this.log(msg, 'warn');
	        }
	    }, {
	        key: 'error',
	        value: function error() {
	            var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	            this.log(msg, 'error');
	        }
	    }]);

	    return K_Logging;
	}();

	exports.default = new K_Logging();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _singleKLogging = __webpack_require__(1);

	var _singleKLogging2 = _interopRequireDefault(_singleKLogging);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Options = function () {
	    function Options() {
	        _classCallCheck(this, Options);
	    }

	    _createClass(Options, null, [{
	        key: 'repleaceOptions',
	        value: function repleaceOptions(options) {

	            if (options == undefined) return Options.getDefaultOptions();

	            var defaultOptions = _singleKLogging2.default.options || Options.getDefaultOptions(),
	                //前者为layer时只替换部分属性
	            keys = Object.keys(defaultOptions);

	            for (var i = keys.length - 1; i >= 0; i--) {
	                if (options[keys[i]] === undefined) {
	                    options[keys[i]] = defaultOptions[keys[i]];
	                }
	            }

	            return options;
	        }
	    }, {
	        key: 'getDefaultOptions',
	        value: function getDefaultOptions() {
	            return {
	                app_key: _Utils2.default.getUuid(), //default
	                open_level: ['info', 'warn', 'error'],
	                method: ['console', 'display', 'website'],
	                display: {
	                    css: {
	                        top: '40px',
	                        left: 0,
	                        background: '#DBDBDB',
	                        'overflow-y': 'scroll',
	                        'overflow-x': 'hidden'
	                    },
	                    //'position': 'fixed', //not change
	                    canMove: true, //是否可以移动
	                    initMin: true //刚开始是否为最小化
	                },
	                evel_js: false,
	                switch_listener: true
	            };
	        }
	    }, {
	        key: 'layerOpenOptions',
	        value: function layerOpenOptions() {
	            return {
	                open_level: ['info', 'warn', 'error'],
	                method: ['console', 'display', 'website'],
	                evel_js: false, //!singleKLogging.options , 
	                switch_listener: false
	            };
	        }
	    }]);

	    return Options;
	}();

	exports.default = Options;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }

	    _createClass(Utils, null, [{
	        key: 'getScript',
	        value: function getScript(url, callback) {
	            var head = document.getElementsByTagName('head')[0],
	                js = document.createElement('script');
	            js.setAttribute('type', 'text/javascript');
	            js.setAttribute('src', url);
	            head.appendChild(js);
	            //执行回调
	            var callbackFn = function callbackFn() {
	                if (typeof callback === 'function') {
	                    callback();
	                }
	            };
	            if (document.all) {
	                //IE
	                js.onreadystatechange = function () {
	                    if (js.readyState == 'loaded' || js.readyState == 'complete') {
	                        callbackFn();
	                    }
	                };
	            } else {
	                js.onload = function () {
	                    callbackFn();
	                };
	            }
	        }
	    }, {
	        key: 'getDate',
	        value: function getDate() {
	            var date = new Date(),
	                Y = '',

	            //Y = date.getFullYear() + '-',
	            M = Utils.addZero(date.getMonth() + 1) + '-',
	                D = Utils.addZero(date.getDate()) + ' ',
	                h = Utils.addZero(date.getHours()) + ':',
	                m = Utils.addZero(date.getMinutes()) + ':',
	                s = Utils.addZero(date.getSeconds()) + '.',
	                ms = date.getMilliseconds();
	            return Y + M + D + h + m + s + ms;
	        }
	    }, {
	        key: 'addZero',
	        value: function addZero(num) {
	            if (num < 10) {
	                return '0' + num;
	            }
	            return num;
	        }
	    }, {
	        key: 'getUrlArgs',
	        value: function getUrlArgs(name) {
	            var args = {},
	                query = window.location.search.substring(1),
	                pairs = query.split('&');
	            for (var i = pairs.length - 1; i >= 0; i--) {
	                var pos = pairs[i].indexOf('='),
	                    _name = pairs[i].substring(0, pos),
	                    value = pairs[i].substring(pos + 1, pairs[i].length);
	                args[_name] = value;
	            }
	            if (name == undefined) return args;
	            return args[name];
	        }
	    }, {
	        key: 'getUuid',
	        value: function getUuid() {
	            function s4() {
	                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	            }
	            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	        }
	    }, {
	        key: 'asciiToInt',
	        value: function asciiToInt(ascii) {
	            var ASCII_TO_INT_OBJECT = {
	                '31': '', '32': ' ', '33': '!', '34': '\"', '35': '#',
	                '36': '$', '37': '%', '38': '&', '39': '\'', '40': '(',
	                '41': ')', '42': '*', '43': '+', '44': ',', '45': '-',
	                '46': '.', '47': '/', '48': '0', '49': '1', '50': '2',
	                '51': '3', '52': '4', '53': '5', '54': '6', '55': '7',
	                '56': '8', '57': '9', '58': ':', '59': ';', '60': '<',
	                '61': '=', '62': '>', '63': '?', '64': '@', '65': 'A',
	                '66': 'B', '67': 'C', '68': 'D', '69': 'E', '70': 'F',
	                '71': 'G', '72': 'H', '73': 'I', '74': 'J', '75': 'K',
	                '76': 'L', '77': 'M', '78': 'N', '79': 'O', '80': 'P',
	                '81': 'Q', '82': 'R', '83': 'S', '84': 'T', '85': 'U',
	                '86': 'V', '87': 'W', '88': 'X', '89': 'Y', '90': 'Z',
	                '91': '[', '92': '\\', '93': ']', '94': '^', '95': '_',
	                '96': '`', '97': 'a', '98': 'b', '99': 'c', '100': 'd',
	                '101': 'e', '102': 'f', '103': 'g', '104': 'h', '105': 'i',
	                '106': 'j', '107': 'k', '108': 'l', '109': 'm', '110': 'n',
	                '111': 'o', '112': 'p', '113': 'q', '114': 'r', '115': 's',
	                '116': 't', '117': 'u', '118': 'v', '119': 'w', '120': 'x',
	                '121': 'y', '122': 'z', '123': '{', '124': '|', '125': '}',
	                '126': '~', '127': ''
	            };
	            return ASCII_TO_INT_OBJECT[ascii];
	        }
	    }]);

	    return Utils;
	}();

	exports.default = Utils;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _Options = __webpack_require__(2);

	var _Options2 = _interopRequireDefault(_Options);

	var _singleKLogging = __webpack_require__(1);

	var _singleKLogging2 = _interopRequireDefault(_singleKLogging);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

	    _createClass(Display, [{
	        key: 'sendMsg',
	        value: function sendMsg(msg) {
	            var k_logging_msg = document.getElementById('k-logging-msg');
	            k_logging_msg.value += msg + '\n';
	        }
	    }]);

	    return Display;
	}();

	exports.default = Display;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(3);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _singleKLogging = __webpack_require__(1);

	var _singleKLogging2 = _interopRequireDefault(_singleKLogging);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DeepStream = function () {
	    function DeepStream() {
	        //console.log('DeepStream.constructor被调用了')
	        /*if(window.deepstream === undefined) { 
	            Utils.getScript(
	                'https://qiniu.404mzk.com/deepstream.min.js',
	                this.setRecord()
	            )
	        }else {
	            this.setRecord()
	        }*/

	        _classCallCheck(this, DeepStream);
	    }

	    _createClass(DeepStream, [{
	        key: 'setRecord',
	        value: function setRecord() {
	            if (this.record === undefined) {
	                //防止多次连接 会有多个websocket连接
	                var client = window.deepstream('120.24.37.206:6020').login();
	                this.record = client.record.getRecord(_singleKLogging2.default.options.app_key || 'K-Logging');
	            }
	        }
	    }, {
	        key: 'sendMsg',
	        value: function sendMsg(msg) {
	            var _this = this;

	            //消息频率较高时,会执行多次加载脚本
	            if (window.deepstream === undefined) {
	                (function () {
	                    var _self = _this;

	                    _Utils2.default.getScript('http://qiniu.404mzk.com/deepstream.min.js', function () {
	                        _self.setRecord();
	                        _self.record.set('K-Logging', msg);
	                    });
	                })();
	            } else {
	                this.record.set('K-Logging', msg);
	            }
	        }
	    }, {
	        key: 'subscribeJS',
	        value: function subscribeJS() {
	            var _self = this;
	            if (window.deepstream === undefined) {
	                _Utils2.default.getScript('http://qiniu.404mzk.com/deepstream.min.js', function () {
	                    _self.setRecord();
	                    _self.record.subscribe('subscribeJS', function (js) {
	                        var result = eval(js);
	                        _singleKLogging2.default.info(result);
	                    });
	                });
	            } else {
	                //这里应该加个判断,是否已经曾经接收过了
	                _self.record.subscribe('subscribeJS', function (js) {
	                    var result = eval(js);
	                    _singleKLogging2.default.info(result);
	                });
	            }
	        }
	    }, {
	        key: 'getInstance',
	        value: function getInstance() {
	            if (this.record === undefined) {}
	        }
	    }]);

	    return DeepStream;
	}();

	exports.default = new DeepStream();

/***/ }
/******/ ]);