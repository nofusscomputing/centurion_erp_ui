const ContentHeader = ({
    content_heading,
    content_header_icon = null,
}) => {
    return (
        <div className="content-header">
            <div className="column left">&nbsp;</div>
            <h2 className="column center">{content_heading}</h2>
            <div className="column right">
                {content_header_icon}
            </div>
        </div>
    );
}
 
export default ContentHeader;