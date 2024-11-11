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
                                initial_form_data[field_key] = page_data[field_key]

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

        if( e.target.type === 'checkbox' ) {

            field_value = e.target.checked

        }
        
        setFormData((prevState) => ({ ...prevState, [e.target.id]: field_value }))
    }

    return((page_data || ! edit ) &&
        <section>
            <div className="content">
                <form onSubmit={async e => {
                    e.preventDefault();

                    const response = await apiFetch(
                        url_builder.api.path,
                        setFormError,
                        url_builder.method,
                        form_data
                    )

                    if ( response.ok ) {

                        navigate(url_builder.return_url)

                    } else {

                        window.scrollTo(0, 0)

                    }
                }}>
                    { metadata && params.action == 'delete' && 
                    <>
                    Are you sure you wish to delete this item?
                    </>}
                    { ( metadata && params.action != 'delete' ) &&
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
                                        choices={metadata.fields[field_key].choices}
                                        id = {field_key}
                                        label = {metadata.fields[field_key].label}
                                        helptext   = {metadata.fields[field_key].help_text}
                                        error_text = {form_error && form_error[field_key]}
                                        required   = {metadata.fields[field_key].required}
                                        value={value}
                                        onChange={handleChange}
                                        field_data={metadata.fields[field_key]}
                                    />)

                                case 'JSON':

                                    return (<TextArea
                                        id = {field_key}
                                        label = {metadata.fields[field_key].label}
                                        helptext   = {metadata.fields[field_key].help_text}
                                        error_text = {form_error && form_error[field_key]}
                                        required   = {metadata.fields[field_key].required}
                                        value={value}
                                        onChange={handleChange}
                                    />)

                                case 'Markdown':

                                    return (<TextArea
                                        id = {field_key}
                                        label = {metadata.fields[field_key].label}
                                        helptext   = {metadata.fields[field_key].help_text}
                                        error_text = {form_error && form_error[field_key]}
                                        required   = {metadata.fields[field_key].required}
                                        value={value}
                                        onChange={handleChange}
                                    />)

                                default:

                                    if( 'multi_line' in metadata.fields[field_key] ) {


                                        return (<TextArea
                                            id = {field_key}
                                            label = {metadata.fields[field_key].label}
                                            helptext   = {metadata.fields[field_key].help_text}
                                            error_text = {form_error && form_error[field_key]}
                                            required   = {metadata.fields[field_key].required}
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
                            <Link to={url_builder.return_url}><button className="form common-field inverse">Cancel</button></Link>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    )
}
 
export default ModelForm;
