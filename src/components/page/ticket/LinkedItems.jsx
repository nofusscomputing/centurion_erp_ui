import { useEffect, useState } from "react";
import { apiFetch } from "../../../hooks/apiFetch";
import RenderMarkdown from "../../../functions/RenderMarkdown";

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
                    return (
                        <div className="item">
                            <div className="markdown align-center">
                                <RenderMarkdown
                                    class='align-center'
                                >
                                    {linked_item.display_name}
                                </RenderMarkdown>
                            </div>
                        </div>)
                })
            }
        </section>
    );
}
 
export default LinkedItems;