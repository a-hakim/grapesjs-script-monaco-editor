# Grapesjs Script Monaco Editor

Attach script to selected component with Monaco Editor integration

> Monaco Editor v5.4 integrated for enhanced JavaScript editing experience.
> Try to add after all components.

<p align="center">
  <img src="screenshot.png" alt="screenshot.png">
</p>

[DEMO](https://codepen.io/ju99ernaut/pen/NWNEWpV)

### HTML
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet">
<script src="https://unpkg.com/grapesjs"></script>
<script src="dist/grapesjs-script-monaco-editor.min.js"></script>

<div id="gjs"></div>
```

### JS
```js
const editor = grapesjs.init({
	container: '#gjs',
  height: '100%',
  fromElement: true,
  storageManager: false,
  plugins: ['grapesjs-script-monaco-editor'],
  pluginsOpts: {
    'grapesjs-script-monaco-editor': {
      // Monaco Editor specific options
      monacoOptions: {
        theme: 'vs-dark', // 'vs', 'vs-dark', 'hc-black'
        fontSize: 14,
        wordWrap: 'on',
        minimap: { enabled: false },
        folding: true,
        lineNumbers: 'on'
      }
    }
  }
});
```

### CSS
```css
body, html {
  margin: 0;
  height: 100%;
}
```


## Summary

* Plugin name: `grapesjs-script-monaco-editor`
* Integrates Monaco Editor v5.4 for enhanced JavaScript editing
* Commands
    * `edit-script`

## Features

✨ **Monaco Editor Integration**: Full-featured code editor with syntax highlighting, IntelliSense, and error detection  
🎨 **Multiple Themes**: Support for VS Code themes (vs, vs-dark, hc-black)  
🔍 **Smart Features**: Code completion, bracket matching, folding, and find/replace  
⚡ **Real-time Validation**: JavaScript syntax validation with inline error highlighting  
📱 **Responsive**: Automatic layout adjustment and mobile-friendly design  

## Options

| Option | Description | Default |
|-|-|-
| `starter` | Starter code | `let el = this` |
| `toolbarIcon` | Toolbar icon for opening script modal | `<i class="fa fa-file-code-o"></i>` | 
| `scriptTypesSupport` | Component types to allow script editing | `['default', 'wrapper', 'text', 'textnode', 'image', 'video', 'svg']` |
| `toolbarBtnCustomScript` | Options to pass when extending toolbar | `{}` |
| `onRun` | Logic to run if debug is successful | `() => console.log('valid syntax')` |
| `onError` | Logic to run if debug finds errors | `err => console.log('error:',err)` |
| `modalTitle` | Title for script modal | `Script` |
| `monacoOptions` | Monaco Editor configuration options | See Monaco Editor Options below |
| `buttonLabel` | Label for the default save button | `Save` |
| `commandAttachScript` | Object to extend the default `edit-script` command | `{}` |

### Monaco Editor Options (`monacoOptions`)

| Option | Description | Default |
|-|-|-
| `theme` | Editor theme: `'vs'`, `'vs-dark'`, `'hc-black'` | `'vs-dark'` |
| `fontSize` | Font size in pixels | `14` |
| `wordWrap` | Word wrap: `'on'`, `'off'`, `'wordWrapColumn'`, `'bounded'` | `'on'` |
| `minimap.enabled` | Show/hide minimap | `false` |
| `folding` | Enable code folding | `true` |
| `lineNumbers` | Show line numbers: `'on'`, `'off'`, `'relative'`, `'interval'` | `'on'` |
| `automaticLayout` | Automatically adjust layout | `true` |
| `scrollBeyondLastLine` | Allow scrolling beyond last line | `false` |
| `tabSize` | Tab size | `2` |
| `insertSpaces` | Insert spaces instead of tabs | `true` |



## Download

* Local Build
  * Clone this repository and run `npm install && npm run build`
  * Use `dist/grapesjs-script-monaco-editor.min.js`
* GIT
  * `git clone https://github.com/a-hakim/grapesjs-script-monaco-editor.git`



## Usage

Directly in the browser
```html
<link href="https://unpkg.com/grapesjs/dist/css/grapes.min.css" rel="stylesheet"/>
<script src="https://unpkg.com/grapesjs"></script>
<script src="dist/grapesjs-script-monaco-editor.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container: '#gjs',
      height: '100%',
      plugins: ['grapesjs-script-monaco-editor'],
      pluginsOpts: {
        'grapesjs-script-monaco-editor': {
          monacoOptions: {
            theme: 'vs-dark',
            fontSize: 16,
            wordWrap: 'on',
            minimap: { enabled: true }
          }
        }
      }
  });
</script>
```

Modern javascript (ES6 Modules)
```js
import grapesjs from 'grapesjs';
import plugin from './dist/grapesjs-script-monaco-editor.min.js';
import 'grapesjs/dist/css/grapes.min.css';

const editor = grapesjs.init({
  container : '#gjs',
  height: '100%',
  plugins: [plugin],
  pluginsOpts: {
    [plugin]: {
      monacoOptions: {
        theme: 'vs-dark',
        fontSize: 14,
        automaticLayout: true
      }
    }
  }
});
```



## Development

Clone the repository

```sh
$ git clone https://github.com/Ju99ernaut/grapesjs-script-editor.git
$ cd grapesjs-script-editor
```

Install dependencies

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

Build the source

```sh
$ npm run build
```



## License

MIT
