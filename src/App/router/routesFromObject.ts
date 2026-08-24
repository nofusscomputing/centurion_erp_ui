import {
    RouteObject
} from "react-router";

import {
    pageActions,
    pageComponents,
    pageLoaders
} from "."

import {
    RouteDescription
} from "../../types/backend/apiMetadata/RouteDescriptions";

import
    StateSplash,
    {
        StateIcon
} from "../../components/StateSplash"



/**
 * Dynamically build the routes The UI will use.
 * 
 * @category Function
 * @since 0.13.0
 */
export function routesFromObject({
    routes,
    baseURL = window.env.API_URL
}: {
    /**
     * UI Route object from {@link apiRootMetadata.routes} to use to create
     * routes for the UI.
     */
    routes: RouteDescription[],

    /**
     * Base URL for the backend.
     */
    baseURL?: string
}): RouteObject[] {

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

                case "action":

                    builtRoute['action'] = pageActions[String(value)]

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

                case "component":

                    builtRoute["Component"] = pageComponents[String(value)];

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

                case "id":

                    builtRoute["id"] = String(value);

                    break;

                case "index":

                    builtRoute["index"] = Boolean(value);

                    break;

                case "loader":

                    builtRoute['loader'] = (params) => pageLoaders[String(value)]({
                        ...params,
                        baseURL: baseURL,
                    })

                    break;

                case "path":

                    builtRoute["path"] = String(value);

                    break;

                case "revalidate":

                    if( value === true ) {

                        builtRoute["shouldRevalidate"] = () => true;

                    } else if( value === false ) {

                        builtRoute["shouldRevalidate"] = () => false;

                    }

                    break;

                // default:

                //     builtRoute[key] = value;

            }

        };

        builtRoutes.push( builtRoute )

    };

    return builtRoutes;
}
