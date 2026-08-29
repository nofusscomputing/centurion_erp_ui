import {
    Params
} from "react-router";

import {
    loaderNamedParams
} from ".";

import useGithubFetcher from "../../hooks/useGithubFetcher";



/**
 * 
 * @category Parameters
 * @since 0.13.0
 */
export interface githubLoaderNamedParams extends loaderNamedParams {

    /**
     * Route URL Parameters.
     */
    params: Params
}


/**
 * 
 * This loader uses a {@link useGithubFetcher | Github backend} to fetch both
 * the data and metadata.
 * 
 * @summary Github loader that fetches both Data and Metadata.
 * 
 * @category Loader
 * @expandType githubLoaderNamedParams
 * @since 0.13.0
 */
const githubLoader = async ({
    baseURL,
    request,
    params
}: githubLoaderNamedParams): Promise<string> => {

    const response = await useGithubFetcher({
        url: request.url,
        baseURL: baseURL,
        params: params,
        signal: request.signal,
    })

    return await response.clone().text();

}

export default githubLoader;
