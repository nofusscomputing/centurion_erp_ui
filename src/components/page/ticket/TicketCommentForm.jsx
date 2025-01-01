import FieldData from "../../../functions/FieldData"
import TextArea from "../../form/Textarea"
import { Form } from "react-router"
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
    commentCallback = null,
    is_edit = false,
    cancelbuttonOnSubmit = null,
}) => {

    if( String(post_url).includes('?') ) {
        console.log('url has qs')
        post_url = String(post_url).split('?')[0]
    }

    let HTTP_METHOD = 'POST'

    if( is_edit ) {

        post_url = comment_data['_urls']['_self']
        HTTP_METHOD = 'PATCH'
    }

    let comment_class = 'comment-type-default comment-form'


    let edit_form_data = {}

    if( comment_data && is_edit ) {

        edit_form_data = {
            'body': comment_data['body'],
            'source': comment_data['source'],
            'responsible_user': comment_data['responsible_user'],
            'responsible_team': comment_data['responsible_team'],
            'category': comment_data['category'],
            'planned_start_date': comment_data['planned_start_date'],
            'planned_finish_date': comment_data['planned_finish_date'],
            'real_start_date': comment_data['real_start_date'],
            'real_finish_date': comment_data['real_finish_date'],
        }

    }


    const comment_types = metadata.fields['comment_type'].choices
    let comment_type = ''

    console.log(`menu entry click value ${comment_type}`)

    for( let meta_comment_type of comment_types) {

        if( Number(comment_data['comment_type']) === Number(meta_comment_type.value) ) {
            comment_type = String(meta_comment_type.display_name).toLowerCase()
        }

    }


    comment_type = String(comment_type).toLowerCase()

    let is_task_comment = false

    let is_solution_comment = false

    let is_notification_comment = false


    console.log(`menu entry is ${comment_type}`)

    if( comment_type === 'task' ) {

        is_task_comment = true

    }else if( comment_type === 'solution' ) {

        is_solution_comment = true

    }else if( comment_type === 'notification' ) {

        is_notification_comment = true

    }



    const [task_comment, setTaskComment] = useState( is_task_comment )

    const [form_data, setFormData] = useState(edit_form_data)

    const handleChange = (e) => {

        console.log(`pos url is ${post_url}`)

        let field_value = e.target.value

        if( e.target.type === 'checkbox' ) {

            field_value = e.target.checked

        }

        if( ! form_data.comment_type && ! is_edit ) {

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
                                post_url,
                                setFormError,
                                HTTP_METHOD,
                                form_data
                            )

                            if(
                                response.status === 201
                                || (
                                    response.status === 200
                                    && is_edit
                                )
                            ) {

                                commentCallback();
                                is_task_comment = false
                                is_solution_comment = false
                                is_notification_comment = false
                                e.target.reset();
                                setFormData(edit_form_data);
                                setTaskComment(false)
                            }

                        }
                    }
                >

                    <div style={{lineHeight: '30px'}}>
                        <fieldset className={comment_class}>
                            <span>
                                <Select
                                        id = 'source'
                                        field_data={metadata.fields['source']}
                                        onChange={handleChange}
                                        value = {form_data['source']}
                                    />
                            </span>
                        </fieldset>
                        {task_comment && <fieldset className={comment_class}>
                            <span>
                                <Select
                                    id = 'status'
                                    field_data={metadata.fields['status']}
                                    value={form_data['status']}
                                    onChange={handleChange}
                                />
                            </span>
                        </fieldset>}
                        {task_comment && <fieldset className={comment_class}>
                            <span>
                                <Select
                                    id = 'responsible_user'
                                    field_data={metadata.fields['responsible_user']}
                                    value={form_data['responsible_user']}
                                    onChange={handleChange}
                                />
                            </span>
                        </fieldset>}
                        {task_comment && <fieldset className={comment_class}>
                            <span>
                                <Select
                                    id = 'responsible_team'
                                    field_data={metadata.fields['responsible_team']}
                                    value={form_data['responsible_team']}
                                    onChange={handleChange}
                                />
                            </span>
                        </fieldset>}
                        { true && <fieldset className={comment_class}>
                            <span>
                                <Select
                                    id = 'category'
                                    field_data={metadata.fields['category']}
                                    value={form_data['category']}
                                    onChange={handleChange}
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
                                    value={String(form_data['planned_start_date']).replace('Z', '')}
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
                                    value={form_data['planned_finish_date']}
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
                                    value={form_data['real_start_date']}
                                    onChange={handleChange}
                                />
                            </span>
                        </fieldset>}

                        { task_comment && <fieldset className={comment_class}>
                            <span>
                                <TextField
                                    id = 'real_finish_date'
                                    label = {metadata.fields['real_finish_date'].label}
                                    helptext   = {metadata.fields['real_finish_date'].help_text}
                                    type='datetime-local'
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.actions[meta_action][field_key].required}
                                    value={form_data['real_finish_date']}
                                    onChange={handleChange}
                                />
                            </span>
                        </fieldset>}

                    </div>

                    <div>
                    { is_edit &&
                    <Button
                        buttonClickCallback={cancelbuttonOnSubmit}
                        button_text = 'Cancel'
                    />
                    }
                    { is_edit &&
                     <Button
                        button_text="Comment"
                    />

                    }
                    { ! is_edit &&
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
                    }
                    </div>

                </Form>
            </div>
        </div>
    );
}

export default TicketCommentForm;