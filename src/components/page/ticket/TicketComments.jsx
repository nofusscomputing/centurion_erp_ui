import { useEffect, useState } from "react";

import { apiFetch } from "../../../hooks/apiFetch";
import TicketCommentForm from "./TicketCommentForm";
import TicketComment from "./TicketComment";





const TicketComments = ({
    comment_metadata,
    ticket_id,
    comments_url
}) => {

    const [comments, setComments] = useState(null)
    const [ reload, setRelaod ] = useState(false)


    useEffect(() => {

        apiFetch(
            comments_url,
            (data) =>{

                setComments(data)

            },
            undefined,
            undefined,
            false
        )

    }, [reload, comments_url])


    return (
        (comments && comment_metadata) &&
        <div className="comments">
            <ul className="comments">
                {comments.results.map((comment) => {

                    return (
                        comment_metadata &&
                        <li>
                            <TicketComment
                                comment_data={comment}
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
                    <li>
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