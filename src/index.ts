import commands from './commands';

export interface PluginOptions {
  // Starter code
  starter?: string;

  toolbarIcon?: string;

  // Component types to allow script editing
  // Avoid components with predefined scripts
  scriptTypesSupport?: string[] | string;

  // Object to extend the default component's toolbar button for the code
  // Pass a falsy value to avoid adding the button
  toolbarBtnCustomScript?: Record<string, any>;

  // On run success
  onRun?: () => void;

  // Logic when there is an error on run
  onError?: (err: Error) => void;

  // Title for the custom code modal
  modalTitle?: string;

  // Textarea label
  codeLabel?: string;

  // Monaco Editor options
  monacoOptions?: Record<string, any>;

  // Monaco Loader options
  monacoLoaderOptions?: Record<string, any>;

  // Label for the default save button
  buttonLabel?: string;

  // Object to extend the default inject logic command
  commandAttachScript?: Record<string, any>;
}

declare global {
  interface Window {
    monaco: any;
  }
}

export default (editor: any, opts: PluginOptions = {}) => {
  const options: Required<PluginOptions> = {
    // Starter code
    starter: 'let el = this',

    toolbarIcon: '<i class="fa fa-file-code-o"></i>',

    // Component types to allow script editing
    // Avoid components with predefined scripts
    scriptTypesSupport: ['default', 'wrapper', 'text', 'textnode', 'image', 'video', 'svg'],

    // Object to extend the default component's toolbar button for the code
    toolbarBtnCustomScript: {},

    // On run success
    onRun: () => console.log('valid syntax'),

    // Logic when there is an error on run
    onError: (err: Error) => console.log('error', err),

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

    // Monaco Loader options
    monacoLoaderOptions: {
      version: '0.54.0'
    },

    // Label for the default save button
    buttonLabel: 'Save',

    // Object to extend the default inject logic command
    commandAttachScript: {},
    
    ...opts
  };

  // Load commands
  commands(editor, options);
};