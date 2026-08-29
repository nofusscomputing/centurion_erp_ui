


/**
 * This information is supplied by the webserver the UI connects to. It's
 * obtained as part of navigating to `index.html` via header scripts. As such
 * this file `env.js` must exist on the webserver under path `assets/js`.
 * 
 * @summary UI environment information.
 * @category Backend
 * @since 0.1.0
 */
export interface UIEnvironment {

    /**
     * URL for the backend.
     */
    API_URL: string;

    /**
     * GIT tag of the UI being used.
     * 
     * @since 0.3.0
     */
    CI_COMMIT_TAG: string;

    /**
     * GIT commit SHA of the UI being used.
     * 
     * @since 0.3.0
     */
    CI_COMMIT_SHA: string;

    /**
     * UI Project URL.
     * 
     * @since 0.3.0
     */
    CI_PROJECT_URL: string;
}
