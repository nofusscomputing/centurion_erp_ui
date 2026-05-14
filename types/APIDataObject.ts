
/**
 * This object is a single row of a dataset.
 * 
 * @summary A Single object.
 * 
 * @category Backend
 * @expand
 */
interface APIDataObject {
    /**
     * Unique ID from the database. Generally this will be the Primary Key.
     */
    id: number;

    /**
     * Field data
     */
    [key: string]: any;
    /**
     * URLs for this objects relationships.
     */
    _urls: APIDataObjectUrls;

}



/**
 * URLs are recommended to be relative URLs.
 * 
 * If the {@link APIDataObject} uses fields that are of {@link MetadataFieldType}
 * Relationship. the corresponding url is added as a URL to this object.
 * 
 * @category Backend / Data Type
 * @expand
 */
interface APIDataObjectUrls {
    /**
     * Own URL for this object.
     */
    _self: string;

    /**
     * Additional URLs
     */
    [key: string]: string;
}
