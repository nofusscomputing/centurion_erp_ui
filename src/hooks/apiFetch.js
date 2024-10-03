import { ResponseException } from "../classes/Exceptions";
import { getCookie } from "./getCookie";

/**
 * Make an API call to fetch data
 * 
 * @param {String} url_path The URL path to fetch from
 * @param {Function} callback The callback function for the collected data
 * @param {String} http_method The HTTP method to use
 * @returns 
 */
export async function apiFetch(
    url_path,
    callback = null,
    http_method = 'GET',
    data_body = null
) {

    let api_data = null

    if(
        ! url_path.startsWith('/')
        && url_path != ''
    ) {

        url_path = '/' + url_path

    }

    let request_data = {
        credentials: 'include',
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        },
        method: http_method,
    }

    if( ['patch', 'post', 'put'].includes(http_method.toLowerCase()) ) {

        request_data['headers']['Content-Type'] = 'application/json'

        data_body['csrfmiddlewaretoken'] = getCookie('csrftoken')

        request_data['body'] = JSON.stringify(data_body)

    }

    let response = await fetch('http://127.0.0.1:8002/api/v2' + url_path, request_data)

        .then(data => {

            return data

        })

        .catch(err => {

            throw Error(err)

        });

    if( response.status != 204 ) {
        api_data = await response.json()
    }

    if( callback ) {

        callback(api_data)

    }

    return response;

}
