import {
    createBrowserRouter,
    RouteObject,
} from "react-router"

import {
    pageComponents,
    pageLoaders
} from "."

import {
    routesFromObject
} from "./routesFromObject"

import
    StateSplash,
    {
        StateIcon
} from "../../components/StateSplash"

import useDjangoFetcher from "../../hooks/useDjangoFetcher"

import NotificationLayout from "../../layouts/Notifications"
import PageContent from "../../layouts/PageContent"
import RouteErrorBoundary from "../../layouts/ErrorBoundary"
import UI from "../../layouts/ui"



/**
 * This function builds the UI routes from an object.
 * 
 * @summary Dynamic Router
 * 
 * @category Function
 * @see {@link RouteDescription} for route descriptions.
 * @see {@link RouteComponentDescription} `backend` for backend_url auto setting of component.
 * @since 0.13.0
 */
const dynamicRouter = () => {

    const routes: RouteObject[] = [
            {
                id: "base",
                Component: pageComponents['baseview'],
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
                        Component: pageComponents['redirect'],
                        handle: {
                            url_redirect: `${window.env.API_URL}/auth/login`
                        }
                    },
                    {
                        id: "logout",
                        path: "/logout",
                        Component: pageComponents['redirect'],
                        handle: {
                            url_post: `${window.env.API_URL}/auth/logout`,
                            url_redirect: `${window.env.API_URL}/auth/login`
                        }
                    },
                    {
                        id: "root-backend",
                        Component: pageComponents['backend'],
                        handle: {
                            backend_url: window.env.API_URL
                        },
                        children: [
                            {
                                id: "notifications",
                                Component: NotificationLayout,
                                children: [
                                    {
                                        id: "UI",
                                        Component: UI,
                                        loader: (params) => pageLoaders['django_root_metadata']({
                                            ...params,
                                            baseURL: window.env.API_URL,
                                        }),
                                        shouldRevalidate: () => false,
                                        ErrorBoundary: RouteErrorBoundary,
                                        HydrateFallback: () => StateSplash({titleText: "Loading UI", icon: StateIcon.loading }),
                                        children: [
                                            {
                                                id: "page",
                                                Component: PageContent,
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


    /**
     * When using `patchRoutesOnNavigation` ensure that basename os set tp `""`
     * so that the patching of routes always runs if the route is not found.
     */
    return createBrowserRouter(
        routes,
        {
            basename: "",
            async patchRoutesOnNavigation({ patch, path, signal, matches }) {

                let baseURL = null;
                let id = null;
                let route = null;
                let url = null;

                if( matches.length === 0 ) {    // root routes

                    id = 'page'
                    url = '/'
                
                } else if( matches.length > 0 ) {    // Sub-routes

                    route = matches[(matches.length - 1 )].route;

                    if( Object.hasOwn(route, 'handle') ) {

                        if( Object.hasOwn(route.handle, 'backend_url')) {

                            baseURL = route.handle.backend_url;

                            id = route.id

                            /**
                             * URL commented out so as to disable this feature 
                             * until it is ready for use. When uncommented the
                             * routes will be downloaded from the backend_url.
                             */
                            // url = route.handle.backend_url

                        }
                    }
                }


                if( id !== null && url !== null ) {

                    const { apiMetadata, apiData } = await useDjangoFetcher({
                        url: url,
                        baseURL: window.env.API_URL,
                        onlyMetadata: true,
                        signal: signal
                    });

                    const data = await apiMetadata.clone().json();

                    patch(id, routesFromObject({
                        routes: data.routes,
                        ...(baseURL ? {baseURL: baseURL } : {})
                    }));

                }
            },
        }
    )
}

export default dynamicRouter;
