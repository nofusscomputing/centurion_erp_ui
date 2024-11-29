import { Link, useLoaderData, useParams } from "react-router"
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
                                        return (<li><Link to={String(page_data[link.model]).split('api/v2')[1]}>{link.name}</Link></li>)
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
