import { useParams } from "react-router-dom"

import Table from "../components/Table"



const List = ({
    setContentHeading,
    SetContentHeaderIcon = null
}) => {

    const params = useParams();
    SetContentHeaderIcon('')

    return (
        <section>
            <div className="content">
                <Table
                    callback={setContentHeading}
                    data_url_path={params.module + '/' + params.model}
                />
            </div>
        </section>
    );
}

export default List;
