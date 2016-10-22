import Options from './Options'
import Utils from './Utils'
import singleDeepStream from './singleDeepStream'

 class K_Logging {
    constructor() {

        let localstrage_uuid = localStorage.getItem('k_logging_uuid')
        this.data = {
            'info': [],
            'warn': [],
            'error': [] 
        }
        this.options = Options.getDefaultOptions()
        this.deepStream = singleDeepStream  
        this.url = window.location.href
        if (localstrage_uuid) {
            this.uuid = localstrage_uuid
        } else {
            let uuid = Utils.getUuid()
            localStorage.setItem('k_logging_uuid',uuid)
            this.uuid = uuid
        }
    }

    setOptions(options) {
        this.options = Options.repleaceOptions(options) 

        if(this.options.open_level.indexOf('error')) {
            this.listenWindowError()
        }

        if(this.options.evel_js === true) {
            this.deepStream.subscribeJS()
        }

        if(this.options.switch_listener === true) {
            this.openSwitchListneer()
        }

    }
    
    /*
     * 监听浏览器自己的error,并捕抓出来
     */
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
    
    /*
     * 监听keyup事件,当密钥输入正确时,启动配置全开
     */
    openSwitchListneer() {
        window.k_logging_key = ''
        let  _self = this,
            switchListneerFunction = function(event){
                window.k_logging_key += Utils.asciiToInt(event.keyCode)
                console.log(window.k_logging_key)
                if (window.k_logging_key.indexOf(_self.options.app_key) !== -1) {
                    _self.setOptions(Options.layerOpenOptions())
                    document.body.removeEventListener('keyup',switchListneerFunction)
                }
            }

        document.body.addEventListener('keyup',switchListneerFunction)


        
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
            msg,
            'uuid': this.uuid,
            'url': this.url
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

