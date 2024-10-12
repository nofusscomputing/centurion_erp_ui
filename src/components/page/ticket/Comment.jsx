import FieldData from "../../../functions/FieldData"
import TextArea from "../../form/Textarea"
import { Form } from "react-router-dom"
import Select from "../../form/Select"
import TextField from "../../form/Textfield"
import Button from "../../form/Button"
import { useState } from "react"
import { apiFetch } from "../../../hooks/apiFetch"



const TicketCommentForm = ({
    discussion = false,
    comment_data = {},
    metadata = null,
    post_url = null,
    parent_id = null,
    ticket_id = null,
    commentCallback = null
}) => {

        console.log(post_url)
    let comment_class = 'comment-type-default comment-form'

    const [task_comment, setTaskComment] = useState(false)

    const [form_data, setFormData] = useState({})

    const handleChange = (e) => {

        console.log(`pos url is ${post_url}`)

        let field_value = e.target.value

        if( e.target.type === 'checkbox' ) {

            field_value = e.target.checked

        }

        if( ! form_data.comment_type ) {

            for( let comment_type of metadata.fields['comment_type'].choices) {

                if( 'comment' === String(comment_type.display_name).toLowerCase() ) {
                    setFormData((prevState) => ({ ...prevState, ['comment_type']: comment_type.value }))
                }

            }
        }

        if( ! form_data.ticket && ticket_id ) {

            setFormData((prevState) => ({ ...prevState, ['ticket']: ticket_id }))

        }

        if( ! form_data.parent && parent_id ) {

            setFormData((prevState) => ({ ...prevState, ['parent']: parent_id }))

        }

        setFormData((prevState) => ({ ...prevState, [e.target.id]: field_value }))

        console.log(JSON.stringify(form_data))
    }

    const [form_error, setFormError] = useState(null)

    return (
        metadata && <div className="">
            <div className={comment_class}>

                <Form 
                    onSubmit={async e => {

                            e.preventDefault();


                            const response = await apiFetch(
                                String(post_url).split('api/v2')[1],
                                setFormError,
                                'POST',
                                form_data
                            )

                            if( response.status === 201 ) {

                                commentCallback();
                                setFormData({});
                                e.target.reset();
                            }

                        }
                    }
                >

                    <div style={{lineHeight: '30px'}}>
                        <fieldset className={comment_class}>
                            <span>
                                <Select
                                        choices={metadata.fields['source'].choices}
                                        id = 'source'
                                        label = {metadata.fields['source'].label}
                                        helptext   = {metadata.fields['source'].help_text}
                                        // error_text = {form_error && form_error[field_key]}
                                        required   = {metadata.fields['source'].required}
                                        // value={1}
                                        onChange={handleChange}
                                    />
                            </span>
                        </fieldset>
                        {task_comment && <fieldset className={comment_class}>
                            <span>
                                <Select
                                    choices={metadata.fields['status'].choices}
                                    id = 'status'
                                    label = {metadata.fields['status'].label}
                                    helptext   = {metadata.fields['status'].help_text}
                                    // error_text = {form_error && form_error[field_key]}
                                    required   = {metadata.fields['status'].required}
                                    value={1}
                                    onChange={handleChange}
                                />
                            </span>
                        </fieldset>}
                        {task_comment && <fieldset className={comment_class}>
                            <span>
                                <Select
                                    choices={metadata.fields['responsible_user'].choices}
                                    id = 'responsible_user'
                                    label = {metadata.fields['responsible_user'].label}
                                    helptext   = {metadata.fields['responsible_user'].help_text}
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.fields['responsible_user'].required}
                                    // value={1}
                                    onChange={handleChange}
                                />
                            </span>
                        </fieldset>}
                        {task_comment && <fieldset className={comment_class}>
                            <span>
                                <Select
                                    choices={metadata.fields['responsible_team'].choices}
                                    id = 'responsible_team'
                                    label = {metadata.fields['responsible_team'].label}
                                    helptext   = {metadata.fields['responsible_team'].help_text}
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.fields['responsible_user'].required}
                                    // value={1}
                                    onChange={handleChange}
                                />
                            </span>
                        </fieldset>}
                        { true && <fieldset className={comment_class}>
                            <span>
                                <Select
                                    choices={metadata.fields['category'].choices}
                                    id = 'category'
                                    label = {metadata.fields['category'].label}
                                    helptext   = {metadata.fields['category'].help_text}
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.fields['responsible_user'].required}
                                    // value={1}
                                    onChange={handleChange}
                                />
                                <FieldData
                                    metadata={metadata}
                                    field_name='category'
                                    data={comment_data}
                                />
                            </span>
                        </fieldset>}
                    </div>

                    <hr />
                        <TextArea 
                            required = {true}
                            id='body'
                            class_name='fieldset-tester'
                            onChange={handleChange}
                            value={form_data.body}
                        />

                    <hr />

                    <div>

                        { task_comment && <fieldset className={comment_class}>
                            <span>
                                <TextField
                                    id = 'planned_start_date'
                                    label = {metadata.fields['planned_start_date'].label}
                                    helptext   = {metadata.fields['planned_start_date'].help_text}
                                    type='datetime-local'
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.actions[meta_action][field_key].required}
                                    // value={value}
                                    onChange={handleChange}
                                />
                            </span>
                        </fieldset>}

                        { task_comment && <fieldset className={comment_class}>
                            <span>
                                <TextField
                                    id = 'planned_finish_date'
                                    label = {metadata.fields['planned_finish_date'].label}
                                    helptext   = {metadata.fields['planned_finish_date'].help_text}
                                    type='datetime-local'
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.actions[meta_action][field_key].required}
                                    // value={value}
                                    onChange={handleChange}
                                />
                            </span>
                        </fieldset>}

                        { task_comment && <fieldset className={comment_class}>
                            <span>
                                <TextField
                                    id = 'real_start_date'
                                    label = {metadata.fields['real_start_date'].label}
                                    helptext   = {metadata.fields['real_start_date'].help_text}
                                    type='datetime-local'
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.actions[meta_action][field_key].required}
                                    // value={value}
                                    onChange={handleChange}
                                />
                            </span>
                        </fieldset>}

                        { task_comment && <fieldset className={comment_class}>
                            <span>
                                <TextField
                                    id = 'real_start_date'
                                    label = {metadata.fields['real_finish_date'].label}
                                    helptext   = {metadata.fields['real_finish_date'].help_text}
                                    type='datetime-local'
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.actions[meta_action][field_key].required}
                                    // value={value}
                                    onChange={handleChange}
                                />
                            </span>
                        </fieldset>}

                    </div>

                    <Button
                        button_text="Comment"
                        menu_entries={metadata.fields['comment_type'].choices}
                        MenuClickCallback={(menu_value) => {

                            const comment_types = metadata.fields['comment_type'].choices
                            let menu_entry = ''

                            console.log(`menu entry click value ${menu_value}`)

                            for( let comment_type of comment_types) {

                                if( Number(menu_value) === Number(comment_type.value) ) {
                                    menu_entry = String(comment_type.display_name).toLowerCase()
                                }

                            }

                            menu_entry = String(menu_entry).toLowerCase()
                    
                            console.log(`menu entry click was ${menu_entry}`)
                    
                            if( menu_entry === 'comment' ) {
                    
                                setTaskComment(false)
                    
                            }else if( menu_entry === 'task' ) {
                    
                                setTaskComment(true)
                    
                            }else if( menu_entry === 'solution' ) {
                    
                                setTaskComment(false)
                    
                            }else if( menu_entry === 'notification' ) {
                    
                                setTaskComment(false)
                    
                            }

                            setFormData((prevState) => ({ ...prevState, ['comment_type']: menu_value }))
                    
                            console.log(`menu entry click was set to ${task_comment}`)
                        } }
                    />

                </Form>
            </div>
        </div>
    );
}

export default TicketCommentForm;