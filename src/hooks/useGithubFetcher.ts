import {
    Params
} from "react-router";

import {
        HTTPNamedParams,
} from "../functions/http";

import {
    fetcherCommonNamedParams
} from ".";

import URLSanitize from "../functions/URLSanitize";
import markdownHttpRequest from "../functions/httpMarkdown";



/**
 * 
 * Named Parameters for Django Fetcher.
 * 
 * @category NamedParameters
 * @expand
 * @since 0.13.0
 */
export interface githubFetcherNamedParams extends fetcherCommonNamedParams {

    /**
     * Route path parameters
     */
    params?: Params

}



/**
 * This Fetcher sets up everything required to fetch markdown documents from a
 * Github repository using the _raw_ HTTP endpoint.
 * 
 * It's important to note, that when setting up markdown routes, that a
 * non-index route use `path: ':mdFile'`. This mather will then create param
 * `mdFile` which is used to denote that the markdown file is not an index
 * path. Failure to use this matcher will prevent paths that are not for a
 * `index.md` file to fail.
 * 
 * @example
 * 
 * ``` js
 * const githubResponse = await useGithubFetcher({
 *          url: '/',
 *     });
 *
 * const mdDocument = await githubResponse.clone().text();
 * 
 * ```
 * 
 * @summary Github based backend fetcher for datasets.
 * 
 * @category Hook
 * @expandType githubFetcherNamedParams
 * @since 0.13.0
 */
export default async function useGithubFetcher({
    url,
    baseURL = undefined,
    params,
    signal = null
}: githubFetcherNamedParams ): Promise<Response> {

    let mdDocumentName = params?.mdFile ? (
        String(url).endsWith(params.mdFile) ? '.md' : `${params.mdFile}.md`
    ) : ( String(url).endsWith('/') ? 'index.md' : '/index.md' )

    const options: HTTPNamedParams = {
        signal: signal,
        url: String(`${(
            baseURL ? baseURL : window.env.API_URL
        )}${URLSanitize(url)}${mdDocumentName}`)
    }


    return await markdownHttpRequest({
        ...options,
        method: 'GET'
    });

}
