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
  layoutsDir: path.join(__dirname, 'templates')
}));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'templates'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

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
        
        recipes.push({
          slug: path.basename(file, '.md'),
          title: attributes.title,
          date: attributes.date,
          categories: attributes.categories,
          tags: attributes.tags,
          description: body.split('##')[1].split('\n').filter(line => line.trim()).join(' ')
        });
      }
    }

    // Sort recipes by date (newest first)
    recipes.sort((a, b) => new Date(b.date) - new Date(a.date));

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
    
    // Parse the markdown content
    const sections = body.split('##').filter(section => section.trim());
    const parsedSections = {};
    
    sections.forEach(section => {
      const lines = section.split('\n').filter(line => line.trim());
      const title = lines[0].trim();
      const content = marked(lines.slice(1).join('\n'));
      
      parsedSections[title.toLowerCase()] = content;
    });
    
    res.render('recipe', {
      recipe: {
        ...attributes,
        ...parsedSections
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