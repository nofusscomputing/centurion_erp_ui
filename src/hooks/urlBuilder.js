/**
 * URL Builder
 * 
 * This function is designed to cater for the fact that regex
 * can't be used on routes in v6. This function returns the
 * params IAW the established URL rules.
 * 
 * Also returns: 
 * 
 * - "back/cancel" url
 * - "Action" URL
 * - Current URL
 * - API Path for hook `apiFetch`
 * - HTTP method for the action URL
 * 
 * You should use this function anywhere you would be using hook
 * `useParams`
 * 
 * @param {object} params params from the `useParams` hook
 * @returns 
 */
export default function urlBuilder(
    params = null

) {


    let url = ''

    let url_common_path = ''

    let path_directories = String(document.location.pathname).substring(1).split('/')

    let action = params.action

    let module = params.module

    let model = params.model

    let pk = params.pk

    let common_model = null
    let common_pk = null


    if( params.module ) {

        url += '/' + String(params.module)

    }


    const allowed_actions = [ 'add', 'delete', 'edit' ]

    if( ! allowed_actions.includes( action ) ) {

        action = null

        for( let dir of path_directories ) {

            if( allowed_actions.includes(dir) ) {
                action = String(dir)
            }
        }
    }

    const ticket_models = [
        'change',
        'incident',
        'problem',
        'request',
    ] // Expected to have had `/ticket/` in the url

    if( params.common_model ) {

        common_model = params.common_model

    }

    if( params.common_pk ) {

        common_pk = params.common_pk

    }


    if(
        Boolean( Number( pk ))
        && pk
        && Boolean( Number( common_pk ))
        && common_pk
    ) {    // model undetermined, fetch from current url


        model = path_directories[3]

    }


    if(
        ticket_models.includes(model)
    ) {

        common_model = 'ticket'

    }


    if(
        (
                common_pk
            || common_model
        )
        && ! ticket_models.includes(model)
    ) {

        common_pk = params.common_pk


        if(
            Boolean( Number( params.action ) )
            || Boolean( Number( params.common_model ) )
            || Boolean( Number( params.model ) )
            || ! Boolean( Number( params.pk ) )
            || ! Boolean( Number( params.common_pk ) )
        ) {    // Params didn't work, manually figure out


            if( path_directories[1] != params.common_model) {

                common_model = path_directories[1]

            }


            if(
                path_directories[2] != params.common_pk
                && Boolean( Number( path_directories[2] ) )
            ) {

                common_pk = path_directories[2]

            }


            if( path_directories[3] != params.model) {

                model = path_directories[3]

            }


            if(path_directories.length >= 4 ) {

                if(
                    path_directories[4] != params.pk
                    && Boolean( Number( path_directories[4] ) )
                ) {

                    pk = path_directories[4]

                }

                if(path_directories.length >= 5 ) {

                    console.warn( 'path is 5 or more elements' )
                }
            }

        }
    }


    if(
        ! (
            common_model
            || common_pk
        )
    ) {


        if( model ) {

            url += '/' + String(model)

        }

        if( pk && Boolean( Number( pk ) ) ) {

            url += '/' + pk
    
        }

    } else if( common_model ) {

        if( common_model ) {

            url += '/' + String(common_model)

        }

        if( common_pk && Boolean( Number( common_pk ) ) ) {

            url += '/' + String( common_pk )

        }else if( common_pk && ! Boolean( Number( common_pk ) ) ) {

            // error as the param is set and is NaN
            console.error(
                `common pk was set, however is NaN with a value of ${common_pk}`
            )

        }


        if( model && ! action != 'edit') {

            url_common_path += '/' + String( model )


            if( pk && Boolean( Number( pk ) ) ) {

                url_common_path += '/' + pk
        
            }

        }else if( action == 'edit' ) {

            url += '/' + String( model )

            if( pk && Boolean( Number( pk ) ) ) {

                url += '/' + pk
        
            }
        }


        url += url_common_path



    }

    let method = 'GET'
    let return_url = String(document.location.pathname)


    return_url = String(url).replace(url_common_path, '')



    if( action == 'add' ) {

        method = 'POST'

    }else if( action ==  'edit' ) {

        method = 'PATCH'

    }

    if(
        Boolean( Number( model ) )
        || (
            ! Boolean( Number( pk ) )
            && pk
        )
    ) {

        throw Error(`params are incorrect: ${JSON.stringify( {
            'action': action,
            'module': module,
            'model': model,
            'pk': pk,
            'common_model': common_model,
            'common_pk': common_pk,
        } )}`)
    }


    if(
        (
            Boolean( Number( common_model ) )
            && common_model
        )
        || (
            ! Boolean( Number( common_pk ) )
            && common_pk
        )
    ) {

        throw Error(`params are incorrect: ${JSON.stringify( {
            'action': action,
            'module': module,
            'model': model,
            'pk': pk,
            'common_model': common_model,
            'common_pk': common_pk,
        } )}`)
    }

    if(
        Boolean( Number( action ) )
        && action
    ) {

        throw Error(`params are incorrect: ${JSON.stringify( {
            'action': action,
            'module': module,
            'model': model,
            'pk': pk,
            'common_model': common_model,
            'common_pk': common_pk,
        } )}`)
    }


    return {
        'api': {
            'url': window.env.API_URL + url,
            'path': url
        },
        'method': method,
        'path': url,
        'params': {
            'module': module,
            'model': model,
            'pk': pk,
            'common_model': common_model,
            'common_pk': common_pk,
            'action': action,
        },
        'return_url': return_url

    };
}
