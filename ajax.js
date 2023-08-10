export const ajax = {
    'versionDate' : '2023-08-11',
    //'test':true,
    
    'handleResponse' : (callback = console.log, data, arg) => {
        if (data === undefined) 
            callback()
        else if (arg === undefined) 
            callback(data)
        else 
            callback(data, arg)
    },
    
    
    
    'json' : (url, data = {}, callback = console.log, arg) => {
        if (!url) 
            throw new Error('URL are required.')
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) 
                throw new Error(response.status + ' : ' + response.statusText)
            
            //if (ajax.test) console.log(response.text())
            return response.json()   
        })
        .then(responseJson => {
            ajax.handleResponse(callback, responseJson, arg)
        })
        .catch(error => {
            console.error(error)
        });
    },
    
    
    'getText' : (url, callback = console.log, arg) => {
        if (!url) 
            throw new Error('URL are required.')
            
        fetch(url)
        .then(response => response.text())
        .then(text => {
            ajax.handleResponse(callback, text, arg)
        })
        .catch(error => {
            console.error(error)
        })
    }
    
}

//window.ajax = ajax