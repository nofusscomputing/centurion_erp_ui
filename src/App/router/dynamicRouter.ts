import {
    createBrowserRouter,
    RouteObject,
} from "react-router"

import {
    appRoutes,
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
