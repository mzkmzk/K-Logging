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