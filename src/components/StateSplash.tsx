import { EmptyState, Spinner } from "@patternfly/react-core";
import React from "react";



/**
 * 
 * @summary Loading Spinner
 * 
 * @category Component
 * @since 0.13.0
 */
const LoadingSpinner = ({
    titleText = "Loading"
}): React.JSX.Element => {

    return (
        <EmptyState titleText = {titleText} headingLevel="h4" icon={Spinner} />
    );
}

export default LoadingSpinner
