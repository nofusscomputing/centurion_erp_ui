import FieldData from "../../../functions/FieldData"
import TextArea from "../../form/Textarea"
import { Form } from "react-router-dom"
import Select from "../../form/Select"
import TextField from "../../form/Textfield"



const TicketCommentForm = ({
    discussion = false,
    comment_data = {},
    metadata = null,
    post_url = null,
    task_comment = false
}) => {

        console.log(post_url)
    let comment_class = 'comment-type-default comment-form'

    let action_keyword = 'POST'

    if( 'PUT' in metadata.actions ) {

        action_keyword = 'PUT'

    }

    return (
        metadata && <div className="">
            <div className={comment_class}>

                <Form 
                    onSubmit={async e => {
                            e.preventDefault();
                        }
                    }
                >

                    <div style={{lineHeight: '30px'}}>
                        <fieldset className={comment_class}>
                            <span>
                                <Select
                                        choices={metadata.actions[action_keyword]['source'].choices}
                                        id = 'source'
                                        label = {metadata.actions[action_keyword]['source'].label}
                                        helptext   = {metadata.actions[action_keyword]['source'].help_text}
                                        // error_text = {form_error && form_error[field_key]}
                                        required   = {metadata.actions[action_keyword]['source'].required}
                                        // value={1}
                                        // onChange={handleChange}
                                    />
                            </span>
                        </fieldset>
                        {task_comment && <fieldset className={comment_class}>
                            <span>
                                <Select
                                    choices={metadata.actions[action_keyword]['status'].choices}
                                    id = 'status'
                                    label = {metadata.actions[action_keyword]['status'].label}
                                    helptext   = {metadata.actions[action_keyword]['status'].help_text}
                                    // error_text = {form_error && form_error[field_key]}
                                    required   = {metadata.actions[action_keyword]['status'].required}
                                    value={1}
                                    // onChange={handleChange}
                                />
                            </span>
                        </fieldset>}
                        {task_comment && <fieldset className={comment_class}>
                            <span>
                                <Select
                                    choices={metadata.actions[action_keyword]['responsible_user'].choices}
                                    id = 'responsible_user'
                                    label = {metadata.actions[action_keyword]['responsible_user'].label}
                                    helptext   = {metadata.actions[action_keyword]['responsible_user'].help_text}
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.actions[action_keyword]['responsible_user'].required}
                                    // value={1}
                                    // onChange={handleChange}
                                />
                            </span>
                        </fieldset>}
                        {task_comment && <fieldset className={comment_class}>
                            <span>
                                <Select
                                    choices={metadata.actions[action_keyword]['responsible_team'].choices}
                                    id = 'responsible_team'
                                    label = {metadata.actions[action_keyword]['responsible_team'].label}
                                    helptext   = {metadata.actions[action_keyword]['responsible_team'].help_text}
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.actions[action_keyword]['responsible_user'].required}
                                    // value={1}
                                    // onChange={handleChange}
                                />
                            </span>
                        </fieldset>}
                        { true && <fieldset className={comment_class}>
                            <span>
                                <Select
                                    choices={metadata.actions[action_keyword]['category'].choices}
                                    id = 'category'
                                    label = {metadata.actions[action_keyword]['category'].label}
                                    helptext   = {metadata.actions[action_keyword]['category'].help_text}
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.actions[action_keyword]['responsible_user'].required}
                                    // value={1}
                                    // onChange={handleChange}
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
                            class_name='fieldset-tester'
                        />

                    <hr />

                    <div>

                        { task_comment && <fieldset className={comment_class}>
                            <span>
                                <TextField
                                    id = 'planned_start_date'
                                    label = {metadata.actions[action_keyword]['planned_start_date'].label}
                                    helptext   = {metadata.actions[action_keyword]['planned_start_date'].help_text}
                                    type='datetime-local'
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.actions[meta_action][field_key].required}
                                    // value={value}
                                    // onChange={handleChange}
                                />
                            </span>
                        </fieldset>}

                        { task_comment && <fieldset className={comment_class}>
                            <span>
                                <TextField
                                    id = 'planned_finish_date'
                                    label = {metadata.actions[action_keyword]['planned_finish_date'].label}
                                    helptext   = {metadata.actions[action_keyword]['planned_finish_date'].help_text}
                                    type='datetime-local'
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.actions[meta_action][field_key].required}
                                    // value={value}
                                    // onChange={handleChange}
                                />
                            </span>
                        </fieldset>}

                        { task_comment && <fieldset className={comment_class}>
                            <span>
                                <TextField
                                    id = 'real_start_date'
                                    label = {metadata.actions[action_keyword]['real_start_date'].label}
                                    helptext   = {metadata.actions[action_keyword]['real_start_date'].help_text}
                                    type='datetime-local'
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.actions[meta_action][field_key].required}
                                    // value={value}
                                    // onChange={handleChange}
                                />
                            </span>
                        </fieldset>}

                        { task_comment && <fieldset className={comment_class}>
                            <span>
                                <TextField
                                    id = 'real_start_date'
                                    label = {metadata.actions[action_keyword]['real_finish_date'].label}
                                    helptext   = {metadata.actions[action_keyword]['real_finish_date'].help_text}
                                    type='datetime-local'
                                    // error_text = {form_error && form_error[field_key]}
                                    // required   = {metadata.actions[meta_action][field_key].required}
                                    // value={value}
                                    // onChange={handleChange}
                                />
                            </span>
                        </fieldset>}

                    </div>

                    <div style={{
                            // backgroundColor: '#ff0000',
                                display: 'block',
                                padding: '0px',
                                margin: 'auto',
                                marginRight: '5px',
                                marginBottom: '5px',
                                width: 'fit-content'
                            }}>
                            <button className="form common-field" type="submit">Comment</button>
                        </div>

                </Form>
            </div>
        </div>
    );
}

export default TicketCommentForm;