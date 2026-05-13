import React, {
    useContext,
    useEffect,
    useId,
    useState
} from "react"

import {
    Form,
    useFetcher
} from "react-router"

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Divider,
    Dropdown,
    DropdownItem,
    DropdownList,
    Flex,
    FlexItem,
    MenuToggle,
    Title
} from "@patternfly/react-core"

import {
    AngleDownIcon,
    EllipsisVIcon
} from '@patternfly/react-icons';

import {apiFetch } from "../hooks/apiFetch"
import FieldData from "../functions/FieldData"
import { Fields } from "./DisplayFields"
import IconLoader from "./IconLoader"

import UserContext from "../hooks/UserContext"
import URLSanitize from "../functions/URLSanitize";



/**
 * 
 * @summary Props for Comments component.
 * 
 * @category Props
 * @since 0.1.0
 */
export type CommentsProps = {

    /**
     * URL to Fetch comments from.
     */
    comments_url: string
}



/** 
 * This component is self contained and is only dependant upon the comments
 * url.
 * 
 * Will make an initial HTTP/OPTIONS request to the comments URL to fetch the
 * base models metadata. Once obtained will make a HTTP/GET request to the
 * comments url fetching all comments. This request is paginated, and will loop
 * through and fetch every responses `links.next` url until its value is `null`.
 * 
 * Each comment will then be rendered via the Comment component.
 * 
 * @summary List of Comments
 * 
 * @category Component
 * @since 0.1.0
 */
