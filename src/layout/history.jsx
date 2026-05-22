import {
    useLoaderData,
    useOutletContext,
} from "react-router"

import {
    PageSection
} from "@patternfly/react-core";

import DisplayTable from "../components/DisplayTable"
import URLSanitize from "../functions/URLSanitize";



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
            {metadata && page_data && <DisplayTable
                callback={setPageHeading}
                data_url_path={URLSanitize(String(metadata.urls.self))}
                loader_data={page_data}
                loader_metadata={metadata}
            />}
        </PageSection>
    );
}

export default History;
