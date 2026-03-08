import { useEffect, useState } from "react";

import { Link } from "react-router";

import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@patternfly/react-core";


import nunjucks from 'nunjucks'

import { apiFetch } from "../../../hooks/apiFetch";
import Badge from "../../Badge";
import Button from "../../form/Button";
import DoubleColumn from "./DoubleColumn";
import IconLoader from "../../IconLoader";
import SingleColumn from "./SingleColumn";
import DisplayTable from "../../Table"



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
                <DisplayTable
                    data_url_path={String(data._urls[layout.field]).split('api/v2')[1]}
                    add_button_filter = {layout?.sub_models ? layout.sub_models : []}
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
        <Card isPlain>

            <CardHeader
                actions={{
                    actions: (Object.keys(external_links).length > 0 &&

                        (index === 0 && String(tab.name).toLowerCase() == 'details') &&

                            external_links.results.map((external_link) => (
                            <Link to={nunjucks.renderString(external_link.display_name, context)} target="_blank">

                                <Badge
                                    background = {external_link.colour ? external_link.colour : 'var(--contrasting-colour)'}
                                    message = {external_link.button_text ? external_link.button_text : external_link.name}
                                >

                                    <IconLoader name={'link'} fill="var(--background-colour-active)" height='15px' width='15px'/>

                                </Badge>

                            </Link>))

                    ), 
                    hasNoOffset: false
                }}
            >

                <CardTitle>{'name' in layout ? layout.name : index === 0 ? tab.name : ''}</CardTitle>

            </CardHeader>

            <CardBody>{column}</CardBody>

            <CardFooter>
                {(
                    index === 0
                    && String(tab.name).toLowerCase() == 'details'
                    && metadata.allowed_methods.includes('PUT')
                ) &&

                <Link 
                    to={
                        String(metadata.urls.self).split('api/v2')[1] + '/edit'
                    }
                    style={{
                        width: 'fit-content'
                    }}
                >

                    <Button
                        button_text = "Edit"
                    />

                </Link>}
            </CardFooter>
        </Card>
    );
}

export default DetailSection;
