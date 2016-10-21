import Utils from './Utils'
import singleKLogging from './singleKLogging'

class DeepStream {
    constructor() {
        //console.log('DeepStream.constructor被调用了')
        /*if(window.deepstream === undefined) { 
            Utils.getScript(
                'https://qiniu.404mzk.com/deepstream.min.js',
                this.setRecord()
            )
        }else {
            this.setRecord()
        }*/
            
    }

    setRecord() {
        if (this.record === undefined) { //防止多次连接 会有多个websocket连接
            let client = window.deepstream('120.24.37.206:6020').login()
            this.record = client.record.getRecord(singleKLogging.options.app_key || 'K-Logging')
        }
    }

    sendMsg(msg) {
        //消息频率较高时,会执行多次加载脚本
        if(window.deepstream === undefined) { 
            let _self = this

            Utils.getScript(
                'http://qiniu.404mzk.com/deepstream.min.js',
                function(){ 
                    _self.setRecord()
                    _self.record.set('K-Logging', msg)
                }
            )
        }else {
            this.record.set('K-Logging', msg)
        }
    }

    subscribeJS() {
        let _self = this
        if(window.deepstream === undefined) { 
            Utils.getScript(
                'http://qiniu.404mzk.com/deepstream.min.js',
                function(){ 
                    _self.setRecord()
                    _self.record.subscribe('subscribeJS', function(js) {
                        let result = eval(js)
                        singleKLogging.info(result)
                    })
                }
            )
        }else {
            //这里应该加个判断,是否已经曾经接收过了
            _self.record.subscribe('subscribeJS', function(js) {
                let result = eval(js)
                singleKLogging.info(result)
            })
        }
        
    }

    getInstance() {
        if (this.record === undefined) {

        }
    }



}

export default new DeepStream()