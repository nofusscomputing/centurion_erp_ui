import { useEffect, useState } from "react";

import FieldData from "../../../functions/FieldData";

import { apiFetch } from "../../../hooks/apiFetch";

import IconLoader from "../../IconLoader";
import Section from "../../Section";



const RelatedTickets = ({
    data_url = null,
    ticket_id = null
}) => {

    const [ page_data, setPageData ] = useState(null)
    const [ metadata, setMetaData ] = useState(null)

    useEffect(() => {

        apiFetch(
            data_url,
            (data, metadata) => {

                setPageData(data)

                setMetaData(metadata)

            }
        )
    },[ data_url ])


    return (
        <Section
            className="related-tickets"
            id={'section-related-tickets'}
            titleBar={(
                <h3
                    className="related-tickets"
                    style={{
                        fontSize: 'var(--font-size)',
                        margin: '0',
                    }}
                >
                    Related Tickets
                </h3>
            )}
        >

            <div className="items">

            {(metadata && page_data) &&

            page_data.results?.map((related_ticket) => {

                let from = true

                let this_id = related_ticket['to_ticket_id']

                let related_name = ''

                for( let choice of metadata.fields['how_related']['choices']) {

                    if( Number(related_ticket.how_related) === Number(choice.value) ) {
                        related_name = String(choice.display_name).toLowerCase()
                    }

                }

                if( Number(related_ticket['to_ticket_id']['id']) === Number(ticket_id) ) {

                    from = false
                    this_id = related_ticket['from_ticket_id']

                    if( related_name === 'blocked by' ) {

                        related_name = 'blocks'

                    }else if( related_name === 'blocks' ) {

                        related_name = 'blocked by'

                    }

                }

                related_ticket['display_name'] = '#' + String(this_id.id)

                return(
                    <div style={{
                        display: 'inline-block'
                    }}>
                    <div
                        id={"linked-ticket-" + related_ticket['id']}
                        className="item"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            margin: '.1rem 0',
                            textAlign: 'left',
                        }}
                    >
                        <span
                            className={"icon icon-related-ticket ticket-related-" + String(related_name).replace(' ', '_')}
                            style={{
                                marginRight: '.5rem'
                            }}
                        >
                            <IconLoader
                                name={'ticket_related_' + String(related_name).replace(' ', '_')}
                            />
                        </span>
                        <span
                            className="text"
                            style={{
                                alignSelf: 'center',
                                marginRight: '.5rem',
                                width: '78px',
                            }}
                        >
                            {related_name}
                        </span>
                        <span
                            className="text"
                        >
                            <FieldData
                                metadata={metadata}
                                field_name='display_name'
                                data={related_ticket}
                            />
                        </span>
                    </div>
                    </div>
                );

            })}
            </div>

        </Section>
    );
}
 
export default RelatedTickets;