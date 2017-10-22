import './polyfill'
import Options from './Options'
import Utils from './Utils'
import Display from './Display'
import singleDeepStream from './singleDeepStream'
import CONSTANT from './CONSTANT'

 class K_Logging {
    constructor() {
        try {
            let localstrage_uuid = window.localStorage && localStorage.getItem('k_logging_uuid')
            this.data = {
                'info': [],
                'warn': [],
                'error': [] 
            }
            this.options = Options.getDefaultOptions()
            

            this.url = window.location.href
            if (localstrage_uuid) {
                this.uuid = localstrage_uuid
            } else {
                let uuid = Utils.getUuid()
                localStorage.setItem('k_logging_uuid',uuid)
                this.uuid = uuid
            }
        }catch(e){}
        
    }

    setOptions(options) {
        this.options = Options.repleaceOptions(options) 
        
        //if(this.options.method.indexOf('display') !== -1 ) { 为了正式环境下没开也可以看调试信息
        this.k_display = new Display(this.options)
        //}

        this.deepStream = singleDeepStream  

        if(this.options.open_level.indexOf('error') !== -1) {
            this.listenWindowError()
        }

        if(this.options.evel_js === true && this.options.method.indexOf('website') !== -1) {
            this.deepStream.subscribeJS()
        }
        
        if ( this.options.no_listen_jquery_ajax === false) {
            this.listenJqueryAjax()
        }

        if(this.options.switch_listener === true) {
            this.openSwitchListneer()
        }

    }
    
    listenJqueryAjax(){
        let jqueryDocument = $ && $(document)
        if (jqueryDocument.ajaxComplete) {
            jQuery.ajaxPrefilter( "script", function( s ) {
                s.global = true;
               
            } );
              jqueryDocument.ajaxComplete(( event, request, settings ) => {
                if (!request) request ={}
                let result = {
                    category: 'k-logging',
                    name: 'jqueryAjaxComplete',
                    data: {
                        url: settings.url,
                        responseJSON: request.responseJSON,
                        readyState: request.readyState,
                        status: request.status
                    }
                }
                this.info(JSON.stringify(result))
            })
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
        window.k_logging_click_key = ''
        let  _self = this,
            switchKeyupListenerFunction = function(event){
                window.k_logging_key += Utils.asciiToInt(event.keyCode)
                if (window.k_logging_key.toLowerCase().indexOf(_self.options.app_key.toLowerCase()) !== -1) {
                    _self.setOptions(Options.layerOpenOptions())
                    document.body.removeEventListener('keyup',switchKeyupListenerFunction)
                }
            },
            clickNum = 432112344321,
            switchClickListenerFunction = function(event){
                window.k_logging_click_key += Utils.clickToNum(event)
                if (window.k_logging_click_key.indexOf(clickNum) !== -1  ) {
                    _self.setOptions(Options.layerOpenOptions())
                    document.body.removeEventListener('click',switchClickListenerFunction)
                }
            }

        document.body.addEventListener && document.body.addEventListener('keyup',switchKeyupListenerFunction)
        document.body.addEventListener && document.addEventListener('click',switchClickListenerFunction)

        
    }

    log(msg = '',level = 0) {
        let row_msg = msg
        msg = this.packagingMsg(msg, level)
        
        //屏蔽级别
        if( this.options.open_level.indexOf(level) === -1)  return

        //选择输出口
        if(this.options.method.indexOf('console') !== -1) {
            this.console(msg,level)
        }

        if(this.options.method.indexOf('k_report') !== -1) {
            this.k_report(msg,level)
        }

        //if(this.options.method.indexOf('display') !== -1) { 无论有无都输出到display,只不过把框框隐藏起来
            this.display(row_msg,level)
        //}
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

    display(msg = '', level = 0) {
        this.k_display.sendMsg(msg)
    }

    website(msg = '' ) {
        this.deepStream.sendMsg(msg)
        //this.deepStream.record.set('firstname', msg)
    }

    k_report(msg = '', level = 0) {
        new Image().src = CONSTANT.URL.LOG_INSERT + "?"
            + "message=" + encodeURIComponent(message) + "&"
            + "type=" + level + "&"
            + "referer=" + window.location.href +"&"
            + "t=" + new Date().getTime()
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



export default K_Logging

