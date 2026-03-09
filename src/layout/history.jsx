import { useState } from "react";

import { useParams } from "react-router"

import {
    PageGroup,
    PageSection
} from "@patternfly/react-core";

import ContentHeader from "../components/page/ContentHeader";
import DisplayTable from "../components/DisplayTable"
import urlBuilder from "../hooks/urlBuilder";



const History = () => {

    const [ content_heading, setContentHeading ] = useState(null);

    const params = useParams();

    const url_builder = urlBuilder(
        params
    );

    return (
        <PageGroup>
        <ContentHeader
            content_heading={content_heading}
        />
            <PageSection
                aria-labelledby="page-content"
                isFilled={true}
            >
                <DisplayTable
                    callback={setContentHeading}
                    data_url_path={url_builder.params.module + '/' + url_builder.params.model + '/' + url_builder.params.pk + '/history'}
                />
            </PageSection>
        </PageGroup>
    );
}

export default History;
