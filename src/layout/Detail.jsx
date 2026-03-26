import {
    createRef,
    useEffect,
    useMemo,
    useState
} from "react";

import {
    Form,
    Link,
    useLoaderData,
    useLocation,
    useOutletContext,
} from "react-router";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Flex,
    FlexItem,
    PageSection,
    Tab,
    TabContent,
    Tabs,
    TabTitleText
} from "@patternfly/react-core";

import '../styles/detail.css'

import { apiFetch } from "../hooks/apiFetch";

import IconLoader from "../components/IconLoader";
import ModelNote from "../components/page/detail/ModelNote";
import DetailSection from "../components/page/detail/DetailSection";
import MarkdownEditor from "../components/MarkdownEditor";



const Detail = () => {

    const {
        setPageDescription, setPageHeading, setPageHeaderIcons
    } = useOutletContext()

    const location = useLocation();

    const {metadata, page_data} = useLoaderData();


    const [ notes, setNotes ] = useState(null)
    const [ update_notes, setUpdateNotes ] = useState(false)
    const [ notes_form, setNotesForm ] = useState({})
    const [ note_metadata, setNoteMetadata ] = useState(null)


    useEffect(() => {

        document.title = `${metadata.name}`

    }, [ metadata ])


    useEffect(() => {

        if( 'name' in page_data ) {

            setPageHeading(page_data['name']);

        }else if( 'title' in page_data ) {

            setPageHeading(page_data['title']);

        }else{
            setPageHeading(metadata['name']);
        }

        setPageDescription(null)


        setPageHeaderIcons(
            <>
                { ('documentation' in metadata) &&
                    <Link to={metadata['documentation']} target="_new">
                        <IconLoader
                            name='help'
                            size="xl"
                        />
                    </Link>
                }
                {(!'results' in page_data || '_urls' in page_data) && page_data['_urls']['history'] &&
                    <Link to={String(page_data['_urls']['history']).split('api/v2')[1]}>
                        <IconLoader
                            name='history'
                            size="xl"
                        />
                    </Link>
                }
                {metadata['allowed_methods'].includes('DELETE') &&
                    <Link to={String(page_data['_urls']['_self']).split('api/v2')[1] + '/delete'}>
                        <IconLoader
                            name='delete'
                            size="xl"
                        />
                    </Link>
                }
            </>
        )

    },[
        page_data,
    ])


    useEffect(() => {

        if( 'results' in page_data ) {
            return
        }

        if( Object.keys(page_data['_urls']).includes('notes') ) {

            const {api_metadata, api_page_data} = apiFetch(
                page_data['_urls']['notes'],
            )

                .then((data) =>{

                    setNotes(data.api_page_data)

                    setNoteMetadata(data.api_metadata)

                })

        }

    }, [
        update_notes,
    ])


    const [activeTabKey, setActiveTabKey] = useState(0);

    const handleTabClick = (event, tabIndex) => {
        setActiveTabKey(tabIndex);
    };


    const tabDetails = useMemo(() => {

        return metadata.layout.map(tab => ({
            name: tab.name,
            ref: createRef()
        }));

    }, [metadata.layout])


    return (
        <>
            <PageSection
                className="pf-m-sticky-top"
                type="tabs"
            >
                <Tabs
                    activeKey={activeTabKey}
                    onSelect={handleTabClick}
                    aria-label="page-tabs"
                    role="region"
                >

                    {tabDetails && tabDetails.map(( tab, index ) => {

                        return (
                            <Tab
                                key={index}
                                eventKey={index}
                                title={<TabTitleText>{tab.name}</TabTitleText>}
                                tabContentId={`tab${index}`}
                                tabContentRef={tab.ref} 
                            />
                        );

                    })}
                </Tabs>
            </PageSection>

            <PageSection
                isFilled={true}
            >

                {tabDetails && tabDetails.map((tab, index) => {

                    let metadataTab = metadata.layout[index]

                    let page_content

                    if( tab.name.toLowerCase() === 'notes' ) {

                        page_content = (
                            (notes && note_metadata) &&
                            <>

                                <FlexItem>

                                    <Card isPlain>

                                        <Form onSubmit={async (e) => {
                                            e.preventDefault();

                                            const response = await apiFetch(
                                                String(page_data['_urls']['notes']).split('api/v2')[1],
                                                null,
                                                'POST',
                                                notes_form,
                                                false
                                            );

                                            if( response.status === 201 ) {

                                                setNotesForm({});

                                                setUpdateNotes( update_notes ? false : true );

                                                e.target.reset();
                                            }

                                        }}>
                                        <CardBody>
                                            <MarkdownEditor
                                                id = 'model-note'
                                                grow = {true}
                                                required = {true}
                                                onChange = {(e) => {
                                                    setNotesForm((prevState) => ({ 
                                                        ...prevState,
                                                        body: e.target.value,
                                                    }
                                                    ))

                                                    console.log(`model note form ${JSON.stringify(notes_form)}`)
                                                }}
                                                style = {{
                                                    width: "1000px"
                                                }}
                                                value={notes_form?.body}
                                            />
                                        </CardBody>
                                        <CardFooter>
                                            <Button variant="primary" type="submit">Create Note</Button>
                                        </CardFooter>
                                        </Form>
                                    </Card>
                                </FlexItem>

                                <FlexItem><Divider /></FlexItem>

                                {notes.results.map((note) => {
                                    return (
                                        <>
                                            <FlexItem>
                                                <ModelNote
                                                    note_data={note}
                                                    metadata = {note_metadata}
                                                />
                                            </FlexItem>
                                            <Divider />
                                        </>
                                    );
                                })}
                            </>
                        )

                    } else {

                        page_content = metadataTab.sections.map(( section, section_index ) => {

                            if(
                                String(location.pathname).endsWith('/add')
                                && section_index !== 0
                            ) {
                                return;
                            }

                            return (
                                <>
                                    {section_index !== 0 && <Divider />}

                                    <FlexItem>
                                        <DetailSection
                                            index = { section_index }
                                            layout = {section}
                                            data = { page_data }
                                            metadata = { metadata }
                                            name = {tab.name}
                                        />
                                    </FlexItem>
                                </>
                            );
                            
                        })
                    }

                    return (
                        <TabContent
                            eventKey={index}
                            key={index}
                            id={`tab${index}`}
                            ref={tab.ref}
                            aria-label={`tab ${index}`}
                            hidden={activeTabKey!=index}
                        >

                            {activeTabKey == index && page_content}

                        </TabContent>
                    );

    `           `})}

            </PageSection>
        </>
    );

}
 
export default Detail;
