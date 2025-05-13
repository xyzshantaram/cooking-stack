const express = require('express');
const { engine } = require('express-handlebars');
const fs = require('fs').promises;
const path = require('path');
const frontMatter = require('front-matter');
const { marked } = require('marked');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars as the view engine
app.engine('html', engine({
  extname: '.html',
  defaultLayout: 'layout',
  layoutsDir: path.join(__dirname, 'templates'),
  helpers: {
    formatDate: function (date) {
      const d = new Date(date);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
}));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'templates'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
  res.render('test', { name: 'Shan', layout: false });
});

// Home page route
app.get('/', async (req, res) => {
  try {
    // Read all recipe files
    const recipeFiles = await fs.readdir(path.join(__dirname, 'recipes'));
    const recipes = [];

    // Process each recipe file
    for (const file of recipeFiles) {
      if (path.extname(file) === '.md') {
        const content = await fs.readFile(path.join(__dirname, 'recipes', file), 'utf8');
        const { attributes, body } = frontMatter(content);
        // Find the Description section
        let description = '';
        const descMatch = body.match(/## Description\n([\s\S]*?)(\n## |$)/);
        if (descMatch) {
          description = descMatch[1].trim().replace(/\n+/g, ' ');
        }
        recipes.push({
          slug: path.basename(file, '.md'),
          title: attributes.title,
          date: attributes.date,
          tags: attributes.tags,
          description: description || 'No description.'
        });
      }
    }

    // Sort recipes by date (newest first)
    recipes.sort((a, b) => new Date(b.date) - new Date(a.date));

    console.log('Parsed recipes:', recipes);

    res.render('home', {
      recipes,
      title: 'Home'
    });
  } catch (error) {
    console.error('Error loading recipes:', error);
    res.status(500).send('Error loading recipes');
  }
});

// Individual recipe route
app.get('/recipe/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const filePath = path.join(__dirname, 'recipes', `${slug}.md`);
    const content = await fs.readFile(filePath, 'utf8');

    const { attributes, body } = frontMatter(content);
    const htmlBody = marked(body); // parse full Markdown body to HTML

    res.render('recipe', {
      recipe: {
        ...attributes,
        body: htmlBody,
        slug
      },
      title: attributes.title
    });
  } catch (error) {
    console.error('Error loading recipe:', error);
    res.status(404).send('Recipe not found');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
