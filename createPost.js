const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const id = uuidv4();

fs.mkdirSync('./posts', { recursive: true });

fs.writeFile(`./posts/${id}.md`, 'Conteúdo do seu post', (err) => {
    if (err) throw err;
    console.log('The file create!');
});