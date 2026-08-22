

import * as fetcherDjango from "../../../../hooks/useDjangoFetcher"

import djangoLoader from "../../django";



describe("django Page Loader", () => {


    afterEach(() => {

        jest.restoreAllMocks();

    });

    const url = "http://localhost/somepath"

    const request: Request = new Request(url)

    const data = '{ "name": "data" }'
    const responseData = new Response(data, {
        status: 200,
    });

    const metadata = '{ "name": "metadata" }'
    const responseMetadata = new Response(metadata, {
        status: 200,
    });



    test("Calls Django Fetcher", async () => {

        const fetch = jest
            .spyOn(fetcherDjango, "default")
            .mockResolvedValue({apiMetadata: responseMetadata, apiData: responseData});


        const result = await djangoLoader({ request: request });

        expect(fetch).toHaveBeenCalledWith({
            getMetadata: true,
            url: request.url,
            signal: request.signal,
        } );
    });



    test("Returns Data", async () => {

        const fetch = jest
            .spyOn(fetcherDjango, "default")
            .mockResolvedValue({apiMetadata: responseMetadata, apiData: responseData});


        const result = await djangoLoader({ request: request });

        expect(result.page_data).toEqual(JSON.parse(data));
    });



    test("Returns Metadata", async () => {

        const fetch = jest
            .spyOn(fetcherDjango, "default")
            .mockResolvedValue({apiMetadata: responseMetadata, apiData: responseData});


        const result = await djangoLoader({ request: request });

        expect(result.metadata).toEqual(JSON.parse(metadata));
    });



    test("Returns both Data and Metadata", async () => {

        const fetch = jest
            .spyOn(fetcherDjango, "default")
            .mockResolvedValue({apiMetadata: responseMetadata, apiData: responseData});


        const result = await djangoLoader({ request: request });

        expect(result).toEqual({
            metadata: JSON.parse(metadata),
            page_data: JSON.parse(data)
        });
    });
});
