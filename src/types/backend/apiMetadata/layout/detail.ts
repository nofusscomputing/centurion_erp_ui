


/**
 * This layout is for displaying a single object from a dataset.
 * 
 * @category Description
 * @since 0.10.0
 */
export interface layoutDetail {

    /**
     * Detail Layout
     * 
     * Used by any instance of {@link Detail}.
     */
    detail: {

        /**
         * Layout type that is to be used to render the data.
         */
        name: "detail";

        layout: "single" | "double"

        left: object

        right: object

    }

}