export const Comments = ({
    comments_url,
}: CommentsProps): React.JSX.Element => {

    const fetcher = useFetcher();

    const [ metadata, setCommentMetadata ] = useState( null )

    const [comments, setComments] = useState({
        fetch_url: comments_url,
        comments: null
    });

    const [ reload, setRelaod ] = useState(false);

    const ticktCommentsId = useId();
    const ticktCommentsListId = useId();



    /**
     * ToDo: Add check to see if was an edit (HTTP/PATCH), if yes, from http
     * response update existing object with the same ID.
     * 
     * ToDo: If an error, display the errors near the field.
     * 
     * ToDo: once above two done, remove Comment component callbacks
     */
    useEffect(() => {

        if( Object.hasOwn(fetcher.data ?? {}, 'body') && Object.hasOwn(fetcher.data ?? {}, 'ok')) {

            console.debug('fetcher return', fetcher.data);

            setComments((prevState) => ({
                fetch_url: prevState.fetch_url,
                comments: {
                    ...prevState.comments,
                    [fetcher.data.body.id]: fetcher.data.body
                }
            }));

        }

    }, [
        fetcher.data
    ]);



    useEffect(() => {

        if( reload || comments.comments === null && metadata ) {

            let url = comments.fetch_url

            // eslint-disable-next-line
            async function do_fetch() {

                do {

                    await apiFetch(
                        url,
                        null,
                        "GET",
                        undefined,
                        false
                    )
                        .then((response) => {

                            response.api_page_data.results.map(( comment ) => {
            
                                setComments((prevState) => ({
                                    fetch_url: response.api_page_data.links.next ? response.api_page_data.links.next : prevState.fetch_url,
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

            setRelaod(false)
        }

    }, [
        comments_url,
        metadata,
        reload,
    ])

    useEffect(() => {

        if( ! metadata ) {

            // eslint-disable-next-line
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

    }, [])


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
                {comments.comments &&
                Object.keys(comments.comments).map(key => {

                        const need_metadata = () => {
                    
                            let needs_metadata = true

                            let url = URLSanitize(comments.comments[key]['_urls']['_self']).endsWith(`/${comments.comments[key].id}`) ?
                                    URLSanitize(comments.comments[key]['_urls']['_self']).replace(`/${comments.comments[key].id}`, '') 
                                :
                                    URLSanitize(comments.comments[key]['_urls']['_self']);
                
                            if( url === URLSanitize(metadata.urls.self) ) {
                                needs_metadata = false
                
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
                                FormComponent = {fetcher.Form}
                                objectData = {comments.comments[key]}
                                objectMetadata = {need_metadata() ? null : metadata}
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
                            FormComponent = {fetcher.Form}
                            isCreate = {true}
                            objectMetadata={metadata}
                        />
                    </li>
                }
            </ul>
        </div>
        </Flex>
    );
}



/**
 * @summary Props for Comment component.
 * 
 * @category Props
 * @since 0.8.0
 */
export type CommentProps = {

    /**
     * The form component to use.
     */
    FormComponent: typeof Form,

    /**
     * Is this a comment to be created. Converts the comment output to be a
     * form.
     */
    isCreate?: boolean,

    /**
     * Data from the API. This object is not required when `isCreate = true`
     */
    objectData?: APIDataObject,

    /**
     * Metadata from the API.
     */
    objectMetadata: APIMetadata,

}


/** A Comment
 * 
 * Display a comment (or the like) from a single person.
 * 
 * This component is self contained and is only dependant upon the objectData
 * or isCreate.
 * 
 * When no objectMetadata is supplied, will make an initial HTTP/OPTIONS
 * request to fetch the comments metadata. The comment will then be rendered.
 * 
 * Supplying `isCreate = True` will render the comment as a form so that it can
 * be used to create a comment. If the model in question has many different
 * sub-models, supplying the base metadata via the `objectMetadata` param is
 * required so that they can be added as a comment type to create.
 * 
 * @category Component
 * @since 0.1.0
 */
export const Comment = ({

    FormComponent = Form,
    isCreate = false,
    objectData,
    objectMetadata = null,
}: CommentProps): React.JSX.Element => {

    const [ commentMetadata, setCommentMetadata ] = useState( objectMetadata )

    const [ comment_page_data, setCommentPageData ] = useState( objectData )

    const [ commentType, setCommentType ] = useState(null)

    const [ formState, setFormState ] = useState({});

    const [ objectURL, setObjectURL ] = useState(comment_page_data?._urls?._self ? URLSanitize(comment_page_data._urls._self) : null);


    const [ subModels, setSubModels ] = useState(() => [
        ...( objectMetadata?.urls?.sub_models ?
            Object.entries(objectMetadata?.urls?.sub_models).map(([key, data]) => {

                return { name: data.display_name, url: data.url};
            })
            :
            []
        ),
        {
            name: "Comment",
            url: objectMetadata?.urls?.self
        }
    ]);


    const user = useContext(UserContext);

    const [ start_thread, setStartThread ] = useState( false )

    let comment_header = ' wrote'

    let comment_class = 'comment comment-type-default'

    const [ isEdit, setIsEditing ] = useState(false)

    const comment_updated = false

    useEffect(() => {

        if( commentMetadata ) {

            const comment_type = commentMetadata.name

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
        commentMetadata
    ]);


    const comment_header_text_updated = (<span className="sub-script">Updated </span>)

    const comment_header_text = (
        <>
        {commentMetadata && comment_page_data && !isCreate && !isEdit &&
        <div className="text">
            <FieldData
                metadata={commentMetadata}
                field_name='user'
                data={comment_page_data}
            />
            <span className="sub-script">{comment_header} on </span>
            <FieldData
                metadata={commentMetadata}
                field_name='created'
                data={comment_page_data}
            />
            {comment_updated && <span>{comment_header_text_updated}
                <FieldData
                    metadata={commentMetadata}
                    field_name='modified'
                    data={comment_page_data}
                />
            </span>}

        </div>}
        { (isCreate || isEdit) && commentMetadata &&
            <CardTitle>
                {isCreate && "Add"}
                {isEdit && "Edit"}
                &nbsp;{commentMetadata.name}
            </CardTitle>
        }
        </>
    )



    useEffect(() => {

        if( ! commentMetadata && objectURL ) {

            async function do_fetch() {

                let url = objectURL

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

    }, [
        commentMetadata,
    ])


    const [isOpen, setIsOpen] = useState(false);


    const onSelect = () => {
        setIsOpen(!isOpen);
    };


    if( commentType === 'action' ) {

        return(
            commentMetadata && comment_page_data && commentType &&
            <div id={'comment-' + comment_page_data['id']} key={'comment-' + comment_page_data['id']}>
                <span style={{display: 'inline-block'}}>
                    <FieldData
                        metadata={commentMetadata}
                        field_name='user'
                        data={comment_page_data}
                    />
                </span>&nbsp;
                <span className="markdown" style={{display: 'inline-block'}}>
                    <FieldData
                        metadata={commentMetadata}
                        field_name='body'
                        data={comment_page_data}
                    />
                </span>&nbsp;
                <span className="sub-script" style={{color: '#777', display: 'inline-block'}}>
                    <FieldData
                        metadata={commentMetadata}
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
            <Button
                aria-label = "reply to comment"
                icon = {
                    <IconLoader
                        name={'reply'}
                        size = "lg"
                    />
                }
                onClick={() => setStartThread( (start_thread ? false : true) ) }
                variant="plain"
            />
            }
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


    const dropdownItems = (
        <>
            { isCreate && objectMetadata?.urls?.sub_models &&
                <>
                {subModels.map(({name, url}) => {

                    return (
                        <DropdownItem
                            key={name}
                            onClick={() => {

                                setObjectURL(url)
                                setCommentMetadata(null)
                            }}
                        >
                            Create {name}
                        </DropdownItem>
                    );
                })}
                
                <DropdownItem
                    key = "clear-form"
                    onClick={() => {

                        setFormState({})
                    }}
                >
                    Reset Fields
                </DropdownItem>
                </>
            }
            {!isCreate &&
            <>
            { ! isEdit && <DropdownItem
                key="Edit"
                onClick={(e) => {
                    setIsEditing( true )
                }}
            >
                Edit
            </DropdownItem>}
            <DropdownItem key="copy-link" >
                Copy Link
            </DropdownItem>
            </>}
        </>
    );

    const headerActions = (
        <>
            {! isCreate && ! isEdit && header_icons}
            <Dropdown
                onSelect={onSelect}
                toggle={
                    toggleRef => (
                        <MenuToggle
                            ref={toggleRef}
                            isExpanded={isOpen}
                            onClick={() => setIsOpen(!isOpen)}
                            variant="plain"
                            aria-label="Card title inline with images and actions example kebab toggle"
                            icon={<EllipsisVIcon />}
                        />
                    )
                }
                isOpen={isOpen}
                onOpenChange={isOpen => setIsOpen(isOpen)}
            >
                <DropdownList>
                    {dropdownItems}
                </DropdownList>
            </Dropdown>
        </>
    );


    const CommentCard = (
        <>
        {(commentMetadata && comment_page_data) &&
        <Card
            isCompact
        >
            
            <CardHeader
                actions={{ actions: headerActions, hasNoOffset: true}}
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
                                (( (isCreate || isEdit) && commentMetadata.fields.source) || ( !isEdit && comment_page_data.source)) && 'source',
                                (( (isCreate || isEdit) && commentMetadata.fields.status) || ( !isEdit && comment_page_data.status)) && 'status',
                                (( (isCreate || isEdit) && commentMetadata.fields.assignee) || ( !isEdit && comment_page_data.assignee)) && 'assignee',
                                (( (isCreate || isEdit) && commentMetadata.fields.category) || (!isEdit && comment_page_data.category)) && 'category'
                            ].filter(Boolean)}
                            formState={formState}
                            isCreate={isCreate}
                            isEdit={isEdit}
                            isFlex = {true}
                            objectData={comment_page_data}
                            objectMetadata={commentMetadata}
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
                            objectMetadata={commentMetadata}
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
                                (( (isCreate || isEdit) && commentMetadata.fields.planned_start_date) || ( !isEdit && comment_page_data.planned_start_date)) && 'planned_start_date',
                                (( (isCreate || isEdit) && commentMetadata.fields.planned_finish_date) || ( !isEdit && comment_page_data.planned_finish_date)) && 'planned_finish_date',
                                (( (isCreate || isEdit) && commentMetadata.fields.real_start_date) || ( !isEdit && comment_page_data.real_start_date)) && 'real_start_date',
                                (( (isCreate || isEdit) && commentMetadata.fields.real_finish_date) || ( !isEdit && comment_page_data.real_finish_date)) && 'real_finish_date',
                                // secondsToTime(comment_page_data['duration'])
                                ( !isEdit && comment_page_data.duration) && 'duration',
                                ( !isEdit && comment_page_data.estimation) && 'estimation'
                            ].filter(Boolean)}
                            formState={formState}
                            isCreate={isCreate}
                            isEdit={isEdit}
                            isFlex = {true}
                            objectData={comment_page_data}
                            objectMetadata={commentMetadata}
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
                comments_url = {start_thread ? `${URLSanitize(comment_page_data._urls._self)}/threads` : comment_page_data._urls.threads}
            />
        </div>
        }
        </>
    );


    return (
        (commentMetadata && comment_page_data && commentType) &&
        <>
        <Flex
            direction={{ default: 'column' }}
        >
            <FlexItem>
                {( isCreate || isEdit ) &&
                    <FormComponent
                        action={isCreate ? URLSanitize(commentMetadata['urls']['self']) : URLSanitize(comment_page_data['_urls']['_self']) }
                        className = "pf-v6-c-form pf-m-vertical"
                        method={isCreate ? "POST" : "PATCH"}
                        navigate={false}
                        onSubmit={() => {
                                setFormState({})
                        }}
                    >
                        {CommentCard}

                        <input id="formState" type="hidden" name="formState" value={JSON.stringify(formState)} />
                        <input id="metadata" type="hidden" name="metadata" value={JSON.stringify(commentMetadata)} />
                        <input id="tz" type="hidden" name="tz" value={user.settings.timezone} />

                    </FormComponent>
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

