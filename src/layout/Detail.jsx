import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useLoaderData,
    useParams
} from "react-router";

import {
    Card,
    CardBody,
    CardFooter,
    Divider,
    Flex,
    FlexItem,
    PageGroup,
    PageSection,
    Tab,
    Tabs,
    TabTitleText
} from "@patternfly/react-core";

import '../styles/detail.css'

import { apiFetch } from "../hooks/apiFetch";

import Button from "../components/form/Button";
import ContentHeader from "../components/page/ContentHeader";
import IconLoader from "../components/IconLoader";
import ModelNote from "../components/page/detail/ModelNote";
import DetailSection from "../components/page/detail/DetailSection";
import TextArea from "../components/form/Textarea";



const Detail = () => {

    const [ content_heading, setContentHeading ] = useState(null)
    const [ content_header_icon, SetContentHeaderIcon ] = useState(null)

    const {metadata, page_data} = useLoaderData();

    const params = useParams();


    const [ notes, setNotes ] = useState(null)
    const [ update_notes, setUpdateNotes ] = useState(false)
    const [ notes_form, setNotesForm ] = useState({})
    const [ note_metadata, setNoteMetadata ] = useState(null)


    useEffect(() => {

        document.title = `${metadata.name}`

    }, [ metadata ])


    useEffect(() => {

        if( 'name' in page_data ) {

            setContentHeading(page_data['name']);

        }else if( 'title' in page_data ) {

            setContentHeading(page_data['title']);

        }else{
            setContentHeading(metadata['name']);
        }


        SetContentHeaderIcon(
            <>
                { ('documentation' in metadata) &&
                    <Link to={metadata['documentation']} target="_new">
                        <IconLoader
                            name='help'
                            size="xl"
                        />
                    </Link>
                }
                {page_data['_urls']['history'] &&
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

    return (
        metadata && page_data &&
        <PageGroup>
            <ContentHeader
                content_heading={content_heading}
                content_header_icon={content_header_icon}
                back_url = {metadata.urls.back ?
                    String(metadata.urls.back).split('api/v2')[1]
                    : '/' + params.module + '/' + params.model
                }
                back_name = {metadata.name}
            />

            <PageSection
                aria-labelledby="page-content"
                isFilled={true}
            >
                <Tabs
                    activeKey={activeTabKey}
                    onSelect={handleTabClick}
                    usePageInsets={true}
                    isBox={false}
                    aria-label="Tabs in the page insets example"
                    role="region"
                >
                { (metadata && page_data) && metadata.layout.map(( tab, index ) => {

                    let page_content = null;

                    if(
                        activeTabKey === index
                        || index === 0
                    ) {

                        if( tab.name.toLowerCase() === 'notes' ) {

                            page_content = (
                                (notes && note_metadata) &&
                                <>

                                    <FlexItem>

                                        <Card isPlain>

                                            <form onSubmit={async (e) => {
                                                e.preventDefault();

                                                const response = await apiFetch(
                                                    String(page_data['_urls']['notes']).split('api/v2')[1],
                                                    null,
                                                    'POST',
                                                    notes_form
                                                );

                                                if( response.status === 201 ) {

                                                    setNotesForm({});

                                                    setUpdateNotes( update_notes ? false : true );

                                                    e.target.reset();
                                                }

                                            }}>
                                            <CardBody>
                                                <TextArea 
                                                    id = 'model-note'
                                                    required = {true}
                                                    onChange = {(e) => {
                                                        setNotesForm((prevState) => ({ 
                                                            ...prevState,
                                                            body: e.target.value,
                                                        }
                                                        ))

                                                        console.log(`model note form ${JSON.stringify(notes_form)}`)
                                                    }}
                                                    value={notes_form?.body}
                                                />
                                            </CardBody>
                                            <CardFooter>
                                                <Button
                                                    button_align = 'right'
                                                    button_text = 'Create Note'
                                                />
                                            </CardFooter>
                                            </form>
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

                            page_content = tab.sections.map(( section, section_index ) => {

                                return (
                                    <>
                                        {section_index !== 0 && <Divider />}

                                        <FlexItem>
                                            <DetailSection
                                                index = { section_index }
                                                layout = {section}
                                                data = { page_data }
                                                metadata = { metadata }
                                                tab = {tab}
                                            />
                                        </FlexItem>
                                    </>
                                );
                            })
                        }
                    }


                    return (
                        <Tab eventKey={index} title={<TabTitleText>{tab.name}</TabTitleText>} aria-label="Page insets example content users">
                            <Flex direction={{ default: 'column' }}>{page_content}</Flex>
                        </Tab>
                    );
                })}
                </Tabs>
            </PageSection>
        </PageGroup>
     );
}
 
export default Detail;