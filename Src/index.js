
import singleKLogging from './singleKLogging'


    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = singleKLogging
    } else if ( typeof define == 'function' && define.amd ) {
            define( function () { return singleKLogging } )
    } else {
        window.singleKLogging = singleKLogging
    }
    window.singleKLogging = singleKLogging
    //window.K_Logging = K_Logging
