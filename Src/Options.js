import Utils from './Utils'
import singleKLogging from './singleKLogging' 
export default class Options {
    
    static repleaceOptions(options) {
        
        if (options == undefined ) return Options.getDefaultOptions()

        let defaultOptions = singleKLogging.options || Options.getDefaultOptions(), //前者为layer时只替换部分属性
            keys = Object.keys(defaultOptions)
        
        for (var i = keys.length - 1; i >= 0; i--) {
            if (options[keys[i]] === undefined) {
                options[keys[i]] = defaultOptions[keys[i]]
            }
        }
        
        return options
    }

    static getDefaultOptions() {
        return   {
            app_key : Utils.getUuid(), //default
            open_level : ['info','warn','error'],
            method: ['console','display','website'],
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
        }
    }

    static layerOpenOptions() {
        return {
            open_level : ['info','warn','error'],
            method: ['console','display','website','k-report'],
            evel_js: false,//!singleKLogging.options , 
            switch_listener: false
        }
    }
}