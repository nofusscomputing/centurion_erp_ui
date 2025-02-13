import { useContext, useId, useState } from "react";

import FieldData from "../functions/FieldData";
import Select from "./form/Select";
import { apiFetch } from "../hooks/apiFetch";
import Button from "./form/Button";
import { Form, redirect } from "react-router";
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
 * ## onFieldChange
 * 
 * This function is a callback that is called with field name and field value.
 * Its use case is that of converting the inline field to a field that is part
 * of a form. For this to function correctly, parameter `data` must be `null`.
 *
 * @param {Object} data API data containing the field
 * @param {String} field_name Name of the field
 * @param {Object} metadata API Metadata for the field
 * @param {Function} onFieldChange Callback that will contain the objects {field name, field value}
 *
 * @returns Inline Field
 */
const InlineField = ({
    data,
    field_name,
    metadata,
    onFieldChange,
}) => {

    let sanitized_field_name = field_name

    if( String(field_name).endsWith('_badge') ) {

        sanitized_field_name = String(field_name).replace('_badge', '')

    }

    const [ editing, setEditing ] = useState(
        
        data ? false : true

    )

    const [form_data, setFormData] = useState({
        [sanitized_field_name]: [data?.sanitized_field_name]
    })

    const fieldsetId = useId();
    const fieldsetFormId = useId();
    const fieldsetLabelId = useId();
    const fieldsetTextId = useId();

    const user = useContext(UserContext)


    const handleEditClick = (e) => {

        setEditing((prevState) => {

            let editVal = prevState ? false : true
            
            return editVal
        })
    }


    const handleFormSubmit = (e) => {

        if( data ) {

            setEditing(false)

        }

    }

    const onChange = (e) => {


        let field_value = e.target.value

        if( e.target.type === 'checkbox' ) {

            field_value = e.target.checked

        }


        if ( onFieldChange && ! data ) {

            let select_val = Array()

            if( e.target.type === 'select-multiple' ) {

                for( const option of e.target ) {

                    if( option.selected ) {
                        select_val.push(Number(option.value))
                    }

                }

                field_value = select_val
            }

            onFieldChange(e.target.name, field_value)


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
                    value={data ? data[sanitized_field_name] : ''}
                    field_data={metadata.fields[sanitized_field_name]}
                    field_only={true}
                    onChange={onChange}
                />)

                case 'DateTime':

                return (
                    <TextField
                        id = {sanitized_field_name}
                        type='datetime-local'
                        value={String(form_data[sanitized_field_name]).replace('Z', '')}
                        onChange={onChange}
                        fieldset = {false}
                        disabled = {metadata.fields[sanitized_field_name].read_only}
                    />
                )

                case 'String':

                return (
                    <TextField
                        id = {sanitized_field_name}
                        value={form_data[sanitized_field_name]}
                        onChange={onChange}
                        fieldset = {false}
                        disabled = {metadata.fields[sanitized_field_name].read_only}
                        required = {metadata.fields[sanitized_field_name].required}
                    />
                )

        }
    }

    const return_field = (
        <label id={fieldsetLabelId}>
            {metadata.fields[field_name].label}
            { ! metadata.fields[sanitized_field_name].read_only && data &&
            <span
                id={'edit-field-' + field_name}
                onClick={handleEditClick}
                style={{
                    color: 'var(--contrasting-colour)',
                    float: 'right',
                    fontSize: 'smaller',
                    fontWeight: 'normal',
                    paddingRight: '10px'
                }}
            >
                Edit
            </span>}
            { editing && fetchFormField() }
        </label>
    )


    if( ! data && onChange ){

        return (
            <fieldset id={fieldsetId}>
                {return_field}
            </fieldset>
        )

    } else {


        return (
            <fieldset id={fieldsetId}>
                <Form id={fieldsetFormId} method="patch" action={String(data?._urls?._self).split('api/v2')[1]} onSubmit={handleFormSubmit}>

                    {return_field}

                    { editing && data &&
                    <>
                    <input id="id" type="hidden"  name="id" value={data?.id} />
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

                    <span className="text" id={fieldsetTextId}>
                        <FieldData
                            metadata = {metadata}
                            field_name = {field_name}
                            data = {data ? data : null}
                        />
                    </span>

                    }
                </Form>

            </fieldset>
        );
    }
}
 
export default InlineField;


export const InlineFieldAction = async ({ request, params }) => {

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

                if( String(metadata.fields[itItem[0]].relationship_type) == "ManyToOne") {

                    value = Number(itItem[1]);

                } else {

                    if( form_data.hasOwnProperty( itItem[0] ) ) {

                        value = [ ...form_data[itItem[0]], Number(itItem[1]) ]

                    } else {

                        value = [ Number(itItem[1]) ]

                        if( typeof(itItem[1]) === 'array' ) {

                            value = Number(itItem[1])

                        }
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

        if( value !== '' && value !== 0 ){

            form_data = {
                ...form_data,
                [itItem[0]]: value
            }

        }

        console.debug(`InlineFieldAction (json apend): ${JSON.stringify(form_data)}`)

      }

    console.debug(`InlineFieldAction (json): ${JSON.stringify(form_data)}`)

    const update = await apiFetch(
        document.location.pathname,

        null,
        request.method,
        form_data
    )
        .then(data => {

            return data

        });

    const api_return = await update.clone().json()

    if( String(request.method).toLowerCase() == 'post' ) {

        return redirect(String(api_return._urls._self.split('api/v2')[1]))
    }

    return null;

}

