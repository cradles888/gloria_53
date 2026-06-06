export const formatted = (string) => {
    const num = typeof string === 'string' ? parseFloat(string) : string;
    
    if (isNaN(num)) {
        return '0';
    }
    
    return num.toLocaleString('ru-RU');
};