import { Link, NavLink } from "react-router-dom";
import RenderMarkdown from "./RenderMarkdown";



/**
 * Value used to split URL.
 * 
 * i.e. `http://127.0.0.1:8002/api/v2/itam/device/24` using ulr[1] would return `/itam/device/24`
 */
const API_SPLIT = String('api/v2')

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

            case 'Relationship':
            case 'Serializer':

                if( data[field_name] === null ) {

                    field_data = '-'

                } else {

                    if( 'url' in data[field_name] ) {

                        field_data = (
                            <Link to={String(data[field_name].url).split(API_SPLIT)[1]}>{data[field_name].display_name}</Link>
                        )

                    } else {

                        field_data = data[field_name].display_name

                    }

                }

                break;
 
            default:

                if (
                    (
                        field_name === 'name'
                        || field_name === 'title'
                    )
                    && '_urls' in data
                ) {

                    field_data = (
                        <Link to={String(data['_urls']._self).split(API_SPLIT)[1]}>{data[field_name]}</Link>
                    )

                } else {


                    field_data = data[field_name]

                }

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
