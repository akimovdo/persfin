const fs = require('fs');

const filePath = './pb_hooks/pages/dashboard/_private/accruals_all_with_status.ejs';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let stack = [];
let errors = [];

lines.forEach((line, index) => {
    const lineNum = index + 1;
    
    // Ищем открывающие теги
    let match;
    const openRegex = /<%/g;
    while ((match = openRegex.exec(line)) !== null) {
        stack.push({
            type: 'open',
            line: lineNum,
            col: match.index,
            text: line.substring(match.index, Math.min(match.index + 30, line.length))
        });
    }
    
    // Ищем закрывающие теги
    const closeRegex = /%>/g;
    while ((match = closeRegex.exec(line)) !== null) {
        if (stack.length === 0) {
            errors.push(`Line ${lineNum}: Closing %> without opening <%`);
        } else {
            stack.pop();
        }
    }
});

if (stack.length > 0) {
    console.log(`\nUnclosed tags found: ${stack.length}`);
    stack.forEach(tag => {
        console.log(`Line ${tag.line}: ${tag.text}...`);
    });
} else if (errors.length > 0) {
    console.log('\nErrors found:');
    errors.forEach(err => console.log(err));
} else {
    console.log('\n✅ All EJS tags are balanced!');
}
