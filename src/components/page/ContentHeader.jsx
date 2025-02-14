import { useId } from "react";


const ContentHeader = ({
    content_heading,
    content_header_icon = null,
}) => {

    const contentHeaderId = useId();
    const contentHeaderColumnLeftId = useId();
    const contentHeaderColumnCenterId = useId();
    const contentHeaderColumnRightId = useId();
    const contentHeaderIconsId = useId();


    return (
        <div id={contentHeaderId} className="header" style={{
            backgroundColor: "var(--background-colour-active)",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            minHeight: "80px",
            marginBottom: ".8rem"
        }}>
            <div id={contentHeaderColumnLeftId} className="column left">&nbsp;</div>
            <h2 id={contentHeaderColumnCenterId} className="column center">{content_heading}</h2>
            <div id={contentHeaderColumnRightId} className="column right">
                <span id={contentHeaderIconsId} className="inline icon">{content_header_icon}</span>
            </div>
        </div>
    );
}

export default ContentHeader;
