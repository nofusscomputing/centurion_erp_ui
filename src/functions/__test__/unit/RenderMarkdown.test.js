import {
    render,
    waitFor
} from "@testing-library/react";

import RenderMarkdown from "../../RenderMarkdown";


describe("CommonMark Rendering", () => {

    const commonMarkCodeBlocks= [
        {
            "name": "Code Block - Triple quote no lang",
            "markdown": "```\na_var: str = 'python string variable'\n```",
            "html": (
                "<pre>" +
                    '<code class=\"hljs\">' +
                        "a_var: str = 'python string variable'" +
                    '</code>' +
                '</pre>'
            )
        },
        {
            "name": "Code Block - Triple quotes with lang",
            "markdown": "``` py \na_var: str = 'python string variable'\n```",
            "html": (
                "<pre>" +
                    '<code class="hljs">' +
                        'a_var: ' +
                        '<span class="hljs-built_in">' +
                            'str' +
                        '</span>' +
                        ' = ' +
                        '<span class=\"hljs-string\">' +
                            "'python string variable'" +
                        '</span>' +
                    '</code>' +
                '</pre>'
            )
        },
        {
            "name": "Code Block - Inline",
            "markdown": "some text with a codeblock (`some codeblock`) inline.",
            "html": (
                '<p>' +
                    'some text with a codeblock (' +
                    '<code>' +
                        'some codeblock' +
                    '</code>' +
                    ') inline.' +
                '</p>')
        },
    ]

    const commonMarkHeadings = [
        {
            "name": "Heading - Level 1",
            "markdown": "# Level One",
            "html": (
                '<h1 id="level-one" tabindex="-1">' +
                    'Level One ' +
                    '<a class="header-anchor" href="#level-one">' +
                        '¶' +
                    '</a>' +
                '</h1>'
            )
        },
        {
            "name": "Heading - Level 2",
            "markdown": "## Level Two",
            "html": (
                '<h2 id="level-two" tabindex="-1">' +
                    'Level Two ' +
                    '<a class="header-anchor" href="#level-two">' +
                        '¶' +
                    '</a>' +
                '</h2>'
            )
        },
        {
            "name": "Heading - Level 3",
            "markdown": "### Level Three",
            "html": (
                '<h3 id="level-three" tabindex="-1">' +
                    'Level Three ' +
                    '<a class="header-anchor" href="#level-three">' +
                        '¶' +
                    '</a>' +
                '</h3>'
            )
        },
        {
            "name": "Heading - Level 4",
            "markdown": "#### Level Four",
            "html": (
                '<h4 id="level-four" tabindex="-1">' +
                    'Level Four ' +
                    '<a class="header-anchor" href="#level-four">' +
                        '¶' +
                    '</a>' +
                '</h4>'
            )
        },
        {
            "name": "Heading - Level 5",
            "markdown": "##### Level Five",
            "html": (
                '<h5 id="level-five" tabindex="-1">' +
                    'Level Five ' +
                    '<a class="header-anchor" href="#level-five">' +
                        '¶' +
                    '</a>' +
                '</h5>'
            )
        },
        {
            "name": "Heading - Level 6",
            "markdown": "###### Level Six",
            "html": (
                '<h6 id="level-six" tabindex="-1">' +
                    'Level Six ' +
                    '<a class="header-anchor" href="#level-six">' +
                        '¶' +
                    '</a>' +
                '</h6>'
            )
        },
    ]

    const commonMarkLineBreaks = [
        // {
        //     "name": "backslash at end of line is converted to <br>",
        //     "markdown": "",
        //     "html": ""
        // },
        // {
        //     "name": "",
        //     "markdown": "",
        //     "html": ""
        // },
    ]

    const commonMarkLinks = [
        // {
        //     "name": "",
        //     "markdown": "",
        //     "html": ""
        // },
    ]

    const commonMarkLists = [
        // {
        //     "name": "",
        //     "markdown": "",
        //     "html": ""
        // },
        {
            "name": "List - Using hyphon",
            "markdown": "- foo\n\n- bar\n",
            "html": "<ul><li><p>foo</p></li><li><p>bar</p></li></ul>"
        },
        {
            "name": "List - Using asterix",
            "markdown": "* foo\n\n* bar\n",
            "html": "<ul><li><p>foo</p></li><li><p>bar</p></li></ul>"
        },
    ]

    const commonMarkTable = [
        // {
        //     "name": "Table - ",
        //     "markdown": "",
        //     "html": ""
        // },
        {
            "name": "Table - Basic",
            "markdown": "| col 1 | col 2 |\n|\:---|---|\n| dat col 1 | dat col 2 |\n",
            "html": "<table><thead><tr><th>col 1</th><th>col 2</th></tr></thead><tbody><tr><td>dat col 1</td><td>dat col 2</td></tr></tbody></table>"
        },
    ]

    const commonMarkTextBold = [
        // {
        //     "name": "Tabbed",
        //     "markdown": "",
        //     "html": ""
        // },
        {
            "name": "Text, Bold - double asterix",
            "markdown": "**the text**",
            "html": "<p><strong>the text</strong></p>"
        },
        {
            "name": "Text, Bold - double underscore",
            "markdown": "__another text__",
            "html": "<p><strong>another text</strong></p>"
        },
    ]

    const commonMarkTextItalics = [
        // {
        //     "name": "Tabbed",
        //     "markdown": "",
        //     "html": ""
        // },
        {
            "name": "Text, Italics - single asterix",
            "markdown": "*italic text*",
            "html": "<p><em>italic text</em></p>"
        },
        {
            "name": "Text, Italics - single underscore",
            "markdown": "*italic text*",
            "html": "<p><em>italic text</em></p>"
        },
    ]


    const commonMarkTestCases = [
        ...commonMarkCodeBlocks,
        ...commonMarkHeadings,
        ...commonMarkLineBreaks,
        ...commonMarkLinks,
        ...commonMarkLists,
        ...commonMarkTable,
        ...commonMarkTextBold,
        ...commonMarkTextItalics,
    ];


    test.each(commonMarkTestCases)(
        "$name",
        ({ name, markdown, html }) => {

            const { container } = render(
                <RenderMarkdown env={{}}>
                    {markdown}
                </RenderMarkdown>
            );

            const element = container.querySelector("div[class=markdown]");

            expect(String(element.innerHTML).replace("\n", '')).toBe(html)
        }
    );

});



