/**
 * 
 * 
 * Depreciated. in favour of Root containing rhe header logic
 *  
 * 
 */

import {
    Divider,
    PageSection,
    Title
} from "@patternfly/react-core";



const ContentHeader = ({
    content_heading,
    content_header_icon = null,
    back_url = null,
    back_name = null
}) => {



    return (
        <>
        <PageSection
            aria-labelledby="content-header"
            isCenterAligned = {true}
            isFilled={false}
        >
            <div
                style={{
                    display: "flex",
                }}
            >
                <Title style={{ width: "50%"}} headingLevel="h2">{content_heading}</Title>
                <div style={{ width: "50%", textAlign: "right"}}>{content_header_icon}</div>
            </div>
            <Divider />
        </PageSection>
        </>
    );
}

export default ContentHeader;
