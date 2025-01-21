import { useLoaderData, useParams } from "react-router"

import Table from "../components/Table"
import urlBuilder from "../hooks/urlBuilder";
import { useEffect, useState } from "react";
import ContentHeader from "../components/page/ContentHeader";



const List = () => {

    const [ content_heading, setContentHeading ] = useState(null)
    const [ content_header_icon, SetContentHeaderIcon ] = useState(null)

    const params = useParams();
    const url_builder = urlBuilder(
        params
    )

    const {metadata, page_data} = useLoaderData();

    return (
        <>
        <ContentHeader
            content_heading={content_heading}
            content_header_icon={content_header_icon}
        />
        <section>
            <div className="content">
                <Table
                    callback={setContentHeading}
                    data_url_path={url_builder.api.path}
                    SetContentHeaderIcon = {SetContentHeaderIcon}
                    loader_metadata = {metadata}
                    loader_data = {page_data}
                />
            </div>
        </section>
        </>
    );
}

export default List;
