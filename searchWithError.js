/*
Принцип: если было более 30% совпадений сочетаний 3 букв, то будет список отсортированный по количеству совпадений

Если все сочетания 3х букв слова, которое ищем, нашлись в названии, которое 3 раза перевёрнуто по клавиатуре Привет Ghbdtn Privet Зкшмуе.
Значит это то, что искали.. 
Иначе выставляем сколько % найденно.
И потом сортируем по этим %
*/
export const searchWithError = {
    'versionDate':'2023-08-10',
    'minProbability' : 29,
    'delay' : 300,
    
    'quantityСharacters' : 3,
    'data' : {
        'keys':[],
        'arrays':[]
    },

    /*
        Получение данных в виде 
        ключ : текст для поиска
    */
    'setDatabase' : (data) => {
        searchWithError.data.keys = Object.keys(data)
        searchWithError.data.arrays = searchWithError.data.keys.map(key => searchWithError.textToFullSetNumbers(data[key]))
    },
    
    /*
        Преобразовать одно слово в соединении букв в виде цифр
        Привет
        [[п,р,и],[р,и,в],[и,в,е],[в,е,т]]
        [[1087,1088,1080],[1088,1080,1074],[1080,1074,1077],[1074,1077,1090]]
        [108710881080, 108810801074, 108010741077, 107410771090]
        sort
        set
    */
    'textToSetNumbers' : (text) => {
        if (text === '') 
            return new Set();
        
        let characters = text.toLowerCase().split('')
        
        return new Set(
            Array.from({
                    'length' : (text.length + 1 - searchWithError.quantityСharacters)
                }, (_, i) => Number(characters.slice(i, i + searchWithError.quantityСharacters)
                    .map(character => character.charCodeAt())
                    .join('')
                )
            ).sort()
        )
    },
    
    /*
        Вывести все варианты слова в виде массива
        Привет
        [привет, ghbdtn, privet, зкшмук]
    */
    'textToVariantsText' : (text) => {
        text = text.toLowerCase()
            
        return Array.from(new Set([
            text,
            searchWithError.textRuToEn(text), // бруско => brusko
            searchWithError.textEnToRu(text),
            
            searchWithError.textRuKeyToEn(text), // икгылщ => brusko
            searchWithError.textEnKeyToRu(text), // hecrj => бруско
            
            searchWithError.textRuKeyToEn(searchWithError.textEnKeyToRu(text)), // hecrj => бруско => brusko
            searchWithError.textRuKeyToEn(searchWithError.textEnToRu(text)) 
            //searchWithError.textEnToRu(searchWithError.textRuKeyToEn(text))
        ]))    
    }, 
    /*
        Преобразовать слово варианты слов,
        варианты в цифры соединений букв
        и всё в один сет
        Привет
        [привет, ghbdtn, privet, зкшмук]
        Set(2) { 1, 2 } Set(2) { 1, 2 } Set(2) { 1, 2 }
        Set(7) { 1, 2, 3, 4, 5, 6, 7 }
    */
    'textToFullSetNumbers': (text) => {
        let variantsText = searchWithError.textToVariantsText(text)
        return variantsText
            .map(text => searchWithError.textToSetNumbers(text))
            .reduce((result, set0) => {
                set0.forEach((value) => result.add(value))
                return result;
            }, new Set())
    },
    
    
    'lettersMapping': {
        'RuToEn' : {
        	'а': 'a', 'б': 'b', 'в': 'v',
        	'г': 'g', 'д': 'd', 'е': 'e',
        	'ё': 'ye', 'ж': 'zh', 'з': 'z',
        	'и': 'i', 'й': 'y', 'к': 'k',
        	'л': 'l', 'м': 'm', 'н': 'n',
        	'о': 'o', 'п': 'p', 'р': 'r',
        	'с': 's', 'т': 't', 'у': 'u',
        	'ф': 'f', 'х': 'h', 'ц': 'c',
        	'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
        	'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e',
        	'ю': 'yu', 'я': 'ya', ' ':' '
    	},
    	'EnToRu': {
    	    'a':'а', 'b':'б', 'c':'ц', 
    	    'd':'д', 'e':'е', 'f':'ф', 
    	    'g':'г', 'h':'х', 'i':'и', 
    	    'j':'ж', 'k':'к', 'l':'л', 
    	    'm':'м', 'n':'н', 'o':'о', 
    	    'p':'п', 'q':'к', 'r':'р', 
    	    's':'с', 't':'т', 'u':'у', 
    	    'v':'в', 'w':'в', 'x':'кс', 
    	    'y':'й', 'z':'з'
    	},
        'EnKeyToRu' : {
        	'q':'й', 'w':'ц', 'e':'у',
        	'r':'к', 't':'е', 'y':'н',
        	'u':'г', 'i':'ш', 'o':'щ',
        	'p':'з', '[':'х', ']':'ъ',
        	'a':'ф', 's':'ы', 'd':'в',
        	'f':'а', 'g':'п', 'h':'р',
        	'j':'о', 'k':'л', 'l':'д',
        	';':'ж', '\'':'э', 'z':'я',
        	'x':'ч', 'c':'с', 'v':'м',
        	'b':'и', 'n':'т', 'm':'ь',
        	',':'б', '.':'ю', ' ':' '
        },
        'RuKeyToEn': {
            ' ':' ', 'а':'f', 'б':',',
            'в':'d', 'г':'u', 'д':'l',
            'е':'t', 'ж':';', 'з':'p',
            'и':'b', 'й':'q', 'к':'r',
            'л':'k', 'м':'v', 'н':'y',
            'о':'j', 'п':'g', 'р':'h',
            'с':'c', 'т':'n', 'у':'e',
            'ф':'a', 'х':'[', 'ц':'w',
            'ч':'x', 'ш':'i', 'щ':'o',
            'ъ':']', 'ы':'s', 'ь':'m',
            'э':'\'', 'ю':'.', 'я':'z'
        },
    	'textTo': (text, lettersMapping) => {
            return text
                .toLowerCase()
                .split('')
                //.filter(character => lettersMapping[character])
                .map(character => lettersMapping[character] ? lettersMapping[character] : character)
                .join('')
    	}
    },
    // бруско => brusko
    'textRuToEn': (text) => { 
        return searchWithError.lettersMapping.textTo(text, searchWithError.lettersMapping.RuToEn)
    },
    'textEnToRu': (text) => { 
        return searchWithError.lettersMapping.textTo(text, searchWithError.lettersMapping.EnToRu)
    },
    // икгылщ => brusko
    'textRuKeyToEn' : (text) => {
        return searchWithError.lettersMapping.textTo(text, searchWithError.lettersMapping.RuKeyToEn)
    },
    // ,hecrj => бруско
    'textEnKeyToRu' : (text) => {
        return searchWithError.lettersMapping.textTo(text, searchWithError.lettersMapping.EnKeyToRu)
    },


    // Выдаёт отсортированные ид или пустой массив
    'search' : (searchText = '', callback = console.log, quantity = 50, arg) => {
        clearTimeout(searchWithError.timer)
        searchWithError.timer = setTimeout(() => {
            // При очистке поиска очищать блок
            if(searchText === '' || searchText.length < 3) {
                searchWithError.handleResponse(callback, [], arg)
                return;
            }
            
            let searchNumbers = searchWithError.textToSetNumbers(searchText)
            let searchNumbersArray = Array.from(searchNumbers)
            
            let result = searchWithError.data.arrays
                .map((itemNumbers, index) => 
                    [
                        index,
                        Math.round(
                            searchNumbersArray
                                .filter(number => itemNumbers.has(number)).length 
                            * 100 / searchNumbersArray.length
                        )
                    ]
                )
                .filter(indexAndPercent => indexAndPercent[1] > searchWithError.minProbability)
                .sort((indexAndPercent0, indexAndPercent1) => indexAndPercent0[1] < indexAndPercent1[1])
                .map(indexAndPercent => searchWithError.data.keys[indexAndPercent[0]])
            
            if (quantity)
                result = result
                    .filter((_, index) => index < quantity)
            
            searchWithError.handleResponse(callback, result, arg)
        },  searchWithError.delay)
    },
    
    // Обработка ответа
    'handleResponse' : (callback = console.log, data, arg) => {
        if (data === undefined) 
            callback()
        else if (arg === undefined) 
            callback(data)
        else 
            callback(data, arg)
    }
}