describe("Plugins", () => {

    const pluginModelTag = [
        // {
        //     "name": "Table - ",
        //     "markdown": "",
        //     "html": ""
        // },
        {
            "name": "Model Tag",
            "markdown": "$device-1",
            "html": String(
                '<p>'+
                    '<span class="text-inline">'+
                        '<a href="/device/1">'+
                            '<span class="badge-icon icon">'+
                                '<span class="pf-v6-c-icon">'+
                                    '<span class="pf-v6-c-icon__content">'+
                                        '<span>'+
                                            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="pf-v6-svg" fill="currentColor" height="auto" role="img" width="auto">'+
                                                '<path d="M48-144v-72h864v72H48Zm120-120q-29.7 0-50.85-21.15Q96-306.3 96-336v-408q0-29.7 21.15-50.85Q138.3-816 168-816h624q29.7 0 50.85 21.15Q864-773.7 864-744v408q0 29.7-21.15 50.85Q821.7-264 792-264H168Zm0-72h624v-408H168v408Zm0 0v-408 408Z">'+
                                                '</path>'+
                                            '</svg>'+
                                        '</span>' +
                                    '</span>'+
                                '</span>'+
                            '</span>'+
                            '<span class="text">'+
                                'a name,'+
                            '</span>'+
                            '<span class="sub-script metadata">'+
                                'device '+
                            '</span>'+
                        '</a>'+
                    '</span>'+
                '</p>'
            ),
            "env": {
                "models": {
                    "device": {
                        "1": {
                            "title": "a name",
                            "url": "/device/1"
                        }
                    },
                }
            }
        },
    ]


    const pluginTestCases = [
        ...pluginModelTag,
    ];



    test.each(pluginTestCases)(
        '$name',
        async ({ markdown, html, env = {} }) => {

            render(
                <RenderMarkdown env={env}>
                    {markdown}
                </RenderMarkdown>
            )

            await waitFor(() => {
                const svg = document.querySelector('svg')
                expect(svg).not.toBeNull()
            })

            const rendered = document.querySelector('div[class=markdown]')



            expect(rendered.innerHTML).toBe(html)

        })

});
