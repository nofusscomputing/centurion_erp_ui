import {
    HttpError,
    HTTPNotAuthenticated
} from "../../../classes/Exceptions";

import * as httpMarkdown from "../../../functions/httpMarkdown";

import {
    HTTPNamedParams
} from "../../../functions/http";

import useDjangoFetcher, { djangoFetcherNamedParams } from "../../useDjangoFetcher";
import URLSanitize from "../../../functions/URLSanitize";
import useGithubFetcher from "../../useGithubFetcher";
import { Params } from "react-router";


describe("useGithubFetcher", () => {

    const api_url = "http://localhost/api/v2";
    const uiURL = "http://localhost/some-path";

    const baseURL = api_url;

    const body = '## a heading\n\nSome text on a line.';

    const defaultParams = { aKey: "a value"}

    beforeEach(() => {

        window.env = {
            API_URL: api_url,
        };

        window.history.replaceState({}, "", uiURL);

    });


    afterEach(() => {

        jest.restoreAllMocks();

    });


    describe("No Method Supplied - Defaults to GET", () => {

        const abortSignal = new AbortController()

        

        const testParams: Array<{
            name: string,
            expected: HTTPNamedParams,
            params?: Params,
            signal?: HTTPNamedParams["signal"]
            url?: HTTPNamedParams['url']

        }> = [
            {
                name: "Default",
                url: `${uiURL}`,
                expected: {
                    method: "GET",
                    signal: null,
                    url: `${baseURL}${URLSanitize(uiURL)}/index.md`
                }
            },
            {
                name: "Signal passed",
                url: `${uiURL}`,
                signal: abortSignal.signal,
                expected: {
                    method: "GET",
                    signal: abortSignal.signal,
                    url: `${baseURL}${URLSanitize(uiURL)}/index.md`
                }
            },
            {
                name: "Non-index markdown document",
                params: { 'mdFile': "nonIndexDocument" },
                url: `${uiURL}/nonIndexDocument`,
                expected: {
                    method: "GET",
                    signal: null,
                    url: `${baseURL}${URLSanitize(uiURL)}/nonIndexDocument.md`
                }
            }
        ]



        describe("HTTP/200", () => {

            const status = 200;

            describe("Fetch correctly called", () => {

                test.each(testParams)(
                    "$name",
                    async ({params = defaultParams, signal = null, url, expected}) => {

                    const response = new Response(body, {
                        status: status,
                    });

                    window.history.replaceState({}, "", uiURL);

                    const fetch = jest
                        .spyOn(httpMarkdown, "default")
                        .mockResolvedValue(response);


                    const result = await useGithubFetcher({
                        url: url,
                        baseURL: baseURL,
                        params: params,
                        ...( signal ? { signal: signal } : {})
                    });

                    expect(fetch).toHaveBeenCalledWith(
                        expected,
                    );
                });
            });



            describe("Response is returned", () => {

                test.each(testParams)(
                    "$name",
                    async ({params = defaultParams, signal = null, url, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpMarkdown, "default")
                        .mockResolvedValue(response);


                    const result = await useGithubFetcher({
                        url: url,
                        baseURL: baseURL,
                        params: params,
                        ...( signal ? { signal: signal } : {})
                    });

                    expect(fetch).toHaveBeenCalledWith(
                        expected,
                    ); // Pre-Req: Test must fail if not the correct call.


                        expect(result).toEqual(response);

                });
            });



            describe("No HTTPError Exception", () => {

                test.each(testParams)(
                    "$name",
                    async ({params = defaultParams, signal = null, url, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpMarkdown, "default")
                        .mockResolvedValue(response);


                    await expect(
                       useGithubFetcher({
                            url: url,
                            baseURL: baseURL,
                            params: params,
                            ...( signal ? { signal: signal } : {})
                        }),
                    ).resolves.not.toBeInstanceOf(HttpError);
                });
            });
        });


        describe("HTTP/400", () => {

            const status = 400;

            describe("Fetch correctly called", () => {

                test.each(testParams)(
                    "$name",
                    async ({params = defaultParams, signal = null, url, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpMarkdown, "default")
                        .mockResolvedValue(response);


                    const result = await useGithubFetcher({
                        url: url,
                        baseURL: baseURL,
                        params: params,
                        ...( signal ? { signal: signal } : {})
                    });

                    expect(fetch).toHaveBeenCalledWith(
                        expected,
                    );
                });
            });



            describe("Response is returned", () => {

                test.each(testParams)(
                    "$name",
                    async ({params = defaultParams, signal = null, url, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpMarkdown, "default")
                        .mockResolvedValue(response);


                    const result = await useGithubFetcher({
                        url: url,
                        baseURL: baseURL,
                        params: params,
                        ...( signal ? { signal: signal } : {})
                    });

                    expect(fetch).toHaveBeenCalledWith(
                        expected,
                    ); // Pre-Req: Test must fail if not the correct call.


                    expect(result).toEqual(response);

                });
            });



            describe("No HTTPError Exception", () => {

                test.each(testParams)(
                    "$name",
                    async ({params = defaultParams, signal = null, url, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpMarkdown, "default")
                        .mockResolvedValue(response);


                    await expect(
                       useGithubFetcher({
                        url: url,
                        baseURL: baseURL,
                        params: params,
                        ...( signal ? { signal: signal } : {})
                    }),
                    ).resolves.not.toBeInstanceOf(HttpError);
                });
            });
        });



        describe("HTTP/401", () => {

            const status = 401;

            describe("Correct Exception raised", () => {

                test.each(testParams)(
                    "$name",
                    async ({params = defaultParams, signal = null, url, expected}) => {

                    const response = new Response(null, {
                        status: status,
                        statusText: "Unauthorized",
                    });

                    const fetch = jest
                        .spyOn(httpMarkdown, "default")
                        .mockRejectedValue(new HTTPNotAuthenticated( response ));


                    await expect(
                       useGithubFetcher({
                            url: url,
                            baseURL: baseURL,
                            params: params,
                            ...( signal ? { signal: signal } : {})
                        }),
                    ).rejects.toBeInstanceOf(HTTPNotAuthenticated);
                });
            });



            describe("Exception passed response", () => {

                test.each(testParams)(
                    "$name",
                    async ({params = defaultParams, signal = null, url, expected}) => {

                    const response = new Response(null, {
                        status: status,
                        statusText: "Unauthorized",
                    });

                    const fetch = jest
                        .spyOn(httpMarkdown, "default")
                        .mockRejectedValue(new HTTPNotAuthenticated( response ));


                    try {

                        await useGithubFetcher({
                            url: url,
                            baseURL: baseURL,
                            params: params,
                            ...( signal ? { signal: signal } : {})
                        });

                        fail("Expected HTTPNotAuthenticated");

                    } catch (error) {

                        expect(error).toBeInstanceOf(HTTPNotAuthenticated);  // Pre-Req: if not the correct exception, fail.

                        expect((error as HTTPNotAuthenticated).response).toBe(response);
                    }
                });
            });
        });



        describe("HTTP/500", () => {

            const status = 500;

            describe("Fetch correctly called", () => {

                test.each(testParams)(
                    "$name",
                    async ({params = defaultParams, signal = null, url, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpMarkdown, "default")
                        .mockResolvedValue(response);


                    const result = await useGithubFetcher({
                        url: url,
                        baseURL: baseURL,
                        params: params,
                        ...( signal ? { signal: signal } : {})
                    });

                    expect(fetch).toHaveBeenCalledWith(
                        expected,
                    );
                });
            });



            describe("Response is returned", () => {

                test.each(testParams)(
                    "$name",
                    async ({params = defaultParams, signal = null, url, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpMarkdown, "default")
                        .mockResolvedValue(response);


                    const result = await useGithubFetcher({
                        url: url,
                        baseURL: baseURL,
                        params: params,
                        ...( signal ? { signal: signal } : {})
                    });

                    expect(fetch).toHaveBeenCalledWith(
                        expected,
                    ); // Pre-Req: Test must fail if not the correct call.


                    expect(result).toEqual(response);

                });
            });



            describe("No HTTPError Exception", () => {

                test.each(testParams)(
                    "$name",
                    async ({params = defaultParams, signal = null, url, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpMarkdown, "default")
                        .mockResolvedValue(response);


                    await expect(
                       useGithubFetcher({
                            url: url,
                            baseURL: baseURL,
                            params: params,
                            ...( signal ? { signal: signal } : {})
                        }),
                    ).resolves.not.toBeInstanceOf(HttpError);
                });
            });
        });
    });
});
