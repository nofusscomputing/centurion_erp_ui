
import {
    useEffect,
} from "react";

import {
    Link,
    useLoaderData,
    useOutletContext,
} from "react-router"

import IconLoader from "../components/IconLoader";
import URLSanitize from "../functions/URLSanitize";
import { Card, CardBody, CardTitle, Gallery, PageSection } from "@patternfly/react-core";


/**
 * 
 * @summary Settings layout compontnt
 * 
 * @category Layout
 * @since 0.1.0
 */
const Settings = (): React.JSX.Element => {

    const {metadata, page_data} = useLoaderData();

    const {
        setPageDescription, setPageHeading, setPageHeaderIcons
    } = useOutletContext()


    useEffect(() => {

        setPageHeading('Settings')
        setPageDescription(metadata.description)

        setPageHeaderIcons(
            <>
                {metadata['documentation'] &&
                    <Link to={metadata['documentation']} target="_new">
                        <IconLoader
                            name='help'
                        />
                    </Link>
                }
            </>
        )

    },[])


    return (
        <PageSection
            isFilled = {true}
        >

            {metadata && page_data &&

                <Gallery hasGutter role="region" aria-label="Selectable card container">
                    {metadata.layout.map((card) => {
                        return (
                            <Card>
                            <CardTitle>{card.name}</CardTitle>
                            <CardBody>
                                <ul>
                                    {card.links.map((link) => 
                                        (<li><Link to={URLSanitize(page_data[link.model])}>{link.name}</Link></li>)
                                    )}
                                </ul>
                            </CardBody>
                            </Card>
                        );
                    })}
                </Gallery>

            }

        </PageSection>
    );
}

export default Settings;
