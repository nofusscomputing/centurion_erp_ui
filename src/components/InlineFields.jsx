import { useContext, useId, useState } from "react";

import { apiFetch } from "../hooks/apiFetch";
import { Form, redirect } from "react-router";
import { FormatTime } from "../functions/FormatTime";
import URLSanitize from "../functions/URLSanitize";



export const InlineFieldAction = async ({ request, params }) => {

    if(
        ! String(request.url).replace(
            document.location.origin, ''
        ).endsWith(document.location.pathname)
    ) {    // as request does not contain the path, check doc path

        throw Error(`InlineFieldAction URL ${request.url} does not match ${document.location.pathname}`)
    }

    const data = await request.formData()
    // const formState = await request.formState()

    const metadata = JSON.parse(data.get('metadata'))

    const timezone = data.get('tz')

    let form_data = {}

    for (const [ fieldName, fieldValue ] of data.entries()) {

        if( ['metadata', 'tz'].includes( fieldName ) ) {

            continue;
        }

        console.debug(`InlineFieldAction=:${fieldName}`);

        if( ! metadata.fields.hasOwnProperty(fieldName) ) {    // field not part of request

            continue;
        }

        let value = ''

        switch( String(metadata.fields[fieldName].type).toLowerCase() ) {

            case 'boolean':

                value = Boolean(fieldValue);

                break;

            case 'datetime':

                value = FormatTime({
                    time: String(fieldValue),
                    iso: true,
                    tz: timezone
                });

                break;

            case 'choice':
            case 'integer':

                value = Number(fieldValue);

                break;

            case 'relationship':

                if( String(metadata.fields[fieldName].relationship_type) == "ManyToOne") {

                    value = Number(fieldValue);

                } else {

                    if( form_data.hasOwnProperty( fieldName ) ) {

                        value = [ ...form_data[fieldName], Number(fieldValue) ]

                    } else {

                        value = [ Number(fieldValue) ]

                        if( typeof(fieldValue) === 'array' ) {

                            value = Number(fieldValue)

                        }
                    }
                }

                break;

            case 'string':

                value = String(fieldValue)

                break;

            default:

                value = fieldValue;

                break;

        }

        if( value !== '' && value !== 0 ){

            form_data = {
                ...form_data,
                [fieldName]: value
            }

        }

        console.debug(`InlineFieldAction (json apend): ${JSON.stringify(form_data)}`)

      }

    console.debug(`InlineFieldAction (json): ${JSON.stringify(form_data)}`)

    let actionReturn = {
        // errors: {},    // Don't include this key by default. its existance denotes an error has occured.
        ok: false,
        body: null
    }

    const update = await apiFetch(
        URLSanitize(request.url),
        null,
        request.method,
        form_data,
        false,
        false
    )
        // .then(data => {

        //     return data

        // });
        .then(async (response) => {

            actionReturn.ok = response.ok;

            if( response.ok ) {

                actionReturn.body = await response.clone().json();

            } else {

                actionReturn.errors = await response.clone().json();

            }

            actionReturn.status_code = response.status

            return response;

        });

    const api_return = await update.clone().json()

    if( String(request.method).toLowerCase() == 'post' ) {

        return redirect(URLSanitize(api_return._urls._self))
    }




    return actionReturn;

}

