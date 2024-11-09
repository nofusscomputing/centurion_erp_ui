import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";

import { apiFetch } from "../hooks/apiFetch";
import NavTabs from "../components/page/detail/Navtabs";
import Section from "../components/page/detail/Section";
import ModelNote from "../components/page/detail/ModelNote";
import TextArea from "../components/form/Textarea";
import Button from "../components/form/Button";
import IconLoader from "../components/IconLoader";
import urlBuilder from "../hooks/urlBuilder";



const Detail = ({
    setContentHeading,
    SetContentHeaderIcon = null
}) => {

    const [active_tab, setActiveTab] = useState(null)

    const page_data = useLoaderData();

    const params = useParams();

    const [metadata, setMetaData] = useState(null);

    const [ notes, setNotes ] = useState(null)
    const [ update_notes, setUpdateNotes ] = useState(false)
    const [ notes_form, setNotesForm ] = useState({})
    const [ note_metadata, setNoteMetadata ] = useState(null)

    // SetContentHeaderIcon('')

    const url_builder = urlBuilder (
        params
    )

    useEffect(() => {

        apiFetch(
            url_builder.api.path,
            (data) =>{

                setMetaData(data)

                if( 'name' in page_data ) {

                    setContentHeading(page_data['name']);

                }else if( 'title' in page_data ) {

                    setContentHeading(page_data['title']);

                }else{
                    setContentHeading(data['name']);
                }


                SetContentHeaderIcon(
                    <>
                        { ('documentation' in data) &&
                            <Link to={data['name']} target="_new">
                                <IconLoader
                                    name='help'
                                />
                            </Link>
                        }
                        {page_data['_urls']['history'] &&
                            <Link to={String(page_data['_urls']['history']).split('api/v2')[1]}>
                                <IconLoader
                                    name='history'
                                />
                            </Link>
                        }
                        {data['allowed_methods'].includes('DELETE') &&
                            <Link to={String(page_data['_urls']['_self']).split('api/v2')[1] + '/delete'}>
                                <IconLoader
                                    name='delete'
                                />
                            </Link>
                        }
                    </>
                )
            },
            'OPTIONS'
        )
    },[
        // page_data
    ])

    useEffect(() => {

        if( Object.keys(page_data['_urls']).includes('notes') ) {

            if( String(page_data['_urls']['notes']).includes('/') ) {    // is URL

                apiFetch(
                    page_data['_urls']['notes'],
                    (data) => {

                        setNoteMetadata(data)
                    },
                    'OPTIONS'
                )
            }
        }

    }, [])

    useEffect(() => {

        if( Object.keys(page_data['_urls']).includes('notes') ) {

            if( String(page_data['_urls']['notes']).includes('/') ) {    // is URL

                apiFetch(
                    page_data['_urls']['notes'],
                    (data) => {

                        setNotes(data)
                    }
                )

            }
        }

    }, [
        update_notes
    ])


    return (
        page_data &&
        <section>

            { metadata && <NavTabs
                active_tab={active_tab}
                setActiveTab={setActiveTab}
                tabs={metadata.layout}
            />}
            { metadata && metadata.layout.map(( tab, index ) => {

                if( active_tab === tab.name.toLowerCase()
                    || (
                        active_tab === null
                        && index === 0
                    )
                ) {

                    if( tab.name.toLowerCase() === 'notes' ) {

                        return(
                            <div className="model-notes">
                                <div className="model-notes-comment">
                                    <form onSubmit={async (e) => {
                                        e.preventDefault()

                                        const response = await apiFetch(
                                            String(page_data['_urls']['notes']).split('api/v2')[1],
                                            null,
                                            'POST',
                                            notes_form
                                        )

                                        if( response.status === 201 ) {

                                            setNotesForm({})

                                            setUpdateNotes( update_notes ? false : true )

                                            e.target.reset()
                                        }

                                    }}>
                                        <TextArea 
                                            id = 'model-note'
                                            required = {true}
                                            onChange = {(e) => {
                                                setNotesForm((prevState) => ({ 
                                                    ...prevState,
                                                    note: e.target.value,
                                                    organization: page_data['organization'].id,
                                                    device: page_data.id
                                                }
                                                ))

                                                console.log(`model note form ${JSON.stringify(notes_form)}`)
                                            }}
                                        />
                                        <Button
                                            button_align = 'right'
                                            button_text = 'Create Note'
                                        />
                                    </form>
                                </div>
                                <div className="notes">
                                {(notes && note_metadata) &&
                                    notes.results.map((note) => {
                                    return (<ModelNote
                                            note_data={note}
                                            metadata = {note_metadata}
                                        />)
                                    })}
                                </div>
                            </div>
                        )

                    } else {

                        return( tab.sections.map(( section, section_index ) => {

                            if( section_index !== 0 ) {
                                
                                return(
                                    <div>
                                        <hr />
                                        <Section
                                            index = { section_index }
                                            layout = {section}
                                            data = { page_data }
                                            metadata = { metadata }
                                            tab = {tab}
                                        />
                                    </div>
                                )
                            }

                            return(
                                <Section
                                    index = { section_index }
                                    layout = {section}
                                    data = { page_data }
                                    metadata = { metadata }
                                    tab = {tab}
                                />
                            )
                        }))
                    }
                }
            })}
        </section>
     );
}
 
export default Detail;