import {
    HttpError,
    HTTPNotAuthenticated
} from "../../../classes/Exceptions";

import * as http from "../../http";

import {
    HTTPNamedParams
} from "../../http";

import markdownHttpRequest from "../../httpMarkdown";


describe("httpMarkdownRequest", () => {

    const url = "https://my-domain.tld/some-path"

    afterEach(() => {

        jest.restoreAllMocks();

    });


    const abortSignal = new AbortController()

    const testParams: Array<{
        body?: HTTPNamedParams["body"]
        credentials?: HTTPNamedParams["credentials"]
        headers?: HeadersInit
        expected: HTTPNamedParams
        method?: HTTPNamedParams["method"]
        name: string,
        signal?: HTTPNamedParams["signal"]
    }> = [
        {
            name: "Default",
            expected: {
                credentials: "omit",
                headers: {
                    "Accept": "text/plain",
                },
                method: "GET",
                mode: "cors",
                referrerPolicy: "no-referrer",
                signal: null,
                url: url
            }
        },
        {
            name: "Headers passed",
            headers: {
                Authorization: "Bearer test-token",
            },
            expected: {
                credentials: "omit",
                headers: {
                    "Accept": "text/plain",
                    Authorization: "Bearer test-token",
                },
                method: "GET",
                mode: "cors",
                referrerPolicy: "no-referrer",
                signal: null,
                url: url
            }
        },
        {
            name: "Credentials passed",
            credentials: "include",
            expected: {
                credentials: "include",
                headers: {
                    "Accept": "text/plain",
                },
                method: "GET",
                mode: "cors",
                referrerPolicy: "no-referrer",
                signal: null,
                url: url
            }
        },
        {
            name: "Signal passed",
            signal: abortSignal.signal,
            expected: {
                credentials: "omit",
                headers: {
                    "Accept": "text/plain",
                },
                method: "GET",
                mode: "cors",
                referrerPolicy: "no-referrer",
                signal: abortSignal.signal,
                url: url
            }
        },
    ]



    describe("No Method Supplied - Defaults to GET", () => {



        describe("HTTP/200", () => {

            const status = 200;

            describe("Fetch correctly called", () => {

                test.each(testParams)(
                    "$name",
                    async ({body = null, credentials = null, method = null, headers = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(http, "httpRequest")
                        .mockResolvedValue(response);


                    const result = await markdownHttpRequest({
                        url: url,
                        ...( credentials ? { credentials: credentials } : {}),
                        ...( body ? { body: body } : {}),
                        ...( headers ? { headers: headers } : {}),
                        ...( method ? { method: method } : {}),
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
                    async ({body = null, credentials = null, method = null, headers = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(http, "httpRequest")
                        .mockResolvedValue(response);


                    const result = await markdownHttpRequest({
                        url: url,
                        ...( credentials ? { credentials: credentials } : {}),
                        ...( body ? { body: body } : {}),
                        ...( headers ? { headers: headers } : {}),
                        ...( method ? { method: method } : {}),
                        ...( signal ? { signal: signal } : {})
                    });

                    expect(fetch).toHaveBeenCalledWith(
                        expected,
                    ); // Pre-Req: Test must fail if not the correct call.

                    expect(result).toBe(response);
                });
            });



            describe("No HTTPError Exception", () => {

                test.each(testParams)(
                    "$name",
                    async ({body = null, credentials = null, method = null, headers = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(http, "httpRequest")
                        .mockResolvedValue(response);


                    await expect(
                       markdownHttpRequest({
                            url: url,
                            ...( credentials ? { credentials: credentials } : {}),
                            ...( body ? { body: body } : {}),
                            ...( headers ? { headers: headers } : {}),
                            ...( method ? { method: method } : {}),
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
                    async ({body = null, credentials = null, method = null, headers = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(http, "httpRequest")
                        .mockResolvedValue(response);


                    const result = await markdownHttpRequest({
                        url: url,
                        ...( credentials ? { credentials: credentials } : {}),
                        ...( body ? { body: body } : {}),
                        ...( headers ? { headers: headers } : {}),
                        ...( method ? { method: method } : {}),
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
                    async ({body = null, credentials = null, method = null, headers = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(http, "httpRequest")
                        .mockResolvedValue(response);


                    const result = await markdownHttpRequest({
                        url: url,
                        ...( credentials ? { credentials: credentials } : {}),
                        ...( body ? { body: body } : {}),
                        ...( headers ? { headers: headers } : {}),
                        ...( method ? { method: method } : {}),
                        ...( signal ? { signal: signal } : {})
                    });

                    expect(fetch).toHaveBeenCalledWith(
                        expected,
                    ); // Pre-Req: Test must fail if not the correct call.

                    expect(result).toBe(response);
                });
            });



            describe("No HTTPError Exception", () => {

                test.each(testParams)(
                    "$name",
                    async ({body = null, credentials = null, method = null, headers = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(http, "httpRequest")
                        .mockResolvedValue(response);


                    await expect(
                       markdownHttpRequest({
                            url: url,
                            ...( credentials ? { credentials: credentials } : {}),
                            ...( body ? { body: body } : {}),
                            ...( headers ? { headers: headers } : {}),
                            ...( method ? { method: method } : {}),
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
                    async ({body = null, credentials = null, method = null, headers = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                        statusText: "Unauthorized",
                    });

                    const fetch = jest
                        .spyOn(http, "httpRequest")
                        .mockRejectedValue(new HTTPNotAuthenticated( response ));


                    await expect(
                       markdownHttpRequest({
                            url: url,
                            ...( credentials ? { credentials: credentials } : {}),
                            ...( body ? { body: body } : {}),
                            ...( headers ? { headers: headers } : {}),
                            ...( method ? { method: method } : {}),
                            ...( signal ? { signal: signal } : {})
                        }),
                    ).rejects.toBeInstanceOf(HTTPNotAuthenticated);
                });
            });



            describe("Exception passed response", () => {

                test.each(testParams)(
                    "$name",
                    async ({body = null, credentials = null, method = null, headers = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                        statusText: "Unauthorized",
                    });

                    const fetch = jest
                        .spyOn(http, "httpRequest")
                        .mockRejectedValue(new HTTPNotAuthenticated( response ));


                    try {

                        await markdownHttpRequest({
                                url: url,
                                ...( credentials ? { credentials: credentials } : {}),
                                ...( body ? { body: body } : {}),
                                ...( headers ? { headers: headers } : {}),
                                ...( method ? { method: method } : {}),
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
                    async ({body = null, credentials = null, method = null, headers = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(http, "httpRequest")
                        .mockResolvedValue(response);


                    const result = await markdownHttpRequest({
                        url: url,
                        ...( credentials ? { credentials: credentials } : {}),
                        ...( body ? { body: body } : {}),
                        ...( headers ? { headers: headers } : {}),
                        ...( method ? { method: method } : {}),
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
                    async ({body = null, credentials = null, method = null, headers = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(http, "httpRequest")
                        .mockResolvedValue(response);


                    const result = await markdownHttpRequest({
                        url: url,
                        ...( credentials ? { credentials: credentials } : {}),
                        ...( body ? { body: body } : {}),
                        ...( headers ? { headers: headers } : {}),
                        ...( method ? { method: method } : {}),
                        ...( signal ? { signal: signal } : {})
                    });

                    expect(fetch).toHaveBeenCalledWith(
                        expected,
                    ); // Pre-Req: Test must fail if not the correct call.

                    expect(result).toBe(response);
                });
            });



            describe("No HTTPError Exception", () => {

                test.each(testParams)(
                    "$name",
                    async ({body = null, credentials = null, method = null, headers = null, signal = null, expected}) => {

                    const response = new Response(null, {
                        status: status,
                    });

                    const fetch = jest
                        .spyOn(http, "httpRequest")
                        .mockResolvedValue(response);


                    await expect(
                       markdownHttpRequest({
                            url: url,
                            ...( credentials ? { credentials: credentials } : {}),
                            ...( body ? { body: body } : {}),
                            ...( headers ? { headers: headers } : {}),
                            ...( method ? { method: method } : {}),
                            ...( signal ? { signal: signal } : {})
                        }),
                    ).resolves.not.toBeInstanceOf(HttpError);
                });
            });
        });
    });
});
