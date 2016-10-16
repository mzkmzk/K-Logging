
export default class Utils {
    static getScript(url, callback) {
        let head = document.getElementsByTagName('head')[0],
            js = document.createElement('script')
        js.setAttribute('type', 'text/javascript')
        js.setAttribute('src', url)
        head.appendChild(js)
        //执行回调
        let callbackFn = function(){
                if(typeof callback === 'function'){
                    callback()
                }
            }
        if (document.all) { //IE
            js.onreadystatechange = function() {
                if (js.readyState == 'loaded' || js.readyState == 'complete') {
                    callbackFn()
                }
            }
        } else {
            js.onload = function() {
                callbackFn()
            }
        }
    }

    static getDate() {
        let date = new Date(),
        Y = date.getFullYear() + '-',
        M = Utils.addZero(date.getMonth()+1) + '-',
        D = Utils.addZero(date.getDate()) + ' ',
        h = Utils.addZero(date.getHours() ) + ':',
        m = Utils.addZero(date.getMinutes()) + ':',
        s = Utils.addZero(date.getSeconds())

        return (Y+M+D+h+m+s)
    }

    static addZero(num) {
        if(num < 10 ) {
            return '0' + num
        }
        return num
    }

    static getUrlArgs(name) {
        let args = {},
            query = window.location.search.substring(1),
            pairs = query.split('&')
        for (var i = pairs.length - 1; i >= 0; i--) {
            let pos = pairs[i].indexOf('='),
                name = pairs[i].substring(0,pos),
                value = pairs[i].substring(pos+1, pairs[i].length)
            args[name] = value
        }
        if(name == undefined) return args
        return args[name]    
    }

    static getUuid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1)
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4()
    }
}