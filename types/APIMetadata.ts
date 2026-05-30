

/**
 * 
 * API Metadata object is used to describe both {@link APIDataset} and {@link APIDataObject}.
 * 
 * @summary Object Metadata.
 * 
 * @category Backend
 * @expand
 */
interface APIMetadata {

    /**
     * Name of the view.
     */
    name: String;

    /**
     * Description on the view.
     */
    description: String;

    /**
     * Link to the objects documentation.
     */
    documentation: String;

    /**
     * Field definitions describing the {@link APIDataObject}
     */
    fields: {[key: string]: MetadataField};

    /**
     * What layout the API {@link APIDataObject} will use
     */
    layout: UILayout;

    /**
     * Navigation structure for the website.
     */
    navigation?: object;

    /**
     * URL relevant to the current object
     */
    urls: MetadataUrls;
}



/**
 * 
 * These are the available field types.
 * 
 * @category Backend / Data Type
 */
type MetadataFieldType = "Boolean" |
    "DateTime" |
    "Icon" |
    "Integer" |
    "JSON" |
    "Markdown" |
    "Relationship" |
    "String";



/**
 * 
 * These URLs are related to the current object.
 * 
 * @category Backend / Data Type
 * @expand
 */
interface MetadataUrls {

    /**
     * The URL to the curent object.
     */
    self: string;

    /**
     * Urls to any sub-models this object has where key is unique value and url
     * is the value.
     */
    sub_models?: object;
}



/**
 * 
 * What layout the dataset should be laid out in.
 * 
 * @category Backend / Data Type
 * @expand
 */
interface MetadataField {
    help_text: string;
    label: string;
    multi_line: boolean;
    read_only: boolean;
    required: boolean;
    type: MetadataFieldType;
    write_only: boolean;

    [key: string]: any;
}

/**
 * Describes how the object is to be laid out within the UI. Although ALL keys
 * are listed as optional, unless the object does not ever be displayed in the
 * UI, this object should have at minimum, the view the object is to be
 * rendered as.
 * 
 * 
 * @summary How to layout the object
 * 
 * @category Type
 * @expand
 * @since 0.10.0
 */
interface UILayout {

    /**
     * Card Layout
     */
    card?: [
        {
            /**
             * Card Title
             */
            title: string

            /**
             * Card Body
             */
            body: object[]
        }
    ]

    /**
     * Dataset Layout
     * 
     * Used by any instance of {@link DataSetList}.
     * 
     * Using a string value for the column, must be a valid field name.
     * 
     * Using an object as the value enables any field to be setup so that it is
     * a link to any of the urls within {@link APIDataObject}
     * 
     * @example
    ``` json
    {
        "field": "<name of the field to render as link>",
        "type": "link",
        "key": "<name of the url key under _object._urls to use as the link>"
    }
    ```
     *
     * Normally the key for the url to use would be `_self` as this provides
     * for using any of the objects fields to link to its own data view page.
     */
    dataset?: {
        columns: [[string | object]]
    }

    /**
     * Detail Layout
     * 
     * Used by any instance of {@link Detail}.
     */
    detail?: LayoutDetail

    /**
     * Table Layout
     * 
     * if an entry in the array, is itself an array, this will render as
     * collapsible under the row in question.
     * 
     * Just like the `dataset.columns` keys, the value can be a link object.
     * see {@link UILayout.dataset} for an example on the object and its keys.
     * 
     * Used by any instance of {@link DisplayTable}
     */
    table?: [string | object]

    // /**
    //  * Ticket Layout
    //  * 
    //  */
    // ticket?: object
}



/**
 * 
 * This layout is for displaying a dataset where the data is not appropriate
 * for layout as a table.
 * 
 * @category Backend / Data Type
 * @expand
 */
// interface LayoutDataset {

//     /**
//      * Layout type that is to be used to render the data.
//      */
//     name: "dataset";

//     cells: string[][]
// }



/**
 * 
 * This layout is for displaying a a single object from a dataset.
 * 
 * @category Backend / Data Type
 * @expand
 */
interface LayoutDetail {

    /**
     * Layout type that is to be used to render the data.
     */
    name: "detail";
    layout: "single" | "double"
    left: object
    right: object
}



/**
 * 
 * This layout is for displaying a dataset that is suitable for a table.
 * 
 * @category Backend / Data Type
 * @expand
 */
// interface LayoutTable {

//     /**
//      * Layout type that is to be used to render the data.
//      */
//     name: "table";
// }



/**
 * 
 * What layout the dataset should be laid out in.
 * 
 * @category Backend / Data Type
 * @expand
 */
interface MetadataTableFields {
    default?: "list";
    columns: string[][];
}
