import { useLoaderData, useParams } from "react-router"

import Table from "../components/Table"
import { useEffect, useState } from "react";
import ContentHeader from "../components/page/ContentHeader";



const List = () => {

    const [ content_heading, setContentHeading ] = useState(null)
    const [ content_header_icon, SetContentHeaderIcon ] = useState(null)

    const params = useParams();

    const {metadata, page_data} = useLoaderData();

    return (
        <>
        <ContentHeader
            content_heading={content_heading}
            content_header_icon={content_header_icon}
        />
        { metadata &&
        <section>
            <div className="content">
                <Table
                    callback={setContentHeading}
                    data_url_path={metadata.urls.self}
                    SetContentHeaderIcon = {SetContentHeaderIcon}
                    loader_metadata = {metadata}
                    loader_data = {page_data}
                />
            </div>
        </section>}
        </>
    );
}

export default List;
