import { useId } from "react";
import FieldData from "../functions/FieldData";



const Badge = ({
    background = null,
    children = null,
    icon_style = null,
    message = null,
    text_style = null,

}) => {

    const badgeId = useId()
    const badgeTextId = useId()

    message = message ? message : '-'

    if( children ) {

        if( children.type?.name == "TicketStatusIcon" ) {

            message = FieldData({
                metadata: children.props.metadata,
                field_name:'status',
                data: children.props.page_data
            })

        }

    }


    let class_name = 'badge badge-icon '
    if( icon_style ) {

        class_name += ' icon ' + icon_style
    }

    let style = {
        backgroundColor: 'var(--background-colour-active)'
    }
    if( background ) {

        style = {
            backgroundColor: background
        }
    }

    text_style = 'badge-text ' + text_style
    if( text_style ) {
        text_style = text_style + ' ' + text_style
    }

    return (
        <span
            className={class_name}
            id={badgeId}
            style={style}
        >
            { children }
        <span className={text_style} id={badgeTextId}>{message}</span>
     </span>
    );
}

export default Badge
