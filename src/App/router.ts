import {
    createBrowserRouter,
    createContext,
    RouteObject,
    RouterContext
} from "react-router"

import djangoLoader from "./pageLoaders/django"
import djangoMetadataLoader from "./pageLoaders/djangoMetadata"
import djangoRootMetadataLoader from "./pageLoaders/djangoRootMetadata"

import {
    APISubmitAction
} from "../components/DisplayFields"
import
    StateSplash,
    {
        StateIcon
} from "../components/StateSplash"

import useDjangoFetcher from "../hooks/useDjangoFetcher"

import Detail from "../layout/Detail"
import RouteErrorBoundary from "../layouts/ErrorBoundary"
import History from "../layout/history"
import List from "../layout/List"
import Settings from "../layout/Settings"
import Ticket from "../layout/Ticket"

import Base from "../layouts/Base"
import PageContent from "../layouts/PageContent"
import Redirect from "../layouts/Redirect"

import UI from "../layouts/ui"
import NotificationLayout from "../layouts/Notifications"



/**
 * This route context is for holding the backend url that is to be used by
 * loaders.
 * 
 * @summary Route context containing the backend URL.
 * 
 * @category Context
 * @since 0.13.0
 */
export const backendURLRouteContext: RouterContext<string> = createContext<string>(undefined);

/**
 * This middleware sets context {@link backendURLRouteContext} for use by loaders.
 * 
 * @summary middleware that sets the backend url.
 * 
 * @category Middleware
 * @since 0.13.0
 */
export function backendURLMiddleware({url, context}) {

    context.set(backendURLRouteContext, url)

}



function routesFromObject({ routes }) {

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

                    if( Object.hasOwn(Object(value), 'backend_url') ) {

                        builtRoute['middleware'].push(
                            ({context}) => backendURLMiddleware({
                                url: value.backend_url, context: context
                            })
                        )
                    }

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

                    builtRoute["loader"] = pageLoaders[String(value)];

                    break;

                // case "middleware":

                //     builtRoute["middleware"] = value;

                //     break;

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

                    builtRoute["children"] = routesFromObject({ routes: value })

                    break;

                // default:

                //     builtRoute[key] = value;

            }

        };

        builtRoutes.push( builtRoute )

    };

    return builtRoutes;
}



const components = {
    baseview: Base,
    detail: Detail,
    history: History,
    redirect: Redirect,
    list: List,
    settings: Settings,
    ticket: Ticket
};

const pageLoaders = {
    django: djangoLoader,
    django_metadata: djangoMetadataLoader,
    django_root_metadata: djangoRootMetadataLoader
};

