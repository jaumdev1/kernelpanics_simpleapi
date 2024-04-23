const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const corsOptions = {
    origin: 'https://kernelpanic.club', 
    optionsSuccessStatus: 200 
};
  app.use(cors(corsOptions));
const port = 4000;

app.get('/', (req, res) => {
    res.send('API online');
});

app.get('/posts', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const start = (page - 1) * limit;
    const end = page * limit;

    fs.readdir('./posts', (err, files) => {
        if (err) {
            res.status(500).send('Erro ao ler a pasta de posts');
            return;
        }

        const posts = files
            .filter(file => path.extname(file) === '.md')
            .slice(start, end)
            .map(file => {
                let content = fs.readFileSync(`./posts/${file}`, 'utf-8');
                const title = content.split('\n')[0].replace('#', '').trim();  // Pega a primeira linha do conteúdo como título
                const id = path.basename(file, '.md'); // Remove a extensão do nome do arquivo para obter o ID
                const stats = fs.statSync(`./posts/${file}`);
                const createdAt = stats.birthtime;
                const author = 'João';
                //reset content to empty string
                content = '';
                return { id, title, content, author, createdAt };
            });

        res.json(posts);
    });
});

app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    const file = `./posts/${id}.md`;

    fs.readFile(file, 'utf-8', (err, content) => {
        if (err) {
            res.status(404).send('Post não encontrado');
            return;
        }

        const title = content.split('\n')[0].replace('#', '').trim();
        const stats = fs.statSync(file);
        const createdAt = stats.birthtime;
        const author = 'João';
        
        res.json({ id, title,content , author, createdAt });
    });
});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});