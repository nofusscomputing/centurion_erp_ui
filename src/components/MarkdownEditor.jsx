import TextArea from "./form/Textarea";
import Button from "./form/Button";
import { useContext, useId, useState } from "react";
import RenderMarkdown from "../functions/RenderMarkdown";
import { Form } from "react-router";
import UserContext from "../hooks/UserContext";

/**
 * Markdown Editor with preview tab.
 * 
 * ## onChange
 * 
 * This paramater is intended to be used to convert the field from inline
 * editing to be a field that is part of a form. **Note:** requires that
 * parameter `data` be `null`
 * 
 * @param {Object} data API Data that contains the field.
 * @param {String} field_name The name of the field as fetched from the API.
 * @param {Object} Metadata The metadata page from the api with the field information.
 * @param {Function} onCancel The function to run when the cancel button is clicked
 * @param {Function} onChange The function that will be called when the field changes
 * @param {Function} onSave The function to run when the save button is clicked 
 * @returns 
 */
const MarkdownEditor = ({
    data,
    field_name,
    metadata,
    onCancel = null,
    onChange = null,
    onSave = null,
}) => {

    const [ editing, setEditing ] = useState( true )

    const [form_data, setFormData ] = useState({ [field_name]: data ? data[field_name] : '' })

    const fieldsetFormId = useId();

    const user = useContext(UserContext)


    const handleChange = (e) => {

        if( onChange && ! data ) {

            onChange( [field_name], e.target.value)

        }

        setFormData({[field_name]: e.target.value})

    }

    const handleSave = (e) => {

        if( ! document.getElementById('button-save').disabled ) {    // prevent re-submission

            document.getElementById('button-save').disabled = true

            if( document.getElementById('textarea-' + field_name) ) {

                document.getElementById('textarea-' + field_name).disabled = true

            }

            onSave(e)
        }

    }


    const handletabClick = (e) => {

        if( String(e.target.innerText).toLowerCase() === 'preview' ) {

            e.target.classList.add("active")
            e.target.parentElement.children['tab-edit'].classList.remove("active")

            setEditing(false)

        }else if( String(e.target.innerText).toLowerCase() === 'edit' ) {

            e.target.classList.add("active")
            e.target.parentElement.children['tab-preview'].classList.remove("active")

            setEditing(true)

        }
    }


    console.debug('MarkdownEditor: ' + JSON.stringify(form_data))

    const return_field = (
        <div
            style={{
                display: 'block',
                width: '100%'
            }}
        >
            <div id="tabs" className="markdown-edit tabs">
                <span id="tab-edit" className="tab active" onClick={handletabClick}>Edit</span>
                <span id="tab-preview" className="tab" onClick={handletabClick}>Preview</span>
            </div>

            <div className="md-editor">

                {editing &&
                <>
                <TextArea
                    auto_content_height = {true}
                    class_name ={'full-width'}
                    id = {field_name}
                    fieldset = {false}
                    field_data = {metadata.fields[field_name]}
                    value = {form_data[field_name]}
                    onChange = {handleChange}
                    onSubmit={(e) => {
                        handleSave(e)
                    }}
                />
                <input id="tz" type="hidden"  name="tz" value={user.settings.timezone} />
                <input id="metadata" type="hidden"  name="metadata" value={JSON.stringify(metadata)} />
                </>
                }

                { ! editing &&
                    <>
                    <div className="markdown">
                        <RenderMarkdown full_width={true} env={metadata.fields[field_name].render ?? {}}>
                            {form_data[field_name]}
                        </RenderMarkdown>
                    </div>
                    </>
                }
            </div>
            <div>
                <Button
                    button_text = 'Cancel'
                    type = 'cancel'
                    onClick = {onCancel}
                />
                <Button
                    id="button-save"
                    button_text = 'Save'
                />
            </div>
        </div>
    )

    if( ! data && onChange ) {

        return(
            <>
            {return_field}
            </>
        )

    } else {

        return (
            <Form id={fieldsetFormId} name="inline_form" method="patch" action={String(data?._urls?._self).split('api/v2')[1]} onSubmit={handleSave}>
                {return_field}
            </Form>
        );
    }

}
 
export default MarkdownEditor;