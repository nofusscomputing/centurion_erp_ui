import DOMPurify from 'dompurify';

import
    React, {
        useEffect,
        useState
} from 'react';



import {
    renderToString
} from 'react-dom/server'


import hljs from 'highlight.js'

import markdownIt from "markdown-it";
import {
    full as emoji
} from 'markdown-it-emoji'

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
    breaks: false,
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



const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img",
  "input", "link", "meta", "param", "source", "track", "wbr"
]);



function attrsToProps(attrs) {

    if (!attrs) return {};

    const props = {};

    for (const [name, value] of attrs) {

        if (name === "class") props.className = value;
        else if (name === "style") props.style = {value};
        else if (name === "tabindex") props.tabIndex = value;
        else if( ['checked', 'disabled'].includes(name) ) props[name] = typeof(value) === 'boolean' ? value : true
        else props[name] = value;

    }


    return props;

}



function tokensToJSX(tokens, depth = 0) {
    const output = [];

    const stack = [{ children: output }];

    tokens.forEach((token, idx) => {

        const key = `${depth}-${idx}`;

        const Tag = token.tag;


        if (token.jsx != null) {

            stack[stack.length - 1].children.push(token.jsx);

            return;

        }


        if (token.type.endsWith("_open")) {

            const props = { ...attrsToProps(token.attrs) };

            const element = { Tag, props, children: [] };

            stack[stack.length - 1].children.push(element);

            stack.push(element);


        } else if (token.type.endsWith("_close")) {

            stack.pop();


        } else if ( token.type === "inline" && token.children ) {

            const children = tokensToJSX(token.children, depth + 1);

            stack[stack.length - 1].children.push(...children);


        }else if( token.type.endsWith("html_block") && token.content ) {

            stack[stack.length - 1].children.push(md.utils.escapeHtml(token.content));


        } else if( token.type === "html_inline" && token.content ) {

            // stack[stack.length - 1].children.push(token.content);

            const re = new RegExp(/<(?<tag>[a-z-]+)\s(?<attrs>.+)>/g);

            const attrs_re = new RegExp(/(?<name>[a-z]+)(?:\=")(?<value>[^"]*)(?:\")/g);

            const inline_html = [ ...String(token.content).matchAll(re) ]

            // const found_tag = inline_html[0].groups.tag
            const found_attrs = [ ...String(inline_html[0].groups.attrs).matchAll(attrs_re)].map(m => [m.groups.name, m.groups.value])

            // const props = { ...attrsToProps(found_attrs) }

            stack[stack.length - 1].children.push({
                Tag: inline_html[0].groups.tag,
                props: { ...attrsToProps(found_attrs) },
                children: []
            });


        }else if( token.type === 'fence' && token.tag === 'code' ) {

            const lang = String(token.info || '').trim();

            const rawHtml = lang && hljs.getLanguage(lang)
                ? hljs.highlight(token.content, {
                    language: lang,
                    ignoreIllegals: true
                }).value
                : token.content;

            const safeHtml = DOMPurify.sanitize(rawHtml);

            stack[stack.length - 1].children.push(
                <pre key={key}>
                    <code
                        className="hljs"
                        dangerouslySetInnerHTML={{ __html: safeHtml }}
                    />
                </pre>
            );


            return;


        }  else if ( ["emoji", "text"].includes(token.type) ) {

            /**
             * DOMPurify not really required, as this is only emoji `:code:` or
             * plain text. However if markdown-it or a plugin changes it could
             * set the content field to contain html, so clean-it-up.
             */

            stack[stack.length - 1].children.push(DOMPurify.sanitize(token.content));


        } else if ( token.type === "code_inline" && token.content ) {

            const props = { ...attrsToProps(token.attrs) };

            const children = [token.content];

            stack[stack.length - 1].children.push({ Tag, props, children });


        } else if (VOID_ELEMENTS.has(token.tag)) {

            const props = { ...attrsToProps(token.attrs) };

            stack[stack.length - 1].children.push({ Tag, props });


        } else {

            const unknownToken = {
                content: token.content,
                props: attrsToProps(token.attrs),
                tag: Tag,
                type: token.type,
                token: token
            }

            /**
             * Capture tokens not parsed above. Something's clearly changed
             * As this error is not supposed to display.
             */
            console.warn(unknownToken)


        }
    });


    function renderElement(elementOrString, index) {

        if (!elementOrString) return null;

        if (typeof elementOrString === "string") {
            return elementOrString.replace(/^"|"$/g, '');
        }

        if (React.isValidElement(elementOrString)) return elementOrString;

        if (typeof elementOrString !== "object" || !("Tag" in elementOrString)) return elementOrString;

        const { Tag, props = {}, children } = elementOrString;

        if (VOID_ELEMENTS.has(Tag)) {
            return <Tag key={index} {...props} />;
        }

        if( ! Tag ) return;

        return (
            <Tag key={index} {...props}>
                {(children || []).map(renderElement)}
            </Tag>
        );
    }


    return output.map(renderElement);
}


export default function RenderMarkdown({ children, className = null, env, full_width=false }) {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
        if (typeof children !== "string") {
        setTokens([]);
        return;
        }
        const parsed = md.parse(children, env);
        setTokens(parsed);
    }, [children, env]);

    let class_name = 'markdown'

    if( className ) {

        class_name = class_name.concat(' ' + className)
    }

    if( full_width ) {
        class_name = class_name.concat(' full-width')
    }

    return (
        <div className={class_name}>
            {tokensToJSX(tokens)}
        </div>
    );

}
