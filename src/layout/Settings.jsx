import { Link, useLoaderData, useParams } from "react-router-dom"
import { useEffect, useState } from "react";

import { apiFetch } from "../hooks/apiFetch";
import Card from "../components/page/Card";
import IconLoader from "../components/IconLoader";



const Settings = ({
    setContentHeading,
    SetContentHeaderIcon = null
}) => {

    const params = useParams();
    setContentHeading('Settings')
    SetContentHeaderIcon('')

    const page_data = useLoaderData();

    const [metadata, setMetaData] = useState(null);

    useEffect(() => {

        apiFetch(
            '/settings',
            (data) =>{

                setMetaData(data)

                SetContentHeaderIcon(
                    <>
                        {data['documentation'] &&
                            <Link to={data['documentation']} target="_new">
                                <IconLoader
                                    name='help'
                                />
                            </Link>
                        }
                    </>
                )
            },
            'OPTIONS'
        )
    },[])


    return (
        <div className="cards">

            {metadata &&
                metadata.layout.map((card) => {
                    return(
                        <Card 
                            heading={card.name}
                            body={(
                                <ul>
                                    {card.links.map((link) => {
                                        return (<li><a href={"/settings/" + link.model}>{link.name}</a></li>)
                                    })}
                                </ul>
                            )}
                        />
                    )
                })
            }

        </div>
        
    );
}

export default Settings;
