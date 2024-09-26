import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import FieldData from "../functions/FieldData";

import TicketStatusIcon from "../components/icons/ticket/TicketStatusIcon";
import Badge from "../components/Badge";
import { ResponseException } from "../classes/Exceptions";
import TicketComment from "../components/page/ticket/Comment";



const Ticket = () => {

    const [comments, setComments] = useState([])

    const [comment_metadata, setCommentMetaData] = useState(null);

    const [metadata, setMetaData] = useState(null);

    const page_data = useLoaderData();

    const params = useParams();

    useEffect(() => {

        fetch('http://localhost:8003/api/' + params.module + '/' + params.model + '/' + params.model_id + '/option')

            .then(response => {

                if( ! response.ok ) {

                    throw new ResponseException(response)

                }

                return response.json()

            })

            .then(data => {

                setMetaData(data)

            })

            .catch( err => {

                throw Error(err)

            })

    }, [params])


    useEffect(() => {

        fetch('http://localhost:8003/api/' + params.module + '/' + params.model + '/2/comments')

            .then(response => {

                if( ! response.ok ) {

                    throw new ResponseException(response)

                }

                return response.json()

            })

            .then(data => {

                setComments(data.results)

            })

            .catch( err => {

                throw Error(err)

            })

    }, [params])


    useEffect(() => {

        fetch('http://localhost:8003/api/' + params.module + '/' + params.model + '/2/comments/option')

            .then(response => {

                if( ! response.ok ) {

                    throw new ResponseException(response)

                }

                return response.json()

            })

            .then(data => {

                setCommentMetaData(data)

            })


            .catch( err => {

                throw Error(err)

            })

    }, [params])

    return (
        metadata !== null && <div className="ticket">


            <div className="contents">

                <section className="description">
                    <h3 className="description">ticket data </h3>
                    <div className="markdown">
                        <FieldData
                            metadata={metadata}
                            field_name='description'
                            data={page_data}
                        />
                    </div>
                </section>

                <section className="related-tickets">
                    <h3 className="related-tickets">Related Tickets</h3>
                    <div>
                        gfh
                    </div>
                </section>

                <section className="linked-items">
                    <h3 className="linked-items">Linked Items</h3>
                    <div>
                        ticket description
                    </div>
                </section>

                <div className="comments">
                    <ul className="comments">
                        {(comments != null && comment_metadata != null) && comments.map((comment) => {

                            return (
                                <li>
                                    <TicketComment
                                        comment_data={comment}
                                        metadata={comment_metadata}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

            <div className="sidebar">

                <div className="metadata">
                    <div>

                        <h3 className="metadata">Ticket</h3>

                        <fieldset>
                            <label>Assigned</label>
                            <span class="text">.</span>
                        </fieldset>
                        <fieldset>
                            <label>Status</label>
                            <span class="text">
                                <Badge>
                                    <TicketStatusIcon metadata={metadata} page_data={page_data}/>
                                </Badge>
                            </span>
                        </fieldset>
                        <fieldset>
                            <label>Labels</label>
                            <span class="text">val</span>
                        </fieldset>

                        <fieldset>
                            <label>Category</label>
                            <span class="text">
                                <FieldData
                                    metadata={metadata}
                                    field_name='category'
                                    data={page_data}
                                />
                            </span>
                        </fieldset>

                        <fieldset>
                            <label>Project</label>
                            <span class="text">
                                <FieldData
                                    metadata={metadata}
                                    field_name='project'
                                    data={page_data}
                                />
                            </span>
                        </fieldset>

                        <fieldset>
                            <label>Milestone</label>
                            <span class="text">
                                <FieldData
                                    metadata={metadata}
                                    field_name='milestone'
                                    data={page_data}
                                />
                            </span>
                        </fieldset>

                        <fieldset>
                            <label>Priority</label>
                            <span class="text">U. / I. / P.</span>
                        </fieldset>

                        <fieldset>
                            <label>Duration</label>
                            <span class="text">.</span>
                        </fieldset>

                        <fieldset>
                            <label>Roadmap(s)</label>
                            <span class="text">val</span>
                        </fieldset>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Ticket;