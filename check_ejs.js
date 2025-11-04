const fs = require('fs');

const content = fs.readFileSync('pb_hooks/pages/dashboard/_private/accruals_all_with_status.ejs', 'utf-8');
const lines = content.split('\n');

let stack = [];
let inScript = false;

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  
  // Отслеживаем script теги
  if (line.includes('<script')) inScript = true;
  if (line.includes('</script>')) inScript = false;
  
  if (inScript) return; // Пропускаем JS внутри script
  
  // Ищем открывающие теги
  const openMatches = line.match(/<%(?!=|#|-)/g) || [];
  openMatches.forEach(() => {
    stack.push({ line: lineNum, content: line.substring(0, 80) });
  });
  
  // Ищем закрывающие теги
  const closeMatches = line.match(/%>/g) || [];
  closeMatches.forEach(() => {
    if (stack.length === 0) {
      console.log(`❌ Line ${lineNum}: Close tag without open tag`);
      console.log(`   ${line.substring(0, 80)}`);
    } else {
      stack.pop();
    }
  });
});

if (stack.length > 0) {
  console.log(`\n❌ UNCLOSED TAGS: ${stack.length}`);
  stack.forEach(item => {
    console.log(`   Line ${item.line}: ${item.content}`);
  });
} else {
  console.log('✅ All tags are balanced!');
}
