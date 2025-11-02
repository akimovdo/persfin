// Отладочный скрипт для проверки расчета days_difference
console.log("=== Отладка расчета days_difference ===");

// Проверяем текущую дату
const now = new Date();
console.log("Текущая дата:", now.toISOString());
console.log("Текущая дата (только дата):", now.toISOString().split('T')[0]);

// Проверяем дату погашения
const repaymentDate = new Date('2025-10-31');
console.log("Дата погашения:", repaymentDate.toISOString());
console.log("Дата погашения (только дата):", repaymentDate.toISOString().split('T')[0]);

// Симулируем расчет как в SQLite
function julianDay(date) {
    // Упрощенная версия julianday для отладки
    const epoch = new Date('1970-01-01');
    const julianEpoch = 2440588; // Julian day для 1 января 1970
    const msPerDay = 24 * 60 * 60 * 1000;
    
    return julianEpoch + (date.getTime() / msPerDay);
}

const julianNow = julianDay(now);
const julianRepayment = julianDay(repaymentDate);
const julianToday = julianDay(new Date(now.getFullYear(), now.getMonth(), now.getDate())); // Только дата

console.log("Julian day (сейчас с временем):", julianNow);
console.log("Julian day (сегодня без времени):", julianToday);
console.log("Julian day (дата погашения):", julianRepayment);

const diffWithTime = Math.floor(julianRepayment - julianNow);
const diffWithoutTime = Math.floor(julianRepayment - julianToday);

console.log("Разность с временем:", diffWithTime);
console.log("Разность без времени:", diffWithoutTime);

console.log("=== Ожидаемый результат ===");
console.log("Должно быть:", diffWithoutTime, "(отрицательное число = просрочка)");