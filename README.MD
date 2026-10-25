# Watch Catalog

A simple, responsive watch catalog website built with plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies.

Visitors can browse the watches, search by name or brand, filter by brand and type, sort by price and open a detail window for each watch. Customers contact the seller through the WhatsApp number shown on the page.

> This is a demo project. The watches, prices and phone number are sample data.

## Features

- Product grid that adapts to any screen size (phone, tablet, desktop)
- Live search, brand and type filters, and price sorting
- Detail window with specs for each watch
- Automatic light and dark mode
- Watch images generated with SVG code (easy to replace with real photos)
- Fully commented code, written to be easy to learn from

## Project structure

```
index.html   page structure
styles.css   all the design (colors, layout, dark mode)
data.js      phone number, currency and the list of watches
app.js       search, filters, sorting and the detail window
```

## Customize it

Everything you would normally change is at the top of `data.js`:

- `PHONE`: the contact number shown on the page
- `CURRENCY`: the currency symbol shown before prices
- `WATCHES`: the list of watches. To add one, copy a line and change its values

## Built with

HTML5, CSS3 (variables, Grid, Flexbox, media queries) and vanilla JavaScript.