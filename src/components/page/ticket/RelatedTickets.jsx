import {
    useEffect,
    useState
} from "react";

import {
    Card,
    CardBody,
    CardTitle
} from "@patternfly/react-core";

import { apiFetch } from "../../../hooks/apiFetch";
import FieldData from "../../../functions/FieldData";
import IconLoader from "../../IconLoader";



const RelatedTickets = ({
    data_url = null,
    ticket_id = null
}) => {

    const [ page_data, setPageData ] = useState(null)
    const [ metadata, setMetaData ] = useState(null)
    const [ refresh, setRefresh ] = useState(false)

    useEffect(() => {

        apiFetch(
            data_url,
            (data, metadata) => {

                setPageData(data)

                setMetaData(metadata)

            }
        )
    },[ data_url, refresh ])

    const handleDeleteRelatedTicket = (e) => {

        let url = `${data_url}/${e.currentTarget.id}`

        console.log(`Removing Dependent ticket ${url}`)

        apiFetch(
            url,
            null,
            'DELETE'
        )

        setRefresh( refresh ? false : true )

    }

    return (
        <Card
            className="related-tickets"
            id={'section-related-tickets'}
            isCompact
        >
            <CardTitle>Related Tickets</CardTitle>

            <CardBody
                className="items"
            >
            <div >

            {(metadata && page_data) &&

            page_data.results?.map((related_ticket) => {

                let from = true

                let this_id = related_ticket['dependent_ticket']

                let related_name = ''

                for( let choice of metadata.fields['how_related']['choices']) {

                    if( Number(related_ticket.how_related) === Number(choice.value) ) {
                        related_name = String(choice.display_name).toLowerCase()
                    }

                }

                if( Number(related_ticket['dependent_ticket']['id']) === Number(ticket_id) ) {

                    from = false
                    this_id = related_ticket['ticket']

                    if( related_name === 'blocked by' ) {

                        related_name = 'blocks'

                    }else if( related_name === 'blocks' ) {

                        related_name = 'blocked by'

                    }

                }

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

                        <FieldData
                            metadata={metadata}
                            field_name='display_name'
                            data={related_ticket}
                        />
                        <span
                            className={"icon"}
                            style={{
                                justifyContent: 'flex-end',
                                marginRight: '.5rem',
                                width: '50px',
                            }}
                        >
                            <span
                                id={related_ticket['id']}
                                onClick={handleDeleteRelatedTicket}
                            >
                                <IconLoader
                                    name='delete'
                                />
                            </span>
                        </span>
                    </div>
                    </div>
                );

            })}
            </div>
            </CardBody>
        </Card>
    );
}
 
export default RelatedTickets;
