import { useEffect, useState } from "react";
import { apiFetch } from "../../../hooks/apiFetch";
import IconLoader from "../../IconLoader";
import RenderMarkdown from "../../../functions/RenderMarkdown";

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
        <section className="related-tickets">
            <h3 className="related-tickets">Related Tickets</h3>
            {(metadata && page_data) &&

            page_data.results.map((related_ticket) => {

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

                return (
                <div id="linked-tickets" className="related-ticket">
                    <div className={"icon icon-related-ticket ticket-related-" + String(related_name).replace(' ', '_')}>
                        <IconLoader
                            name={'ticket_related_' + String(related_name).replace(' ', '_')}
                        />
                         &nbsp;</div>
                    {/* <div id="markdown" className="text text-related-ticket"> */}
                    <div className="markdown">

                        {related_name}&nbsp;

                        <span style={{
                            display: 'inline-block'
                            }}>
                                <RenderMarkdown>
                                    {'#'+this_id['id']}
                                </RenderMarkdown>
                            </span>
                    </div>
                </div>
                );
            })}
        </section>
    );
}
 
export default RelatedTickets;