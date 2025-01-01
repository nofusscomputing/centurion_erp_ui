import { useLoaderData, useParams } from "react-router"

import Table from "../components/Table"
import urlBuilder from "../hooks/urlBuilder";
import { useEffect, useState } from "react";



const List = ({
    setContentHeading,
    SetContentHeaderIcon = null
}) => {

    const params = useParams();
    SetContentHeaderIcon('')

    const url_builder = urlBuilder(
        params
    )

    const {metadata, page_data} = useLoaderData();

    return (
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
    );
}

export default List;
