import RenderMarkdown from "./RenderMarkdown";

/**
 * Fetch the field data from Django API Data
 *
 * @param {Object} metadata  Django API HTTP/OPTION request body
 * @param {String} field_name name of the field. Must match the API field key
 * @param {Object} data The API request body.
 * 
 * @returns {String} The value of the field
 */
export default function FieldData({
    metadata,
    field_name,
    data = null
})  {

    let field_data = '';

    let fields = {}


    if( 'POST' in metadata.actions ) {

        fields = metadata.actions.POST

    } else if( 'PUT' in metadata.actions ) {

        fields = metadata.actions.PUT

    }

    if( field_name in data ) {

        let field_type = null

        if( field_name in fields ) {

            field_type = fields[field_name].type

        }

        switch(field_type) {

            case 'Boolean':

                if( Boolean(data[field_name]) ) {

                    field_data = 'Yes'

                } else {

                    field_data = 'No'

                }

                break;

            case 'Choice':

                for( const [key, choice] of Object.entries(fields[field_name].choices) ) {

                    if( Number(data[field_name]) == Number(choice.value) ) {

                        field_data = String(choice.display_name)

                        break;

                    }

                }

                break;

            case 'Serializer':

                if( data[field_name] === null ) {

                    field_data = '-'

                } else {

                    field_data = data[field_name].name

                }

                break;
 
            default:

                field_data = data[field_name]

                break;

        }

    }

    if(

        field_name == 'description' || field_name == 'body' || field_name == 'model_notes'

    ) {

        field_data = (
            <RenderMarkdown>
                {field_data}
            </RenderMarkdown>
        )

    }

    return field_data;
}
