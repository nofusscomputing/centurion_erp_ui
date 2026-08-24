import {
    HTTPNamedParams
} from "../../functions/http"



/**
 * Named parameters for route loaders.
 * 
 * @summary Route Loader Params
 * 
 * @category Params
 * @since 0.13.0
 */
export interface loaderNamedParams {

    /**
     * {@inheritDoc HTTPNamedParams.url}
     */
    baseURL: HTTPNamedParams['url']

    /**
     * Request object for loader.
     */
    request: Request

}
