import { Link, json, redirect, useLoaderData, useNavigate, useParams } from "react-router-dom";
import Select from "../components/form/Select";
import Slider from "../components/form/Slider";
import TextArea from "../components/form/Textarea";
import TextField from "../components/form/Textfield";
import { useEffect, useState } from "react";
import { apiFetch } from "../hooks/apiFetch";
import urlBuilder from "../hooks/urlBuilder";



const ModelForm = ({
    setContentHeading,
    SetContentHeaderIcon = null
}) => {
    
    // SetContentHeaderIcon('')

    const values=[
        {
            label: 'One',
            value: '1'
        }
    ]

    const params = useParams();

    const page_data = useLoaderData();

    const [metadata, setMetaData] = useState(null);

    const [form_data, setFormData] = useState({})

    const [form_error, setFormError] = useState(null)

    const [form_post, setFormPost] = useState(false)

    const edit = Boolean(params.pk ? true : false )

    const navigate = useNavigate();

    let url_builder = urlBuilder(
        params
    )


    useEffect(() => {

        apiFetch(
            url_builder.api.path,
            (data) =>{

                setMetaData(data)

                setFormData(() => {

                    let initial_form_data = {}
    
                    Object.keys(data.fields).map((field_key) => {

                        if( data.fields[field_key].required ) {
                            if( page_data ) {

                                if(
                                    typeof(page_data[field_key]) == 'object'
                                    && ! Array.isArray(page_data[field_key])
                                ) {

                                    initial_form_data[field_key] = Number(page_data[field_key].id)

                                }else if( Array.isArray(page_data[field_key]) ) {

                                    initial_form_data[field_key] = []

                                    for(let item of page_data[field_key]) {

                                        initial_form_data[field_key] += [ item.id ]

                                    }
                                } else {

                                    initial_form_data[field_key] = page_data[field_key]

                                }

                            } else if( 'initial' in data.fields[field_key] ) {
                                 initial_form_data[field_key] = data.fields[field_key].initial
                            }else {
                                initial_form_data[field_key] = ''
                            }
                        }

                    })

                    return initial_form_data;

                },[])

            },
            'OPTIONS'
        )

        .then(((data) => {

            if( page_data ) {
                if( 'name' in page_data ) {

                    setContentHeading(page_data['name']);

                }else if( 'title' in page_data ) {

                    setContentHeading(page_data['title']);

                }
            
            }else {
                try {
                    setContentHeading(metadata['name']);
                } catch {
                    
                }
            }
        }))

    },[])


    const handleChange = (e) => {

        let field_value = e.target.value


        if( e.target.multiple ) {

            field_value = []

            for( let selected_option of e.target.selectedOptions ) {


                field_value.push(selected_option.value)

            }


        } else if( e.target.type === 'checkbox' ) {

            field_value = e.target.checked

        } else if( e.target.type === 'datetime-local' ) {

            if( e.target.value != '' ) {    // Convert to UTC

                field_value = new Date(e.target.value).toISOString()

            }

        } else if(
            (
                String(field_value).startsWith('{')
                || String(field_value).startsWith('[')
            )
            && (
                String(field_value).endsWith('}')
                || String(field_value).endsWith(']')
            )
        ) {

            try { // While the json is being edited, it may be invalid.

                field_value = JSON.parse(e.target.value)

            } catch {
                // Do Nothing
            }
            
        }
        
        setFormData((prevState) => ({ ...prevState, [e.target.id]: field_value }))
    }

    return((page_data || ! edit ) && metadata &&
        <section>
            {form_error && form_error['non_field_errors'] &&
                <div>
                    <ul>
                    {form_error['non_field_errors'].map( (err) => {
                        
                        return (
                            <li><span className="error-text">{err}</span></li>
                        )
                    })}
                    </ul>
                </div>
            }
            <div className="content">
                <form onSubmit={async e => {
                    e.preventDefault();

                    const response = await apiFetch(
                        url_builder.api.path,
                        setFormError,
                        url_builder.method,
                        form_data
                    )

                    setFormPost(true)

                    if ( response.ok ) {

                        navigate(String(metadata.return_url).split('api/v2')[1])

                    } else {

                        setFormPost(false)
                        window.scrollTo(0, 0)

                    }
                }}>
                    { !form_post && metadata && url_builder.params.action == 'delete' && 
                    <>
                    Are you sure you wish to delete this item?
                    </>}
                    { ( !form_post && metadata && params.action != 'delete' ) &&
                    Object.keys(metadata.fields).map((field_key) => {

                        if( ! metadata.fields[field_key].read_only ) {

                            let value = null


                            if( field_key in form_data ) {

                                value = form_data[field_key]

                            } else if( page_data ) {

                                value = page_data[field_key]

                            } else if ( 'initial' in metadata.fields[field_key]) {

                                if( metadata.fields[field_key].initial !== null ) {

                                    value = metadata.fields[field_key].initial

                                }

                            }


                            console.log(`field data: ${JSON.stringify(form_data)}`)

                            switch(metadata.fields[field_key].type) {

                                case 'Boolean':

                                    return (<Slider
                                        id = {field_key}
                                        label = {metadata.fields[field_key].label}
                                        error_text = {form_error && form_error[field_key]}
                                        helptext   = {metadata.fields[field_key].help_text}
                                        required   = {metadata.fields[field_key].required}
                                        value={value}
                                        onChange={handleChange}
                                    />)

                                case 'Choice':
                                case 'Relationship':

                                    return (<Select
                                        id = {field_key}
                                        error_text = {form_error && form_error[field_key]}
                                        value={value}
                                        onChange={handleChange}
                                        field_data={metadata.fields[field_key]}
                                    />)

                                case 'DateTime':

                                    if( value ) {    // Convert DateTime (UTC) to local Time

                                        let datetime = new Date(value)
                                        let local_datetime = new Date(datetime - datetime.getTimezoneOffset()*60*1000).toISOString();

                                        value = String(local_datetime).split('.')[0]

                                    }

                                    return (<TextField
                                        id = {field_key}
                                        label = {metadata.fields[field_key].label}
                                        helptext   = {metadata.fields[field_key].help_text}
                                        error_text = {form_error && form_error[field_key]}
                                        required   = {metadata.fields[field_key].required}
                                        type = {'datetime-local'}
                                        value={value}
                                        onChange={handleChange}
                                    />)

                                case 'JSON':

                                    value = JSON.stringify(value, null, 4)

                                    return (<TextArea
                                        id = {field_key}
                                        error_text = {form_error && form_error[field_key]}
                                        field_data={metadata.fields[field_key]}
                                        value={value}
                                        onChange={handleChange}
                                    />)

                                case 'Markdown':

                                    return (<TextArea
                                        id = {field_key}
                                        error_text = {form_error && form_error[field_key]}
                                        field_data={metadata.fields[field_key]}
                                        value={value}
                                        onChange={handleChange}
                                    />)

                                default:

                                    if( 'multi_line' in metadata.fields[field_key] ) {


                                        return (<TextArea
                                            id = {field_key}
                                            error_text = {form_error && form_error[field_key]}
                                            field_data={metadata.fields[field_key]}
                                            value={value}
                                            onChange={handleChange}
                                        />)

                                    } else {

                                        return (<TextField
                                            id = {field_key}
                                            label = {metadata.fields[field_key].label}
                                            helptext   = {metadata.fields[field_key].help_text}
                                            error_text = {form_error && form_error[field_key]}
                                            required   = {metadata.fields[field_key].required}
                                            value={value}
                                            onChange={handleChange}
                                        />)
    
                                    }
                            }


                        }

                    })}

                    <div style={{
                        display: 'flexbox',
                        width: '100%'
                    }}>
                        <div style={{
                                display: 'block',
                                padding: 'auto',
                                margin: 'auto',
                                width: 'fit-content'
                            }}>
                            <button className="form common-field" type="submit">Save</button>
                            <Link to={String(metadata.return_url).split('api/v2')[1]}><button type="button" className="form common-field inverse">Cancel</button></Link>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    )
}
 
export default ModelForm;
