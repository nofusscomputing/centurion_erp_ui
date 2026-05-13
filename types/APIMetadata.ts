

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
    layout: LayoutDataset | LayoutDetail | LayoutTable;

    /**
     * Navigation structure for the website.
     */
    navigation?: object;
    table_fields: MetadataTableFields;

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
 * 
 * This layout is for displaying a dataset where the data is not appropriate
 * for layout as a table.
 * 
 * @category Backend / Data Type
 * @expand
 */
interface LayoutDataset {

    /**
     * Layout type that is to be used to render the data.
     */
    name: "dataset";
}



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
interface LayoutTable {

    /**
     * Layout type that is to be used to render the data.
     */
    name: "table";
}



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
