import { useEffect, useState } from "react";

import { useLoaderData, useParams } from "react-router"

import { PageSection } from "@patternfly/react-core";


import DisplayTable from "../components/Table"
import ContentHeader from "../components/page/ContentHeader";



const List = () => {

    const [ content_heading, setContentHeading ] = useState(null)
    const [ content_header_icon, SetContentHeaderIcon ] = useState(null)

    const params = useParams();

    const {metadata, page_data} = useLoaderData();

    useEffect(() => {

        document.title = `${metadata.name}`

    }, [ metadata ])

    return (
        <>
        <ContentHeader
            content_heading={content_heading}
            content_header_icon={content_header_icon}
        />
        { metadata &&
        <PageSection
            aria-labelledby="page-content"
            isFilled={true}
        >
            <div className="content">
                <DisplayTable
                    callback={setContentHeading}
                    data_url_path={metadata.urls.self}
                    SetContentHeaderIcon = {SetContentHeaderIcon}
                    loader_metadata = {metadata}
                    loader_data = {page_data}
                />
            </div>
        </PageSection>}
        </>
    );
}

export default List;
