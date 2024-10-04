import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

import { apiFetch } from "../hooks/apiFetch";
import NavTabs from "../components/page/detail/Navtabs";
import Section from "../components/page/detail/Section";



const Detail = ({
    setContentHeading
}) => {

    const [active_tab, setActiveTab] = useState(null)

    const page_data = useLoaderData();

    const params = useParams();

    const [metadata, setMetaData] = useState(null);


    useEffect(() => {

        apiFetch(
            params.module + '/' + params.model + '/' + params.pk,
            (data) =>{

                setMetaData(data)

                if( 'name' in page_data ) {

                    setContentHeading(page_data['name']);

                }else if( 'title' in page_data ) {

                    setContentHeading(page_data['title']);

                }else{
                    setContentHeading(metadata['name']);
                }

            },
            'OPTIONS'
        )
    },[page_data])


    return ( 
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
            })}
        </section>
     );
}
 
export default Detail;