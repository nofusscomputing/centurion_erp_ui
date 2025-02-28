import { useEffect, useId, useState } from "react";

import { apiFetch } from "../../../hooks/apiFetch";
import TicketComment from "./TicketComment";
import TicketCommentForm from "./TicketCommentForm";





const TicketComments = ({
    comment_metadata,
    ticket_id,
    comments_url
}) => {

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


    }, [reload, comments_url])


    return (
        (comments && comment_metadata) &&
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

                    return (
                        comment_metadata &&
                        <li
                            className="comments"
                            key={'ticket-comment-' + comments.comments[key].id}
                        >
                            <TicketComment
                                comment_data={comments.comments[key]}
                                post_url = {comments_url}
                                metadata={comment_metadata}
                                ticket_id={ticket_id}
                                edit_callback = {setRelaod}
                                callback_value = {reload}
                            />
                        </li>
                    )
                })}
                {comment_metadata &&
                    <li
                        key={'ticket-comment-reply-form'}
                    >
                        <TicketCommentForm
                            metadata={comment_metadata}
                            post_url = {comments_url}
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