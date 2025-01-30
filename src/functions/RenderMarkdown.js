import { renderToString } from 'react-dom/server'
import hljs from 'highlight.js'

import markdownIt from "markdown-it";
import { full as emoji } from 'markdown-it-emoji'

import '../styles/markdown.css'

import model_link_plugin from './markdown_plugins/ModelLink';
import ticket_link_plugin from './markdown_plugins/TicketLink';
import html_whitelist_plugin from './markdown_plugins/HTMLWhitelist';
import IconLoader from '../components/IconLoader';
import CodeCopy_plugin from './markdown_plugins/CodeCopy';




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

    },
    html: false,
    breaks: true,
})

    .use( require( 'markdown-it-admon' ) )

    .use( anchor, { permalink: true} )

    .use( emoji )

    .use( require('markdown-it-footnote') )

    .use( require('markdown-it-task-lists') )

    .use(ticket_link_plugin)

    .use(model_link_plugin)

    .use(html_whitelist_plugin)

    .use(CodeCopy_plugin, {
        element: renderToString(
            <span  className="icon" >
                <IconLoader name = 'copy' fill='#ff0000' />
            </span>
        )
    });



export default function RenderMarkdown(markdown, full_width=false) {

    let rendered_markdown = md.render( String(markdown.children), markdown.env )

    let class_name = null

    if( markdown.class ) {

        class_name = markdown.class
    }

    if( full_width ) {
        return <div className={'full-width ' + class_name} dangerouslySetInnerHTML={createHTML(rendered_markdown)} />;
    }

    return <div className={class_name} dangerouslySetInnerHTML={createHTML(rendered_markdown)} />;
}

function createHTML(html_string) {
    return {__html: html_string};
  }