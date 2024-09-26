import { useEffect, useState } from "react";
import NavTabs from "../components/Navtabs";
import Section from "./detail/Section";
import { useLoaderData, useParams } from "react-router-dom";
import { ResponseException } from "../classes/Exceptions";



const Detail = ({
    setContentHeading
}) => {

    const [active_tab, setActiveTab] = useState(null)

    const page_data = useLoaderData();

    const params = useParams();

    const [metadata, setMetaData] = useState(null);

    if( 'name' in page_data ) {

        setContentHeading(page_data['name']);

    }else if( 'title' in page_data ) {

        setContentHeading(page_data['title']);

    }else{
        setContentHeading(metadata['name']);
    }


    useEffect(() => {

        fetch('http://localhost:8003/api/' + params.module + '/' + params.model + '/' + params.model_id + '/option')

            .then(response => {

                if( ! response.ok ) {

                    throw new ResponseException(response)
                }

                return response.json()

            })
            .then(data => {

                setMetaData(data)

            })
            .catch(err => {

                throw Error(err)

            }

            );
    },[
        params
    ])


    return ( 
        <section>
        
            { metadata && <NavTabs
                active_tab={active_tab}
                setActiveTab={setActiveTab}
                tabs={metadata.page_tabs}
            />}
            { metadata !== null && metadata.page_tabs.map(( tab, index ) => {

                if( active_tab === tab.name.toLowerCase()
                    || (
                        active_tab === null
                        && index === 0
                    )
                ) {

                    return( tab.sections.map(( section, section_index ) => {

                        if( section_index !== 0 ) {
                            
                            return(
                                <div>
                                    <hr />
                                    <Section
                                        index = { section_index }
                                        data = { page_data }
                                        metadata = { metadata }
                                        left = {section.left }
                                        name = { 'name' in section ? section.name : tab.name }
                                        right = { section.right }
                                    />
                                </div>
                            )

                        }

                        return(
                            <Section
                                index = { section_index }
                                data = { page_data }
                                metadata = { metadata }
                                left = {section.left }
                                name = { 'name' in section ? section.name : tab.name }
                                right = { section.right }
                            />
                        )
                    }))
                }
            })}
        </section>
     );
}
 
export default Detail;