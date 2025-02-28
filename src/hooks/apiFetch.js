import { getCookie } from "./getCookie";

/**
 * Make an API call to fetch data
 * 
 * @param {String} url_path The URL path to fetch from
 * @param {Function} callback The callback function for the collected data
 * @param {String} http_method The HTTP method to use
 * @param {Boolean} metadata Make an HTTP/OPTIONS request to collect metadata
 * @returns {Object} for patch/post/put request, the response object is returned
 * @returns {Object} for get request an object is returned {api_metadata, api_page_data, response}
 */
export async function apiFetch(
    url_path,
    callback = null,
    http_method = 'GET',
    data_body = null,
    metadata = true,
) {

    console.debug(`apiFetch, using API_URL env variable: [${window.env.API_URL}]`)

    console.debug(`apiFetch was passed URL: [${url_path}]`)

    if( String(url_path).includes(String(window.env.API_URL).trim()) ) {    // normalise passed URLs

        console.debug(`url_path for function apiFetch was a full url, [${url_path}], normalizing...`)

        url_path = String(url_path).replace(String(window.env.API_URL).trim(), '')

        console.debug(`normailized to [${url_path}]`)

    }

    if( url_path ) {

        if(
            ! url_path.startsWith('/')
            && url_path != ''
        ) {

            url_path = '/' + url_path

        }

    } else {

        url_path = '/'

    }

    url_path = String(url_path).replace('/add', '').replace('/delete', '').replace('/edit', '')

    console.debug(`apiFetch url_path is: ${url_path}`)


    let request_data = {
        credentials: 'include',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        method: http_method,
    }

    if( ['patch', 'post', 'put'].includes(http_method.toLowerCase()) ) {

        request_data['headers']['Content-Type'] = 'application/json'

        if( data_body ) {

            data_body['csrfmiddlewaretoken'] = getCookie('csrftoken')

            request_data['body'] = JSON.stringify(data_body)
        }

    }


    let api_metadata = null

    let api_data = null

    const api_data_response = await fetch(window.env.API_URL + url_path, request_data)

        .then(data => {

            return data

        })
        .catch(err => {

            console.log(`apiFetch: an error occured within the details page ${err}`)


            throw Error(err)

        });

    if(
        http_method === 'GET'
        && metadata
    ) {

        const api_metadata_response = await fetch(window.env.API_URL + url_path,
                {
                    ...request_data,
                    method: 'OPTIONS'
                }
            )
            .then(data => {

                return data

            })
            .catch(err => {

                console.log(`apiFetch: an error occured within the details page ${err}`)


                throw Error(err)

            });

        if( api_metadata_response.status != 204 ) {

            api_metadata = await api_metadata_response.clone().json()

        }
    }


    if( api_data_response.status != 204 ) {

        api_data = await api_data_response.clone().json()
        
        if( api_data_response.status == 400 ) {

            throw Error(JSON.stringify(api_data))
        }
    

        if( callback && api_metadata ) {

            callback(api_data, api_metadata)

        }else if( callback && ! api_metadata ) {

            callback(api_data)

        }
    }


    console.debug(`apiFetch finished for URL: [${url_path}]`)

    if(
        http_method === 'PATCH'
        || http_method === 'POST'
        ||http_method === 'PUT'
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
