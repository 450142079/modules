export const telega = {
    'versionDate' : '2023-08-11',
    
    'main': () => {
        if (!Telegram) return;
        
        // На всю высоту
        Telegram.WebApp.expand()
        
    },
    'user':{},
    
    
    // Стандартная telegram авторизация
    'onAuth' : (user) => {
        telega.user = user
    },
    
    
    'chatId': () => (
        Telegram &&
        Telegram.WebApp &&
        Telegram.WebApp.initDataUnsafe &&
        Telegram.WebApp.initDataUnsafe.user &&
        Telegram.WebApp.initDataUnsafe.user.id ? 
            Telegram.WebApp.initDataUnsafe.user.id : 0
    ),
    
    
    
}