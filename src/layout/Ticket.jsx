import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import FieldData from "../functions/FieldData";

import TicketComments from "../components/page/ticket/Comments";
import { apiFetch } from "../hooks/apiFetch";
import TicketCommentForm from "../components/page/ticket/Comment";


const Ticket = ({
    setContentHeading = null
}) => {

    const [comments, setComments] = useState(null)
    const [ reload, setRelaod ] = useState(false)

    const [comment_metadata, setCommentMetaData] = useState(null);

    const [metadata, setMetaData] = useState(null);

    const page_data = useLoaderData();

    const params = useParams();

    const [ ticket_type, SetTicketType ] = useState(null)

    setContentHeading(page_data['title'])

    useEffect(() => {

        apiFetch(
            params.module + '/ticket/' + params.model + '/' + params.pk,
            (data) =>{

                setMetaData(data)

                for(let ticket_type_entry of data.actions['PUT']['ticket_type'].choices ) {

                    if( Number(ticket_type_entry.value) === Number(page_data['ticket_type']) ) {

                        ticket_type_entry = String(ticket_type_entry.display_name).toLowerCase()
                        ticket_type_entry = ticket_type_entry.replace(' ', '-')

                        SetTicketType(ticket_type_entry)

                    }

                }
            },
            'OPTIONS'
        )

    }, [params])


    useEffect(() => {

        apiFetch(
            params.module + '/ticket/' + params.model + '/' + params.pk + '/comments?page[size]=500',
            (data) =>{

                setComments(data)

            },
        )

    }, [params, reload])


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
                    <h3 className={"description ticket-type-" + ticket_type}>
                        <span class="sub-script">opened by&nbsp;</span>
                        <FieldData
                            metadata={metadata}
                            field_name='opened_by'
                            data={page_data}
                        />&nbsp;
                        <span class="sub-script">on&nbsp;</span> 
                        <FieldData
                            metadata={metadata}
                            field_name='created'
                            data={page_data}
                        />&nbsp;
                        <span class="sub-script">Updated&nbsp;</span> 
                        <FieldData
                            metadata={metadata}
                            field_name='modified'
                            data={page_data}
                        />
                    </h3>
                    <div className="markdown">
                        {/* <Button
                            button_text = 'Edit'
                            button_align = 'right'
                            type='button'
                            buttonClickCallback = {() => {
                                console.log('button clicked')
                            }}

                        /> */}
                        <Link to="edit"><button className="common-field form">Edit</button></Link>
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
                                    <TicketComments
                                        comment_data={comment}
                                        metadata={comment_metadata}
                                        ticket_id={page_data['id']}
                                    />
                                </li>
                            )
                        })}
                        <li>
                            <TicketCommentForm
                                metadata={comment_metadata}
                                post_url = {page_data['_urls']['comments']}
                                ticket_id={page_data['id']}
                                commentCallback={() => {
                                    setRelaod(true)
                                }}
                            />
                        </li>
                    </ul>
                </div>
            </div>

            <div className="sidebar">

                <div className="metadata">
                    <div>

                        <h3 className={"metadata ticket-type-" + ticket_type}>
                            Ticket&nbsp;#
                            <FieldData
                            metadata={metadata}
                            field_name='id'
                            data={page_data}
                        />
                        &nbsp;
                        {page_data['external_ref'] &&(
                           ('( #') + page_data['external_ref'] + (')')
                        )}
                        </h3>

                        <fieldset>
                            <label>Assigned</label>
                            <span className="text">
                            <FieldData
                                metadata={metadata}
                                field_name='assigned_users'
                                data={page_data}
                            />
                            </span>
                        </fieldset>
                        <fieldset>
                            <label>Status</label>
                            <span className="text">
                            <FieldData
                                metadata={metadata}
                                field_name='status_badge'
                                data={page_data}
                            />
                            </span>
                        </fieldset>
                        <fieldset>
                            <label>Labels</label>
                            <span className="text">val</span>
                        </fieldset>

                        <fieldset>
                            <label>Category</label>
                            <span className="text">
                                <FieldData
                                    metadata={metadata}
                                    field_name='category'
                                    data={page_data}
                                />
                            </span>
                        </fieldset>

                        <fieldset>
                            <label>Project</label>
                            <span className="text">
                                <FieldData
                                    metadata={metadata}
                                    field_name='project'
                                    data={page_data}
                                />
                            </span>
                        </fieldset>

                        <fieldset>
                            <label>Milestone</label>
                            <span className="text">
                                <FieldData
                                    metadata={metadata}
                                    field_name='milestone'
                                    data={page_data}
                                />
                            </span>
                        </fieldset>

                        <fieldset>
                            <label>Priority</label>
                            <span className="text">U 
                                <FieldData
                                    metadata={metadata}
                                    field_name='urgency'
                                    data={page_data}
                                />
                             / I
                                <FieldData
                                    metadata={metadata}
                                    field_name='impact'
                                    data={page_data}
                                />
                             / P
                                <FieldData
                                    metadata={metadata}
                                    field_name='priority'
                                    data={page_data}
                                />
                            </span>
                        </fieldset>

                        <fieldset>
                            <label>Duration</label>
                            <span className="text">
                                <FieldData
                                    metadata={metadata}
                                    field_name='duration'
                                    data={page_data}
                                />
                            </span>
                        </fieldset>

                        <fieldset>
                            <label>Roadmap(s)</label>
                            <span className="text">val</span>
                        </fieldset>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Ticket;