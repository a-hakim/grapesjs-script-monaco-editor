import { cmdId } from './consts';
import * as monaco from 'monaco-editor';

export default (editor, opts = {}) => {
    const cm = editor.Commands;
    const md = editor.Modal;
    const domc = editor.Components;
    const {
        modalTitle,
        monacoOptions,
        commandAttachScript,
        toolbarIcon,
        onRun,
        onError,
        starter
    } = opts;
    let scriptTypesSupport = opts.scriptTypesSupport;

    let content = null;

    const appendToContent = (target, content) => {
        if (content instanceof HTMLElement) {
            target.appendChild(content);
        } else if (content) {
            target.insertAdjacentHTML('beforeend', content);
        }
    };

    if (editor.$.isString(scriptTypesSupport)) {
        scriptTypesSupport = scriptTypesSupport.split(',');
    }

    if (editor.$.isArray(scriptTypesSupport)) {
        scriptTypesSupport = scriptTypesSupport.includes('*') ?
            domc.getTypes().map(c => c.id) : scriptTypesSupport;
    }

    // Add icons to specified component types
    scriptTypesSupport && scriptTypesSupport.forEach(type => {
        const typeOpt = domc.getType(type).model;
        domc.addType(type, {
            model: {
                initToolbar() {
                    typeOpt.prototype.initToolbar.apply(this, arguments);
                    const tb = this.get('toolbar');
                    const tbExists = tb.some(item => item.command === cmdId);

                    if (!tbExists) {
                        tb.unshift({
                            command: cmdId,
                            label: toolbarIcon,
                            ...opts.toolbarBtnCustomScript
                        });
                        this.set('toolbar', tb);
                    }
                }
            }
        });
    })

    // Add the script command
    cm.add(cmdId, {
        run(editor, sender, opts = {}) {
            this.editor = editor;
            this.options = opts;
            this.target = opts.target || editor.getSelected();
            const target = this.target;

            if (target) this.showCustomCode(target);
        },

        stop(editor) {
            // Clean up Monaco Editor instance
            if (this.codeViewer && this.codeViewer.dispose) {
                this.codeViewer.dispose();
                this.codeViewer = null;
                this.monacoEditor = null;
            }
            md.close();
        },

        /**
         * Method which tells how to show the custom code
         * @param  {Component} target
         */
        showCustomCode(target) {
            const { editor, options } = this;
            const title = options.title || modalTitle;
            if (!content) content = this.getContent();
            let code = target.getScriptString() || starter;
            md.open({
                title,
                content
            }).getModel().once('change:open', () => editor.stopCommand(this.id));
            this.getCodeViewer().setContent(code);
        },

        /**
         * Custom pre-content. Can be a simple string or an HTMLElement
         */
        getPreContent() {},

        /**
         * Custom post-content. Can be a simple string or an HTMLElement
         */
        getPostContent() {},

        /**
         * Get all the content for the custom code
         * @return {HTMLElement}
         */
        getContent() {
            const { editor } = this;
            const content = document.createElement('div');
            const pfx = editor.getConfig('stylePrefix');
            content.className = `${pfx}attach-script monaco-script-editor`;
            
            // Add Monaco Editor styles
            if (!document.getElementById('monaco-script-editor-styles')) {
                const style = document.createElement('style');
                style.id = 'monaco-script-editor-styles';
                style.textContent = `
                    .monaco-script-editor {
                        display: flex;
                        flex-direction: column;
                        height: 500px;
                    }
                    .monaco-editor-container {
                        flex: 1;
                        min-height: 400px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        overflow: hidden;
                    }
                    .monaco-editor .margin {
                        background-color: #1e1e1e !important;
                    }
                `;
                document.head.appendChild(style);
            }
            
            appendToContent(content, this.getPreContent());
            const codeViewer = this.getCodeViewer();
            
            // Use setTimeout to ensure Monaco Editor renders properly after DOM insertion
            setTimeout(() => {
                codeViewer.refresh();
                codeViewer.focus();
            }, 100);
            
            content.appendChild(codeViewer.getElement());
            appendToContent(content, this.getPostContent());
            appendToContent(content, this.getContentActions());

            return content;
        },

        /**
         * Get the actions content. Can be a simple string or an HTMLElement
         * @return {HTMLElement|String}
         */
        getContentActions() {
            const { editor } = this;
            const actions = document.createElement('div');
            actions.id = "actns";
            actions.style.display = "flex";
            actions.style.justifyContent = "space-between";
            actions.style.marginTop = "16px";
            const btn = document.createElement('button');
            const pfx = editor.getConfig('stylePrefix');
            btn.innerHTML = opts.buttonLabel;
            btn.className = `${pfx}btn-prim ${pfx}btn-save__inject-logic`;
            btn.onclick = () => this.handleSave();

            const runLogic = document.createElement('div');
            runLogic.id = "logic-toolbar";
            runLogic.className = "fa fa-bug";
            runLogic.style = "padding:10px;background:rgba(0,0,0,0.2);border-radius:3px;border:1px solid rgba(0,0,0,0.2);cursor:pointer";
            runLogic.onclick = () => this.runCode();

            actions.appendChild(runLogic);
            actions.appendChild(btn);

            return actions;
        },

        /**
         * Handle the main save task
         */
        handleSave() {
            const { editor, target } = this;
            const code = this.getCodeViewer().getContent();
            target.set('script', code);
            editor.Modal.close();
        },

        /**
         * Return the Monaco Editor instance
         * @return {Object}
         */
        getCodeViewer() {
            const { editor } = this;

            if (!this.codeViewer) {
                try {
                    // Create Monaco Editor container
                    const container = document.createElement('div');
                    container.style.height = '400px';
                    container.style.width = '100%';
                    container.className = 'monaco-editor-container';
                    
                    // Monaco Editor configuration
                    const monacoConfig = {
                        value: '',
                        language: 'javascript',
                        theme: 'vs-dark',
                        automaticLayout: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        wordWrap: 'on',
                        fontSize: 14,
                        lineNumbers: 'on',
                        folding: true,
                        tabSize: 2,
                        insertSpaces: true,
                        detectIndentation: false,
                        renderWhitespace: 'selection',
                        selectOnLineNumbers: true,
                        roundedSelection: false,
                        readOnly: false,
                        cursorStyle: 'line',
                        cursorBlinking: 'blink',
                        contextmenu: true,
                        mouseWheelZoom: false,
                        ...monacoOptions,
                    };
                    
                    // Initialize Monaco Editor
                    this.monacoEditor = monaco.editor.create(container, monacoConfig);

                    // Add JavaScript completion and validation
                    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
                        noSemanticValidation: false,
                        noSyntaxValidation: false,
                    });

                    // Create wrapper object to match expected interface
                    this.codeViewer = {
                        getElement: () => container,
                        setContent: (code) => {
                            if (this.monacoEditor) {
                                this.monacoEditor.setValue(code || '');
                            }
                        },
                        getContent: () => {
                            return this.monacoEditor ? this.monacoEditor.getValue() : '';
                        },
                        refresh: () => {
                            if (this.monacoEditor) {
                                setTimeout(() => this.monacoEditor.layout(), 0);
                            }
                        },
                        focus: () => {
                            if (this.monacoEditor) {
                                this.monacoEditor.focus();
                            }
                        },
                        dispose: () => {
                            if (this.monacoEditor) {
                                this.monacoEditor.dispose();
                                this.monacoEditor = null;
                            }
                        }
                    };
                } catch (error) {
                    console.error('Failed to initialize Monaco Editor:', error);
                    // Fallback to a simple textarea
                    const container = document.createElement('div');
                    const textarea = document.createElement('textarea');
                    textarea.style.width = '100%';
                    textarea.style.height = '400px';
                    textarea.style.fontFamily = 'monospace';
                    textarea.style.fontSize = '14px';
                    container.appendChild(textarea);
                    
                    this.codeViewer = {
                        getElement: () => container,
                        setContent: (code) => textarea.value = code || '',
                        getContent: () => textarea.value,
                        refresh: () => {},
                        focus: () => textarea.focus(),
                        dispose: () => {}
                    };
                }
            }

            return this.codeViewer;
        },

        /**
         * Evaluate code syntax
         */
        runCode() {
            try {
                const code = this.getCodeViewer().getContent();
                
                // Basic syntax validation using Monaco's built-in validation
                if (this.monacoEditor && monaco.languages) {
                    // Get model markers (errors/warnings)
                    const model = this.monacoEditor.getModel();
                    const markers = monaco.editor.getModelMarkers({ resource: model.uri });
                    
                    if (markers.length > 0) {
                        const errors = markers.filter(m => m.severity === monaco.MarkerSeverity.Error);
                        if (errors.length > 0) {
                            const error = new Error(`Syntax Error: ${errors[0].message} at line ${errors[0].startLineNumber}`);
                            throw error;
                        }
                    }
                }
                
                // Test code execution in a safe context
                const testFunction = new Function('"use strict"; return function() { ' + code + ' }');
                testFunction();
                
                console.log("Script validation passed");
                onRun && onRun();
            } catch (err) {
                console.error("Script validation error:", err);
                onError && onError(err);
                
                // Highlight error in Monaco Editor if possible
                if (this.monacoEditor && err.line) {
                    this.monacoEditor.setSelection({
                        startLineNumber: err.line,
                        startColumn: 1,
                        endLineNumber: err.line,
                        endColumn: 1
                    });
                    this.monacoEditor.focus();
                }
            }
        },

        ...commandAttachScript,
    });
}