import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import FieldData from "../functions/FieldData";

import { apiFetch } from "../hooks/apiFetch";
import LinkedItems from "../components/page/ticket/LinkedItems";
import RelatedTickets from "../components/page/ticket/RelatedTickets";
import TicketComments from "../components/page/ticket/TicketComments";
import urlBuilder from "../hooks/urlBuilder";



export function secondsToTime(secs) {

    const hour = 3600
    const minute = 60

    const hours = Math.floor( (secs % hour ) / hour )
    const minutes = Math.floor( ( secs % hour ) / minute )
    const seconds = Math.floor( (secs % hour) % minute )


    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return String(`${obj['h']}h ${obj['m']}m ${obj['s']}s` );
}


const Ticket = ({
    setContentHeading = null,
    SetContentHeaderIcon = null
}) => {

    SetContentHeaderIcon('')

    const [comments, setComments] = useState(null)

    const [comment_metadata, setCommentMetaData] = useState(null);

    const [metadata, setMetaData] = useState(null);

    const page_data = useLoaderData();

    const params = useParams();

    const [ ticket_type, SetTicketType ] = useState(null)

    let [ticket_duration, setTicketDuration] = useState(0)

    setContentHeading(page_data['title'])


    let url_builder = urlBuilder(
        params
    )

    useEffect(() => {

        apiFetch(
            url_builder.api.path,
            (data) =>{

                setMetaData(data)

                for(let ticket_type_entry of data.fields['ticket_type'].choices ) {

                    if( Number(ticket_type_entry.value) === Number(page_data['ticket_type']) ) {

                        ticket_type_entry = String(ticket_type_entry.display_name).toLowerCase()
                        ticket_type_entry = ticket_type_entry.replace(' ', '-')

                        SetTicketType(ticket_type_entry)

                    }

                }
            },
            'OPTIONS'
        )

    }, [ page_data ])


    useEffect(() => {

        if( page_data['_urls']['comments'] ) {

            apiFetch(
                page_data['_urls']['comments'],
                (data) =>{

                    setCommentMetaData(data)

                },
                'OPTIONS'
            )
        }

    }, [page_data['_urls']['comments']])


    return (
        metadata && comment_metadata && page_data && <div className="ticket">

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

                { page_data['_urls']['related_tickets'] &&
                <RelatedTickets
                    data_url={String(page_data['_urls']['related_tickets']).split('api/v2')[1]}
                    ticket_id={page_data['id']}
                />}

                { page_data['_urls']['linked_items'] &&
                <LinkedItems
                    data_url={String(page_data['_urls']['linked_items']).split('api/v2')[1]}
                />}

                { (
                    comment_metadata
                    && page_data['_urls']['comments']
                    && page_data['id']

                ) && 
                <TicketComments
                    comment_metadata = {comment_metadata}
                    comments_url = {String(page_data['_urls']['comments']).split('api/v2')[1] + '?page[size]=500'}
                    ticket_id = {page_data['id']}
                />}
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
                                {secondsToTime(page_data['duration'])}
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