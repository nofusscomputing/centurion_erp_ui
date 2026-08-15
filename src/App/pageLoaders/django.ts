import {
    APIMetadata
} from "../../../types/APIMetadata";

import useDjangoFetcher from "../../hooks/useDjangoFetcher";



/**
 * 
 * This loader uses a {@link useDjangoFetcher | Django backend} to fetch both
 * the data and metadata.
 * 
 * @summary Django loader that fetches both Data and Metadata.
 * 
 * @category Loader
 * @since 0.13.0
 */
const djangoLoader = async ({
    request
}): Promise<{metadata: APIMetadata, page_data: APIDataObject}> => {

    console.debug('Django Loader', request)

    const {apiMetadata, apiData} = await useDjangoFetcher({
        getMetadata: true,
        url: request.url,
        signal: request.signal,
    })

    return {
        metadata: await apiMetadata.clone().json(),
        page_data: await apiData.clone().json()
    }

}

export default djangoLoader;
