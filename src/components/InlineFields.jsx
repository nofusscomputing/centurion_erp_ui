import { useContext, useState } from "react";

import FieldData from "../functions/FieldData";
import Select from "./form/Select";
import { apiFetch } from "../hooks/apiFetch";
import Button from "./form/Button";
import { Form, useParams, useRouteError } from "react-router";
import TextField from "./form/Textfield";
import { FormatTime } from "../functions/FormatTime";
import UserContext from "../hooks/UserContext";




/**
 * Inline Editable field
 *
 * Supported API field Type / Form field types suppored are:
 *
 * - Choice / Select (Single and multiselect)
 *
 * - Relationship / Select (Single and multiselect)
 *
 * @param {Object} data API data containing the field
 * @param {String} field_name Name of the field
 * @param {Object} metadata API Metadata for the field
 *
 * @returns Inline Field
 */
const InlineField = ({
    data,
    field_name,
    metadata,
}) => {

    let sanitized_field_name = field_name

    if( String(field_name).endsWith('_badge') ) {

        sanitized_field_name = String(field_name).replace('_badge', '')

    }

    const [ editing, setEditing ] = useState(false)

    const [form_data, setFormData] = useState({
        [sanitized_field_name]: [data[sanitized_field_name]]
    })

    const user = useContext(UserContext)


    const handleEditClick = (e) => {

        setEditing((prevState) => {

            let editVal = prevState ? false : true
            
            return editVal
        })
    }


    const handleFormSubmit = (e) => {

        setEditing(false)

    }

    const onChange = (e) => {

        let field_value = e.target.value

        if( e.target.type === 'checkbox' ) {

            field_value = e.target.checked

        }

        setFormData((prevState) => ({ ...prevState, [e.target.id]: field_value }))

    }

    console.debug(JSON.stringify(form_data))

    const fetchFormField = () => {


        switch( metadata.fields[sanitized_field_name].type ) {

            case 'Choice':
            case 'Relationship':

                return (<Select
                    id = {sanitized_field_name}
                    value={data[sanitized_field_name]}
                    field_data={metadata.fields[sanitized_field_name]}
                    field_only={true}
                />)

            case 'DateTime':

                return (
                    <TextField
                        id = {sanitized_field_name}
                        type='datetime-local'
                        value={String(form_data[sanitized_field_name]).replace('Z', '')}
                        onChange={onChange}
                        fieldset = {false}
                    />
                )

        }
    }


    return (
        <fieldset>
            <Form method="patch" action={String(data._urls._self).split('api/v2')[1]} onSubmit={handleFormSubmit}>
            <label>
                {metadata.fields[field_name].label}
                { ! metadata.fields[sanitized_field_name].read_only &&
                <span
                    id={'edit-field-' + field_name}
                    onClick={handleEditClick}
                    style={{
                        color: 'var(--contrasting-colour)',
                        float: 'right',
                        fontSize: 'smaller',
                        fontWeight: 'normal',
                        paddingRight: '10px;'
                    }}
                >
                    Edit
                </span>}
            </label>

            { editing &&

            fetchFormField()

            }

            { editing && 
                <>
                <input id="id" type="hidden"  name="id" value={data['id']} />
                <input id="tz" type="hidden"  name="tz" value={user.settings.timezone} />
                <input id="metadata" type="hidden"  name="metadata" value={JSON.stringify(metadata)} />
                <Button
                    button_align = 'right'
                    button_class = 'mini inverse'
                    button_text = 'Save'
                />
                </>
            }

            { ! editing &&

                <span className="text">
                    <FieldData
                        metadata = {metadata}
                        field_name = {field_name}
                        data = {data}
                    />
                </span>

            }
            </Form>
        </fieldset>
    );
}
 
export default InlineField;

export async function InlineFieldAction({
    request,
    params,
}) {

    if( ! String(request.url).endsWith(document.location.pathname) ) {    // as request does not contain the path, check doc path

        throw Error(`InlineFieldAction URL ${request.url} does not match ${document.location.pathname}`)
    }

    const data = await request.formData()

    const metadata = JSON.parse(data.get('metadata'))

    const timezone = data.get('tz')

    let form_data = {}

    for (const itItem of data.entries()) {

        if( ['metadata', 'tz'].includes( itItem[0] ) ) {

            continue;
        }

        console.debug(`InlineFieldAction=:${itItem}`);

        if( ! metadata.fields.hasOwnProperty(itItem[0]) ) {    // field not part of request

            continue;
        }

        let value = ''

        switch( String(metadata.fields[itItem[0]].type).toLowerCase() ) {

            case 'boolean':

                value = Boolean(itItem[1]);

                break;

            case 'datetime':

                value = FormatTime({
                    time: String(itItem[1]),
                    iso: true,
                    tz: timezone
                });

                break;

            case 'choice':
            case 'integer':

                value = Number(itItem[1]);

                break;

            case 'relationship':

                if( form_data.hasOwnProperty( itItem[0] ) ) {

                    value = [ ...form_data[itItem[0]], Number(itItem[1]) ]

                } else {

                    value = [ Number(itItem[1]) ]

                    if( typeof(itItem[1]) === 'array' ) {

                        value = Number(itItem[1])

                    }
                }

                break;

            case 'string':

                value = String(itItem[1])

                break;

            default:

                value = itItem[1];

                break;

        }

        form_data = {
            ...form_data,
            [itItem[0]]: value
        }

        console.debug(`InlineFieldAction (json apend): ${JSON.stringify(form_data)}`)

      }

    console.debug(`InlineFieldAction (json): ${JSON.stringify(form_data)}`)

    const update = await apiFetch(
        document.location.pathname,
        (data) => {

            // onUpdated(data)

        },
        request.method,
        form_data
    )

    return null;

}

