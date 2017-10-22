'use strict';

exports.__esModule = true;

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _singleKLogging = require('./singleKLogging');

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