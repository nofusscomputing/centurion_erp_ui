import {
    useLoaderData,
    useOutletContext,
} from "react-router"

import {
    PageSection
} from "@patternfly/react-core";

import DisplayTable from "../components/DisplayTable"



const History = () => {

    const {
        setPageDescription, setPageHeading, setPageHeaderIcons
    } = useOutletContext()

    const {metadata, page_data} = useLoaderData();

    return (
        <PageSection
            aria-labelledby="page-content"
            isFilled={true}
        >
            {metadata && <DisplayTable
                callback={setPageHeading}
                data_url_path={String(metadata.urls.self).split('api/v2')[1]}
                loader_data={page_data}
                loader_metadata={metadata}
            />}
        </PageSection>
    );
}

export default History;
