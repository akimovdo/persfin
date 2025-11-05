/**
 * Скрипт для проверки структуры RAW данных в таблице payments
 * Использование: node check_payment_raw_data.js
 */

const fs = require('fs');
const path = require('path');

// Путь к базе данных PocketBase
const DB_PATH = path.join(__dirname, 'pb_data', 'data.db');

console.log('🔍 Проверка структуры RAW данных в таблице payments...\n');

// Читаем SQL запрос для получения данных
const sqlite3 = require('sqlite3');

// Проверяем наличие sqlite3
try {
  require.resolve('sqlite3');
} catch (e) {
  console.error('❌ Модуль sqlite3 не установлен.');
  console.log('Установите его командой: npm install sqlite3');
  process.exit(1);
}

const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('❌ Ошибка подключения к БД:', err.message);
    process.exit(1);
  }
  
  console.log('✅ Подключено к базе данных\n');
});

// Получаем последние 5 записей с RAW данными
db.all(
  `SELECT id, transactionId, sum, raw 
   FROM payments 
   WHERE raw IS NOT NULL 
   ORDER BY created DESC 
   LIMIT 5`,
  [],
  (err, rows) => {
    if (err) {
      console.error('❌ Ошибка запроса:', err.message);
      db.close();
      process.exit(1);
    }
    
    if (rows.length === 0) {
      console.log('⚠️  В таблице payments нет записей с RAW данными');
      db.close();
      return;
    }
    
    console.log(`📊 Найдено ${rows.length} записей с RAW данными:\n`);
    
    rows.forEach((row, index) => {
      console.log(`${'='.repeat(80)}`);
      console.log(`Запись #${index + 1}`);
      console.log(`ID: ${row.id}`);
      console.log(`Transaction ID: ${row.transactionId}`);
      console.log(`Сумма в БД: ${row.sum}`);
      console.log(`\nRAW данные:`);
      
      try {
        const rawData = JSON.parse(row.raw);
        console.log(JSON.stringify(rawData, null, 2));
        
        // Анализ структуры
        console.log(`\n📋 Анализ структуры:`);
        console.log(`  Доступные ключи верхнего уровня: ${Object.keys(rawData).join(', ')}`);
        
        // Проверяем наличие суммы в разных вариантах
        const amountChecks = [
          { path: 'transactionAmount.amount', value: rawData.transactionAmount?.amount },
          { path: 'transactionAmount.Amount', value: rawData.transactionAmount?.Amount },
          { path: 'amount', value: rawData.amount },
          { path: 'Amount', value: rawData.Amount },
          { path: 'sum', value: rawData.sum },
          { path: 'Sum', value: rawData.Sum }
        ];
        
        console.log(`\n  🔍 Поиск суммы:`);
        amountChecks.forEach(check => {
          if (check.value !== undefined) {
            console.log(`    ✅ ${check.path} = ${check.value}`);
          } else {
            console.log(`    ❌ ${check.path} - не найдено`);
          }
        });
        
        if (rawData.transactionAmount) {
          console.log(`\n  📦 Структура transactionAmount:`);
          console.log(`    ${JSON.stringify(rawData.transactionAmount, null, 4)}`);
        }
        
      } catch (parseError) {
        console.error(`  ❌ Ошибка парсинга JSON:`, parseError.message);
      }
      
      console.log('');
    });
    
    console.log(`${'='.repeat(80)}\n`);
    
    db.close((err) => {
      if (err) {
        console.error('❌ Ошибка закрытия БД:', err.message);
      } else {
        console.log('✅ Анализ завершён');
      }
    });
  }
);
