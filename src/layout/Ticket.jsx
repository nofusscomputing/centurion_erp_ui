import {
    useContext,
    useEffect,
    useId,
    useState
} from "react";

import {
    Form,
    useActionData,
    useLoaderData,
    useOutletContext,
    useParams
} from "react-router";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    DescriptionList,
    Flex,
    PageSection,
    Sidebar,
    SidebarContent,
} from "@patternfly/react-core";

import '../styles/ticket.css'

import { Comments } from "../components/Comment";
import FieldData from "../functions/FieldData";
import { Fields } from "../components/DisplayFields";
import LinkedItems from "../components/page/ticket/LinkedItems";
import RelatedTickets from "../components/page/ticket/RelatedTickets";
import urlBuilder from "../hooks/urlBuilder";
import UserContext from "../hooks/UserContext";
import URLSanitize from "../functions/URLSanitize";



export function secondsToTime(secs) {

    const hour = 3600
    const minute = 60

    const hours = Math.floor( secs / hour )
    const minutes = Math.floor( ( secs % hour ) / minute )
    const seconds = Math.floor( secs % minute )


    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return String(`${obj['h']}h ${obj['m']}m ${obj['s']}s` );
}


const Ticket = () => {

    const actionData = useActionData();

    const [comment_metadata, setCommentMetaData] = useState(null);

    const [ formState, setFormState ] = useState({});

    const {
        setPageDescription, setPageHeading, setPageHeaderIcons
    } = useOutletContext();

    setPageDescription(null);
    setPageHeaderIcons(null);

    const [ editing_description, setEditingDescription ] = useState( false )

    const {page_data, metadata} = useLoaderData();

    const [ ticket_data, setTicketData] = useState(null)
    
    const [ ticket_metadata, setTicketMetaData] = useState(null)

    const [ ticket_type, SetTicketType ] = useState(null)

    const params = useParams();

    const url_params = urlBuilder(params);

    const [new_ticket, setNewTicket] = useState(
        url_params.params.action === 'add' ? true : false
    )

    const user = useContext(UserContext);


    useEffect(() => {

        if(actionData?.body && actionData?.ok) {

            setTicketData(actionData.body);

                delete actionData.body;
                delete actionData.errors;
                delete actionData.ok;
        }

    }, [actionData])


    useEffect(() => {

        document.title = `${metadata.name}`

    }, [ metadata ])

    useEffect( ()=> {

        setNewTicket(url_params.params.action === 'add' ? true : false)

    }, [
        url_params.params.action
    ])


    useEffect( () => {

        if( url_params.params.action !== 'add' ) {

            setTicketData(page_data)

            setPageHeading(page_data['title'])

        }else{
            setPageHeading('New ' + metadata.name)
        }

        setTicketMetaData(metadata)

    },[
        page_data,
        metadata,
    ])


    useEffect(() => {

        if( ticket_metadata?.name ) {

            let ticket_type_entry = String(ticket_metadata.name).toLowerCase()
            ticket_type_entry = ticket_type_entry.endsWith('s') ? ticket_type_entry.substring(0, (ticket_type_entry.length - 1)) : ticket_type_entry
            ticket_type_entry = ticket_type_entry.replace(' ', '-').replace('_', '-')

            SetTicketType(ticket_type_entry)

        }

    }, [
        metadata?.fields,
        ticket_metadata
    ])


    const handleDescriptionEdit = () => {

        setEditingDescription(!editing_description)

        if( ! editing_description ) {

            setFormState({})

        }
    }


    const ticketElementIdRandom = useId()

    const ticketElementId = () => {

        if( new_ticket ) {

            return ticketElementIdRandom

        } else {

            return ticket_data.id

        }
    }

    console.debug(`ticket form data: ${JSON.stringify( formState )}`)


    const ticketSideBar = (
        ticket_metadata &&

        <Card
            className="sidebar"
            isCompact
        >
            <CardHeader
                className={"header ticket-type-" + ticket_type}
                style={{
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Ticket&nbsp;
                {!new_ticket &&
                <>
                #
                <FieldData
                    metadata={ticket_metadata}
                    field_name='id'
                    data={ticket_data}
                />
                &nbsp;
                {ticket_data?.external_ref &&(
                    ('( #') + ticket_data['external_ref'] + (')')
                )}
                </>}
            </CardHeader>

            <CardBody
                style={{
                    paddingRight: "0"
                }}
            >

                <DescriptionList
                    style={{
                        maxHeight: "calc(100svh - 69px - 53px - 21px - 15px - 90px - 64px)",
                        minHeight: "0",
                        overflowY: "auto",
                        scrollbarWidth: "thin",

                    }}
                >

                    <Fields
                        fields = {[
                            'organization',
                            !new_ticket && 'assigned_to',
                            'status_badge',
                            'category',
                            'project',
                            'milestone',
                            // secondsToTime(ticket_data['duration']),
                            !new_ticket && 'ticket_duration',
                            'urgency_badge',
                            'impact_badge',
                            'priority_badge',
                            !new_ticket && 'ticket_estimation',
                            'planned_start_date',
                            'real_start_date',
                            'planned_finish_date',
                            'real_finish_date',
                            !new_ticket && 'subscribed_to',
                        ].filter(Boolean)}
                        formState={formState}
                        isCreate={new_ticket}
                        isEdit={false}
                        objectData={ticket_data}
                        objectMetadata={ticket_metadata}
                        onChange={setFormState}
                        useDivider={true}
                    />

                </DescriptionList>
            </CardBody>
        </Card>
    );


    const ticketSideBarNew = (
        ticket_metadata &&
        <Flex
            className="sidebar"
            direction={{ default: 'column' }}
            style={{
                backgroundColor: "var(--pf-t--global--background--color--primary--default)",
                maxWidth: "300px",
                minWidth: "300px",
            }}
        >
            <Sidebar>
                <SidebarContent>
                <h3
                    className={"sidebar ticket-type-" + ticket_type}
                    style={{
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Ticket&nbsp;#
                    <FieldData
                        metadata={ticket_metadata}
                        field_name='id'
                        data={ticket_data}
                    />
                    &nbsp;
                    {ticket_data?.external_ref &&(
                        ('( #') + ticket_data['external_ref'] + (')')
                    )}
                </h3>
                <DescriptionList>

                    <Fields
                        fields = {[
                            'organization',
                            !new_ticket && 'assigned_to',
                            'status_badge',
                            'category',
                            'project',
                            'milestone',
                            // secondsToTime(page_data['duration']),
                            'urgency_badge',
                            'impact_badge',
                            'priority_badge',
                            !new_ticket && 'estimate',
                            'planned_start_date',
                            'real_start_date',
                            'planned_finish_date',
                            'real_finish_date',
                            !new_ticket && 'subscribed_to',
                        ].filter(Boolean)}
                        formState={formState}
                        isCreate={new_ticket}
                        isEdit={false}
                        objectData={ticket_data}
                        objectMetadata={ticket_metadata}
                        onChange={setFormState}
                        useDivider={true}
                    />

                </DescriptionList>

                </SidebarContent>
            </Sidebar>
            <h3
                className={"sidebar ticket-type-" + ticket_type}
                style={{
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Ticket&nbsp;#
                <FieldData
                    metadata={ticket_metadata}
                    field_name='id'
                    data={ticket_data}
                />
                &nbsp;
                {ticket_data?.external_ref &&(
                    ('( #') + ticket_data['external_ref'] + (')')
                )}
            </h3>

            <DescriptionList>

                    <Fields
                        fields = {[
                            'organization',
                            !new_ticket && 'assigned_to',
                            'status_badge',
                            'category',
                            'project',
                            'milestone',
                            // secondsToTime(page_data['duration']),
                            'urgency_badge',
                            'impact_badge',
                            'priority_badge',
                            !new_ticket && 'estimate',
                            'planned_start_date',
                            'real_start_date',
                            'planned_finish_date',
                            'real_finish_date',
                            !new_ticket && 'subscribed_to',
                        ].filter(Boolean)}
                        formState={formState}
                        isCreate={new_ticket}
                        isEdit={false}
                        objectData={ticket_data}
                        objectMetadata={ticket_metadata}
                        onChange={setFormState}
                        useDivider={true}
                    />

            </DescriptionList>

        </Flex>

    );

    
    const [ ticketDescriptionState, setTicketDescriptionState ] = useState({});

    const ticketDescriptionCard = (
        ticket_metadata &&
        <Card
            isCompact
        >
            <CardHeader>
                {
                ! new_ticket &&
                (
                    <>
                    <span>
                        <span className="sub-script">opened by&nbsp;</span>
                        <FieldData
                            metadata={ticket_metadata}
                            field_name='opened_by'
                            data={ticket_data}
                        />
                    </span>&nbsp;
                    <span>
                        <span className="sub-script">on&nbsp;</span> 
                        <FieldData
                            metadata={ticket_metadata}
                            field_name='created'
                            data={ticket_data}
                        />
                    </span>&nbsp;
                    <span>
                    <span className="sub-script">Updated&nbsp;</span> 
                    <FieldData
                        metadata={ticket_metadata}
                        field_name='modified'
                        data={ticket_data}
                    />
                    </span>
                </>)

                }
            </CardHeader>
            <CardBody>

                <Fields
                    // errorState={actionData}
                    fields = {[
                        new_ticket && 'title',
                        'description',
                    ].filter(Boolean)}
                    formState={new_ticket ? ticketDescriptionState : formState }
                    isCreate={new_ticket}
                    isEdit={editing_description}
                    isFlex = {true}
                    objectData={ticket_data}
                    objectMetadata={ticket_metadata}
                    onChange={new_ticket ? setFormState : setTicketDescriptionState }
                />

            </CardBody>
            <CardFooter>
                { ! new_ticket &&
                <>
                    <Button
                        variant={editing_description ? "secondary" : "primary"}
                        onClick={handleDescriptionEdit}
                    >
                        <>{editing_description ? "Cancel" : "Edit"}</>

                    </Button>
                    { editing_description && <Button type="submit" variant="primary">Save</Button>}
                </>
                }
                { new_ticket && <Button type="submit" variant="primary">Save</Button>}
            </CardFooter>
        </Card>

    );


    const ticketLayout = (
        ticket_metadata && (
        <PageSection
            style={{
                backgroundColor: "var(--pf-t--global--background--color--control--default)",
                paddingRight: "0"
            }}
        >
            <Flex
                className="ticket"
                
                direction={{
                    default: 'row',
                }}
                flexWrap={{
                    default: "wrap",
                    xl: 'nowrap'
                }}
            >

                <Flex
                    direction={{ default: 'column' }}
                    grow={{ default: 'grow' }}
                >

                    {editing_description &&
                    <Form
                        className = "pf-v6-c-form pf-m-vertical"
                        id={'create-' + ticketElementId()} method="PATCH" action={String(document.location.href).replace(document.location.origin, '')}
                        onSubmit={(e) => {
                            
                            setFormState({})
                        }}
                    >
                        {ticketDescriptionCard}
                    </Form>
                    }
                    {!editing_description && ticketDescriptionCard}

                    { ! new_ticket &&

                    <RelatedTickets
                        data_url={URLSanitize(ticket_data?._urls?.ticket_dependencies)}
                        ticket_id={ticket_data?.id}
                    />}

                    { ! new_ticket &&

                    <LinkedItems
                        data_url={URLSanitize(ticket_data?._urls?.linked_models)}
                    />}

                    <Comments
                        comments_url = {URLSanitize(ticket_data?._urls?.comments)}
                    />

                </Flex>

                <Flex
                    direction={{ default: 'column' }}
                    grow={{ sm: "grow"}}
                    style={{
                        maxWidth: "300px",
                        minWidth: "300px",
                        overflow: "hidden",
                        position: "sticky",
                        top: "calc(53px + 7px)",
                    }}
                >
                    {ticketSideBar}
                </Flex>

            </Flex>
        </PageSection>
        )
    );


    if( new_ticket ) {

        return (
            <Form
                className = "pf-v6-c-form pf-m-vertical"
                id={'create-' + ticketElementId()} method="POST" action={String(document.location.href).replace(document.location.origin, '')}
                onSubmit={(e) => {
                    setFormState({})
                }}
            >
                {ticketLayout}

                <input id="formState" type="hidden" name="formState" value={JSON.stringify({...ticketDescriptionState, ...formState})} />
                <input id="metadata" type="hidden" name="metadata" value={JSON.stringify(comment_metadata)} />
                <input id="tz" type="hidden" name="tz" value={user.settings.timezone} />
            </Form>
        )
    } else {


        return (
            <>
                {ticketLayout}
            </>
        )

    }
}

export default Ticket;