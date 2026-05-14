import { APIDataFieldJson, APIDataFieldMarkdown, APIDataFieldRelationship, APIDataFieldString } from "./APIFields";
import { APIObject } from "./APIObject";

/**
 * Base Class for API Metadata
 * 
 * @category Type
 * @since 0.8.0
 */
export class MetaDataBase extends 
    APIObject
 {

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
    fields: {

        /**
         * Name of the field must match the {@link APIDataObject} field name.
         */
        [key: string]: APIDataFieldJson
                            | APIDataFieldMarkdown
                            | APIDataFieldRelationship
                            | APIDataFieldString
    };

    /**
     * What layout the API {@link APIDataObject} will use
     */
    layout: LayoutDataset | LayoutDetail | LayoutTable;

    /**
     * Navigation structure for the website.
     */
    navigation?: object;

    /**
     * Fields that will be used as table columns.
     */
    table_fields: MetadataTableFields;

    /**
     * URL relevant to the current object
     */
    urls: MetadataUrls;

    /**
     * {@inheritDoc APIObject."constructor"}
     * 
     * @param json - JSON object to deserialize.
     */
    constructor( json: string ) {

        super(json);

    }

}