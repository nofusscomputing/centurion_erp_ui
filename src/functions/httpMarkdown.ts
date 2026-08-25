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
 *      url: "https://my-domain-name.tld/some-path.md",
 *      method: "GET",
 * })
 * 
 * ```
 * 
 * @summary JSON HTTP fetcher.
 * 
 * @throws Error if the method is "PATCH" or "POST" and the body is empty.
 * 
 * @category Fetcher
 * @expandType HTTPNamedParams
 * @since 0.13.0
 */
export default async function markdownHttpRequest({
    credentials = 'omit',
    referrerPolicy = 'no-referrer',
    mode = 'cors',
    headers = {},
    method = "GET",
    signal = null,
    url,
}: HTTPNamedParams): Promise<Response> {

    return await httpRequest({
        credentials: credentials,
        referrerPolicy: referrerPolicy,
        mode: mode,
        headers: {
            ...headers,
            "Accept": "text/plain"
        },
        method: method,
        signal: signal,
        url: url
    });

}
