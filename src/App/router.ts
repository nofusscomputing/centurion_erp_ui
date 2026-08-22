import {
    createBrowserRouter,
    RouteObject
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
import Markdown from "../layout/Markdown"
import Settings from "../layout/Settings"
import Ticket from "../layout/Ticket"

import Base from "../layouts/Base"
import PageContent from "../layouts/PageContent"
import Redirect from "../layouts/Redirect"

import UI from "../layouts/ui"
import NotificationLayout from "../layouts/Notifications"



const components = {
    baseview: Base,
    detail: Detail,
    history: History,
    redirect: Redirect,
    markdown: Markdown,
    list: List,
    settings: Settings,
    ticket: Ticket
};

const pageLoaders = {
    django: djangoLoader,
    django_metadata: djangoMetadataLoader,
    django_root_metadata: djangoRootMetadataLoader
};

const appRoutes = {
    id: "root",
    path: "/",
    shouldRevalidate: () => false,
    ErrorBoundary: RouteErrorBoundary,
    HydrateFallback: () => StateSplash({titleText: "Loading Data", icon: StateIcon.loading }),
    children: [
        {
            index: true
        },
        {
            path: "settings",
            Component: components['settings'],
            loader: pageLoaders['django']
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
                                    Component: components['list'],
                                    loader: pageLoaders['django'],
                                },
                                {
                                    path: "add",
                                    Component: components['detail'],
                                    action: APISubmitAction,
                                    loader: pageLoaders['django_metadata'],
                                    shouldRevalidate: () => false
                                    
                                },
                                {
                                    path: ":pk",
                                    Component: components['detail'],
                                    action: APISubmitAction,
                                    loader: pageLoaders['django'],
                                    shouldRevalidate: () => false
                                    
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
                            Component: components['list'],
                            loader: pageLoaders['django']
                        },
                        {
                            path: "add",
                            Component: components['detail'],
                            loader: pageLoaders['django_metadata'],
                            action: APISubmitAction,
                            shouldRevalidate: () => false
                        },
                        {
                            path: ":pk",
                            Component: components['detail'],
                            loader: pageLoaders['django'],
                            action: APISubmitAction,
                            shouldRevalidate: () => false
                        }
                    ]
                },
                {
                    path: "ticket",
                    children: [
                        {
                            path: ":model",
                            children: [
                                {
                                    index: true,
                                    Component: components['list'],
                                    loader: pageLoaders['django'],
                                },
                                {
                                    path: "add",
                                    Component: components['ticket'],
                                    action: APISubmitAction,
                                    loader: pageLoaders['django_metadata']
                                },
                                {
                                    path: ":pk",
                                    Component: components['ticket'],
                                    action: APISubmitAction,
                                    loader: pageLoaders['django'],
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
                                            shouldRevalidate: () => false,
                                            children: [
                                                {
                                                    path: ":subSubModel",
                                                    action: APISubmitAction,
                                                    shouldRevalidate: () => false,
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
                            Component: components['list'],
                            loader: pageLoaders['django']
                        },
                        {
                            path: "add",
                            Component: components['detail'],
                            loader: pageLoaders['django_metadata'],
                            action: APISubmitAction,
                            shouldRevalidate: () => false
                        },
                        {
                            path: ":pk",
                            children: [
                                {
                                    index: true,
                                    Component: components['detail'],
                                    loader: pageLoaders['django'],
                                    action: APISubmitAction,
                                },
                                {
                                    path: "history",
                                    Component: components['history'],
                                    loader: pageLoaders['django']
                                },
                                {
                                    path: "ticket",
                                    children: [
                                        {
                                            path: ":ticket_sub_model",
                                            action: APISubmitAction,
                                            shouldRevalidate: () => false,
                                            children: [
                                                {
                                                    path: ":ticket_sub_model_pk",
                                                    Component: components['ticket'],
                                                    loader: pageLoaders['django'],
                                                    action: APISubmitAction,
                                                    shouldRevalidate: () => false
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
                                            Component: components['list'],
                                            loader: pageLoaders['django'],
                                            action: APISubmitAction,
                                            shouldRevalidate: () => false
                                        },
                                        {
                                            path: ":sub_model_pk",
                                            Component: components['detail'],
                                            loader: pageLoaders['django'],
                                            action: APISubmitAction,
                                            shouldRevalidate: () => false
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
}

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

                    patch("page", [appRoutes]);

                }
            },
        }
    )
}

export default dynamicRouter;
