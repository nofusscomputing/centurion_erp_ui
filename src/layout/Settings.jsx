
import {
    useEffect,
} from "react";

import {
    Link,
    useLoaderData,
    useOutletContext,
} from "react-router"

import Card from "../components/page/Card";
import IconLoader from "../components/IconLoader";
import URLSanitize from "../functions/URLSanitize";



const Settings = () => {

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
        <>
        <div className="cards">

            {metadata &&
                metadata.layout.map((card) => {
                    return(
                        <Card 
                            heading={card.name}
                            body={(
                                <ul>
                                    {card.links.map((link) => {
                                        return (<li><Link to={URLSanitize(page_data[link.model])}>{link.name}</Link></li>)
                                    })}
                                </ul>
                            )}
                        />
                    )
                })
            }

        </div>
        </>
    );
}

export default Settings;
