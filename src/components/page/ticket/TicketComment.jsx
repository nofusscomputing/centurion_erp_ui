import { useEffect, useState } from "react"

import { apiFetch } from "../../../hooks/apiFetch"

import FieldData from "../../../functions/FieldData"

import IconLoader from "../../IconLoader"
import { secondsToTime } from "../../../layout/Ticket"
import Section from "../../Section"
import TicketCommentForm from "./TicketCommentForm"
import TicketComments from "./TicketComments"



const TicketComment = ({
    comment_data = {},
    metadata = null,
    ticket_id = null,
    post_url,
    edit_callback = null,
    callback_value = null,
    parent_comment = null,
    new_comment_url = null,
}) => {

    if( String(post_url).includes('?') ) {

        post_url = String(post_url).split('?')[0]
    }

    const [ comment_metadata, setCommentMetadata ] = useState( metadata )

    const [ comment_page_data, setCommentPageData ] = useState( comment_data )

    const [ start_thread, setStartThread ] = useState( false )

    let comment_header = ' wrote'

    let comment_class = 'comment comment-type-default'

    let comment_type = ''

    let [ editing, setIsEditing ] = useState(false)

    try {

        if( isNaN(comment_page_data.comment_type) ) {

            comment_type = comment_page_data.comment_type

        }else {

            comment_type = String(comment_metadata.fields.comment_type.choices[Number(comment_page_data.comment_type)-1].display_name).toLowerCase()

        }

    }catch( e ) {

        console.error('error: ' + comment_page_data.id )

    }

    const comment_updated = false


    if( comment_type === 'action' ) {

        comment_class += ' comment-type-action'

    }else if( comment_type === 'notification' ) {

        comment_class += ' comment-type-notification'

    }else if( comment_type === 'task' ) {

        comment_class += ' comment-type-task'

        comment_header = ' created a task'

    } else if( comment_type === 'solution' ) {

        comment_class += ' comment-type-solution'

        comment_header = ' solved'

    }

    const comment_header_text_updated = (<span className="sub-script">Updated </span>)

    const comment_header_text = (
        comment_metadata && comment_page_data &&
        <div className="text">
            <FieldData
                metadata={comment_metadata}
                field_name='user'
                data={comment_page_data}
            />
            <span className="sub-script">{comment_header} on </span>
            <FieldData
                metadata={comment_metadata}
                field_name='created'
                data={comment_page_data}
            />
            {comment_updated && <span>{comment_header_text_updated}
                <FieldData
                    metadata={comment_metadata}
                    field_name='modified'
                    data={comment_page_data}
                />
            </span>}
        </div>
    )



    useEffect(() => {

        if( ! comment_metadata ) {

            async function do_fetch() {

                await apiFetch(
                    comment_page_data._urls._self,
                    null,
                    'OPTIONS'
                )
                    .then((result) => {

                        if( result.status === 200 ) {

                            if( result.api_metadata !== null ) {

                                setCommentMetadata(result.api_metadata)
            
                            }
                        }
                    })
            }

            do_fetch()

        };

    }, [])



    if( comment_type === 'action' ) {

        return(
            comment_metadata &&
            <div id={'comment-' + comment_page_data['id']} key={'comment-' + comment_page_data['id']}>
                <span style={{display: 'inline-block'}}>
                    <FieldData
                        metadata={comment_metadata}
                        field_name='user'
                        data={comment_page_data}
                    />
                </span>&nbsp;
                <span className="markdown" style={{display: 'inline-block'}}>
                    <FieldData
                        metadata={comment_metadata}
                        field_name='body'
                        data={comment_page_data}
                    />
                </span>&nbsp;
                <span className="sub-script" style={{color: '#777', display: 'inline-block'}}>
                    <FieldData
                        metadata={comment_metadata}
                        field_name='created'
                        data={comment_page_data}
                    />
                </span>
            </div>
        )
    }

    const header_icons = (
        comment_page_data &&
        <div id={'comment-icons-' + comment_page_data['id']} className="icons">
            {comment_page_data['parent'] == null &&
             <span style={{
                cursor: 'pointer'
                }} onClick={(e) => {
                    // if(threads.results.length === 0) {
                    setStartThread( (start_thread ? false : true) )
                    // }
            }}>
                <IconLoader
                name={'reply'}
            />
            </span>
            }
            <span style={{
                cursor: 'pointer'
            }} onClick={(e) => {
                    setIsEditing( true )
                }}>
            <IconLoader
                name={'edit'}
            />
            </span>
        </div>
    )

    const is_discussion = true

    let discussion_class = ''

    let style = {}

    if( is_discussion ) {

        discussion_class = ' discussion'
        style = {
            backgroundColor: "var(--background-colour-inactive)",
            paddingBottom: "20px"
        }
    }

    return (
        (comment_metadata && comment_page_data) &&
        <div
            className={discussion_class}
            id={'comment-' + comment_page_data['id']}
            key={'comment-' + comment_page_data['id']}
            style={style}
        >
            { editing &&
            <TicketCommentForm
                comment_data={comment_page_data}
                metadata={comment_metadata}
                post_url = {post_url}
                parent_id={parent_comment}
                ticket_id={ticket_id}
                is_edit = {true}
                cancelbuttonOnSubmit={(e) => {
                    setIsEditing(false)
                }}
                commentCallback={(response) => {

                    setCommentPageData(response.api_page_data);

                    setIsEditing(false)
                    edit_callback( callback_value ? false : true )
                }}
            />
            }
            { ! editing &&
            <Section
                className={comment_class}
                titleBar={(
                    <h4 className={comment_class}>
                        {comment_header_text}{header_icons}
                    </h4>
                )}
            >
                <div className="comment row">

                    { comment_page_data.source &&
                    <fieldset className={comment_class}>
                        <label>Source</label>
                        <span className="text">
                            <FieldData
                                metadata={comment_metadata}
                                field_name='source'
                                data={comment_page_data}
                            />
                        </span>
                    </fieldset>}

                    {comment_page_data.status &&
                    <fieldset className={comment_class}>
                        <label>Status</label>
                        <span className="text">
                            <FieldData
                                metadata={comment_metadata}
                                field_name='status'
                                data={comment_page_data}
                            />
                        </span>
                    </fieldset>}

                    {comment_page_data.assignee &&
                    <fieldset className={comment_class}>
                        <label>{comment_metadata.fields['assignee'].label}</label>
                        <span className="text">
                            <FieldData
                                metadata={comment_metadata}
                                field_name='assignee'
                                data={comment_page_data}
                            />
                        </span>
                    </fieldset>}

                    { comment_page_data.category &&
                    <fieldset className={comment_class}>
                        <label>Category</label>
                        <span className="text">
                            <FieldData
                                metadata={comment_metadata}
                                field_name='category'
                                data={comment_page_data}
                            />
                        </span>
                    </fieldset>}

                </div>

                <hr />

                <div className="markdown">
                    <FieldData
                        metadata={comment_metadata}
                        field_name='body'
                        data={comment_page_data}
                    />
                </div>

                <hr />

                <div className="comment row">

                    { comment_page_data.planned_start_date &&
                    <fieldset className={comment_class}>
                        <label>Planned Start</label>
                        <span className="text">
                            <FieldData
                                metadata={comment_metadata}
                                field_name='planned_start_date'
                                data={comment_page_data}
                            />
                        </span>
                    </fieldset>}

                    { comment_page_data.planned_finish_date &&
                    <fieldset className={comment_class}>
                        <label>Planned Finish</label>
                        <span className="text">
                            <FieldData
                                metadata={comment_metadata}
                                field_name='planned_finish_date'
                                data={comment_page_data}
                            />
                        </span>
                    </fieldset>}

                    { comment_page_data.real_start_date &&
                    <fieldset className={comment_class}>
                        <label>Actual Start</label>
                        <span className="text">
                            <FieldData
                                metadata={comment_metadata}
                                field_name='real_start_date'
                                data={comment_page_data}
                            />
                        </span>
                    </fieldset>}

                    { comment_page_data.real_finish_date &&
                    <fieldset className={comment_class}>
                        <label>Actual Finish</label>
                        <span className="text">
                            <FieldData
                                metadata={comment_metadata}
                                field_name='real_finish_date'
                                data={comment_page_data}
                            />
                        </span>
                    </fieldset>}

                    <fieldset className={comment_class}>
                        <label>Duration</label>
                        <span className="text">
                            {secondsToTime(comment_page_data['duration'])}
                        </span>
                    </fieldset>

                </div>

            </Section>
            }

            { (comment_page_data._urls?.threads || start_thread ) &&
            <div
                className="replies"
                style={{
                    border: "1px solid var(--contrasting-colour)",
                    borderRight: "none",
                    borderTop: "none,",
                    margin: ".8rem",
                    marginTop: "-.8rem",
                    paddingBottom: "1rem"
                }}
            >
                <h3 className="replies">
                    Replies
                    <IconLoader
                        name='navdown'
                        height = '20px'
                        width = '20px'
                    />
                </h3>
                { console.log(`Thread Start`) }
                <TicketComments
                    comment_metadata = {null}
                    comments_url = {
                        comment_page_data._urls?.threads ? 
                            comment_page_data._urls.threads
                        :
                            `${comment_page_data._urls._self.replace(`/${comment_page_data.comment_type}/${comment_page_data.id}`, `/comment/${comment_page_data.id}`)}/threads`
                    }
                    ticket_id = {ticket_id}
                    parent_comment = {comment_page_data.id}
                    new_comment_url = {new_comment_url}
                />
            </div>}
        </div>
    );
}

export default TicketComment;