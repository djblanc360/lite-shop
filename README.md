# Lite Shop

An e-commerce experience intended to have minimal dependencies. This web application relies on the creation of custom web components. 

## Description

* filter products by categories

* manages a shopping cart

* user can navigate to the /account page to create new products

* user can upload multiple images for a product by uploading multiple images at once, max is 4

* handles product pruchasing

## Getting Started

### Dependencies

The number of depdencies should reduce as this project progresses. Most of the depedencies facilitate the use of webpack and supplement the backend:
* browser-sync: Synchronizes file changes across multiple devices for live browser reloads

* browser-sync-webpack-plugin: Integrates BrowserSync with Webpack for live reloading

* concurrently: Runs multiple commands concurrently

* css-loader: Resolves CSS imports in JavaScript

* html-loader: Exports HTML as a string for JavaScript consumption

* html-webpack-plugin: Simplifies the creation of HTML files to serve Webpack bundles

* node-sass: Compiles SCSS to CSS

* nodemon: Automatically restarts the server on file changes

* sass-loader: Loads and compiles SCSS files

* style-loader: Injects CSS into the DOM

* to-string-loader: Converts imported content into a string

* webpack: Bundles JavaScript files for usage in the browser

* webpack-cli: CLI for Webpack

* express: node framework for routing and serving files

* multer: middleware for uploading files.\

### Installing

1. Install dependencies on local environment
```
npm install
```

### Running

1. Run the following command in the root directory:
```
npm start
```

The applicaton will automatically run on your browser at http://localhost:9000



## Future Updates
* Finish creating the carousel component to allow for the use carousel sliders (ideally without the use of a framework)

* Pass responsive media queries to carousel component

* Media image gallery modal on mobile

* Uploading one image after the other will not overwrite the first image, have remove button function for images

* User can edit the products

* User can delete the products

* Media image gallery turns into a modal on mobile view

* Lock /account page behind authentication. Authorized users have edit / remove product functionality

* Inventory functionality

* Create more style web components

* Retrieve products from server

* Create a more in-depth, robust backend. Remove the use of Express and Multer

## Authors

* [@Daryl Blancaflor](djblanc360@gmail.com)

## Version History

* 0.1
    * Initial Release
    * 