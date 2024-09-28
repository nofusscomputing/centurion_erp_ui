import { useParams } from "react-router-dom"

import Table from "../components/Table"



const List = ({
    setContentHeading
}) => {

    const params = useParams();

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
