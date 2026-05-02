// utils/formatPrice.js
export const formatted = (string) => {
    // Если price — строка, преобразуем в число
    const num = typeof string === 'string' ? parseFloat(string) : string;
    
    // Проверка на валидность числа
    if (isNaN(num)) {
        return '0';
    }
    
    // Форматирование с пробелами
    return num.toLocaleString('ru-RU');
};