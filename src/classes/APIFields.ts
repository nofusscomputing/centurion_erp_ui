import { APIObject } from "./APIObject";

/**
 * Base Class for ALL API FieldTypes
 * 
 * @category Type
 * @expand
 * @since 0.8.0
 */
class APIDataFieldBase {


    /**
     * Field Description. This will be displayed for the user.
     */
    help_text: string;

    /**
     * Label the field will be given
     */
    label: string;

    /**
     * Is this field read-only?
     * 
     * The value of this field should be based off of the users permissions.
     * The UI uses this value to determine if when creating/editing that an
     * editable field be displayed to the user.
     */
    read_only: boolean;

    /**
     * Is this field mandatory.
     * 
     * When the value is `true` The user will not be able to submit the form.
     */
    required: boolean;

    /**
     * What is the type of the data field.
     */
    type: "Boolean" |
    "DateTime" |
    "Icon" |
    "Integer" |
    "JSON" |
    "Markdown" |
    "Relationship" |
    "String"

    /**
     * Is the data field a write-only field. When set to true, the user will
     * not be able to edit the field.
     * 
     * The value of this field should be based off of the users permissions.
     */
    write_only: boolean;



    /**
     * 
     * @summary Instantiate this class.
     * 
     * @param json - JSON object to deserialize.
     */
    constructor( json: string ) {

    }

}



/**
 * RelationShip Data field
 * 
 * This data field correlates to a html `<input type="select" />`
 * 
 * @category Type
 * @expand
 * @since 0.8.0
 */
export class APIDataFieldRelationship extends (
    APIDataFieldBase
) {

    /**
     * What are the available choices for  this field.
     */
    choices: Array<{

        /**
         * Value the user sees in the dropdown
         */
        "display_name": string,

        /**
         * Correlation ID. This value must match the value you store in the
         * database to reference this object. This value will generally be
         * the Primary Key.
         */
        "value": number | string,
    }>

    declare type: "Relationship"


}



/**
 * String Data Field.
 * 
 * Correlates to a html `<input type"text" />` for `multi_line = true` or
 * `<textarea />` for `multi_line = false`
 * 
 * @category Type
 * @expand
 * @since 0.8.0
 */
export class APIDataFieldString extends (
    APIDataFieldBase
) {

    /**
     * Does the field contain more than one-line.
     * 
     * The UI uses this value to determine if the text field should be a basic
     * input text field or a text area.
     */
    multi_line: boolean;

    declare type: "JSON" | "Markdown" | "String"


}



/**
 * Markdown Data Field.
 * 
 * This special field when in create / edit mode will display the UI's markdown
 * editor.
 * 
 * @category Type
 * @expand
 * @since 0.8.0
 */
export class APIDataFieldMarkdown extends (
    APIDataFieldString
) {


    multi_line: boolean = true;

    /**
     * Render Data for the Markdown plugins.
     */
    render: object

    declare type: "Markdown"

}



/**
 * JSON Data Field.
 * 
 * This special field when in create / edit mode will display the UI's markdown
 * editor.
 * 
 * @category Type
 * @expand
 * @since 0.8.0
 */
export class APIDataFieldJson extends (
    APIDataFieldString
) {

    multi_line: boolean = true;

    declare type: "JSON"

}
