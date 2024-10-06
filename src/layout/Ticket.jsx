import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import FieldData from "../functions/FieldData";

import TicketStatusIcon from "../components/icons/ticket/TicketStatusIcon";
import Badge from "../components/Badge";
import { ResponseException } from "../classes/Exceptions";
import TicketComment from "../components/page/ticket/Comment";
import { apiFetch } from "../hooks/apiFetch";



const Ticket = () => {

    const [comments, setComments] = useState([])

    const [comment_metadata, setCommentMetaData] = useState(null);

    const [metadata, setMetaData] = useState(null);

    const page_data = useLoaderData();

    const params = useParams();

    useEffect(() => {

        apiFetch(
            params.module + '/ticket/' + params.model + '/' + params.pk,
            (data) =>{

                setMetaData(data)

            },
            'OPTIONS'
        )

    }, [params])


    useEffect(() => {

        apiFetch(
            params.module + '/ticket/' + params.model + '/' + params.pk + '/comments',
            (data) =>{

                setComments(data)

            },
        )

    }, [params])


    useEffect(() => {


        apiFetch(
            params.module + '/ticket/' + params.model + '/' + params.pk + '/comments',
            (data) =>{

                setCommentMetaData(data)

            },
            'OPTIONS'
        )

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
                        {(comments != null && comment_metadata != null) && comments.results.map((comment) => {

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
                            <span class="text">
                            <FieldData
                                metadata={metadata}
                                field_name='assigned_users'
                                data={page_data}
                            />
                            </span>
                        </fieldset>
                        <fieldset>
                            <label>Status</label>
                            <span class="text">
                            <FieldData
                                metadata={metadata}
                                field_name='status_badge'
                                data={page_data}
                            />
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