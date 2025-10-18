import commands from './commands';
import * as monaco from 'monaco-editor';

// Configure Monaco Editor workers for web environment
if (typeof window !== 'undefined' && !window.MonacoEnvironment) {
    window.MonacoEnvironment = {
        getWorkerUrl: function (moduleId, label) {
            if (label === 'json') {
                return './vs/language/json/json.worker.js';
            }
            if (label === 'css' || label === 'scss' || label === 'less') {
                return './vs/language/css/css.worker.js';
            }
            if (label === 'html' || label === 'handlebars' || label === 'razor') {
                return './vs/language/html/html.worker.js';
            }
            if (label === 'typescript' || label === 'javascript') {
                return './vs/language/typescript/ts.worker.js';
            }
            return './vs/editor/editor.worker.js';
        }
    };
}

export default (editor, opts = {}) => {
    const options = {
        ...{
            // Starter code
            starter: 'let el = this',

            toolbarIcon: '<i class="fa fa-file-code-o"></i>',

            // Component types to allow script editing
            // Avoid components with predefined scripts
            scriptTypesSupport: ['default', 'wrapper', 'text', 'textnode', 'image', 'video', 'svg'],

            // Object to extend the default component's toolbar button for the code, eg. `{ label: '</>', attributes: { title: 'Open custom code' } }`
            // Pass a falsy value to avoid adding the button
            toolbarBtnCustomScript: {},

            // On run success
            onRun: () => console.log('valid syntax'),

            // Logic when there is an error on run
            onError: err => console.log('error', err),

            // Title for the custom code modal
            modalTitle: 'Script',

            // Textarea label
            codeLabel: 'JS',

            // Monaco Editor options
            monacoOptions: {
                theme: 'vs-dark',
                fontSize: 14,
                wordWrap: 'on',
                minimap: { enabled: false },
                automaticLayout: true,
                scrollBeyondLastLine: false,
                folding: true,
                lineNumbers: 'on',
                language: 'javascript'
            },

            // Label for the default save button
            buttonLabel: 'Save',

            // Object to extend the default inject logic command.
            // Check the source to see all available methods
            commandAttachScript: {},
        },
        ...opts
    };

    // load commands
    commands(editor, options);
};