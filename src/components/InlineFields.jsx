import { useContext, useId, useState } from "react";

import { apiFetch } from "../hooks/apiFetch";
import { Form, redirect } from "react-router";
import { FormatTime } from "../functions/FormatTime";



export const InlineFieldAction = async ({ request, params }) => {

    if( ! String(request.url).endsWith(document.location.pathname) ) {    // as request does not contain the path, check doc path

        throw Error(`InlineFieldAction URL ${request.url} does not match ${document.location.pathname}`)
    }

    const data = await request.formData()

    const metadata = JSON.parse(data.get('metadata'))

    const timezone = data.get('tz')

    let form_data = {}

    for (const itItem of data.entries()) {

        if( ['metadata', 'tz'].includes( itItem[0] ) ) {

            continue;
        }

        console.debug(`InlineFieldAction=:${itItem}`);

        if( ! metadata.fields.hasOwnProperty(itItem[0]) ) {    // field not part of request

            continue;
        }

        let value = ''

        switch( String(metadata.fields[itItem[0]].type).toLowerCase() ) {

            case 'boolean':

                value = Boolean(itItem[1]);

                break;

            case 'datetime':

                value = FormatTime({
                    time: String(itItem[1]),
                    iso: true,
                    tz: timezone
                });

                break;

            case 'choice':
            case 'integer':

                value = Number(itItem[1]);

                break;

            case 'relationship':

                if( String(metadata.fields[itItem[0]].relationship_type) == "ManyToOne") {

                    value = Number(itItem[1]);

                } else {

                    if( form_data.hasOwnProperty( itItem[0] ) ) {

                        value = [ ...form_data[itItem[0]], Number(itItem[1]) ]

                    } else {

                        value = [ Number(itItem[1]) ]

                        if( typeof(itItem[1]) === 'array' ) {

                            value = Number(itItem[1])

                        }
                    }
                }

                break;

            case 'string':

                value = String(itItem[1])

                break;

            default:

                value = itItem[1];

                break;

        }

        if( value !== '' && value !== 0 ){

            form_data = {
                ...form_data,
                [itItem[0]]: value
            }

        }

        console.debug(`InlineFieldAction (json apend): ${JSON.stringify(form_data)}`)

      }

    console.debug(`InlineFieldAction (json): ${JSON.stringify(form_data)}`)

    const update = await apiFetch(
        document.location.pathname,
        null,
        request.method,
        form_data,
        false,
        false
    )
        .then(data => {

            return data

        });

    const api_return = await update.clone().json()

    if( String(request.method).toLowerCase() == 'post' ) {

        return redirect(URLSanitize(api_return._urls._self))
    }

    return null;

}

