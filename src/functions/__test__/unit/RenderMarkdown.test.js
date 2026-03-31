import {
    render,
    waitFor
} from "@testing-library/react";

import RenderMarkdown from "../../RenderMarkdown";


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
