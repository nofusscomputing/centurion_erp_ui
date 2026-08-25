import {
    RouteObject
} from "react-router"


/**
 * Available keys for use to select route action.
 * 
 * @category Type
 * @since 0.13.0
 */
export type RouteActionDescription =
    
    /**
     * Use API FormSubmission.
     */
    "api"



/**
 * Available keys for use within a routes handle.
 * 
 * @category Type
 * @since 0.13.0
 */
export interface RouteHandleDescription {

    /**
     * URL base for the backend.
     */
    backend_url?: string

    /**
     * This key is only used by {@link Redirect} layout.
     * 
     * URL to perform a HTTP/POST against.
     */
    url_post?: string

    /**
     * This key is only used by {@link Redirect} layout.
     * 
     * URL to redirect to.
     */
    url_redirect?: string

}



/**
 * 
 * @category Type
 * @since 0.13.0
 */
export type RouteHydrateComponentDescription =

    /**
     * Loading Spinner.
     */
    "loader"



/**
 * Available route loaders.
 * 
 * @see {@link pageLoaders}
 * 
 * @category Type
 * @since 0.13.0
 */
export type RoutePageLoaderDescription =

    /**
     * Use {@link djangoLoader}. 
     */
    "django"
    |
    /**
     * Use {@link djangoMetadataLoader}.
     */
    "django_metadata"
    |
    /**
     * Use {@link djangoRootMetadataLoader}.
     */
    "django_root_metadata"
    |
    /**
     * Use {@link githubLoader}.
     */
    "github"



/**
 * Available layout components for use with a dynamic route.
 * 
 * @see {@link pageComponents}
 * @category Type
 * @since 0.13.0
 */
export type RouteComponentDescription =
    
    /**
     * Use {@link BackendLayout}
     */
    "backend"
    |
    // /**
    //  * Base Layout.
    //  */
    // "baseview"
    // |
    /**
     * Use {@link Detail}.
     */
    "detail"
    |
    /**
     * Use {@link History}.
     */
    "history"
    |
    /**
     * Use {@link Redirect}.
     */
    "redirect"
    |
    /**
     * Use {@link List}.
     */
    "list"
    |
    /**
     * Use {@link Markdown}.
     */
    "markdown"
    |
    /**
     * Use {@link Settings}
     */
    "settings"
    |
    /**
     * Use {@link Ticket}.
     */
    "ticket"



/**
 * 
 * @category Type
 * @since 0.13.0
 */
export interface RouteCommonDescription {

    /**
     * id to use for this route.
     * 
     */
    id?: string,

    /**
     * Component to use for this route.
     * 
     * @expandType RouteComponentDescription
     */
    component?: RouteComponentDescription,

    /**
     * Arbitrary data for this route.
     * 
     * @expandType RouteHandleDescription
     */
    handle?: RouteHandleDescription

    /**
     * Component to use for hydration.
     * 
     * @expandType RouteHydrateComponentDescription
     */
    hydrate?: RouteHydrateComponentDescription,

    /**
     * Loader to use for this route.
     * 
     * @expandType RoutePageLoaderDescription
     */
    loader?: RoutePageLoaderDescription,

    /**
     * 
     * @expandType RouteActionDescription
     */
    action?: RouteActionDescription,

    /**
     * Should the loader data be re-validated on a navigation event.
     */
    revalidate?: boolean,

}



/**
 * This Description describes index routes that are used by
 * {@link routesFromObject} to build the {@link RouteObject}s for the UI.
 * 
 * @category Type
 * @since 0.13.0
 */
export interface IndexRouteDescription extends RouteCommonDescription {

    /**
     * Is this route an index route? This value must always be set to `true`
     */
    index: boolean

}



/**
 * This Description describes non-index routes that are used by
 * {@link routesFromObject} to build the {@link RouteObject}s for the UI.
 * 
 * @see {@link routesFromObject}
 * @category Type
 * @since 0.13.0
 */
export interface NonIndexRouteDescription extends RouteCommonDescription {

    /**
     * URL path for this route.
     */
    path?: string

    /**
     * Child routes for this route.
     */
    children?: Array<RouteDescription>

}



/**
 * 
 * @category Type
 * @expandType NonIndexRouteDescription
 * @expandType IndexRouteDescription
 * @since 0.13.0
 */
export type RouteDescription = NonIndexRouteDescription | IndexRouteDescription