# Cooking Recipe Blog Stack

This stack helps users create a simple markdown-based blog for sharing cooking recipes.

## Purpose

The purpose of this stack is to provide a straightforward way to:
- Create and organize cooking recipes in markdown format
- Display recipes with proper formatting and styling
- Allow for easy navigation between recipes
- Support recipe categories and tags
- Enable recipe search functionality

## Project Structure

```
cooking-recipe-stack/
├── public/              # Static assets
│   ├── css/             # Stylesheets
│   ├── js/              # Client-side JavaScript
│   └── images/          # Image assets
├── recipes/             # Markdown recipe files
├── templates/           # HTML templates
├── index.js             # Main application file
├── package.json         # Node.js dependencies
└── README.md            # Project documentation
```

## Recipe Format

Recipes should be written in markdown with the following structure:

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

## Development Tasks

As the AI assistant, you should help users with:
1. Setting up the initial project structure
2. Creating and formatting recipe markdown files
3. Implementing the blog functionality
4. Styling the blog
5. Adding features like categories, tags, and search
6. Deploying the blog

## Technologies

This stack uses:
- HTML/CSS for the frontend
- JavaScript for interactivity
- Markdown for content
- Node.js for the backend