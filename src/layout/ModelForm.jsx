import { Link, json, redirect, useLoaderData, useNavigate, useParams } from "react-router-dom";
import Select from "../components/form/Select";
import Slider from "../components/form/Slider";
import TextArea from "../components/form/Textarea";
import TextField from "../components/form/Textfield";
import { useEffect, useState } from "react";
import { apiFetch } from "../hooks/apiFetch";



const ModelForm = ({
    setContentHeading
}) => {

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

    let meta_action = null

    let url = '/' + params.module + '/' + params.model + '/' + params.pk    // default edit

    if( ! params.pk ) {
        url = '/' + params.module + '/' + params.model
    }

    if( params.common_pk ) {
        url = '/' + params.module + '/' + params.common_model + '/' + params.common_pk + '/' + params.model
    }


    useEffect(() => {

        apiFetch(
            url,
            (data) =>{

                setMetaData(data)

                setFormData(() => {

                    let initial_form_data = {}


                    if( 'PUT' in data.actions ) {

                        meta_action = 'PUT'
    
                    } else {
    
                        meta_action = 'POST'
    
                    }
    
                    Object.keys(data.actions[meta_action]).map((field_key) => {

                        if( data.actions[meta_action][field_key].required ) {
                            if( page_data ) {
                                initial_form_data[field_key] = page_data[field_key]

                            } else {
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

                    if (params.action == 'delete' ) {
                        meta_action = 'DELETE'
                    }

                    const response = await apiFetch(
                        url,
                        setFormError,
                        meta_action,
                        form_data
                    )

                    if (params.action == 'delete' ) {

                        url = '/' + params.module + '/' + params.model

                    }

                    if ( response.ok ) {

                        navigate(url)

                    }
                }}>
                    { metadata &&
                    Object.keys(metadata.actions['PUT' in metadata.actions ? 'PUT' : 'POST']).map((field_key) => {

                        if( 'PUT' in metadata.actions ) {

                            meta_action = 'PUT'
            
                        } else {
            
                            meta_action = 'POST'
            
                        }

                        if( ! metadata.actions[meta_action][field_key].read_only ) {

                            console.log(`field data: ${JSON.stringify(form_data)}`)

                            switch(metadata.actions[meta_action][field_key].type) {

                                case 'Boolean':

                                    return (<Slider
                                        id = {field_key}
                                        label = {metadata.actions[meta_action][field_key].label}
                                        error_text = {form_error && form_error[field_key]}
                                        helptext   = {metadata.actions[meta_action][field_key].help_text}
                                        required   = {metadata.actions[meta_action][field_key].required}
                                        value={field_key in form_data ? form_data[field_key] : (page_data ? page_data[field_key] : '')}
                                        onChange={handleChange}
                                    />)

                                case 'Choice':
                                case 'Relationship':

                                    return (<Select
                                        choices={metadata.actions[meta_action][field_key].choices}
                                        id = {field_key}
                                        label = {metadata.actions[meta_action][field_key].label}
                                        helptext   = {metadata.actions[meta_action][field_key].help_text}
                                        error_text = {form_error && form_error[field_key]}
                                        required   = {metadata.actions[meta_action][field_key].required}
                                        value={field_key in form_data ? form_data[field_key] : (page_data ? page_data[field_key] : '')}
                                        onChange={handleChange}
                                    />)

                                case 'JSON':

                                    return (<TextArea
                                    field_type="json"
                                        id = {field_key}
                                        label = {metadata.actions[meta_action][field_key].label}
                                        helptext   = {metadata.actions[meta_action][field_key].help_text}
                                        error_text = {form_error && form_error[field_key]}
                                        required   = {metadata.actions[meta_action][field_key].required}
                                        value={field_key in form_data ? form_data[field_key] : (page_data ? page_data[field_key] : '')}
                                        onChange={handleChange}
                                    />)

                                default:

                                    return (<TextField
                                        id = {field_key}
                                        label = {metadata.actions[meta_action][field_key].label}
                                        helptext   = {metadata.actions[meta_action][field_key].help_text}
                                        error_text = {form_error && form_error[field_key]}
                                        required   = {metadata.actions[meta_action][field_key].required}
                                        value={field_key in form_data ? form_data[field_key] : (page_data ? page_data[field_key] : '')}
                                        onChange={handleChange}
                                    />)
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
                            <Link to={url}><button className="form common-field inverse">Cancel</button></Link>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    )
}
 
export default ModelForm;
