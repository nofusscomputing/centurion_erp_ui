import
    StateSplash,
    {
        StateIcon
} from "../../components/StateSplash"

import {
    components,
    pageLoaders
} from "."



export function routesFromObject({
    routes,
    baseURL = window.env.API_URL
}) {

    const routesObject = routes;

    let builtRoutes = [];

    for(let route of routesObject) {

        let builtRoute = {
            // id: undefined,
            // path: undefined,
            // Component: undefined,
            // HydrateFallback: undefined,
            middleware: []
            // loader: undefined,
            // action: undefined,
            // shouldRevalidate: undefined,
            // children: [],
        }

        for( let [key, value] of Object.entries( route )) {

            switch( key ) {

                case "id":

                    builtRoute["id"] = String(value);

                    break;

                case "index":

                    builtRoute["index"] = Boolean(value);

                    break;

                case "path":

                    builtRoute["path"] = String(value);

                    break;

                case "component":

                    builtRoute["Component"] = components[String(value)];

                    break;

                case "handle":

                    builtRoute["handle"] = value;

                    break;

                case "hydrate":

                    if( value === 'loader' ) {

                        builtRoute["HydrateFallback"] = () => StateSplash({
                            titleText: "Loading Data",
                            icon: StateIcon.loading
                        });

                    }

                    break;

                case "loader":

                    builtRoute['loader'] = (params) => pageLoaders[String(value)]({
                        ...params,
                        baseURL: baseURL,
                    })

                    break;

                case "action":

                    // builtRoute["action"] = actions[String(value)];
                    builtRoute["action"] = value;

                    break;

                case "revalidate":

                    if( value === true ) {

                        builtRoute["shouldRevalidate"] = () => true;

                    } else if( value === false ) {

                        builtRoute["shouldRevalidate"] = () => false;

                    }

                    break;

                case "children":

                    let backendURL = baseURL;

                    if( Object.hasOwn( Object(route), 'handle' )) {

                        if( Object.hasOwn( Object(route.handle), 'backend_url') ) {

                            backendURL = route.handle.backend_url;

                        }
                    }

                    builtRoute["children"] = routesFromObject({ routes: value, baseURL: backendURL })

                    break;

                // default:

                //     builtRoute[key] = value;

            }

        };

        builtRoutes.push( builtRoute )

    };

    return builtRoutes;
}


