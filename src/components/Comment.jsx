import {
    useContext,
    useEffect,
    useId,
    useState
} from "react"

import { Form } from "react-router"

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Flex,
    FlexItem,
    Title
} from "@patternfly/react-core"

import {
    AngleDownIcon
} from '@patternfly/react-icons';

import {apiFetch } from "../hooks/apiFetch"
import FieldData from "../functions/FieldData"
import { Fields } from "./DisplayFields"
import IconLoader from "./IconLoader"
import { MARKDOWN_TAG_MODEL_LINK_UNESCAPE_RE } from "../functions/markdown_plugins/ModelLink";
import { MARKDOWN_TICKET_LINK_UNESCAPE_RE } from "../functions/markdown_plugins/TicketLink";

import UserContext from "../hooks/UserContext"



/** List of Comments
 * 
 * @param param
 * 
 * @param {object} param.comment_metadata Comments Metadata from API.
 * @param {number} param.ticket_id ID of the ticket the comments belong to.
 * @param {string} param.comments_url URL to fetch the comments from
 * @param {string} param.new_comment_url URL to use to create new comments.
 * @param {number} param.parent_comment ID of the parent comment these comments belong to.
 * 
 * @returns 
 */
export const Comments = ({
    comment_metadata,
    ticket_id,
    comments_url,
    new_comment_url = null,
    parent_comment = null,
}) => {

    const [ metadata, setCommentMetadata ] = useState( comment_metadata )

    const [comments, setComments] = useState({
        fetch_url: comments_url,
        comments: {}
    });

    const [ reload, setRelaod ] = useState(false);

    const ticktCommentsId = useId();
    const ticktCommentsListId = useId();


    useEffect(() => {

        let url = comments.fetch_url

        async function do_fetch() {

            do {

                await apiFetch(
                    url,
                    null,
                    undefined,
                    undefined,
                    false
                )
                    .then((response) => {
        
                        response.api_page_data.results.map(( comment ) => {
        
                            setComments((prevState) => ({
                                fetch_url: response.api_page_data.links.last,
                                comments: {
                                    ...prevState.comments,
                                    [comment.id]: comment
                                }
                            }))
        
                        })
        
                        url = response.api_page_data.links.next
        
                    })

            } while( url );

        }

        do_fetch();


    }, [
        comments_url,
        reload,
    ])

    useEffect(() => {

        if( ! metadata ) {

            async function do_fetch() {

                await apiFetch(
                    comments_url,
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
            };

            do_fetch();

        }

    }, [
        comments_url,
    ])


    return (
        (comments && metadata) &&
        <Flex
            direction={{ default: 'column' }}
        >
        <div
            id={ticktCommentsId}
            key={"div-ticket-comments"}
            style={{
                marginTop: 'var(--pf-t--global--spacer--lg)',
                marginLeft: 'var(--pf-t--global--spacer--lg)',
            }}
        >
            <ul
                id={ticktCommentsListId}
                style={{
                    listStyle: "disc"
                }}
            >
                {Object.keys(comments.comments).map(key => {

                        const need_metadata = () => {
                    
                            let needs_metadata = true

                            let url = String(comments.comments[key]['_urls']['_self']).endsWith(`/${comments.comments[key].id}`) ?
                                    String(comments.comments[key]['_urls']['_self']).replace(`/${comments.comments[key].id}`, '') 
                                :
                                    comments.comments[key]['_urls']['_self'];
                
                            if( url === metadata.urls.self ) {
                                needs_metadata = false
                
                            }
                    
                            const markdown_tags = [
                                MARKDOWN_TAG_MODEL_LINK_UNESCAPE_RE,
                                MARKDOWN_TICKET_LINK_UNESCAPE_RE,
                            ]
                    
                            let fields = []
                            let re
                            for( let markdown_tag of markdown_tags ) {
                    
                                re = new RegExp(markdown_tag);
                    
                                fields = [ ...fields, ...String(comments.comments[key].body).matchAll(re) ]
                    
                            }
                    
                            if( fields.length > 0) {
                    
                                needs_metadata = true
                    
                            }
                    
                            return needs_metadata
                    
                        }
                    
                    return (
                        comments.comments[key] &&
                        <li
                            className="comments"
                            key={'ticket-comment-' + comments.comments[key].id}
                            style={{
                                paddingBottom: 'var(--pf-t--global--spacer--lg)',
                                paddingLeft: 'var(--pf-t--global--spacer--lg)'
                            }}
                        >
                            <Comment
                                comment_data={comments.comments[key]}
                                post_url = {comments.comments[key]['_urls']['_self']}
                                metadata={need_metadata() ? null : metadata}
                                ticket_id={ticket_id}
                                edit_callback = {setRelaod}
                                callback_value = {reload}
                                comments_url = {comments_url}
                                parent_comment = {parent_comment}
                                new_comment_url = {new_comment_url}
                            />
                        </li>
                    )
                })}
                {metadata &&
                    <li
                        key={'ticket-comment-reply-form'}
                        style={{
                            paddingLeft: 'var(--pf-t--global--spacer--lg)'
                        }}
                    >
                        <Comment
                            post_url = {new_comment_url}
                            metadata={metadata}
                            ticket_id={ticket_id}
                            isCreate = {true}
                            parent_comment = {parent_comment}
                        />
                    </li>
                }
            </ul>
        </div>
        </Flex>
    );
}



/** A Comment
 * 
 * This component is intended to display a comment (or the like) from a single person.
 * 
 * @param param
 * 
 * @param {boolean} param.isCreate Displays the form fields to add a comment.
 * @param {object} param.comment_data Comment data from api.
 * @param {object} param.metadata Comment Metadata from api.
 * @param {number} param.ticket_id The id for the ticket the comment belongs to.
 * @param {string} param.post_url The URL any http request is to happen against.
 * @param {function} param.edit_callback ...
 * @param {unknown} param.callback_value ...
 * @param {unknown} param.parent_comment ...
 * @param {string} param.new_comment_url ....
 * 
 * @returns 
 */
export const Comment = ({

    isCreate = false,

    // todo: check if args required
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

    const [ commentType, setCommentType ] = useState(null)

    const [ formState, setFormState ] = useState({});

    const user = useContext(UserContext);

    const [ start_thread, setStartThread ] = useState( false )

    let comment_header = ' wrote'

    let comment_class = 'comment comment-type-default'

    const [ isEdit, setIsEditing ] = useState(false)

    const comment_updated = false

    useEffect(() => {

        if( comment_metadata ) {

            const comment_type = comment_metadata.name

            if( comment_type.toLowerCase().includes('action') ) {

                comment_class += ' comment-type-action'

                setCommentType('action')

            }else if( comment_type.toLowerCase().includes('notification') ) {

                comment_class += ' comment-type-notification'

                setCommentType('notification')

            }else if( comment_type.toLowerCase().includes('task') ) {

                comment_class += ' comment-type-task'

                comment_header = ' created a task'

                setCommentType('task')

            } else if( comment_type.toLowerCase().includes('solution') ) {

                comment_class += ' comment-type-solution'

                comment_header = ' solved'

                setCommentType('solution')

            } else {

                setCommentType('comment')

            }

        }

    }, [
        comment_metadata
    ]);


    const comment_header_text_updated = (<span className="sub-script">Updated </span>)

    const comment_header_text = (
        comment_metadata && comment_page_data && !isCreate && !isEdit &&
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

                let url = String(comment_page_data._urls._self)

                let url_tail = `/${comment_page_data['id']}`

                if( url.endsWith( url_tail ) ) {    // Remove the object id from end of URL

                    url = url.substr(0, url.length - url_tail.length)
                }



                await apiFetch(
                    url,
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



    if( commentType === 'action' ) {

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

                    setStartThread( (start_thread ? false : true) )

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



    const CommentCard = (
        <>
        {(comment_metadata && comment_page_data) &&
        <Card
            isCompact
        >
            
            <CardHeader
                actions={{ actions: ! isCreate && ! isEdit && header_icons, hasNoOffset: true}}
            >
                {comment_header_text}
            </CardHeader>

            <CardBody>

                <Flex
                    direction={{ default: 'column' }}
                >
                    <Flex
                        direction={{ default: 'row' }}
                    >
                        <Fields
                            // errorState={actionData}
                            fields={[
                                (( (isCreate || isEdit) && comment_metadata.fields.source) || ( !isEdit && comment_page_data.source)) && 'source',
                                (( (isCreate || isEdit) && comment_metadata.fields.status) || ( !isEdit && comment_page_data.status)) && 'status',
                                (( (isCreate || isEdit) && comment_metadata.fields.assignee) || ( !isEdit && comment_page_data.assignee)) && 'assignee',
                                (( (isCreate || isEdit) && comment_metadata.fields.category) || (!isEdit && comment_page_data.category)) && 'category'
                            ].filter(Boolean)}
                            formState={formState}
                            isCreate={isCreate}
                            isEdit={isEdit}
                            isFlex = {true}
                            objectData={comment_page_data}
                            objectMetadata={comment_metadata}
                            onChange={setFormState}
                        />
        
                    </Flex>
                    <Flex
                        direction={{ default: 'column' }}
                    >
                        <Divider />

                        <Fields
                            // errorState={actionData}
                            fields={[
                                'body'
                            ]}
                            formState={formState}
                            isCreate={isCreate}
                            isEdit={isEdit}
                            isFlex = {true}
                            objectData={comment_page_data}
                            objectMetadata={comment_metadata}
                            onChange={setFormState}
                        />

                        <Divider />
                    </Flex>
                    <Flex
                        direction={{ default: 'row' }}
                    >

                        <Fields
                            // errorState={actionData}
                            fields={[
                                (( (isCreate || isEdit) && comment_metadata.fields.planned_start_date) || ( !isEdit && comment_page_data.planned_start_date)) && 'planned_start_date',
                                (( (isCreate || isEdit) && comment_metadata.fields.planned_finish_date) || ( !isEdit && comment_page_data.planned_finish_date)) && 'planned_finish_date',
                                (( (isCreate || isEdit) && comment_metadata.fields.real_start_date) || ( !isEdit && comment_page_data.real_start_date)) && 'real_start_date',
                                (( (isCreate || isEdit) && comment_metadata.fields.real_finish_date) || ( !isEdit && comment_page_data.real_finish_date)) && 'real_finish_date',
                                // secondsToTime(comment_page_data['duration'])
                                ( !isEdit && comment_page_data.duration) && 'duration',
                                ( !isEdit && comment_page_data.estimation) && 'estimation'
                            ].filter(Boolean)}
                            formState={formState}
                            isCreate={isCreate}
                            isEdit={isEdit}
                            isFlex = {true}
                            objectData={comment_page_data}
                            objectMetadata={comment_metadata}
                            onChange={setFormState}
                        />

                    </Flex>
                </Flex>
            </CardBody>
            <CardFooter>
                { (isCreate || isEdit) &&
                <>
                { isEdit &&
                <Button
                    variant="secondary"
                    onClick={(response) => {

                        setIsEditing(false);

                    }}
                >
                    Cancel
                </Button>
                }
                <Button
                    type="submit"
                    variant="primary"
                >
                    Save
                </Button>
                </>
                }
            </CardFooter>
        </Card>
        }
        </>
    );


    const CommentThreads = (
        <>
        { (comment_page_data._urls?.threads || start_thread ) &&
        <div
            style={{
                borderBottom: "1px solid var(--pf-t--global--border--color--100)",
                borderLeft: "1px solid var(--pf-t--global--border--color--100)",
                margin: "0",
                marginBottom: "var(--pf-t--global--spacer--lg)",
                marginTop: "calc( var(--pf-t--global--spacer--sm) * -1)",
                paddingBottom: "var(--pf-t--global--spacer--lg)",
                paddingLeft: "var(--pf-t--global--spacer--md)"
            }}
        >
            <Title
                headingLevel="h3"
            >
                Replies
                <AngleDownIcon />
            </Title>

            <Comments
                comment_metadata = {null}
                comments_url = {comment_page_data._urls.threads}
                ticket_id = {ticket_id}
                parent_comment = {comment_page_data.id}
                new_comment_url = {new_comment_url}
            />
        </div>
        }
        </>
    );


    return (
        (comment_metadata && comment_page_data && commentType) &&
        <>
        <Flex
            direction={{ default: 'column' }}
        >
            <FlexItem>
                {( isCreate || isEdit ) &&
                    <Form
                        action={isCreate ? comment_metadata['urls']['self'].split('api/v2')[1] : comment_page_data['_urls']['_self'].split('api/v2')[1] }
                        className = "pf-v6-c-form pf-m-vertical"
                        method={isCreate ? "POST" : "PATCH"}
                    >
                        {CommentCard}

                        <input id="formState" type="hidden" name="formState" value={JSON.stringify(formState)} />
                        <input id="metadata" type="hidden" name="metadata" value={JSON.stringify(comment_metadata)} />
                        <input id="tz" type="hidden" name="tz" value={user.settings.timezone} />

                    </Form>
                }
                {!( isCreate || isEdit ) &&

                    CommentCard

                }
            </FlexItem>
            
            <FlexItem>
                {CommentThreads}
            </FlexItem>
        </Flex>
        </>
    );
}

