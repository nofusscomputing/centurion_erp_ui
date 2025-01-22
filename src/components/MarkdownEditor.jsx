import TextArea from "./form/Textarea";
import Button from "./form/Button";
import { useState } from "react";
import RenderMarkdown from "../functions/RenderMarkdown";
import { Form } from "react-router";

/**
 * Markdown Editor with preview tab.
 * 
 * @param {Object} data API Data that contains the field.
 * @param {String} field_name The name of the field as fetched from the API.
 * @param {Object} Metadata The metadata page from the api with the field information.
 * @param {Function} onCancel The function to run when the cancel button is clicked
 * @param {Function} onSave The function to run when the save button is clicked 
 * @returns 
 */
const MarkdownEditor = ({
    data,
    field_name,
    metadata,
    onCancel = null,
    onSave = null,
}) => {

    const [ editing, setEditing ] = useState( true )

    const [form_data, setFormData ] = useState({ [field_name]: data[field_name] })


    const handleChange = (e) => {

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

    return (
        <Form name="inline_form" method="patch" action={String(data._urls._self).split('api/v2')[1]} onSubmit={handleSave}>
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
                        button_text = 'Save'
                    />
                </div>
            </div>
        </Form>
    );

}
 
export default MarkdownEditor;