const appRoutes = [{
    id: "root",
    path: "/",
    revalidate: false,
    children: [
        {
            index: true
        },
        {
            path: "settings",
            component: 'settings',
            loader: 'django'
        },
        {
            path: ":module",
            children: [
                {
                    path: "entity",
                    children: [
                        {
                            path: ":model",
                            children: [
                                {
                                    index: true,
                                    component: "list",
                                    loader: "django",
                                },
                                {
                                    path: "add",
                                    component: "detail",
                                    action: APISubmitAction,
                                    loader: "django_metadata",
                                    shouldRevalidate: false
                                    
                                },
                                {
                                    path: ":pk",
                                    component: "detail",
                                    action: APISubmitAction,
                                    loader: "django",
                                    shouldRevalidate: false
                                    
                                }
                            ]
                        }
                    ]
                },
                {
                    path: "git_repository",
                    children: [
                        {
                            index: true,
                            component: "list",
                            loader: "django"
                        },
                        {
                            path: "add",
                            component: "detail",
                            loader: "django_metadata",
                            action: APISubmitAction,
                            shouldRevalidate: false
                        },
                        {
                            path: ":pk",
                            component: "detail",
                            loader: "django",
                            action: APISubmitAction,
                            shouldRevalidate: false
                        }
                    ]
                },
                {
                    id: "tickets",
                    path: "ticket",
                    children: [
                        {
                            path: ":model",
                            children: [
                                {
                                    index: true,
                                    component: "list",
                                    loader: "django",
                                },
                                {
                                    path: "add",
                                    component: "ticket",
                                    action: APISubmitAction,
                                    loader: "django_metadata"
                                },
                                {
                                    path: ":pk",
                                    component: "ticket",
                                    action: APISubmitAction,
                                    loader: "django",
                                    shouldRevalidate: ({ currentParams, nextParams }) => {

                                        const reValidate = (
                                            currentParams.module !== nextParams.module ||
                                            currentParams.model !== nextParams.model ||
                                            currentParams.id !== nextParams.id
                                        )
    
                                        return reValidate

                                    }
                                },
                            ]
                        },
                        {
                            path: ":pk",
                            children: [
                                {
                                    path: ":subModel",
                                    children: [
                                        {
                                            path: "subModkPk",
                                            action: APISubmitAction,
                                            shouldRevalidate: false,
                                            children: [
                                                {
                                                    path: ":subSubModel",
                                                    action: APISubmitAction,
                                                    shouldRevalidate: false,
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    path: ":model",
                    children: [
                        {
                            index: true,
                            component: "list",
                            loader: "django"
                        },
                        {
                            path: "add",
                            component: "detail",
                            loader: "django_metadata",
                            action: APISubmitAction,
                            revalidate: false
                        },
                        {
                            path: ":pk",
                            children: [
                                {
                                    index: true,
                                    component: "detail",
                                    loader: "django",
                                    action: APISubmitAction,
                                },
                                {
                                    path: "history",
                                    component: "history",
                                    loader: "django"
                                },
                                {
                                    path: "ticket",
                                    children: [
                                        {
                                            path: ":ticket_sub_model",
                                            action: APISubmitAction,
                                            revalidate: false,
                                            children: [
                                                {
                                                    path: ":ticket_sub_model_pk",
                                                    component: "ticket",
                                                    loader: "django",
                                                    action: APISubmitAction,
                                                    revalidate: false
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    path: ":sub_model",
                                    children: [
                                        {
                                            index: true,
                                            component: "list",
                                            loader: "django",
                                            action: APISubmitAction,
                                            revalidate: false
                                        },
                                        {
                                            path: ":sub_model_pk",
                                            component: "detail",
                                            loader: "django",
                                            action: APISubmitAction,
                                            revalidate: false
                                        }
                                    ]
                                }
                            ]
                        },

                    ]
                }

            ]
        },

    ]
}]



/**
 * This function builds the UI routes from an object.
 * 
 * @summary Dynamic Router
 * 
 * @category Function
 * @since 0.13.0
 */
const dynamicRouter = () => {

    const routes: RouteObject[] = [
            {
                id: "base",
                Component: components['baseview'],
                ErrorBoundary: RouteErrorBoundary,
                HydrateFallback: () => StateSplash({titleText: "Loading UI", icon: StateIcon.loading }),
                children: [
                    /**
                     * Note: For a site that requires auth, login redirect cant
                     * be part of the dynamic routes. This is because the error
                     * boundary that uses a redirect will not have access to
                     * the dynamic routes until after they are loaded.
                     */
                    {
                        id: "login",
                        path: "/login",
                        Component: components['redirect'],
                        handle: {
                            url_redirect: `${window.env.API_URL}/auth/login`
                        }
                    },
                    {
                        id: "logout",
                        path: "/logout",
                        Component: components['redirect'],
                        handle: {
                            url_post: `${window.env.API_URL}/auth/logout`,
                            url_redirect: `${window.env.API_URL}/auth/login`
                        }
                    },
                    {
                        id: "root-backend",
                        handle: {
                            backend_url: window.env.API_URL
                        },
                        middleware: [ ({context}) => backendURLMiddleware({url: window.env.API_URL, context: context}) ],
                        children: [
                            {
                                id: "notifications",
                                Component: NotificationLayout,
                                children: [
                                    {
                                        id: "UI",
                                        Component: UI,
                                        loader: pageLoaders['django_root_metadata'],
                                        shouldRevalidate: () => false,
                                        ErrorBoundary: RouteErrorBoundary,
                                        HydrateFallback: () => StateSplash({titleText: "Loading UI", icon: StateIcon.loading }),
                                        children: [
                                            {
                                                id: "page",
                                                Component: PageContent,
                                                ErrorBoundary: RouteErrorBoundary,
                                                shouldRevalidate: () => false,
                                                HydrateFallback: () => StateSplash({titleText: "Loading Page Content", icon: StateIcon.loading }),
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                ]
            }
        ];


    return createBrowserRouter(
        routes,
        {
            basename: "",
            async patchRoutesOnNavigation({ patch, path, signal, matches }) {

                if( matches.length === 0 ) {
                
                    const { apiMetadata, apiData } = await useDjangoFetcher({
                        url: '/',
                        onlyMetadata: true,
                        signal: signal
                    });

                    const data = await apiMetadata.clone().json();

                    patch("page", routesFromObject({routes: appRoutes }));

                }
            },
        }
    )
}

export default dynamicRouter;
