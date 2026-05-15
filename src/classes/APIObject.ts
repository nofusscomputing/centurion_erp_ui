
/**
 * Base Class for ALL API Objects
 * 
 * @category Type
 * @expand
 * @since 0.9.0
 */
export class APIObject {

    /**
     * 
     * {@inheritDoc fromJson}
     * 
     * @summary Instantiate this class.
     * 
     * @param json - JSON object to deserialize.
     */
    constructor( json: string ) {

        this.fromJson(json);
    }

    /**
     * De-Serialize a JSON string Object to an instance of this class.
     * 
     * As part of deserialization, the field key is confirmed as existing in
     * the current, as well as if the JSON object type matches the classes
     * declared variable of the same name. If neither match, the JSON data is
     * **ignored.**
     * 
     * @summary Iterate over JSON fields and add them.
     * 
     * @param json - JSON object to deserialize
     * @expand
     */
    private fromJson( json: string ): void {

        const deserializedData = JSON.parse(json) as Record<string, any>;

        for( const [ field, value ] of Object.entries(deserializedData)) {

            if(Object.hasOwn( this, field ) ) {

                if( typeof this[field] !== typeof value ) continue;

                this[field] = value;
            }
        }


    }
}
