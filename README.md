# GrapesJS Script Editor with Monaco Editor

Attach script to selected component with Monaco Editor integration

This plugin adds the possibility to attach JavaScript code to any component with the powerful Monaco Editor (the same editor that powers VS Code).

![GrapesJS Script Editor with Monaco Editor](https://raw.githubusercontent.com/a-hakim/grapesjs-script-monaco-editor/master/preview.png)

## Features
- **Rich Syntax Highlighting** - JavaScript syntax highlighting with error detection
- **IntelliSense** - Intelligent code completion and validation
- **Themes** - Multiple built-in themes (VS Dark, VS Light, High Contrast)
- **Advanced Editing** - Multi-cursor support, find and replace, code folding, and more
- **Performance** - Optimized for large files and better rendering performance
- **Accessibility** - Better screen reader support and keyboard navigation

> Requires GrapesJS v0.14.25 or higher

## Quick Start

```javascript
// That's it! Monaco Editor loads automatically
grapesjs.init({
  container: '#gjs',
  plugins: ['grapesjs-script-monaco-editor']
});
```

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
      // Monaco Editor loads automatically with these options
      monacoOptions: {
        theme: 'vs-dark', // 'vs', 'vs-dark', 'hc-black'
        fontSize: 14,
        wordWrap: 'on',
        minimap: { enabled: false },
        folding: true,
        lineNumbers: 'on'
      },
      // Monaco Loader configuration (optional)
      monacoLoaderOptions: {
        version: '0.54.0'  // Specify Monaco Editor version
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
* Integrates Monaco Editor with automatic CDN loading
* Commands
    * `edit-script`

## Features

✨ **Monaco Editor Integration**: Full-featured code editor with syntax highlighting, IntelliSense, and error detection  
🎨 **Multiple Themes**: Support for VS Code themes (vs, vs-dark, hc-black)  
🔍 **Smart Features**: Code completion, bracket matching, folding, and find/replace  
⚡ **Real-time Validation**: JavaScript syntax validation with inline error highlighting  
📱 **Responsive**: Automatic layout adjustment and mobile-friendly design  
🚀 **CDN Loading**: Automatic Monaco Editor loading from CDN without manual setup

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
| `monacoOptions` | **New:** Monaco Editor specific options (see below) | `{ theme: 'vs-dark', language: 'javascript', ... }` |
| `monacoLoaderOptions` | **New:** Monaco Editor loading configuration | `{ version: '0.54.0' }` |
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

### Monaco Loader Options (`monacoLoaderOptions`)

| Option | Description | Default |
|-|-|-
| `version` | Monaco Editor version to load from CDN | `'0.54.0'` |
| `baseUrl` | Custom base URL for Monaco Editor | `https://unpkg.com/monaco-editor@{version}/min/vs` |

## Development

### Build
```bash
npm run build
```

### Start Development Server
```bash
npm start
```

### Dependencies
This plugin now uses `grapesjs-cli` for building and development, following the same pattern as other modern GrapesJS plugins. Monaco Editor is loaded automatically from CDN, eliminating the need for webpack configuration or monaco-editor-webpack-plugin.