import TextArea from "./form/Textarea";
import Button from "./form/Button";
import { useState } from "react";
import RenderMarkdown from "../functions/RenderMarkdown";

/**
 * Markdown Editor with preview tab.
 * 
 * @param {String} field_name The name of the field as fetched from the API.
 * @param {Object} Metadata The metadata page from the api with the field information.
 * @param {String} value The markdown text to display within the field
 * @param {Function} onCancel The function to run when the cancel button is clicked
 * @param {Function} onSave The function to run when the save button is clicked 
 * @returns 
 */
const MarkdownEditor = ({
    field_name = null,
    metadata = null,
    markdown = null,
    onCancel = null,
    onSave = null,
}) => {

    const [ editing, setEditing ] = useState( true )

    const [form_data, setFormData ] = useState({ [field_name]: markdown })


    const handleChange = (e) => {

        setFormData({[field_name]: e.target.value})

    }

    const handleSave = (e) => {

        if( ! document.getElementById(field_name).disabled ) {    // prevent re-submission

            document.getElementById(field_name).disabled = true

            if( document.getElementById('textarea-' + field_name) ) {

                document.getElementById('textarea-' + field_name).disabled = true

            }

            onSave({
                'event': e,
                ...form_data
            })
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

    return (
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
                    onSubmit={handleSave}
                />
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
                    button_text = 'Save'
                    onClick = {handleSave}
                />
            </div>
        </div>
        
    );

}
 
export default MarkdownEditor;