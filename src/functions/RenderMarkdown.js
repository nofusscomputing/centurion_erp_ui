import hljs from 'highlight.js'

import markdownIt from "markdown-it";
import { full as emoji } from 'markdown-it-emoji'



const anchor = require('markdown-it-anchor').default

const md = markdownIt({
    linkify: true,
    highlight: function (str, lang) {

        if (lang && hljs.getLanguage(lang)) {

            try {
                return '<pre><code class="hljs">' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (__) {}

        }
    
        return '<pre><code class="hljs">' + md.utils.escapeHtml(str) + '</code></pre>';

    }
})

    .use( require( 'markdown-it-admon' ) )

    .use( anchor, { permalink: true} )

    .use( emoji)

    .use( require('markdown-it-footnote') )

    .use( require('markdown-it-task-lists') );



export default function RenderMarkdown(markdown, full_width=false) {

    let rendered_markdown = md.render( String(markdown.children) )

    if( full_width ) {
        return <div className='full-width' dangerouslySetInnerHTML={createHTML(rendered_markdown)} />;
    }

    return <div dangerouslySetInnerHTML={createHTML(rendered_markdown)} />;
}

function createHTML(html_string) {
    return {__html: html_string};
  }