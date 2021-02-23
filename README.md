# Chinese-English Exchange Discord Server Resource List

This project that builds the resource list for the Chinese-English exchange discord server: [https://discord.gg/c-e](https://discord.gg/c-e). The resource list is accessible in either [markdown](https://github.com/espaspw/Resource-Guide/blob/master/resources.md) or as a [GitHub Pages site](https://espaspw.github.io/Resource-Guide/).

GitHub is accessible from within China and generally across all English-speaking and Chinese-language-speaking countries.  Although this is currently tailored towards people learning Chinese, our server is intended to serve as resources for both English and Chinese-language learners.

## Additional Articles

- [Detailed Explanation of Chinese IMEs](https://github.com/espaspw/Resource-Guide/blob/master/doc/IMEs.md)


## Design
The primary use case is meant to be the GitHub Pages html site. Its design was chosen to be minimal:
1. Generated using Javascript
2. Quick filtering using a simple tag system
3. Table and lists created with YAML links file

The following libraries are used:

1. HTML statically generated using [Handlebars](https://handlebarsjs.com/)
2. CSS prefixing using [Autoprefixer](https://github.com/postcss/autoprefixer)
3. Minification using [Minify (Terser, Html-minifier, Clean-css)](https://github.com/coderaiser/minify)
4. Markdown parser using [Marked](https://github.com/markedjs/marked)

We are using YAML as the file format because:
1. Supports the tree structure that fits well with an organised list
2. Readable by both developer and computer
3. You can have reference nodes in more than one place
4. Can include comments

## Building


The build process is done in Javascript. Thus the primary dependencies will be:
- [Node](https://nodejs.org/en/) >= v14.x.x

The rest of the build dependencies will be downloaded through node's package manager.

To build, follow the steps below:


- First obtain a local copy of this repository
```sh 
git clone 'https://github.com/espaspw/Resource-Guide.git'
```

- Install dependencies given in package.json
```sh
npm install
```

- Run the build script
```sh
npm run build
```

## Contributing

For any of the following cases, please submit a pull request.
### Adding or Modifying Links

The YAML file **supports markdown** for some elements, and its use is recommended over plain HTML elements.

Tags are usually optional, but if they are omitted, then they will show regardless of the selected filter. However, *overview* elements without tags will be hidden if all other entries in that category are hidden by filters.

For the following, 
- 🅜  represents elements that can be written in markdown
- ⓞ represents optional elements

The YAML file has the following structure:

- `page-title` 🅜 : Title at top of page
- `page-description` 🅜 : Description underneath title
- `avaliable-tags`: Tag groups and tags used
- `avaliable-tags[tag-group]`: A list of tags in a tag-group. The tag-group and tags should be capitalized.
- `categories`: All categories representing a section of the page with a title and entries within
- `categories[category-name]`: Category name should be capitalized by convention

The category structure depends on whether it is of type `list` or `table`.

If it is of type `table`:
- `categories[category-name].type`: Should be set to 'table'
- `categories[category-name].columns`: List of column names
- `categories[category-name].overview` ⓞ: List of overview entries
  - `tags` ⓞ: List of tags for the overview entry
  - `text` 🅜 : Text inside of the overview entry
- `categories[category-name].entries`: List of table entries
  - `tags` ⓞ: List of tags for row
  - `rows` 🅜 : List of text representing columns. Should ideally match with length of column headers.

If it is of type `list`:
- `categories[category-name].type`: Should be set to 'list'
- `categories[category-name].overview` ⓞ: List of overview entries
  - `tags` ⓞ: List of tags for the overview entry
  - `text` 🅜 : Text inside of the overview entry
- `categories[category-name].entries`: List of resource entries
  - `tags` ⓞ: List of tags for resource entry
  - `title`: Title of resource and represents the clickable link
  - `subtitle` ⓞ: Subtext on same line as title, but not clickable
  - `author` ⓞ: Author name on same line as title. Adds a 'by' in front, so this should just be the name only.
  - `url`: Link to the url. The link will be followed if the title is clicked on.
  - `desc` 🅜ⓞ: A description of the resource. Should be preferably text, but other sublinks can be added here.

### Changing the Styling or Source Code

#### Project Structure

All the source files are located in the `src` folder, with the exception of `links.yaml`, which is located in the root.

Handlebar templates used in the static generation stage is found in the `src/templates` folder.

The javascript and css files in the `src` folder are minified and outputted in the `build` folder. The specific file names are specified in the `index.js` entry script.

#### Dev Server

To modify and improve the source code, a development server can be started with:
```
npm run dev
```

This will watch the source files and update build files when something changes.

The output of the build will also be previewed using live-server which watches the build folder.


## License
GPL v3.0

