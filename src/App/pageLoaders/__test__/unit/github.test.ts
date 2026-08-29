

import * as fetcherGithub from "../../../../hooks/useGithubFetcher"

import githubLoader from "../../github";



describe("github Page Loader", () => {


    afterEach(() => {

        jest.restoreAllMocks();

    });

    const url = "http://localhost/somepath"

    const baseURL = "http://localhost/some/path"

    const data = '## a heading\n\nSome text'

    const params = { akey: "avalue"}

    const request: Request = new Request(url)

    const responseData = new Response(data, {
        status: 200,
    });

    // const metadata = '{ "name": "metadata" }'
    // const responseMetadata = new Response(metadata, {
    //     status: 200,
    // });



    test("Calls Github Fetcher", async () => {

        const fetch = jest
            .spyOn(fetcherGithub, "default")
            .mockResolvedValue(responseData);


        const result = await githubLoader({baseURL: baseURL, request: request, params: params });

        expect(fetch).toHaveBeenCalledWith({
            url: request.url,
            baseURL: baseURL,
            params: params,
            signal: request.signal,
        } );
    });



    test("Returns Data", async () => {

        const fetch = jest
            .spyOn(fetcherGithub, "default")
            .mockResolvedValue(responseData);


        const result = await githubLoader({baseURL: "", request: request, params: params });

        expect(data).toEqual(result);
    });

});
