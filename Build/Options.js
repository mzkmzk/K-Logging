'use strict';

exports.__esModule = true;

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _singleKLogging = require('./singleKLogging');

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