export const app = {
    'versionDate' : '2023-08-11',
    
    'show' : (text = 'Hello', id = 'app') => {
        let element = document.getElementById(id)
        if (element) element.innerHTML = text
    },
    
    
    'stringToInt' : (text) =>  {
        text = String(text)
        text = parseInt( text.replace(/\D+/g, '') )
        if(Number.isNaN(text)) text = 0
        return text
    },
    'focusElementById' : (id) => {
        let element = document.getElementById(id)
        if (element) element.focus()
    },
    
    
    
    'jsonToObject' : (jsonString = '{}') => {
        try {
            return JSON.parse(jsonString)
        } catch (error) {
            console.log(['JSON X', error, jsonString])
        }
        return {}
    },
    'objectToJson' : (object = {}) => {
        return JSON.stringify(object)
    },
    
    
    'windowOnLoadAdd' : (event) => {
       if (window.onload)
          window.onload = window.onload + event
       else
          window.onload = event
    }
    
}