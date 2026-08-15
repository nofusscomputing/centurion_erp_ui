import {
    createBrowserRouter,
    RouteObject
} from "react-router"

import djangoLoader from "./pageLoaders/django"
import djangoMetadataLoader from "./pageLoaders/djangoMetadata"

import Detail from "../layout/Detail"
import ErrorPage from "../layout/Error"
import History from "../layout/history"
import List from "../layout/List"
import RootLayout from "../layout/Root"
import Settings from "../layout/Settings"
import Ticket from "../layout/Ticket"

import Base from "../layouts/Base"
import Login from "../layouts/Login"
import Logout from "../layouts/Logout"

import LoadingSpinner from "../components/LoadingSpinner"

import { APISubmitAction } from "../components/DisplayFields"




/**
 * This function builds the UI routes from an object.
 * 
 * @summary Dynamic Router
 * 
 * @category Function
 * @since 0.13.0
 */
const dynamicRouter = () => {

    const components = {
            baseview: Base,
            detail: Detail,
            history: History,
            login: Login,
            logout: Logout,
            list: List,
            rootlayout: RootLayout,
            settings: Settings,
            ticket: Ticket
        };

    const pageLoaders = {
            django: djangoLoader,
            django_metadata: djangoMetadataLoader,
        };


    const routes:RouteObject[] = [
            {
                Component: components['baseview'],
                ErrorBoundary: ErrorPage,
                HydrateFallback: LoadingSpinner,
                children: [
                    {
                        path: "/login",
                        Component: components['login']
                    },
                    {
                        path: "/logout",
                        Component: components['logout']
                    },
                    {
                        Component: components['rootlayout'],
                        HydrateFallback: () => LoadingSpinner({titleText: "Loading App"}),
                        children: [
                            {
                                path: "/",
                                ErrorBoundary: ErrorPage,
                                HydrateFallback: () => LoadingSpinner({titleText: "Loading Data"}),
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
                                                                shouldRevalidate: ({ currentParams, nextParams }) => {
                                
                                                                    const reValidate = (
                                                                        currentParams.module !== nextParams.module ||
                                                                        currentParams.model !== nextParams.model ||
                                                                        currentParams.id !== nextParams.id
                                                                    )
                                
                                                                    return reValidate
                                
                                                                },

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
                            },
                            
                        
                        ]
                    }
                ]
            }
        ];

    return createBrowserRouter(routes)

}

export default dynamicRouter;
