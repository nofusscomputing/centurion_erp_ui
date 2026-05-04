import {
    useEffect,
} from "react";

import {
    Link,
    useLoaderData,
    useOutletContext,
} from "react-router"

import {
    Card,
    CardBody,
    PageSection
} from "@patternfly/react-core";

import DisplayTable from "../components/DisplayTable"
import IconLoader from "../components/IconLoader";



const List = () => {

    const {
        setPageDescription, setPageHeading, setPageHeaderIcons
    } = useOutletContext()

    const {metadata, page_data} = useLoaderData();

    useEffect(() => {

        setPageHeading(metadata?.name)
        setPageDescription(metadata?.description)


        setPageHeaderIcons(
            <>
                {metadata?.['documentation'] &&
                    <Link to={metadata['documentation']} target="_new">
                        <IconLoader
                            name='help'
                            size="xl"
                            inline={false}
                        />
                    </Link>
                }
            </>
        );


    }, [ metadata ])


    return (
        <>
            { metadata && page_data &&
            <PageSection
                aria-labelledby="page-content"
                isFilled={true}
            >
                <Card isPlain>
                    <CardBody>
                        <DisplayTable
                            data_url_path={metadata.urls.self}
                            loader_metadata = {metadata}
                            loader_data = {page_data}
                        />
                    </CardBody>
                </Card>
            </PageSection>}
        </>
    );
}

export default List;
