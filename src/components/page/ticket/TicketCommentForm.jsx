import {
    useContext,
    useEffect,
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

    const[ comment_type, setCommentType ] = useState( is_edit ? comment_data['comment_type'] : 'comment' )

    const [ comment_metadata, setCommentMetadata ] = useState(metadata)

    /* 
        ToDo:Uupdate Centurion Serializer so that comment type does not
        have to be sent as the viewset can determin as the URL is set by
        the view serializer.
    */
    const [form_data, setFormData] = useState({
        ['comment_type']: comment_type
    })

    const user = useContext(UserContext)

    let comment_class = 'comment-type-default comment-form'


 
    useEffect(() => {

        if( ! is_edit && ! comment_metadata ) {

            apiFetch(
                comment_data?.id ? comment_data._urls._self : post_url.replace('/comment',`/${comment_type}`)
            )
                .then((result) => {

                    if( result.status == 200 ) {

                        if( result.api_metadata !== null ) {

                            setCommentMetadata(result.api_metadata)

                        }
                    }
                }
                )
        } else {

        }

    }, [
            comment_type,
        ])



    const handleChange = (e) => {

        let field_value = e.target.value

        if( e.target.type === 'checkbox' ) {

            field_value = e.target.checked

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
        comment_metadata &&
        <Section
            className={comment_class}
        >

            <Form
                id={formId}
                onSubmit={async e => {

                    e.preventDefault();

                    let processed_form_data = {}

                    for (let [key, value] of Object.entries(form_data)) {


                        if( String(comment_metadata.fields[key].type).toLowerCase() === 'datetime' ) {

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
                        is_edit ? comment_data._urls._self : post_url.replace('/comment',`/${comment_type}`),
                        setFormError,
                        is_edit ? 'PATCH' : 'POST',
                        processed_form_data,
                        false,
                        true
                    )

                    if(
                        response.status === 201
                        || (
                            response.status === 200
                            && is_edit
                        )
                    ) {

                        commentCallback(response);

                        e.target.reset();

                        // Reset the form
                        setCommentMetadata(metadata)
                        setCommentType('comment')
                        setFormData({
                            ['comment_type']: 'comment'
                        });
                    }

                }}
            >

                <div className="comment form row">

                    <Select
                            id = 'source'
                            field_data={comment_metadata.fields['source']}
                            onChange={handleChange}
                            value = {form_data['source'] ? form_data['source'] : comment_data['source']}
                        />

                    {comment_metadata.fields.status &&
                    <Select
                        id = 'status'
                        field_data={comment_metadata.fields['status']}
                        value={form_data['status'] ? form_data['status'] : comment_data['status']}
                        onChange={handleChange}
                    />}

                    {comment_metadata.fields.assignee &&
                    <Select
                        id = 'assignee'
                        field_data={comment_metadata.fields['assignee']}
                        value={form_data['assignee'] ? form_data['assignee'] : comment_data['assignee']}
                        onChange={handleChange}
                    />}

                    { true &&

                    <Select
                        id = 'category'
                        field_data={comment_metadata.fields['category']}
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

                    { comment_metadata.fields.planned_start_date &&
                    <TextField
                        id = 'planned_start_date'
                        label = {comment_metadata.fields['planned_start_date'].label}
                        helptext   = {comment_metadata.fields['planned_start_date'].help_text}
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

                    { comment_metadata.fields.planned_finish_date &&
                    <TextField
                        id = 'planned_finish_date'
                        label = {comment_metadata.fields['planned_finish_date'].label}
                        helptext   = {comment_metadata.fields['planned_finish_date'].help_text}
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

                    { comment_metadata.fields.real_start_date &&
                    <TextField
                        id = 'real_start_date'
                        label = {comment_metadata.fields['real_start_date'].label}
                        helptext   = {comment_metadata.fields['real_start_date'].help_text}
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

                    { comment_metadata.fields.real_finish_date &&
                    <TextField
                        id = 'real_finish_date'
                        label = {comment_metadata.fields['real_finish_date'].label}
                        helptext   = {comment_metadata.fields['real_finish_date'].help_text}
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

                    { ! is_edit && comment_metadata &&
                    <Button
                        button_text="Comment"
                        menu_entries={comment_metadata.fields['comment_type'].choices}
                        MenuClickCallback={(menu_value) => {

                            const comment_types = comment_metadata.fields['comment_type'].choices
                            let menu_entry = ''

                            console.log(`menu entry click value ${menu_value}`)

                            for( let comment_type of comment_types) {

                                if( Number(menu_value) === Number(comment_type.value) ) {

                                    menu_entry = String(comment_type.display_name).toLowerCase()

                                } else if( menu_value === comment_type.value ) {

                                    menu_entry = String(comment_type.display_name).toLowerCase()

                                }

                            }


                            setCommentType(menu_value)

                            setFormData((prevState) => ({ ...prevState, ['comment_type']: menu_value }))

                            setCommentMetadata(null)

                        } }
                    />}

                </div>
            </Form>
        </Section>
    );
}

export default TicketCommentForm;