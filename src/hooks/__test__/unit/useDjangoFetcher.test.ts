import {
    HttpError,
    HTTPNotAuthenticated
} from "../../../classes/Exceptions";

import * as httpJson from "../../../functions/httpJson";

import {
    HTTPNamedParams
} from "../../../functions/http";

import jsonHttpRequest from "../../../functions/httpJson";

import useDjangoFetcher, { djangoFetcherNamedParams } from "../../useDjangoFetcher";
import URLSanitize from "../../../functions/URLSanitize";


describe("useDjangoFetcher", () => {

    const api_url = "http://localhost/api/v2"
    const url = "http://localhost/some-path"

    beforeEach(() => {

        window.env = {
            API_URL: api_url,
        };

        window.history.replaceState({}, "", url);

    });


    afterEach(() => {

        jest.restoreAllMocks();

    });


    describe("No Method Supplied - Defaults to GET", () => {

        const abortSignal = new AbortController()

        const testParams: Array<{
            name: string,
            expected: HTTPNamedParams,

            body?: djangoFetcherNamedParams["body"]
            getMetadata?: djangoFetcherNamedParams["getMetadata"]
            method?: djangoFetcherNamedParams["method"]
            onlyMetadata?: djangoFetcherNamedParams["onlyMetadata"]
            // url: djangoFetcherNamedParams["url"]
            signal?: djangoFetcherNamedParams["signal"]

        }> = [
            {
                name: "Default",
                expected: {
                    body: null,
                    credentials: "include",
                    headers: {},
                    method: "GET",
                    mode: "cors",
                    signal: null,
                    url: `${api_url}${URLSanitize(url)}`
                }
            },
            {
                name: "get metaData",
                getMetadata: true,
                expected: {
                    credentials: "include",
                    headers: {},
                    method: "OPTIONS",
                    mode: "cors",
                    signal: null,
                    url: `${api_url}${URLSanitize(url)}`
                }
            },
            {
                name: "only metaData",
                onlyMetadata: true,
                expected: {
                    credentials: "include",
                    headers: {},
                    method: "OPTIONS",
                    mode: "cors",
                    signal: null,
                    url: `${api_url}${URLSanitize(url)}`
                }
            },
            {
                name: "OPTIONS request returns metaData only",
                method: "OPTIONS",
                expected: {
                    credentials: "include",
                    headers: {},
                    method: "OPTIONS",
                    mode: "cors",
                    signal: null,
                    url: `${api_url}${URLSanitize(url)}`
                }
            },
            // {
            //     name: "Headers passed",
            //     headers: {
            //         "Content-Type": "application/json",
            //         Authorization: "Bearer test-token",
            //     },
            //     expected: {
            //         body: null,
            //         credentials: false,
            //         headers: {
            //             "Accept": "application/json",
            //             Authorization: "Bearer test-token",
            //             "Content-Type": "application/json"
            //         },
            //         method: "GET",
            //         signal: null,
            //         url: `${api_url}${URLSanitize(url)}`
            //     }
            // },
            {
                name: "Body passed",
                body: JSON.stringify({
                    foo: "bar",
                }),
                expected: {
                    body: JSON.stringify({
                        foo: "bar",
                    }),
                    credentials: "include",
                    headers: {},
                    method: "GET",
                    mode: "cors",
                    signal: null,
                    url: `${api_url}${URLSanitize(url)}`
                }
            },
            {
                name: "Credentials passed",
                expected: {
                    body: null,
                    credentials: "include",
                    headers: {},
                    method: "GET",
                    mode: "cors",
                    signal: null,
                    url: `${api_url}${URLSanitize(url)}`
                }
            },
            {
                name: "Signal passed",
                signal: abortSignal.signal,
                expected: {
                    body: null,
                    credentials: "include",
                    headers: {},
                    method: "GET",
                    mode: "cors",
                    signal: abortSignal.signal,
                    url: `${api_url}${URLSanitize(url)}`
                }
            }
        ]



        describe("HTTP/200", () => {

            const status = 200;

            describe("Fetch correctly called", () => {

                test.each(testParams)(
                    "$name",
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    window.history.replaceState({}, "", url);

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockResolvedValue(response);


                    const result = await useDjangoFetcher({
                        url: url,
                        ...( body ? { body: body } : {}),
                        ...( method ? { method: method } : {}),
                        ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                        ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
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
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockResolvedValue(response);


                    const result = await useDjangoFetcher({
                        url: url,
                        ...( body ? { body: body } : {}),
                        ...( method ? { method: method } : {}),
                        ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                        ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
                        ...( signal ? { signal: signal } : {})
                    });

                    expect(fetch).toHaveBeenCalledWith(
                        expected,
                    ); // Pre-Req: Test must fail if not the correct call.


                    let returnObject = null;

                    if( getMetadata ) {

                        returnObject = {
                            apiData: response,
                            apiMetadata: response
                        };

                    } else if( onlyMetadata || method === "OPTIONS" ) {

                        returnObject = {
                            apiData: null,
                            apiMetadata: response
                        };

                    } else {

                        returnObject = {
                            apiData: response,
                            apiMetadata: null
                        };

                    }


                        expect(result).toEqual(returnObject);

                });
            });



            describe("No HTTPError Exception", () => {

                test.each(testParams)(
                    "$name",
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockResolvedValue(response);


                    await expect(
                       useDjangoFetcher({
                            url: url,
                            ...( body ? { body: body } : {}),
                            ...( method ? { method: method } : {}),
                            ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                            ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
                            ...( signal ? { signal: signal } : {})
                        }),
                    ).resolves.not.toBeInstanceOf(HttpError);
                });
            });
        });



        describe("HTTP/201", () => {

            const status = 201;

            describe("Fetch correctly called", () => {

                test.each(testParams)(
                    "$name",
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockResolvedValue(response);


                    const result = await useDjangoFetcher({
                        url: url,
                        ...( body ? { body: body } : {}),
                        ...( method ? { method: method } : {}),
                        ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                        ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
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
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockResolvedValue(response);


                    const result = await useDjangoFetcher({
                        url: url,
                        ...( body ? { body: body } : {}),
                        ...( method ? { method: method } : {}),
                        ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                        ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
                        ...( signal ? { signal: signal } : {})
                    });

                    expect(fetch).toHaveBeenCalledWith(
                        expected,
                    ); // Pre-Req: Test must fail if not the correct call.

                    let returnObject = null;

                    if( getMetadata ) {

                        returnObject = {
                            apiData: response,
                            apiMetadata: response
                        };

                    } else if( onlyMetadata || method === "OPTIONS" ) {

                        returnObject = {
                            apiData: null,
                            apiMetadata: response
                        };

                    } else {

                        returnObject = {
                            apiData: response,
                            apiMetadata: null
                        };

                    }


                        expect(result).toEqual(returnObject);

                });
            });



            describe("No HTTPError Exception", () => {

                test.each(testParams)(
                    "$name",
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockResolvedValue(response);


                    const result = await useDjangoFetcher
                    await expect(
                       useDjangoFetcher({
                            url: url,
                            ...( body ? { body: body } : {}),
                            ...( method ? { method: method } : {}),
                            ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                            ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
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
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockResolvedValue(response);


                    const result = await useDjangoFetcher({
                        url: url,
                        ...( body ? { body: body } : {}),
                        ...( method ? { method: method } : {}),
                        ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                        ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
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
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockResolvedValue(response);


                    const result = await useDjangoFetcher({
                        url: url,
                        ...( body ? { body: body } : {}),
                        ...( method ? { method: method } : {}),
                        ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                        ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
                        ...( signal ? { signal: signal } : {})
                    });

                    expect(fetch).toHaveBeenCalledWith(
                        expected,
                    ); // Pre-Req: Test must fail if not the correct call.

                    let returnObject = null;

                    if( getMetadata ) {

                        returnObject = {
                            apiData: response,
                            apiMetadata: response
                        };

                    } else if( onlyMetadata || method === "OPTIONS" ) {

                        returnObject = {
                            apiData: null,
                            apiMetadata: response
                        };

                    } else {

                        returnObject = {
                            apiData: response,
                            apiMetadata: null
                        };

                    }


                        expect(result).toEqual(returnObject);

                });
            });



            describe("No HTTPError Exception", () => {

                test.each(testParams)(
                    "$name",
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockResolvedValue(response);


                    await expect(
                       useDjangoFetcher({
                            url: url,
                            ...( body ? { body: body } : {}),
                            ...( method ? { method: method } : {}),
                            ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                            ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
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
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                        statusText: "Unauthorized",
                    });

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockRejectedValue(new HTTPNotAuthenticated( response ));


                    await expect(
                       useDjangoFetcher({
                            url: url,
                            ...( body ? { body: body } : {}),
                            ...( method ? { method: method } : {}),
                            ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                            ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
                            ...( signal ? { signal: signal } : {})
                        }),
                    ).rejects.toBeInstanceOf(HTTPNotAuthenticated);
                });
            });



            describe("Exception passed response", () => {

                test.each(testParams)(
                    "$name",
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                        statusText: "Unauthorized",
                    });

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockRejectedValue(new HTTPNotAuthenticated( response ));


                    try {

                        await useDjangoFetcher({
                            url: url,
                            ...( body ? { body: body } : {}),
                            ...( method ? { method: method } : {}),
                            ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                            ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
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
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockResolvedValue(response);


                    const result = await useDjangoFetcher({
                        url: url,
                        ...( body ? { body: body } : {}),
                        ...( method ? { method: method } : {}),
                        ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                        ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
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
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockResolvedValue(response);


                    const result = await useDjangoFetcher({
                        url: url,
                        ...( body ? { body: body } : {}),
                        ...( method ? { method: method } : {}),
                        ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                        ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
                        ...( signal ? { signal: signal } : {})
                    });

                    expect(fetch).toHaveBeenCalledWith(
                        expected,
                    ); // Pre-Req: Test must fail if not the correct call.

                    let returnObject = null;

                    if( getMetadata ) {

                        returnObject = {
                            apiData: response,
                            apiMetadata: response
                        };

                    } else if( onlyMetadata || method === "OPTIONS" ) {

                        returnObject = {
                            apiData: null,
                            apiMetadata: response
                        };

                    } else {

                        returnObject = {
                            apiData: response,
                            apiMetadata: null
                        };

                    }


                        expect(result).toEqual(returnObject);

                });
            });



            describe("No HTTPError Exception", () => {

                test.each(testParams)(
                    "$name",
                    async ({body = null, method = null, getMetadata = null, onlyMetadata = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(httpJson, "default")
                        .mockResolvedValue(response);


                    await expect(
                       useDjangoFetcher({
                            url: url,
                            ...( body ? { body: body } : {}),
                            ...( method ? { method: method } : {}),
                            ...( getMetadata ? { getMetadata: getMetadata } : {} ),
                            ...( onlyMetadata ? { onlyMetadata: onlyMetadata } : {} ),
                            ...( signal ? { signal: signal } : {})
                        }),
                    ).resolves.not.toBeInstanceOf(HttpError);
                });
            });
        });
    });
});
