/**
 * Code Block Copy Button
 * 
 * Adds a button to code blocks that when clicked will copy the code block to
 * the clipboard.
 * 
 * This plugin is modified from the `markdown-it-code-copy` plugin for
 * markdown-it.
 * 
 * Original Source / Details: 
 *   URL:     https://github.com/DCsunset/markdown-it-code-copy/blob/e165b493506f5cdd0cc8309dd45b2b1b8e8468ea/index.js
 *   Licence: MIT
 *   Fetced:  29 Jan 25
 */

const Clipboard = require('clipboard');
let clipboard = new Clipboard('.code-copy');


const defaultOptions = {
    buttonStyle: 'align-self: flex-end; cursor: pointer; border: none; position: relative; top: 1.7rem; right: .5rem;',
    element: ''
};

function renderCode(origRule, options) {

    options = {
        ...defaultOptions,
        ...options
    }

    return (...args) => {
        const [tokens, idx] = args;
        const content = tokens[idx].content
            .replaceAll('"', '&quot;')
            .replaceAll("'", "&apos;");
        const origRendered = origRule(...args);

        if (content.length === 0)
            return origRendered;

    return `
        <div class="code-copy">

        <button class="code-copy" data-clipboard-text="${content}" style="${options.buttonStyle}" title="Copy">
            ${options.element}
        </button>
            ${origRendered}

        </div>`;
    };
}


export default function CodeCopy_plugin(md, options) {
    if (clipboard) {
        console.log('here');

        clipboard.on("success", async function(e) {
            console.log('copy success');
        });

        clipboard.on("error", function(e) {
            console.log('copy error');
        });
    }
    md.renderer.rules.fence = renderCode(md.renderer.rules.fence, options);
};
