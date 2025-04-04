import { Link, NavLink, json } from "react-router";
import RenderMarkdown from "./RenderMarkdown";
import IconLoader from "../components/IconLoader";
import Badge from "../components/Badge";
import { FormatTime } from "./FormatTime";
import { useContext } from "react";
import UserContext from "../hooks/UserContext";



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
 * @param {Boolean} autolink Format the Field as a URL using `data._urls._self` as the anchor
 * 
 * @returns {String} The value of the field
 */
export default function FieldData({
    full_width = false,
    metadata,
    field_name,
    data = null,
    autolink = false
})  {

    const user = useContext(UserContext)

    if( ! data ) {

        return null;
    }

    let field_data = '';

    let data_field = field_lookup(field_name, data)
    if( typeof(field_name) === 'object' ) {

        data_field = field_lookup(field_name.field, data)

    }

    if( data_field ) {

        let field_type = null

        if( field_name in metadata.fields ) {

            field_type = metadata.fields[field_name].type

        } else if( typeof(field_name) === 'object' ) {

            field_type = metadata.fields[field_name.field].type

        }

        switch(field_type) {

            case 'Badge':

                field_data = data_field.text

                if( data_field.url ) {
                    field_data = (
                        <Link className="badge-link" to={String(data['_urls'][data_field.url]).split('api/v2')[1]+'/edit'}>
                            <Badge
                                icon_style = {data_field.icon.style}
                                message = {data_field.text}
                                text_style = {data_field.text_style}
                            >
                                <IconLoader name={data_field.icon.name} fill={null} height='15px' width='15px'/>
                            </Badge>
                        </Link>
                    )
                } else {

                    field_data = (
                        <Badge
                            icon_style = {data_field.icon.style}
                            message = {data_field.text}
                            text_style = {data_field.text_style}
                        >
                            <IconLoader name={data_field.icon.name} fill={null} height='15px' width='15px'/>
                        </Badge>
                    )

                }

                break;

            case 'Boolean':

                if( Boolean(data_field) ) {

                    field_data = 'Yes'

                } else {

                    field_data = 'No'

                }

                break;

            case 'Choice':

                for( const [key, choice] of Object.entries(metadata.fields[field_name].choices) ) {

                    if( Number(data_field) == Number(choice.value) ) {

                        field_data = String(choice.display_name)

                        break;

                    } else if( typeof(data_field) === 'string' && data_field === choice.value ) {

                        field_data = choice.value
                    }

                }

                break;

            case 'DateTime':

                field_data = FormatTime({
                    time: String(data_field),
                    tz: user.settings.timezone
                })

                break;

            case 'Icon':

                field_data = (
                    <>
                        {data_field.map((icon) => {
                            return (
                                <span className={icon.style}>
                                    <IconLoader name={icon.name} fill={null} height='20px' width='20px' />
                                </span>
                            )
                        })}
                    </>
                )

                break;

            case 'GenericField':
            case 'Relationship':
            case 'Serializer':

                if( metadata.fields[field_name]?.relationship_type === 'ManyToMany' ) {

                    if( typeof(data_field) === 'object' ) {

                        field_data = (

                            data_field.map((field) => {

                                if( field.hasOwnProperty('url') ) {

                                    return (
                                        <>
                                        <Link to={field.url}>{field.display_name}</Link>&nbsp;,
                                        </>
                                    );

                                } else {

                                    return (
                                        <>
                                        {field.display_name}&nbsp;,
                                        </>
                                    );
                                }
                            })
                        )
                    }

                } else {

                    if( data_field === null ) {

                        field_data = '-'

                    } else if( typeof( data_field ) === 'object' ) {

                        if( 'url' in data_field ) {

                            field_data = (
                                <Link to={String(data_field.url).split(API_SPLIT)[1]}>{data_field.display_name}</Link>
                            )

                        } else {

                            field_data = data_field.display_name

                        }

                    } else if( typeof( field_name ) === 'object' && autolink ) {

                        field_data = (
                            <Link to={String(data['_urls'][field_name.key]).split(API_SPLIT)[1]}>{data_field}</Link>
                        )

                    } else if( typeof (data_field) === 'list' ) {

                        field_data = 'data_field'

                    } else {

                        field_data = data_field

                    }
                }

                break;

            case 'JSON':

                let markdown = "``` json"
                    + "\r\n\r\n"
                    + JSON.stringify(data_field, null, 4)
                    + "\r\n\r\n"
                    + "```"
                    + "\r\n"

                field_data = (
                    <RenderMarkdown full_width={full_width}>
                        {markdown}
                    </RenderMarkdown>
                )

                break;

            case 'Markdown':

                field_data = (
                    <RenderMarkdown env={metadata.fields[field_name].render ?? {}}>
                        {data_field}
                    </RenderMarkdown>
                )

                break;
            default:

                if(
                    (
                        (
                            field_name === 'name'
                            || field_name === 'title'
                        )
                        && autolink
                    )
                    || (
                        '_urls' in data
                        && (
                            autolink
                            && Boolean(metadata.fields[field_name].autolink)
                        )
                    )
                    || autolink
                ) {

                    field_data = (
                        <Link to={String(data['_urls']._self).split(API_SPLIT)[1]}>{data_field}</Link>
                    )

                } else {


                    field_data = data_field

                }

                break;

        }

    }

    return field_data;
}

export function field_lookup(field_name, data) {

    if( String(field_name).includes('.') ) {

        let field = String( field_name ).split( '.' )

        if( ! field[0] in data) {

            return null

        }

        return field_lookup( field[1], data[field[0]] )

    }

    if( ! field_name in data) {

        return null

    }
    return data[field_name]
}
