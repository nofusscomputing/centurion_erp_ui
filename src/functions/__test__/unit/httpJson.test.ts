import {
    HttpError,
    HTTPNotAuthenticated
} from "../../../classes/Exceptions";

import * as http from "../../http";

import {
    httpRequest,
    HTTPNamedParams
} from "../../http";

import jsonHttpRequest from "../../httpJson";


describe("httpJsonRequest", () => {

    const url = "https://my-domain.tld/some-path"

    afterEach(() => {

        jest.restoreAllMocks();

    });


    describe("No Method Supplied - Defaults to GET", () => {

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
                    body: null,
                    credentials: false,
                    headers: {
                        "Accept": "application/json"
                    },
                    method: "GET",
                    signal: null,
                    url: url
                }
            },
            {
                name: "Headers passed",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer test-token",
                },
                expected: {
                    body: null,
                    credentials: false,
                    headers: {
                        "Accept": "application/json",
                        Authorization: "Bearer test-token",
                        "Content-Type": "application/json"
                    },
                    method: "GET",
                    signal: null,
                    url: url
                }
            },
            {
                name: "Body passed",
                body: JSON.stringify({
                    foo: "bar",
                }),
                expected: {
                    body: JSON.stringify({
                        foo: "bar",
                    }),
                    credentials: false,
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    method: "GET",
                    signal: null,
                    url: url
                }
            },
            {
                name: "Credentials passed",
                credentials: true,
                expected: {
                    body: null,
                    credentials: true,
                    headers: {
                        "Accept": "application/json"
                    },
                    method: "GET",
                    signal: null,
                    url: url
                }
            },
            {
                name: "Signal passed",
                signal: abortSignal.signal,
                expected: {
                    body: null,
                    credentials: false,
                    headers: {
                        "Accept": "application/json"
                    },
                    method: "GET",
                    signal: abortSignal.signal,
                    url: url
                }
            }
        ]



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


                    const result = await jsonHttpRequest({
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


                    const result = await jsonHttpRequest({
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
                       jsonHttpRequest({
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



        describe("HTTP/201", () => {

            const status = 201;

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


                    const result = await jsonHttpRequest({
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


                    const result = await jsonHttpRequest({
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


                    const result = await jsonHttpRequest
                    await expect(
                       jsonHttpRequest({
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


                    const result = await jsonHttpRequest({
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


                    const result = await jsonHttpRequest({
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
                       jsonHttpRequest({
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
                       jsonHttpRequest({
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

                        await jsonHttpRequest({
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


                    const result = await jsonHttpRequest({
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


                    const result = await jsonHttpRequest({
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
                       jsonHttpRequest({
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
