import { useEffect, useId, useState } from "react";
import { useLoaderData } from "react-router";

import '../styles/ticket.css'

import ContentHeader from "../components/page/ContentHeader";
import InlineField from "../components/InlineFields";
import LinkedItems from "../components/page/ticket/LinkedItems";
import MarkdownEditor from "../components/MarkdownEditor";
import RelatedTickets from "../components/page/ticket/RelatedTickets";
import Section from "../components/Section";
import TicketComments from "../components/page/ticket/TicketComments";

import FieldData from "../functions/FieldData";

import { apiFetch } from "../hooks/apiFetch";



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


const Ticket = () => {

    const [comment_metadata, setCommentMetaData] = useState(null);

    const [ content_heading, setContentHeading ] = useState(null)
    const [ content_header_icon, SetContentHeaderIcon ] = useState(null)

    const [ editing_description, setEditingDescription ] = useState( false )

    const {page_data, metadata} = useLoaderData();

    const [ ticket_data, setTicketData] = useState(null)
    
    const [ ticket_metadata, setTicketMetaData] = useState(null)

    const [ ticket_type, SetTicketType ] = useState(null)


    useEffect( () => {

        setTicketData(page_data)
        setTicketMetaData(metadata)

        setContentHeading(page_data['title'])

    },[
        page_data,
        metadata
    ])


    useEffect(() => {
        for(let ticket_type_entry of metadata.fields['ticket_type'].choices ) {

            if( Number(ticket_type_entry.value) === Number(page_data['ticket_type']) ) {

                ticket_type_entry = String(ticket_type_entry.display_name).toLowerCase()
                ticket_type_entry = ticket_type_entry.replace(' ', '-')

                SetTicketType(ticket_type_entry)

            }

        }

    }, [
        metadata.fields,
        page_data
    ])


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

    }, [
        page_data
    ])


    const handleDescriptionCancel = () => {

        setEditingDescription(false)

    }


    const handleDescriptionEdit = () => {

        setEditingDescription(true)

    }


    const handleDescriptionSave = ({event}) => {

        setEditingDescription(false)

    }


    const ticketDescriptionId = useId()

    return (
        ticket_metadata && comment_metadata && ticket_data && (
        <>
        <ContentHeader
            content_heading={content_heading}
            content_header_icon={content_header_icon}
        />
        <div id={'ticket-' + ticket_data.id} className="ticket">

            <div className="contents">

                <Section
                    className="description"
                    titleBar={(
                        ! editing_description && (
                        <h3
                            className={"description ticket-type-" + ticket_type}
                            style={{
                                fontSize: 'var(--font-size)',
                                fontWeight: 'normal',
                                margin: '0',
                            }}
                        >
                            <span>
                                <span className="sub-script">opened by&nbsp;</span>
                                <FieldData
                                    metadata={metadata}
                                    field_name='opened_by'
                                    data={ticket_data}
                                />
                            </span>&nbsp;
                            <span>
                                <span className="sub-script">on&nbsp;</span> 
                                <FieldData
                                    metadata={metadata}
                                    field_name='created'
                                    data={ticket_data}
                                />
                            </span>&nbsp;
                            <span>
                            <span className="sub-script">Updated&nbsp;</span> 
                            <FieldData
                                metadata={metadata}
                                field_name='modified'
                                data={ticket_data}
                            />
                            </span>
                        </h3>
                        )
                    )}
                >
                    { editing_description &&

                    <MarkdownEditor
                        auto_content_height = {true}
                        data={ticket_data}
                        field_name = 'description'
                        metadata={metadata}
                        onCancel={handleDescriptionCancel}
                        onSave={handleDescriptionSave}
                    />

                    }

                    { ! editing_description && (

                    <div className="markdown">
                        <button className="common-field form" onClick={handleDescriptionEdit}>Edit</button>
                        <FieldData
                            metadata={metadata}
                            field_name='description'
                            data={ticket_data}
                        />
                    </div>
                    )}

                </Section>

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
                    comments_url = {String(page_data['_urls']['comments']).split('api/v2')[1] + ''}
                    ticket_id = {page_data['id']}
                />}

            </div>

            <Section
                className="sidebar"
                id={'ticket-sidebar-' + ticket_data.id} 
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
                titleBar={(
                    <h3
                        className={"sidebar ticket-type-" + ticket_type}
                        style={{
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        Ticket&nbsp;#
                        <FieldData
                            metadata={metadata}
                            field_name='id'
                            data={ticket_data}
                        />
                        &nbsp;
                        {ticket_data['external_ref'] &&(
                            ('( #') + ticket_data['external_ref'] + (')')
                        )}
                    </h3>
                )}
            >

                <div
                    className="metadata"
                    id={'ticket-sidebar-metadata-' + ticket_data.id} 
                >

                    <InlineField
                        data={ticket_data}
                        field_name='assigned_users'
                        metadata={metadata}
                    />

                    <InlineField
                        data={ticket_data}
                        field_name='assigned_teams'
                        metadata={metadata}
                    />

                    <InlineField
                        data={ticket_data}
                        field_name='status_badge'
                        metadata={metadata}
                    />

                    <fieldset>
                        <label>Labels</label>
                        <span className="text">val</span>
                    </fieldset>

                    <InlineField
                        data={ticket_data}
                        field_name='category'
                        metadata={metadata}
                    />

                    <InlineField
                        data={ticket_data}
                        field_name='project'
                        metadata={metadata}
                    />

                    <InlineField
                        data={ticket_data}
                        field_name='milestone'
                        metadata={metadata}
                    />

                    <fieldset>
                        <label>Duration</label>
                        <span className="text">
                            {secondsToTime(page_data['duration'])}
                        </span>
                    </fieldset>

                    <InlineField
                        data={ticket_data}
                        field_name='urgency_badge'
                        metadata={metadata}
                    />

                    <InlineField
                        data={ticket_data}
                        field_name='impact_badge'
                        metadata={metadata}
                    />

                    <InlineField
                        data={ticket_data}
                        field_name='priority_badge'
                        metadata={metadata}
                    />

                    <fieldset>
                        <label>Estimate</label>
                        <span className="text">
                            {secondsToTime(page_data['estimate'])}
                        </span>
                    </fieldset>

                    <InlineField
                        data={ticket_data}
                        field_name='planned_start_date'
                        metadata={metadata}
                    />

                    <InlineField
                        data={ticket_data}
                        field_name='real_start_date'
                        metadata={metadata}
                    />

                    <InlineField
                        data={ticket_data}
                        field_name='planned_finish_date'
                        metadata={metadata}
                    />

                    <InlineField
                        data={ticket_data}
                        field_name='real_finish_date'
                        metadata={metadata}
                    />

                    <InlineField
                        data={ticket_data}
                        field_name='subscribed_users'
                        metadata={metadata}
                    />

                    <InlineField
                        data={ticket_data}
                        field_name='subscribed_teams'
                        metadata={metadata}
                    />

                    <fieldset>
                        <label>Roadmap(s)</label>
                        <span className="text">val</span>
                    </fieldset>

                </div>

            </Section>
        </div>
        </>
        )

    );
}

export default Ticket;