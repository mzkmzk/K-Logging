import Options from './Options'
import Utils from './Utils'
import singleDeepStream from './singleDeepStream'

 class K_Logging {
    constructor() {
        this.data = {
            'info': [],
            'warn': [],
            'error': [] 
        }
        this.options = Options.getDefaultOptions()
        this.deepStream = singleDeepStream   
    }

    setOptions(options) {
        this.options = Options.repleaceOptions(options) 

        if(this.options.open_level.indexOf('error')) {
            this.listenWindowError()
        }

        if(this.options.evel_js === true) {
            console.log(this.deepStream.subscribeJS())
            //this.deepStream.subscribeJS()
        }
    }

    listenWindowError(){
        let _self = this
        window.onerror = function (msg, url, lineNo, columnNo, error) {
            var string = msg.toLowerCase()
            var substring = 'script error'
            if (string.indexOf(substring) > -1){
                _self.error('Script Error: See Browser Console for Detail')
            } else {
                var message = [
                    'Message: ' + msg,
                    'URL: ' + url,
                    'Line: ' + lineNo,
                    'Column: ' + columnNo,
                    'Error object: ' + JSON.stringify(error)
                ].join(' - ')

                _self.error(message)
            }

            return false
        }
    }

    log(msg = '',level = 0) {
        msg = this.packagingMsg(msg, level)
        
        //屏蔽级别
        if( this.options.open_level.indexOf(level) === -1)  return

        //选择输出口
        if(this.options.method.indexOf('console') !== -1) {
            this.console(msg,level)
        }
        if(this.options.method.indexOf('display') !== -1) {
            this.display(msg,level)
        }
        if(this.options.method.indexOf('website') !== -1) {
            this.website(msg,level)
        }
    }

    packagingMsg(msg = '', level = 0) {
        let packagingMsg = {
            'date': Utils.getDate(),
            level,
            msg
        }
        return JSON.stringify(packagingMsg)
    }

    console(msg = '', level = 0) {
        if (level === 'info') {
            console.log(msg)
        }else if (level === 'warn') {
            console.warn(msg)
        }else if (level === 'error') {
            console.error(msg)
        }
    }

    display(msg = '', level = 0) {}

    website(msg = '') {
        this.deepStream.sendMsg(msg)
        //this.deepStream.record.set('firstname', msg)
    }

    info(msg = '') {
        this.log(msg,'info')
    }

    warn(msg = '') {
        this.log(msg,'warn')
    }

    error(msg = '') {
        this.log(msg,'error')
    }
}

export default new K_Logging()

