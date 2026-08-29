import { getCookie } from "./getCookie";

import useDjangoFetcher from "./useDjangoFetcher";



/**
 * Make an API call to fetch data
 * 
 * @param {String} url_path The URL path to fetch from
 * @param {Function} callback The callback function for the collected data
 * @param {String} http_method The HTTP method to use
 * @param {Boolean} metadata Make an HTTP/OPTIONS request to collect metadata
 * @param {Boolean} patch Temp: stop gap until refactor to propper POST -> REsponse as data instead of additional HTTP/GET
 * @returns {Object} for patch/post/put request, the response object is returned
 * @returns {Object} for get request an object is returned {api_metadata, api_page_data, response}
 * 
 * @deprecated since 0.13.0 use {@link useDjangoFetcher} instead.
 * 
 */
export async function apiFetch(
    url_path,
    callback = null,
    http_method = 'GET',
    data_body = null,
    metadata = true,
    patch = true
) {

    console.debug(`apiFetch called: ${http_method} ${url_path}`);
    // console.debug(`apiFetch, using API_URL env variable: [${window.env.API_URL}]`)

    // console.debug(`apiFetch [method: ${http_method}] was passed URL: [${url_path}] with fetch metadata as ${metadata}`)

    if( String(url_path).includes(String(window.env.API_URL).trim()) ) {    // normalise passed URLs

        // console.debug(`url_path for function apiFetch was a full url, [${url_path}], normalizing...`)

        url_path = String(url_path).replace(String(window.env.API_URL).trim(), '').replace('//', '/')

        // console.debug(`normailized to [${url_path}]`)

    }

    if( url_path ) {

        if(
            ! url_path.startsWith('/')
            && url_path != ''
        ) {

            url_path = '/' + url_path

        }

    }

    url_path = String(url_path).replace('/add', '').replace('/edit', '')

    // console.debug(`apiFetch url_path is: ${url_path}`)


    let request_data = {
        ...( getCookie('csrftoken') ? { credentials: 'include' } : {}),
        headers: {
            ...(getCookie('csrftoken') ? { 'X-CSRFToken': getCookie('csrftoken') } : {})

        },
        method: http_method,
    }

    if( ['patch', 'post', 'put'].includes(http_method.toLowerCase()) ) {

        request_data['headers']['Content-Type'] = 'application/json'

        if( data_body ) {

            if( getCookie('csrftoken') ) {
                data_body['csrfmiddlewaretoken'] = getCookie('csrftoken')
            }


            request_data['body'] = JSON.stringify(data_body)
        }

    }


    let api_metadata = null

    let api_data = null

    const api_data_response = await useDjangoFetcher({
        url: window.env.API_URL + url_path,
        method: http_method.toUpperCase(),
        body: request_data['body']
    })

        .then(data => {

            if( http_method.toUpperCase() === 'OPTIONS' ) {

                return data.apiMetadata;

            }

            return data.apiData

        });


    if(
        metadata
        && http_method.toUpperCase() !== 'OPTIONS'
        && http_method.toUpperCase() !== 'DELETE'
    ) {

        console.debug(`apiFetch called: ${http_method} ${url_path} -Making Options Request-`);

        // const api_metadata_response = await fetch(window.env.API_URL + url_path,
        const api_metadata_response = await useDjangoFetcher({
            url: window.env.API_URL + url_path,
            onlyMetadata: true
            })
            .then(data => {

                return data.apiMetadata

            });

        if( api_metadata_response.status != 204 ) {

            api_metadata = await api_metadata_response.clone().json()

        }
    }


    if( api_data_response.status != 204 ) {

        if( http_method.toUpperCase() === 'OPTIONS' ) {

            api_metadata = await api_data_response.clone().json()

            api_data = await api_data_response.clone().json()

        } else {

            api_data = await api_data_response.clone().json()

        }

        if( callback && api_metadata ) {

            callback(api_data, api_metadata)

        }else if( callback && ! api_metadata ) {

            callback(api_data)

        }
    }


    // console.debug(`apiFetch finished for URL: [${url_path}]`)

    if(
        (
            http_method === 'PATCH'
            || http_method === 'POST'
            ||http_method === 'PUT'
        )
        && ! patch
    ) {
        return api_data_response
    }

    return {
        api_metadata: api_metadata,
        api_page_data: api_data,
        response: api_data_response.response,
        status: api_data_response.status,
    };

}
