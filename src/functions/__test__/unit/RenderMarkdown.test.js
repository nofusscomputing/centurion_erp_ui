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
        {
            "name": "Line Break - double newline char",
            "markdown": "first line\n\nsecond line",
            "html": (
                "<p>" +
                    "first line" +
                "</p>" +
                "<p>" +
                    "second line" +
                "</p>"
            )
        },
        {
            "name": "Line Break - Second line indent 4x Space char",
            "markdown": "first line\\\n    second line",
            "html": (
                "<p>" +
                    "first line" +
                "<br>" +
                    "second line" +
                "</p>"
            )
        },
        {
            "name": "Line Break - double space",
            "markdown": "first line  \nsecond line",
            "html": (
                "<p>" +
                    "first line" +
                "<br>" +
                    "second line" +
                "</p>"
            )
        },
    ]

    const commonMarkLinks = [
        {
            "name": "Links - Text",
            "markdown": "A line with a [link](./relative.md) declared",
            "html": (
                "<p>" +
                    "A line with a " +
                    '<a href="./relative.md">' +
                        "link" +
                    "</a>" +
                    " declared"+
                "</p>"
            )
        },
        {
            "name": "Links - plain html link",
            "markdown": "A line with a plain http link declared. http://example.com",
            "html": (
                "<p>" +
                    "A line with a plain http link declared. " +
                    '<a href="http://example.com">' +
                        "http://example.com" +
                    "</a>" +
                "</p>"
            )
        },
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
        {
            "name": "List - numbered (sequential)",
            "markdown": "1. foo\n\n2. bar\n",
            "html": "<ol><li><p>foo</p></li><li><p>bar</p></li></ol>"
        },
        {
            "name": "List - numbered (non-sequential)",
            "markdown": "1. foo\n\n1. bar\n",
            "html": "<ol><li><p>foo</p></li><li><p>bar</p></li></ol>"
        },
    ]

    const commonMarkTable = [
        {
            "name": "Table - Basic",
            "markdown": "| col 1 | col 2 |\n|\:---|---|\n| dat col 1 | dat col 2 |\n",
            "html": "<table><thead><tr><th>col 1</th><th>col 2</th></tr></thead><tbody><tr><td>dat col 1</td><td>dat col 2</td></tr></tbody></table>"
        },
    ]

    const commonMarkTextBold = [
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

    const pluginAdmonition = [
        {
            "name": "Admonition - Note",
            "markdown": "!!! note\n    This is an information admonition",
            "html": ( 
                '<div class="admonition note">' +
                    '<p class="admonition-title">' +
                        "Note" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Summary",
            "markdown": "!!! summary\n    This is an information admonition",
            "html": ( 
                '<div class="admonition summary">' +
                    '<p class="admonition-title">' +
                        "Summary" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Abstract",
            "markdown": "!!! abstract\n    This is an information admonition",
            "html": ( 
                '<div class="admonition abstract">' +
                    '<p class="admonition-title">' +
                        "Abstract" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Tldr",
            "markdown": "!!! tldr\n    This is an information admonition",
            "html": ( 
                '<div class="admonition tldr">' +
                    '<p class="admonition-title">' +
                        "Tldr" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Info",
            "markdown": "!!! info\n    This is an information admonition",
            "html": ( 
                '<div class="admonition info">' +
                    '<p class="admonition-title">' +
                        "Info" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Todo",
            "markdown": "!!! todo\n    This is an information admonition",
            "html": ( 
                '<div class="admonition todo">' +
                    '<p class="admonition-title">' +
                        "Todo" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Tip",
            "markdown": "!!! tip\n    This is an information admonition",
            "html": ( 
                '<div class="admonition tip">' +
                    '<p class="admonition-title">' +
                        "Tip" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Hint",
            "markdown": "!!! hint\n    This is an information admonition",
            "html": ( 
                '<div class="admonition hint">' +
                    '<p class="admonition-title">' +
                        "Hint" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Success",
            "markdown": "!!! success\n    This is an information admonition",
            "html": ( 
                '<div class="admonition success">' +
                    '<p class="admonition-title">' +
                        "Success" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Check",
            "markdown": "!!! check\n    This is an information admonition",
            "html": ( 
                '<div class="admonition check">' +
                    '<p class="admonition-title">' +
                        "Check" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Done",
            "markdown": "!!! done\n    This is an information admonition",
            "html": ( 
                '<div class="admonition done">' +
                    '<p class="admonition-title">' +
                        "Done" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Question",
            "markdown": "!!! question\n    This is an information admonition",
            "html": ( 
                '<div class="admonition question">' +
                    '<p class="admonition-title">' +
                        "Question" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Help",
            "markdown": "!!! help\n    This is an information admonition",
            "html": ( 
                '<div class="admonition help">' +
                    '<p class="admonition-title">' +
                        "Help" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Faq",
            "markdown": "!!! faq\n    This is an information admonition",
            "html": ( 
                '<div class="admonition faq">' +
                    '<p class="admonition-title">' +
                        "Faq" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Warning",
            "markdown": "!!! warning\n    This is an information admonition",
            "html": ( 
                '<div class="admonition warning">' +
                    '<p class="admonition-title">' +
                        "Warning" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Attention",
            "markdown": "!!! attention\n    This is an information admonition",
            "html": ( 
                '<div class="admonition attention">' +
                    '<p class="admonition-title">' +
                        "Attention" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Caution",
            "markdown": "!!! caution\n    This is an information admonition",
            "html": ( 
                '<div class="admonition caution">' +
                    '<p class="admonition-title">' +
                        "Caution" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Failure",
            "markdown": "!!! failure\n    This is an information admonition",
            "html": ( 
                '<div class="admonition failure">' +
                    '<p class="admonition-title">' +
                        "Failure" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Fail",
            "markdown": "!!! fail\n    This is an information admonition",
            "html": ( 
                '<div class="admonition fail">' +
                    '<p class="admonition-title">' +
                        "Fail" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Missing",
            "markdown": "!!! missing\n    This is an information admonition",
            "html": ( 
                '<div class="admonition missing">' +
                    '<p class="admonition-title">' +
                        "Missing" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Danger",
            "markdown": "!!! danger\n    This is an information admonition",
            "html": ( 
                '<div class="admonition danger">' +
                    '<p class="admonition-title">' +
                        "Danger" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Error",
            "markdown": "!!! error\n    This is an information admonition",
            "html": ( 
                '<div class="admonition error">' +
                    '<p class="admonition-title">' +
                        "Error" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Bug",
            "markdown": "!!! bug\n    This is an information admonition",
            "html": ( 
                '<div class="admonition bug">' +
                    '<p class="admonition-title">' +
                        "Bug" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Example",
            "markdown": "!!! example\n    This is an information admonition",
            "html": ( 
                '<div class="admonition example">' +
                    '<p class="admonition-title">' +
                        "Example" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Snippet",
            "markdown": "!!! snippet\n    This is an information admonition",
            "html": ( 
                '<div class="admonition snippet">' +
                    '<p class="admonition-title">' +
                        "Snippet" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Quote",
            "markdown": "!!! quote\n    This is an information admonition",
            "html": ( 
                '<div class="admonition quote">' +
                    '<p class="admonition-title">' +
                        "Quote" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
        {
            "name": "Admonition - Cite",
            "markdown": "!!! cite\n    This is an information admonition",
            "html": ( 
                '<div class="admonition cite">' +
                    '<p class="admonition-title">' +
                        "Cite" +
                    "</p>" +
                    "<p>" +
                        "This is an information admonition" +
                    "</p>" +
                "</div>"
            )
        },
    ]

    const pluginEmoji = [
        {
            "name": "Emoji",
            "markdown": "an emoji called Heavy Check Mark :heavy_check_mark:",
            "html": (
                "<p>" +
                    "an emoji called Heavy Check Mark ✔️" +
                "</p>")
        },
    ]

    const pluginFootnote = [
        {
            "name": "Footnote - Numerical ref and longnote",
            "markdown": (
                "Here is a footnote reference,[^1] and another.[^longnote]\n"+
                "[^1]: Here is the footnote.\n\n"+
                "[^longnote]: Here's one with multiple blocks.\n\n"+
                "    Subsequent paragraphs are indented to show that they belong to the previous footnote."
            ),
            "html": (
                "<p>" +
                    "Here is a footnote reference," +
                    '<sup class="footnote-ref">' +
                        '<a href="#fn1" id="fnref1">' +
                            "[1]" +
                        "</a>" +
                    "</sup>" +
                    " and another." +
                    '<sup class="footnote-ref">' +
                        '<a href="#fn2" id="fnref2">' +
                            "[2]" +
                        "</a>" +
                    "</sup>" +
                "</p>" +
                '<hr class="footnotes-sep">' +
                '<section class="footnotes">' +
                    '<ol class="footnotes-list">' +
                        '<li class="footnote-item" id="fn1">' +
                            "<p>" +
                                "Here is the footnote." +
                                '<a class="footnote-backref" href="#fnref1">' +
                                    "↩︎" +
                                "</a>" +
                            "</p>" +
                        "</li>" +
                        '<li class="footnote-item" id="fn2">' +
                            "<p>" +
                                "Here's one with multiple blocks." +
                            "</p>" +
                            "<p>" +
                                "Subsequent paragraphs are indented to show that they belong to the previous footnote." +
                                '<a class="footnote-backref" href="#fnref2">' +
                                    "↩︎" +
                                "</a>" +
                            "</p>" +
                        "</li>" +
                    "</ol>" +
                "</section>"
            )
        },
        {
            "name": "Footnote - longnote only",
            "markdown": "some random text with a footnote^[this is a footnote description]. more text",
            "html": (
                "<p>" +
                    "some random text with a footnote" +
                    '<sup class="footnote-ref">' +
                        '<a href="#fn1" id="fnref1">' +
                            "[1]" +
                        "</a>" +
                    "</sup>" +
                    ". more text" +
                "</p>" +
                '<hr class="footnotes-sep">' +
                '<section class="footnotes">' +
                    '<ol class="footnotes-list">' +
                        '<li class="footnote-item" id="fn1">' +
                            "<p>" +
                                "this is a footnote description" +
                                '<a class="footnote-backref" href="#fnref1">' +
                                    "↩︎" +
                                "</a>" +
                            "</p>" +
                        "</li>" +
                    "</ol>" +
                "</section>"
            )
        },
        {
            "name": "Footnote - Numerical ref separate description",
            "markdown": "some random text with a footnote[^1].\n\n\n[^1]: footnote description is this text",
            "html": (
                "<p>" +
                    "some random text with a footnote" +
                    '<sup class="footnote-ref">' +
                        '<a href="#fn1" id="fnref1">' +
                            "[1]" +
                        "</a>" +
                    "</sup>" +
                    "." +
                "</p>" +
                '<hr class="footnotes-sep">' +
                '<section class="footnotes">' +
                    '<ol class="footnotes-list">' +
                        '<li class="footnote-item" id="fn1">' +
                            "<p>" +
                                "footnote description is this text" +
                                '<a class="footnote-backref" href="#fnref1">' +
                                    "↩︎" +
                                "</a>" +
                            "</p>" +
                        "</li>" +
                    "</ol>" +
                "</section>"
            )
        },
        {
            "name": "Footnote - Numerical ref separate description Multi",
            "markdown": "some random text with a footnote[^1].\n\nanother random text with a footnote[^2].\n\n\n[^1]: footnote description is this text\n[^2]: footnote description two is this text",
            "html": (
                "<p>" +
                    "some random text with a footnote" +
                    '<sup class="footnote-ref">' +
                        '<a href="#fn1" id="fnref1">' +
                            "[1]" +
                        "</a>" +
                    "</sup>" +
                    "." +
                "</p>" +


                "<p>" +
                    "another random text with a footnote" +
                    '<sup class="footnote-ref">' +
                        '<a href="#fn2" id="fnref2">' +
                            "[2]" +
                        "</a>" +
                    "</sup>" +
                    "." +
                "</p>" +


                '<hr class="footnotes-sep">' +
                '<section class="footnotes">' +
                    '<ol class="footnotes-list">' +
                        '<li class="footnote-item" id="fn1">' +
                            "<p>" +
                                "footnote description is this text" +
                                '<a class="footnote-backref" href="#fnref1">' +
                                    "↩︎" +
                                "</a>" +
                            "</p>" +
                        "</li>" +


                        '<li class="footnote-item" id="fn2">' +
                            "<p>" +
                                "footnote description two is this text" +
                                '<a class="footnote-backref" href="#fnref2">' +
                                    "↩︎" +
                                "</a>" +
                            "</p>" +
                        "</li>" +

                    "</ol>" +
                "</section>"
            )
        },
    ]

    const pluginTaskList = [
        {
            "name": "TaskList ",
            "markdown": "- [ ] uncheck tasklist item\n\n - [x] checked tasklist item",
            "html": (
                '<ul class="contains-task-list">' +
                    '<li class="task-list-item">' +
                        "<p>" +
                            '<input class="task-list-item-checkbox" disabled="" type="checkbox">' +
                            " uncheck tasklist item" +
                        "</p>" +
                    "</li>" +
                    '<li class="task-list-item">' +
                        "<p>" +
                        '<input class="task-list-item-checkbox" disabled="" type="checkbox" checked="">' +
                            " checked tasklist item" +
                        "</p>" +
                    "</li>" +
                "</ul>"
            )
        },
    ]

    const pluginHTMLWhiteList = [
    //     {
    //         "name": "HTMLWhiteList - Details/Summary Block",
    //         "markdown": "<details><summary>the title</summary>\n\nthe text body\n\n</details>",
    //         "html": (
    //             "<details>" +
    //                 "<summary>" +
    //                     "the title" +
    //                 "<summary>" +
    //                 "<p>" +
    //                     "the text body" +
    //                 "</p>" +
    //             "</details>"
    //         )
    //     },
    ]


    const pluginTestCases = [
        ...pluginAdmonition,
        ...pluginEmoji,
        ...pluginFootnote,
        ...pluginTaskList,
        ...pluginHTMLWhiteList,
    ];



    test.each(pluginTestCases)(
        '$name',
        ({ markdown, html, env = {} }) => {

            render(
                <RenderMarkdown env={env}>
                    {markdown}
                </RenderMarkdown>
            )

            // await waitFor(() => {
            //     const svg = document.querySelector('svg')
            //     expect(svg).not.toBeNull()
            // })

            const rendered = document.querySelector('div[class=markdown]')



            expect(String(rendered.innerHTML).replace("\n", '')).toBe(html)

        })

});



describe("Plugins - JSX Objects", () => {

    const pluginModelTag = [
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

    const pluginTicketLink = [
        {
            "name": "Ticket Link",
            "markdown": "a ticket reference is numerical and prefixed with a hash. #1",
            "html": String(
                '<p>'+
                    'a ticket reference is numerical and prefixed with a hash. ' +
                    '<span class="text-inline">' +
                        '<a href="/ticket/1">' +
                            '<span class="badge-icon icon ticket-status-icon ticket-status-icon-new">' +
                                '<span class="pf-v6-c-icon">' +
                                    '<span class="pf-v6-c-icon__content">' +
                                        '<span>' +
                                            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="pf-v6-svg" fill="currentColor" height="auto" role="img" width="auto">' +
                                                '<path d=\"M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z">' +
                                                '</path>' +
                                            '</svg>' +
                                        '</span>' +
                                    '</span>' +
                                '</span>' +
                            '</span>' +
                            '<span class="sub-script metadata">' +
                                ' #1 ' +
                            '</span>' +
                            '<span class="text">' +
                                'a name,' +
                            '</span>' +
                            '<span class="sub-script metadata">' +
                                'request ' +
                            '</span>' +
                        '</a>' +
                    '</span>' +
                '</p>'
            ),
            "env": {
                "tickets": {
                    "1": {
                        "status": "new",
                        "ticket_type": "request",
                        "title": "a name",
                        "url": "/ticket/1"
                    }
                }
            }
        }
    ]


    const pluginTestCases = [
        ...pluginModelTag,
        ...pluginTicketLink,
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



            expect(String(rendered.innerHTML).replace("\n", "")).toBe(html)

        })

});
