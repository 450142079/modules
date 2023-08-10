export const cookie = {
    'versionDate' : '2023-08-11',
    
    'enabled' : navigator.cookieEnabled,
    'set' : (key, value) => {
        value = value.replace("\n\n", ' ');
        value = value.replace("\n", ' ');
        
        var date_end = new Date();
        date_end.setFullYear(date_end.getFullYear() + 7);
        
        document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + '; ' + 
        (window.location.protocol === 'https:' ? 'SameSite=None; Secure; ' : '') + 
        'path=/; domain=' + window.location.host + '; expires=' + date_end.toUTCString();
    },
    'get' : (key) =>  {
        key = encodeURIComponent(key);
        var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    'remove' : (key) => {
        key = encodeURIComponent(key);
        
        var date_end = new Date(0);
        
        document.cookie = key + '=; SameSite=None; Secure; path=/; domain=.' + 
        window.location.host + '; expires=' + date_end.toUTCString();
    },
    'clear' : () => {
        var array_cookie = document.cookie.split(';');
        var name = '';
        while (name = array_cookie.pop())
            app.cookie.del((name.split('=')[0]).trim());
    },
    'show' : () => {
        console.log(document.cookie.split(';').map(function(value) { 
            return value.split('=').map(function(value1) {
                return value1.trim();
            }).join(' = ');
        }).join("\n\n"));
    }
}