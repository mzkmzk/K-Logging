import Utils from './Utils'
import Options from './Options'
import singleKLogging from './singleKLogging'

class Display {

    constructor(options){
        let div_display = document.getElementById('k-logging') 

        if (div_display == null)  {
            div_display = document.createElement('div')
            div_display.style.cssText = 'position:fixed;top:0;left:0;z-index:999'
            div_display.style.position = 'fixed'
            div_display.setAttribute('id','k-logging')
            document.body.appendChild(div_display)


            let div_display_html = `
            <h3>K-Logging 
                <span onclick="document.getElementById('k-logging').style.display = 'none';" style='float: right;cursor: pointer;'>关闭
                </span>
            </h3>
            <textarea id='k-logging-msg' style='resize:auto;width:200px;height:200px' placeholder='k-logging display'></textarea>`
            div_display.innerHTML = div_display_html

            if(options.evel_js === true) {


                div_display.innerHTML += `
                    <textarea id='k-logging-evel'  style='resize:auto;width:100px;height:200px' placeholder='eval_js'></textarea>
                    <buttom id='eval_js_buttom'>确定</buttom>
                `
                document.getElementById('eval_js_buttom').addEventListener('click',function(){
                    eval(document.getElementById('k-logging-evel').value)
                })

                
            }

        }

        if(options.method.indexOf('display') === -1 ) {
            div_display.style.display = 'none'
        }else {
            div_display.style.display = 'block'
        }

    }

    sendMsg(msg) {
        let k_logging_msg = document.getElementById('k-logging-msg')
        k_logging_msg.value += msg+'\n' 
    }

}

export default Display