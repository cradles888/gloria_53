export const formatText = (text) => {
    return text.replace(/&nbsp;/g, '\u00A0');
};

export const formatTextWithBreaks = (text) => {
    if (!text) return null;
    
    const textWithNonBreakingSpaces = text.replace(/&nbsp;/g, '\u00A0');
    
    const parts = textWithNonBreakingSpaces.split(/<br\s*\/?>/i);
    
    if (parts.length === 1) return textWithNonBreakingSpaces;
    
    return parts.reduce((acc, part, index) => {
        if (index === 0) return [part];
        return [...acc, <br key={index} />, part];
    }, []);
};