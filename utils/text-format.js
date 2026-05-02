export const formatText = (text) => {
    // Заменяем &nbsp; на неразрывный пробел Unicode
    return text.replace(/&nbsp;/g, '\u00A0');
};

export const formatTextWithBreaks = (text) => {
    if (!text) return null;
    
    // Сначала заменяем &nbsp; на неразрывный пробел Unicode
    const textWithNonBreakingSpaces = text.replace(/&nbsp;/g, '\u00A0');
    
    // Разбиваем по <br/> тегам
    const parts = textWithNonBreakingSpaces.split(/<br\s*\/?>/i);
    
    // Если нет тегов <br/>, возвращаем текст с заменёнными &nbsp;
    if (parts.length === 1) return textWithNonBreakingSpaces;
    
    // Создаем массив с JSX элементами
    return parts.reduce((acc, part, index) => {
        if (index === 0) return [part];
        return [...acc, <br key={index} />, part];
    }, []);
};