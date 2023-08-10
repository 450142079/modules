window.viewConsole = {
'versionDate' : '2023-08-11',

'view' : () => {
    return `<textarea id="console_result" style="width:100%;height:280px;box-sizing: border-box;">result</textarea>
<textarea id="console_input" style="width:100%;height:120px;box-sizing: border-box;">alert(5)</textarea>

<center><button  onClick="viewConsole.send()">Выполнить</button></center>`
},
'send' : () => {
    let console_input = document.getElementById('console_input')
    if (!console_input) return;
    
    eval(`let data = [${console_input.value}];
data = data[0];
if (typeof data === 'object')
    data = Object.keys(data).join("\\n");
let console_result = document.getElementById('console_result');
if (console_result)
    console_result.value += \`\\n\\n=== ${console_input.value} === \\n\` + data;`
)

    },



    'listenError' : () => {
        window.addEventListener('error', (event) => { viewConsole.error(event); } );
    },

    'error' : (event) => {
        let error = event.error
        let data = {
            'message': error.message,
            'file': error.filename,
            'line': error.lineno + ':' + error.colno,
            
            'url':location.href,
            'userAgent': navigator.userAgent
            //'time_at_start_page': Math.ceil(error.timeStamp/1000)+'s'
        }
        
        //JSON.stringify(data)
        let dataText = Object.keys(data).map((key) => `${key} : ${data[key]}`).join("\n")
        
        let console_result = document.getElementById('console_result')
        if (console_result)
            console_result.value += `\n\n=== error === \n${dataText}`
    }

}

export const viewConsole = window.viewConsole
