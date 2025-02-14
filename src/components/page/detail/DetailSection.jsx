import { useEffect, useState } from "react";

import { Link } from "react-router";

import nunjucks from 'nunjucks'

import { apiFetch } from "../../../hooks/apiFetch";
import Badge from "../../Badge";
import DoubleColumn from "./DoubleColumn";
import IconLoader from "../../IconLoader";
import SingleColumn from "./SingleColumn";
import Table from "../../Table"
import Button from "../../form/Button";



const DetailSection = ({
    layout,
    data,
    metadata,
    tab,
    index = null,
}) => {

    const [external_links, setExternalLinks] = useState({})

    
    let column


    let textarea_fields = [
        'json',
        'markdown'
    ]

    if( layout.layout === 'double' ) {

        column = (
            <DoubleColumn
                data={data}
                metadata={metadata}
                left={layout.left}
                right={layout.right}
                textarea_fields = {textarea_fields}
            />
        )

    } else if( layout.layout === 'single' ) {

        column = (
            <SingleColumn
                data={data}
                metadata={metadata}
                fields={layout.fields}
                textarea_fields = {textarea_fields}
            />
        )

    } else if( layout.layout === 'table' ) {

        if( layout.field in data._urls ) {

            column = (
                <Table
                    data_url_path={String(data._urls[layout.field]).split('api/v2')[1]}
                />
            )
        } else {
            column = 'column data missing'
        }

    }

    useEffect(() => {

        if( index === 0 ) {

            if( 'external_links' in data._urls ) {

                apiFetch(
                    data._urls.external_links,
                    (response) =>{

                        setExternalLinks(response)

                    },
                )
            }
        }

    },[])

    let context = {}

    context[String(metadata.name).toLowerCase()] = data

    return (
        <div>

            <div className="content">

                <div className="section">

                    <h3
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <span
                            className="text"
                            style={{
                                flexGrow: '1'
                            }}
                        >

                            {'name' in layout ? layout.name : index === 0 ? tab.name : ''}

                        </span>

                        {Object.keys(external_links).length > 0 &&

                                (index === 0 && String(tab.name).toLowerCase() == 'details') &&
                                <span
                                    className="external-links"
                                    style={{
                                        alignSelf: 'flex-start',
                                        fontWeight: 'normal',
                                    }}
                                >

                                    {external_links.results.map((external_link) => (
                                    <Link to={nunjucks.renderString(external_link.display_name, context)} target="_blank">

                                        <Badge
                                            background = {external_link.colour ? external_link.colour : 'var(--contrasting-colour)'}
                                            message = {external_link.button_text ? external_link.button_text : external_link.name}
                                        >

                                            <IconLoader name={'link'} fill="var(--background-colour-active)" height='15px' width='15px'/>

                                        </Badge>

                                    </Link>))}

                                </span>
                        }
                    </h3>

                    {column}

                    {(
                        index === 0
                        && String(tab.name).toLowerCase() == 'details'
                        && metadata.allowed_methods.includes('PUT')
                    ) &&

                    <Link 
                        to={
                            metadata.urls.return_url ?
                            String(metadata.urls.return_url).split('api/v2')[1] + '/edit'
                            : String(metadata.urls.self).split('api/v2')[1] + '/edit'

                        }
                        style={{
                            width: 'fit-content'
                        }}
                    >

                        <Button
                            button_text = "Edit"
                        />

                    </Link>}
                </div>
            </div>
        </div>
    );
}

export default DetailSection;
