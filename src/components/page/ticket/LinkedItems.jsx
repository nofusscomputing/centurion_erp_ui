import { useEffect, useState } from "react";
import { apiFetch } from "../../../hooks/apiFetch";

const LinkedItems = ({
    data_url = null
}) => {

    const [ page_data, setPageData ] = useState(null)

    useEffect(() => {

        apiFetch(
            data_url,
            (data) => {
                setPageData(data)
            }
        )
    }, [ data_url ])


    return (
        <section className="linked-items">
            <h3 className="linked-items">Linked Items</h3>
            {page_data &&
                page_data.results.map((linked_item) => {
                    return (<div className="item">{linked_item.display_name}</div>)
                })
            }
        </section>
    );
}
 
export default LinkedItems;