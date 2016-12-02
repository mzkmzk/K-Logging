import Utils from './Utils'
import Options from './Options'
import singleKLogging from './singleKLogging'

class Display {

    constructor(options){
        let div_display = document.getElementById('k-logging') 

        if (div_display == null)  {
            div_display = document.createElement('div')
            div_display.style.position = 'fixed'
            div_display.setAttribute('id','k-logging')
            document.body.appendChild(div_display)
        }
        //还没把css注入和隐藏显示
        //let div_display_html = '\
        //    appendChild\
        //'
        let div_display_html = `\
            <h3>K-Logging \
                <span onclick="document.getElementById("k-logging").style.display = none;" style="float: right;cursor: pointer;">关闭\
                </span>\
            </h3>\
            <textarea id="k-logging-msg">\ 
            </textarea>`
        div_display.innerHTML = div_display_html


    }

    sendMsg(msg) {
        let k_logging_msg = document.getElementById('k-logging-msg')
        k_logging_msg.value += msg+'\n' 
    }

}

export default Display