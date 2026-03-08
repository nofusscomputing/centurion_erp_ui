import { useEffect, useState } from "react";

import { useLoaderData, useParams } from "react-router"

import { Card, CardBody, CardHeader, PageGroup, PageSection } from "@patternfly/react-core";


import DisplayTable from "../components/DisplayTable"
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
        <PageGroup>
            <ContentHeader
                content_heading={content_heading}
                content_header_icon={content_header_icon}
            />
            { metadata &&
            <PageSection
                aria-labelledby="page-content"
                isFilled={true}
            >
                <Card isPlain>
                    <CardBody>
                        <DisplayTable
                            callback={setContentHeading}
                            data_url_path={metadata.urls.self}
                            SetContentHeaderIcon = {SetContentHeaderIcon}
                            loader_metadata = {metadata}
                            loader_data = {page_data}
                        />
                    </CardBody>
                </Card>
            </PageSection>}
        </PageGroup>
    );
}

export default List;
