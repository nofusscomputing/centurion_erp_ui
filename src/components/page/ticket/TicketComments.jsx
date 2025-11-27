import { useEffect, useId, useState } from "react";

import { apiFetch } from "../../../hooks/apiFetch";
import TicketComment from "./TicketComment";
import TicketCommentForm from "./TicketCommentForm";
import { MARKDOWN_TAG_MODEL_LINK_UNESCAPE_RE } from "../../../functions/markdown_plugins/ModelLink";
import { MARKDOWN_TICKET_LINK_UNESCAPE_RE } from "../../../functions/markdown_plugins/TicketLink";





const TicketComments = ({
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

            apiFetch(
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
        }

    }, [
        comments_url,
    ])


    return (
        (comments && metadata) &&
        <div
            className="comments"
            id={ticktCommentsId}
            key={"div-ticket-comments"}
            style={{
                marginLeft: '.8rem',
                paddingLeft: '1.6rem'
            }}
        >

            <ul
                id={ticktCommentsListId}
                className="comments"
                style={{
                    paddingLeft: '0'
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
                        >
                            <TicketComment
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
                    >
                        <TicketCommentForm
                            metadata={metadata}
                            post_url = {new_comment_url}
                            parent_id={parent_comment}
                            ticket_id={ticket_id}
                            commentCallback={() => {
                                setRelaod(reload ? false : true )
                            }}
                        />
                    </li>
                }
            </ul>
        </div>
    );
}

export default TicketComments;