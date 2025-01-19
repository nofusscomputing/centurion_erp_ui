import IconLoader from "../../IconLoader"
import FieldData from "../../../functions/FieldData"
import { useEffect, useState } from "react"
import { apiFetch } from "../../../hooks/apiFetch"
import TicketCommentForm from "./TicketCommentForm"
import { secondsToTime } from "../../../layout/Ticket"



const TicketComment = ({
    discussion = false,
    comment_data = {},
    metadata = null,
    ticket_id = null,
    post_url,
    edit_callback = null,
    callback_value = null
}) => {

    if( String(post_url).includes('?') ) {

        post_url = String(post_url).split('?')[0]
    }

    let comment_header = ' wrote'

    let comment_class = 'comment comment-type-default'

    let comment_type = ''

    let [ editing, setIsEditing ] = useState(false)

    try {

        comment_type = String(metadata.fields.comment_type.choices[Number(comment_data.comment_type)-1].display_name).toLowerCase()

    }catch( e ) {

        console.log('error: ' + comment_data.id )

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

    const comment_header_text_updated = (<span class="sub-script">Updated </span>)

    const comment_header_text = (
        metadata && comment_data &&
        <div id="text">
            <FieldData
                metadata={metadata}
                field_name='user'
                data={comment_data}
            />
            <span class="sub-script">{comment_header} on </span>
            <FieldData
                metadata={metadata}
                field_name='created'
                data={comment_data}
            />
            {comment_updated && <span>{comment_header_text_updated}
                <FieldData
                    metadata={metadata}
                    field_name='modified'
                    data={comment_data}
                />
            </span>}
        </div>
    )

    const [threads_url, setThreadsURL] = useState(comment_data._urls.threads ? String(comment_data._urls.threads).split('api/v2')[1] : null)


    const [ threads, setThreads ] = useState(null)
    const [ reload, setRelaod ] = useState(false)

    useEffect(() => {

        if( threads_url ) {
            apiFetch(
                threads_url + '?page[size]=500',
                (data) => {
                    setThreads(data)
                },
                undefined,
                undefined,
                false
            )

            setRelaod(false)
        }
    },[ reload, threads_url ])


    if( comment_type === 'action' ) {

        return(
            <div key={'comment-' + comment_data['id']}>
                <span style={{display: 'inline-block'}}>
                    <FieldData
                        metadata={metadata}
                        field_name='user'
                        data={comment_data}
                    />
                </span>&nbsp;
                <span className="markdown" style={{display: 'inline-block'}}>
                    <FieldData
                        metadata={metadata}
                        field_name='body'
                        data={comment_data}
                    />
                </span>&nbsp;
                <span className="sub-script" style={{color: '#777', display: 'inline-block'}}>
                    <FieldData
                        metadata={metadata}
                        field_name='created'
                        data={comment_data}
                    />
                </span>
            </div>
        )
    }

    const header_icons = (
        <div id="icons">
            {comment_data['parent'] == null &&
             <span style={{
                cursor: 'pointer'
                }} onClick={(e) => {
                    setThreads( {
                        results: []
                    } )
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

    if( is_discussion ) {

        discussion_class = ' discussion'
    }

    return (
        metadata &&
        <div className={discussion_class}>
            { editing &&
            <TicketCommentForm
                comment_data={comment_data}
                metadata={metadata}
                post_url = {post_url}
                ticket_id={ticket_id}
                is_edit = {true}
                cancelbuttonOnSubmit={(e) => {
                    setIsEditing(false)
                }}
                commentCallback={() => {
                    setIsEditing(false)
                    edit_callback( callback_value ? false : true )
                }}
            />
            }
            { ! editing &&
            <div className={comment_class}>

                <h4 className={comment_class}>
                    {comment_header_text}{header_icons}
                </h4>

                <div style={{lineHeight: '30px'}}>
                    { comment_data.source && <fieldset className={comment_class}>
                        <label>Source</label>
                        <span>
                            <FieldData
                                metadata={metadata}
                                field_name='source'
                                data={comment_data}
                            />
                        </span>
                    </fieldset>}
                    {comment_data.status &&<fieldset className={comment_class}>
                        <label>Status</label>
                        <span>
                            <FieldData
                                metadata={metadata}
                                field_name='status'
                                data={comment_data}
                            />
                        </span>
                    </fieldset>}
                    {comment_data.responsible_user && <fieldset className={comment_class}>
                        <label>Responsible User</label>
                        <span>
                            <FieldData
                                metadata={metadata}
                                field_name='responsible_user'
                                data={comment_data}
                            />
                        </span>
                    </fieldset>}
                    {comment_data.responsible_team && <fieldset className={comment_class}>
                        <label>
                            Responsible Team
                        </label>
                        <span>
                            <FieldData
                                metadata={metadata}
                                field_name='responsible_team'
                                data={comment_data}
                            />
                        </span>
                    </fieldset>}
                    { comment_data.category && <fieldset className={comment_class}>
                        <label>Category</label>
                        <span>
                            <FieldData
                                metadata={metadata}
                                field_name='category'
                                data={comment_data}
                            />
                        </span>
                    </fieldset>}
                </div>

                <hr />

                <div className="markdown">
                    <FieldData
                        metadata={metadata}
                        field_name='body'
                        data={comment_data}
                    />
                </div>

                <hr />

                <div>

                    { comment_data.planned_start_date && <fieldset className={comment_class}>
                        <label>Planned Start</label>
                        <span>
                            <FieldData
                                metadata={metadata}
                                field_name='planned_start_date'
                                data={comment_data}
                            />
                        </span>
                    </fieldset>}

                    { comment_data.planned_finish_date && <fieldset className={comment_class}>
                        <label>Planned Finish</label>
                        <span>
                            <FieldData
                                metadata={metadata}
                                field_name='planned_finish_date'
                                data={comment_data}
                            />
                        </span>
                    </fieldset>}

                    { comment_data.real_start_date && <fieldset className={comment_class}>
                        <label>Actual Start</label>
                        <span>
                            <FieldData
                                metadata={metadata}
                                field_name='real_start_date'
                                data={comment_data}
                            />
                        </span>
                    </fieldset>}

                    { comment_data.real_finish_date && <fieldset className={comment_class}>
                        <label>Actual Finish</label>
                        <span>
                            <FieldData
                                metadata={metadata}
                                field_name='real_finish_date'
                                data={comment_data}
                            />
                        </span>
                    </fieldset>}

                    <fieldset className={comment_class}>
                        <label>Duration</label>
                        <span>
                            {secondsToTime(comment_data['duration'])}
                        </span>
                    </fieldset>
                </div>
            </div>
            }
            { threads &&
            <div className="replies">
                <h3 className="replies">
                    Replies
                    <IconLoader
                        name='navdown'
                        height = '20px'
                        width = '20px'
                    />
                </h3>
                <ul className="replies">
                    { threads.results &&
                    threads.results.map((comment, index) => (
                        <li className="replies">
                            <TicketComment
                                comment_data={comment}
                                discussion = {true}
                                metadata = {metadata}
                                edit_callback = {() => {
                                    setRelaod(true)
                                }}
                            />
                        </li>
                    ))}
                    <li className="replies">
                        <TicketCommentForm
                            metadata={metadata}
                            post_url = {post_url + '/' + comment_data['id'] + '/threads'}
                            ticket_id={ticket_id}
                            parent_id = {comment_data['id'] ? comment_data['id'] : threads.results[0].parent}
                            commentCallback={() => {
                                setRelaod(true)

                                setThreadsURL(post_url + '/' + comment_data['id'] + '/threads')
                            }}
                        />
                    </li>
                </ul>
            </div>}
        </div>
    );
}

export default TicketComment;