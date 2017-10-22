(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("k_logging", [], factory);
	else if(typeof exports === 'object')
		exports["k_logging"] = factory();
	else
		root["k_logging"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	'use strict';

	__webpack_require__(1);

	var _singleKLogging = __webpack_require__(2);

	var _singleKLogging2 = _interopRequireDefault(_singleKLogging);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	//import 'babel-polyfill'
	module.exports = _singleKLogging2['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	if (!Object.keys) {
	  Object.keys = function () {
	    var hasOwnProperty = Object.prototype.hasOwnProperty,
	        hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
	        dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
	        dontEnumsLength = dontEnums.length;

	    return function (obj) {
	      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

	      var result = [];

	      for (var prop in obj) {
	        if (hasOwnProperty.call(obj, prop)) result.push(prop);
	      }

	      if (hasDontEnumBug) {
	        for (var i = 0; i < dontEnumsLength; i++) {
	          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
	        }
	      }
	      return result;
	    };
	  }();
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _Options = __webpack_require__(3);

	var _Options2 = _interopRequireDefault(_Options);

	var _Utils = __webpack_require__(4);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _Display = __webpack_require__(5);

	var _Display2 = _interopRequireDefault(_Display);

	var _singleDeepStream = __webpack_require__(6);

	var _singleDeepStream2 = _interopRequireDefault(_singleDeepStream);

	var _CONSTANT = __webpack_require__(7);

	var _CONSTANT2 = _interopRequireDefault(_CONSTANT);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Utils = __webpack_require__(4);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _singleKLogging = __webpack_require__(2);

	var _singleKLogging2 = _interopRequireDefault(_singleKLogging);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Options = function () {
	    function Options() {
	        _classCallCheck(this, Options);
	    }

	    Options.repleaceOptions = function repleaceOptions(options) {

	        if (options == undefined) return Options.getDefaultOptions();

	        var defaultOptions = _singleKLogging2['default'].options || Options.getDefaultOptions(),
	            //前者为layer时只替换部分属性
	        keys = Object.keys(defaultOptions);

	        for (var i = keys.length - 1; i >= 0; i--) {
	            if (options[keys[i]] === undefined) {
	                options[keys[i]] = defaultOptions[keys[i]];
	            }
	        }

	        return options;
	    };

	    Options.getDefaultOptions = function getDefaultOptions() {
	        return {
	            app_key: _Utils2['default'].getUuid(), //default
	            open_level: ['info', 'warn', 'error'],
	            method: ['console', 'display', 'website'],
	            no_listen_jquery_ajax: false,
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
	    };

	    Options.layerOpenOptions = function layerOpenOptions() {
	        return {
	            open_level: ['info', 'warn', 'error'],
	            method: ['console', 'display', 'website', 'k-report'],
	            evel_js: false, //!singleKLogging.options , 
	            switch_listener: false
	        };
	    };

	    return Options;
	}();

	exports['default'] = Options;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Utils = function () {
	    function Utils() {
	        _classCallCheck(this, Utils);
	    }

	    Utils.getScript = function getScript(url, callback) {
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
	    };

	    Utils.getDate = function getDate() {
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
	    };

	    Utils.addZero = function addZero(num) {
	        if (num < 10) {
	            return '0' + num;
	        }
	        return num;
	    };

	    Utils.getUrlArgs = function getUrlArgs(name) {
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
	    };

	    Utils.getUuid = function getUuid() {
	        function s4() {
	            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	        }
	        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	    };

	    Utils.asciiToInt = function asciiToInt(ascii) {
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
	    };

	    Utils.clickToNum = function clickToNum(event) {
	        var client_width_half = document.documentElement.clientWidth / 2,
	            client_height_half = document.documentElement.clientHeight / 2,
	            click_x = event.x,
	            click_y = event.y;
	        if (click_x > client_width_half && click_y < client_height_half) {
	            return 1;
	        } else if (click_x < client_width_half && click_y < client_height_half) {
	            return 2;
	        } else if (click_x < client_width_half && click_y > client_height_half) {
	            return 3;
	        } else if (click_x > client_width_half && click_y > client_height_half) {
	            return 4;
	        } else {
	            return 0;
	        }
	    };

	    return Utils;
	}();

	exports['default'] = Utils;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Utils = __webpack_require__(4);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _Options = __webpack_require__(3);

	var _Options2 = _interopRequireDefault(_Options);

	var _singleKLogging = __webpack_require__(2);

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Utils = __webpack_require__(4);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _singleKLogging = __webpack_require__(2);

	var _singleKLogging2 = _interopRequireDefault(_singleKLogging);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

	    DeepStream.prototype.setRecord = function setRecord() {
	        if (this.record === undefined) {
	            //防止多次连接 会有多个websocket连接
	            var client = window.deepstream('120.24.37.206:6020').login();
	            this.record = client.record.getRecord(_singleKLogging2['default'].options.app_key || 'K-Logging');
	        }
	    };

	    DeepStream.prototype.sendMsg = function sendMsg(msg) {
	        var _this = this;

	        //消息频率较高时,会执行多次加载脚本
	        if (window.deepstream === undefined) {
	            (function () {
	                var _self = _this;

	                _Utils2['default'].getScript('http://qiniu.404mzk.com/deepstream.min.js', function () {
	                    _self.setRecord();
	                    _self.record.set('K-Logging', msg);
	                });
	            })();
	        } else {
	            this.record.set('K-Logging', msg);
	        }
	    };

	    DeepStream.prototype.subscribeJS = function subscribeJS() {
	        var _self = this;
	        if (window.deepstream === undefined) {
	            _Utils2['default'].getScript('http://qiniu.404mzk.com/deepstream.min.js', function () {
	                _self.setRecord();
	                _self.record.subscribe('subscribeJS', function (js) {
	                    var result = eval(js);
	                    _singleKLogging2['default'].info(result);
	                });
	            });
	        } else {
	            //这里应该加个判断,是否已经曾经接收过了
	            _self.record.subscribe('subscribeJS', function (js) {
	                var result = eval(js);
	                _singleKLogging2['default'].info(result);
	            });
	        }
	    };

	    DeepStream.prototype.getInstance = function getInstance() {
	        if (this.record === undefined) {}
	    };

	    return DeepStream;
	}();

	exports['default'] = new DeepStream();

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = {
	    URL: {
	        LOG_INSERT: 'http://k-inner-report.404mzk.com/v1/Creator_Log_Controller/query'
	    }
	};

/***/ }
/******/ ])
});
;