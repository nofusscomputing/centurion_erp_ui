import { json, redirect, useLoaderData, useNavigate, useParams } from "react-router-dom";
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

    const page_data = useLoaderData();

    const params = useParams();

    const [metadata, setMetaData] = useState(null);

    const [form_data, setFormData] = useState({})

    const [form_error, setFormError] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {

        apiFetch(
            params.module + '/' + params.model + '/' + params.pk,
            (data) =>{

                setMetaData(data)


                setFormData(() => {

                    let initial_form_data = {}

                    Object.keys(data.actions.PUT).map((field_key) => {

                        if( data.actions.PUT[field_key].required ) {
                            form_data[field_key] = page_data[field_key]
                        }

                    })

                    return form_data;

                },[])

                if( 'name' in page_data ) {

                    setContentHeading(page_data['name']);

                }else if( 'title' in page_data ) {

                    setContentHeading(page_data['title']);

                }else{
                    setContentHeading(metadata['name']);
                }

            },
            'OPTIONS'
        )
    },[])

    let action = 'post'

    const handleChange = (e) => {

        let field_value = e.target.value

        if( e.target.type === 'checkbox' ) {

            field_value = e.target.checked

        }
        
        setFormData((prevState) => ({ ...prevState, [e.target.id]: field_value }))
    }

    return(page_data &&
        <section>
            <div className="content">
                <form onSubmit={async e => {
                    e.preventDefault();

                    const url = '/' + params.module + '/' + params.model + '/' + params.pk

                    const response = await apiFetch(
                        url,
                        setFormError,
                        'PUT',
                        form_data
                    )

                    if ( response.ok ) {

                        navigate(url)

                    }
                }}>
                    {/* {metadata?.actions.PUT.items.map((field) => { */}
                    { metadata &&
                    Object.keys(metadata.actions.PUT).map((field_key) => {

                        if( ! metadata.actions.PUT[field_key].read_only ) {


                            // let form_data_field = { ...form_data }

                            // form_data_field[field_key] = page_data[field_key]


                            // setFormData(form_data_field)

                            console.log(`field data: ${JSON.stringify(form_data)}`)


                            switch(metadata.actions.PUT[field_key].type) {

                                case 'Boolean':

                                    return (<Slider
                                        id = {field_key}
                                        label = {metadata.actions.PUT[field_key].label}
                                        helptext   = {metadata.actions.PUT[field_key].help_text}
                                        // error_text = {form_error[field_key]}
                                        required   = {metadata.actions.PUT[field_key].required}
                                        // value={page_data[field_key]}
                                        // value={form_data?.[field_key] ? form_data[field_key] : page_data[field_key]}
                                        // value={form_data[field_key]}
                                        // value={form_data[field_key] !== null ? form_data[field_key] : page_data[field_key]}
                                        value={field_key in form_data ? form_data[field_key] : page_data[field_key]}
                                        onChange={handleChange}
                                    />)
                                    // break;

                                case 'Choice':
                                case 'Relationship':

                                    return (<Select
                                        choices={metadata.actions.PUT[field_key].choices}
                                        id = {field_key}
                                        label = {metadata.actions.PUT[field_key].label}
                                        helptext   = {metadata.actions.PUT[field_key].help_text}
                                        // error_text = {form_error?[field_key]}
                                        required   = {metadata.actions.PUT[field_key].required}
                                        // value={page_data[field_key]}
                                        // value={form_data?.[field_key] ? form_data[field_key] : page_data[field_key]}
                                        value={field_key in form_data ? form_data[field_key] : page_data[field_key]}
                                        // form_data = {form_data}
                                        // setFormData = {setFormData}
                                        onChange={handleChange}
                                    />)
                                    // break;

                                case 'JSON':

                                    return (<TextArea
                                    field_type="json"
                                        id = {field_key}
                                        label = {metadata.actions.PUT[field_key].label}
                                        helptext   = {metadata.actions.PUT[field_key].help_text}
                                        // error_text = 'An error on this field'
                                        required   = {metadata.actions.PUT[field_key].required}
                                        // value={page_data[field_key]}
                                        // value={form_data?.[field_key] ? form_data[field_key] : page_data[field_key]}
                                        value={field_key in form_data ? form_data[field_key] : page_data[field_key]}
                                        // form_data = {form_data}
                                        // setFormData = {setFormData}
                                        onChange={handleChange}
                                    />)
                                    // break;

                                default:

                                    


                                    return (<TextField
                                        id = {field_key}
                                        label = {metadata.actions.PUT[field_key].label}
                                        helptext   = {metadata.actions.PUT[field_key].help_text}
                                        error_text = {form_error && form_error[field_key]}
                                        required   = {metadata.actions.PUT[field_key].required}
                                        // value={page_data[field_key]}
                                        // value={form_data ? (form_data[field_key] ? form_data[field_key] : '') : ''}
                                        // value={form_data?.[field_key] ? form_data[field_key] : page_data[field_key]}
                                        value={field_key in form_data ? form_data[field_key] : page_data[field_key]}
                                        // onchange={(e) => {
                                        //     setFormData = {
                                        //         ...form_data,
                                        //         field_key: e.target.value
                                        //     }
                                        // }}
                                        // form_data = {form_data}
                                        // setFormData = {setFormData}
                                        onChange={handleChange}
                                    />)
                                    // break;
                            }


                        }

                    })}
                    <button className="common-field form" type="submit">Save</button>
                </form>
            </div>
        </section>
    )


    // return (
    //     <section>
    //         <div className="content">
    //             <form>
    //                 <TextField
    //                     label      = 'Name'
    //                     helptext   = 'this is the helptext for a form field.'
    //                     error_text = 'An error on this field'
    //                     required   = 'true'
    //                 />
    //                 <TextArea
    //                     label      = 'Description'
    //                     helptext   = 'this is the helptext for a form field.'
    //                     // error_text = 'An error on this field'
    //                     // required   = 'true'
    //                 />
    //                 <Select
    //                     label      = 'Organization'
    //                     helptext   = 'this is the helptext for a form field.'
    //                     // error_text = 'An error on this field'
    //                     values={[
    //                         {
    //                             label: 'One',
    //                             value: '1'
    //                         },
    //                         {
    //                             label: 'Two',
    //                             value: '2'
    //                         }
    //                     ]}
    //                 />
    //                 <Slider
    //                     label    = 'Is a Template'
    //                     helptext = 'this is the helptext for a form field.'
    //                     // error_text = 'An error on this field'
    //                     required   = 'true'
    //                 />
    //                 <div style={{
    //                     display: 'flexbox',
    //                     width: '100%'
    //                 }}>
    //                     <div style={{
    //                             // backgroundColor: '#00cc00',
    //                             display: 'block',
    //                             padding: 'auto',
    //                             margin: 'auto',
    //                             width: 'fit-content'
    //                         }}>
    //                         <button className="form common-field">Save</button>
    //                         <button className="form common-field inverse">Cancel</button>
    //                     </div>
    //                 </div>
    //             </form>
    //         </div>
    //     </section>
    //  );
}
 
export default ModelForm;
