# Cooking Recipes

A simple markdown blog for sharing cooking recipes.

## Overview

This stack provides everything you need to create a beautiful, functional recipe blog using markdown files. It's designed to be simple to set up and easy to maintain, perfect for home cooks who want to share their recipes online.

## Features

- Write recipes in simple markdown format
- Organize recipes by categories and tags
- Beautiful, responsive design using Water.css (a classless CSS framework)
- Clean, elegant styling without writing any CSS classes
- Search functionality to find recipes quickly
- Easy to customize and extend

## Getting Started

1. Clone this repository:
   ```
   git clone https://github.com/xyzshantaram/cooking-recipe-stack.git
   cd cooking-recipe-stack
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Adding Recipes

Create a new markdown file in the `recipes` directory with the following format:

```markdown
---
title: Recipe Title
date: YYYY-MM-DD
categories: [Category1, Category2]
tags: [Tag1, Tag2, Tag3]
prepTime: 30 minutes
cookTime: 45 minutes
servings: 4
---

## Description
A brief description of the recipe.

## Ingredients
- Ingredient 1
- Ingredient 2
- Ingredient 3

## Instructions
1. Step 1
2. Step 2
3. Step 3

## Notes
Any additional notes or tips.
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.