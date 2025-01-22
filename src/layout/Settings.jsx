import { Link, useLoaderData, useParams } from "react-router"
import { useEffect, useState } from "react";

import { apiFetch } from "../hooks/apiFetch";
import Card from "../components/page/Card";
import IconLoader from "../components/IconLoader";
import ContentHeader from "../components/page/ContentHeader";



const Settings = () => {

    const [ content_heading, setContentHeading ] = useState(null)
    const [ content_header_icon, SetContentHeaderIcon ] = useState(null)

    const params = useParams();
    

    const {metadata, page_data} = useLoaderData();

    useEffect(() => {

        setContentHeading('Settings')

        SetContentHeaderIcon(
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
        <ContentHeader
            content_heading={content_heading}
            content_header_icon={content_header_icon}
        />
        <div className="cards">

            {metadata &&
                metadata.layout.map((card) => {
                    return(
                        <Card 
                            heading={card.name}
                            body={(
                                <ul>
                                    {card.links.map((link) => {
                                        return (<li><Link to={String(page_data[link.model]).split('api/v2')[1]}>{link.name}</Link></li>)
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
