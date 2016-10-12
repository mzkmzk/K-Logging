
import Logging from './Logging'


    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = Logging
    } else if ( typeof define == 'function' && define.amd ) {
            define( function () { return Logging } )
    } else {
        window.Logging = Logging
    }
    window.Logging = Logging
