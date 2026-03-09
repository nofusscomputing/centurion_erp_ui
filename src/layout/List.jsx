import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useLoaderData,
    useParams
} from "react-router"

import {
    Card,
    CardBody,
    PageGroup,
    PageSection
} from "@patternfly/react-core";

import ContentHeader from "../components/page/ContentHeader";
import DisplayTable from "../components/DisplayTable"
import IconLoader from "../components/IconLoader";



const List = () => {

    const [ content_heading, setContentHeading ] = useState(null)
    const [ content_header_icon, SetContentHeaderIcon ] = useState(null)

    const params = useParams();

    const {metadata, page_data} = useLoaderData();

    useEffect(() => {

        document.title = `${metadata.name}`
        setContentHeading(metadata.name)


        SetContentHeaderIcon(
            <>
                {metadata['documentation'] &&
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
                            data_url_path={metadata.urls.self}
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
