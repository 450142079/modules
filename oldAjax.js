export const oldAjax = {
    'ajax' : function(url, data, fun_callback, fun_arg) {
        if (!fun_callback) fun_callback = console.log;
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        if (!data) request.send();
        else request.send(Object.keys(data).map(function(key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }).join('&'));
    
        request.onreadystatechange = function() {
            if (request.status !== 200) console.log(request.status + ': ' + request.statusText);
            else if(request.readyState !== 4 || !('responseText' in request)) return false;
            else if (fun_arg === undefined) fun_callback(request.responseText);
            else fun_callback(request.responseText, fun_arg);
        };
    },
    'ajax_json' : function(url, data, fun_callback, fun_arg) {
        
        if (!fun_callback) fun_callback = console.log;
    
        var request = new XMLHttpRequest();
        request.open('POST', url, true);
        request.setRequestHeader('Content-type', 'application/json');
        request.send(JSON.stringify(data));
    
        request.onreadystatechange = function() {
            if (request.status !== 200) console.log(request.status + ': ' + request.statusText);
            else if(request.readyState !== 4 || !('responseText' in request)) return false;
            else {
                var result = {};
                try { result = JSON.parse(request.responseText); }
                catch(e) { console.log(['JSON [X]', e, request.responseText]); }
    
                if (fun_arg === undefined) fun_callback(result);
                else fun_callback(result, fun_arg);        
            }
        }
    },
    'ajax_type' : function(type, data, fun_callback, fun_arg) {
        if (typeof data === 'undefined') 
            data = {};
        data.type = type;
        oldAjax.ajax_json(oldAjax.ajax_url, data, fun_callback, fun_arg);
    },
    'ajax_with_files' : function(type, data, input_file, fun_callback, fun_arg) {
        data.type = type;
        if (!fun_callback) fun_callback = console.log;
        
        var request = new XMLHttpRequest();
        request.open('POST', oldAjax.ajax_url, true);
        //request.setRequestHeader('Content-type', 'application/json');
        
        var form_data = new FormData();
        form_data.append('data', JSON.stringify(data));
        
        if ('0' in input_file.files)
            form_data.append('file', input_file.files[0], input_file.files[0].name);
        // input_file.files.length
        request.send(form_data);
        
        request.onreadystatechange = function() {
            if (request.status != 200) console.log(request.status + ': ' + request.statusText);
            else if(request.readyState !== 4) return false;
            else {
                var result = {};
                try { result = JSON.parse(request.responseText); }
                catch(e) { console.log(['JSON [X]', e, request.responseText]); }
    
                if (fun_arg === undefined) fun_callback(result);
                else fun_callback(result, fun_arg);        
            }
        }
    }
    
}