import { useParams } from "react-router-dom"

import Table from "../components/Table"
import urlBuilder from "../hooks/urlBuilder";



const List = ({
    setContentHeading,
    SetContentHeaderIcon = null
}) => {

    const params = useParams();
    SetContentHeaderIcon('')

    const url_builder = urlBuilder(
        params
    )

    return (
        <section>
            <div className="content">
                <Table
                    callback={setContentHeading}
                    data_url_path={url_builder.api.path}
                    SetContentHeaderIcon = {SetContentHeaderIcon}
                />
            </div>
        </section>
    );
}

export default List;
