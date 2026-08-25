import {
    httpRequest,
    HTTPNamedParams
} from "./http";


/**
 * This object is intended to serve as the single point for all HTTP requests
 * that are expected to send / receive json data.
 * 
 * This object is a wrapper for {@link httpRequest} that adds the required
 * information to the request as well as performs validation. 
 * 
 * When calling this fetcher, ensure that you have at least provided a `url`
 * and the `body` (if method `PATCH` or `POST`) to make the request.
 * 
 * ``` js
 * 
 * const myRequest = jsonHttpRequest({
 *      url: "https://my-domain-name.tld/some-path",
 *      method: "POST",
 *      body: {
 *          "a_key": "a value"
 *      }
 * })
 * 
 * ```
 * 
 * @summary JSON HTTP fetcher.
 * 
 * @throws Error if the method is "PATCH" or "POST" and the body is empty.
 * 
 * @category fetcher
 * @expandType HTTPNamedParams
 * @since 0.13.0
 */
export default async function jsonHttpRequest({
    body = null,
    credentials = 'omit',
    referrerPolicy = 'strict-origin-when-cross-origin',
    mode = 'no-cors',
    headers = {},
    method = "GET",
    signal = null,
    url,
}: HTTPNamedParams): Promise<Response> {

    if( ["PATCH", "POST"].includes(method) && body === null ) {

        throw new Error(
            `A HTTP request using method "${method}" requires a body.`
        )

    }

    return await httpRequest({
        body: body,
        credentials: credentials,
        referrerPolicy: referrerPolicy,
        mode: mode,
        headers: {
            ...headers, 
            "Accept": "application/json",
            ...(body ? {"Content-Type": "application/json"} : {})
        },
        method: method,
        signal: signal,
        url: url
    });

}
