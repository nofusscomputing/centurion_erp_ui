import {
    useContext,
    useId,
    useState 
} from "react"
import { Form } from "react-router"

import { FormatTime } from "../../../functions/FormatTime"

import { apiFetch } from "../../../hooks/apiFetch"
import UserContext from "../../../hooks/UserContext"

import Button from "../../form/Button"
import Section from "../../Section"
import Select from "../../form/Select"
import TextArea from "../../form/Textarea"
import TextField from "../../form/Textfield"



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

    const formId = useId();

    let comment_type = ''

    let edit_form_data = {
        // 'comment_type': 'comment'
    }

    let is_task_comment = false

    let is_solution_comment = false

    let is_notification_comment = false

    const [form_data, setFormData] = useState(edit_form_data)

    const [task_comment, setTaskComment] = useState( is_task_comment )

    const user = useContext(UserContext)

    if( String(post_url).includes('?') ) {
        console.log('url has qs')
        post_url = String(post_url).split('?')[0].replace('/comment', '')
    }

    let HTTP_METHOD = 'POST'

    if( is_edit ) {

        post_url = comment_data['_urls']['_self']
        HTTP_METHOD = 'PATCH'
    } else {

        post_url = post_url.replace('/comment', '/' + form_data['comment_type'])
    }

    let comment_class = 'comment-type-default comment-form'


    if( comment_data && is_edit ) {


    }


    const comment_types = metadata.fields['comment_type'].choices
    

    console.log(`menu entry click value ${comment_type}`)

    for( let meta_comment_type of comment_types) {

        if(
            Number(comment_data['comment_type']) === Number(meta_comment_type.value)
            || Number(form_data['comment_type']) === Number(meta_comment_type.value)
        ) {

            comment_type = String(meta_comment_type.display_name).toLowerCase()

        } else if(
            comment_data['comment_type'] === meta_comment_type.value
            || form_data['comment_type'] === meta_comment_type.value
        ) {

            comment_type = String(meta_comment_type.display_name).toLowerCase()

        }else {

            comment_type = String('comment')
        }

    }

    comment_type = String(comment_type).toLowerCase()


    console.log(`menu entry is ${comment_type}`)

    if( comment_type === 'task' ) {

        is_task_comment = true

    }else if( comment_type === 'solution' ) {

        is_solution_comment = true

    }else if( comment_type === 'notification' ) {

        is_notification_comment = true

    }



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
        metadata &&
        <Section
            className={comment_class}
        >

            <Form
                id={formId}
                onSubmit={async e => {

                    e.preventDefault();

                    let processed_form_data = {}

                    for (let [key, value] of Object.entries(form_data)) {


                        if( String(metadata.fields[key].type).toLowerCase() === 'datetime' ) {

                            value = FormatTime({
                                time: String(value),
                                iso: true,
                                tz: user.settings.timezone
                            });

                        }

                        processed_form_data = {
                            ...processed_form_data,
                            [key]: value
                        }

                    }

                    const response = await apiFetch(
                        post_url,
                        setFormError,
                        HTTP_METHOD,
                        processed_form_data
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

                }}
            >

                <div className="comment form row">

                    <Select
                            id = 'source'
                            field_data={metadata.fields['source']}
                            onChange={handleChange}
                            value = {form_data['source'] ? form_data['source'] : comment_data['source']}
                        />

                    {task_comment &&
                    <Select
                        id = 'status'
                        field_data={metadata.fields['status']}
                        value={form_data['status'] ? form_data['status'] : comment_data['status']}
                        onChange={handleChange}
                    />}

                    {task_comment &&
                    <Select
                        id = 'responsible_user'
                        field_data={metadata.fields['responsible_user']}
                        value={form_data['responsible_user'] ? form_data['responsible_user'] : comment_data['responsible_user']}
                        onChange={handleChange}
                    />}

                    {task_comment &&
                    <Select
                        id = 'responsible_team'
                        field_data={metadata.fields['responsible_team']}
                        value={form_data['responsible_team'] ? form_data['responsible_team'] : comment_data['responsible_team']}
                        onChange={handleChange}
                    />}

                    { true &&

                    <Select
                        id = 'category'
                        field_data={metadata.fields['category']}
                        value={form_data['category'] ? form_data['category'] : comment_data['category']}
                        onChange={handleChange}
                    />}
                </div>

                <hr />

                    <TextArea 
                        required = {true}
                        id='body'
                        class_name='fieldset-tester'
                        onChange={handleChange}
                        value={form_data.body ? form_data.body : comment_data['body']}
                    />

                <hr />

                <div className="comment form row">

                    { task_comment &&
                    <TextField
                        id = 'planned_start_date'
                        label = {metadata.fields['planned_start_date'].label}
                        helptext   = {metadata.fields['planned_start_date'].help_text}
                        type='datetime-local'
                        // error_text = {form_error && form_error[field_key]}
                        // required   = {metadata.actions[meta_action][field_key].required}
                        value={
                            form_data['planned_start_date'] ?
                                String(form_data['planned_start_date'])?.replace('Z', '').replace(/[+|-]\d{2}\:\d{2}$/, '')
                            :
                                String(comment_data['planned_start_date'])?.replace('Z', '').replace(/[+|-]\d{2}\:\d{2}$/, '')
                        }
                        onChange={handleChange}
                    />}

                    { task_comment &&
                    <TextField
                        id = 'planned_finish_date'
                        label = {metadata.fields['planned_finish_date'].label}
                        helptext   = {metadata.fields['planned_finish_date'].help_text}
                        type='datetime-local'
                        // error_text = {form_error && form_error[field_key]}
                        // required   = {metadata.actions[meta_action][field_key].required}
                        value={
                            form_data['planned_finish_date'] ?
                                String(form_data['planned_finish_date'])?.replace('Z', '').replace(/[+|-]\d{2}\:\d{2}$/, '')
                            :
                                String(comment_data['planned_finish_date'])?.replace('Z', '').replace(/[+|-]\d{2}\:\d{2}$/, '')
                        }
                        onChange={handleChange}
                    />}

                    { task_comment &&
                    <TextField
                        id = 'real_start_date'
                        label = {metadata.fields['real_start_date'].label}
                        helptext   = {metadata.fields['real_start_date'].help_text}
                        type='datetime-local'
                        // error_text = {form_error && form_error[field_key]}
                        // required   = {metadata.actions[meta_action][field_key].required}
                        value={
                            form_data['real_start_date'] ?
                                form_data['real_start_date']?.replace('Z', '').replace(/[+|-]\d{2}\:\d{2}$/, '')
                            :
                                String(comment_data['real_start_date'])?.replace('Z', '').replace(/[+|-]\d{2}\:\d{2}$/, '')
                        }
                        onChange={handleChange}
                    />}

                    { task_comment &&
                    <TextField
                        id = 'real_finish_date'
                        label = {metadata.fields['real_finish_date'].label}
                        helptext   = {metadata.fields['real_finish_date'].help_text}
                        type='datetime-local'
                        // error_text = {form_error && form_error[field_key]}
                        // required   = {metadata.actions[meta_action][field_key].required}
                        value={
                            form_data['real_finish_date'] ?
                                form_data['real_finish_date']?.replace('Z', '').replace(/[+|-]\d{2}\:\d{2}$/, '')
                            :
                                String(comment_data['real_finish_date'])?.replace('Z', '').replace(/[+|-]\d{2}\:\d{2}$/, '')
                        }
                        onChange={handleChange}
                    />}

                </div>

                <div>

                    { is_edit &&
                    <Button
                        onClick={cancelbuttonOnSubmit}
                        button_text = 'Cancel'
                    />}

                    { is_edit &&
                    <Button
                        button_text="Comment"
                    />}

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

                                } else if( menu_value === comment_type.value ) {

                                    menu_entry = String(comment_type.display_name).toLowerCase()

                                }

                            }

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
                    />}

                </div>
            </Form>
        </Section>
    );
}

export default TicketCommentForm;