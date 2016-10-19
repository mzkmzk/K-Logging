import Utils from './Utils'
export default class Options {
    
    static repleaceOptions(options) {
        
        if (options == undefined ) return Options.getDefaultOptions()

        let defaultOptions = Options.getDefaultOptions(),
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
            app_name : Utils.getUuid(),
            open_level : ['info','warn','error'],
            method: ['console','display','website'],
            evel_js: true
        }
    }
}