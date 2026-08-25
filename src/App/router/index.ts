
import djangoLoader from "../pageLoaders/django"
import djangoMetadataLoader from "../pageLoaders/djangoMetadata"
import djangoRootMetadataLoader from "../pageLoaders/djangoRootMetadata"

import {
    APISubmitAction
} from "../../components/DisplayFields"

import Detail from "../../layout/Detail"
import History from "../../layout/history"
import List from "../../layout/List"
import Settings from "../../layout/Settings"
import Ticket from "../../layout/Ticket"

import Base from "../../layouts/Base"
import Markdown from "../../layout/Markdown"
import Redirect from "../../layouts/Redirect"



/**
 * @since 0.13.0
 */
export const pageActions = {
    api: APISubmitAction
}



/**
 * @since 0.13.0
 */
export const pageComponents = {
    baseview: Base,
    detail: Detail,
    history: History,
    redirect: Redirect,
    list: List,
    markdown: Markdown,
    settings: Settings,
    ticket: Ticket
};



/**
 * @since 0.13.0
 */
export const pageLoaders = {
    django: djangoLoader,
    django_metadata: djangoMetadataLoader,
    django_root_metadata: djangoRootMetadataLoader,
};



/**
 * @since 0.13.0
 */
export const appRoutes = [{
    id: "root",
    path: "/",
    revalidate: false,
    hydrate: "loader",
    children: [
        {
            path: "settings",
            component: "settings",
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
                                    action: "api",
                                    loader: "django_metadata",
                                    revalidate: false
                                    
                                },
                                {
                                    path: ":pk",
                                    component: "detail",
                                    action: "api",
                                    loader: "django",
                                    revalidate: false
                                    
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
                            action: "api",
                            revalidate: false
                        },
                        {
                            path: ":pk",
                            component: "detail",
                            loader: "django",
                            action: "api",
                            revalidate: false
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
                                    action: "api",
                                    loader: "django_metadata"
                                },
                                {
                                    path: ":pk",
                                    component: "ticket",
                                    action: "api",
                                    loader: "django",
                                    // shouldRevalidate: ({ currentParams, nextParams }) => {

                                    //     const reValidate = (
                                    //         currentParams.module !== nextParams.module ||
                                    //         currentParams.model !== nextParams.model ||
                                    //         currentParams.id !== nextParams.id
                                    //     )

                                    //     return reValidate

                                    // }
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
                                            path: ":subModelPk",
                                            action: "api",
                                            revalidate: false,
                                            children: [
                                                {
                                                    path: ":subSubModel",
                                                    action: "api",
                                                    revalidate: false,
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
                            action: "api",
                            revalidate: false
                        },
                        {
                            path: ":pk",
                            children: [
                                {
                                    index: true,
                                    component: "detail",
                                    loader: "django",
                                    action: "api",
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
                                            action: "api",
                                            revalidate: false,
                                            children: [
                                                {
                                                    path: ":ticket_sub_model_pk",
                                                    component: "ticket",
                                                    loader: "django",
                                                    action: "api",
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
                                            action: "api",
                                            revalidate: false
                                        },
                                        {
                                            path: ":sub_model_pk",
                                            component: "detail",
                                            loader: "django",
                                            action: "api",
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
