import {
    useState
} from "react";

import {
    CodeBlock,
    CodeBlockCode,
    EmptyState,
    EmptyStateBody,
    EmptyStateFooter,
    EmptyStateStatus,
    EmptyStateVariant,
    ExpandableSection,
    Spinner,
} from "@patternfly/react-core";

import {
    CubesIcon,
    RhUiErrorFillIcon,
    RhUiWarningFillIcon,
    SearchIcon
} from "@patternfly/react-icons";


// import CubesIconsvg from "@patternfly/react-icons/dist/static/cubes.svg"



const icons = {
    cubes: CubesIcon,
    danger: RhUiErrorFillIcon,
    search: SearchIcon,
    spinner: Spinner,
    warning: RhUiWarningFillIcon,
}



/**
 * Icon selections for {@link StateSplash}
 * 
 * @summary Available State Icons
 * 
 * @category Enum
 * @since 0.13.0
 */
export enum StateIcon {

    /**
     * Denotes an error.
     */
    danger = 'danger',

    /**
     * Use for state that is empty.
     */
    empty = 'cubes',

    /**
     * Denotes loading.
     */
    loading = 'spinner',

    /**
     * Denotes Search related.
     */
    search = 'search',

    /**
     * Denotes a warning.
     */
    warning = 'warning'

}



/**
 * These props are for {@link StateSplash}.
 * 
 * @summary Props for {@link StateSplash}
 * 
 * @category Props
 * @expandType StateIcon
 * @since 0.13.0
 */
export interface StateProps {

    /**
     * Text to use as a description
     */
    body?: string
    /**
     * Text to use for the state title.
     */
    titleText: string

    /**
     * Icon to display. There are occasions, that regardless of the value
     * supplied to this prop, its value will be automatically set, they are:
     * 
     * - {@link stackTrace} has a value, this to
     * {@link EmptyStateStatus.danger}
     * 
     */
    icon?: StateIcon

    /**
     * Stack trace message. When this prop is provided with a value, the icon
     * is set to {@link StateIcon.danger}
     */
    stackTrace?: string

    /**
     * Type of State. There are occasions, that regardless of the value
     * supplied to this prop, its value will be automatically set, they are:
     * 
     * - {@link icon} has been set to {@link StateIcon.danger} will set this to
     * {@link EmptyStateStatus.danger}
     * 
     * - {@link icon} has been set to {@link StateIcon.warning} will set this to
     * {@link EmptyStateStatus.warning}
     * 
     * @expandType EmptyStateStatus
     */
    status?: EmptyStateStatus
}



/**
 * A Splash for displaying the status of state. State in this case is
 * the object from a backend. This splash provides a visual representation as
 * well as being a placeholder for state.
 * 
 * It is not the intent that this component be used for opportunistic UI, That
 * is what skeletons are for. State splash should only be used for route
 * hydration or as the final result of state. i.e. Nothing was found, error
 * occurred etc.
 * 
 * @example
 * 
 * Example of loading spinner.
 * 
 * ``` js
 * 
 * <StateSplash
 *      titleText = "Loading Data"
 *      icon = {StateIcon.loading}
 * />
 * 
 * ```
 * 
 * Example of an error.
 * 
 * ``` js
 * 
 * <StateSplash
 *      body = {Exception.message}
 *      icon = {StateIcon.danger}
 *      stackTrace = {Exception.stack}
 *      titleText = "An Error Occurred"
 * />
 * 
 * ```
 * 
 * @summary State splash
 * 
 * @category Component
 * @expandType StateProps
 * @since 0.13.0
 */
const StateSplash = ({
    titleText = "Empty",
    body = null,
    icon = StateIcon.empty,
    stackTrace = null,
    status = null
}: StateProps): React.JSX.Element => {

    const [isExpanded, setIsExpanded] = useState(false);

    const onToggle = (_event: React.MouseEvent, isExpanded: boolean) => {
        setIsExpanded(isExpanded);
    };


    if( stackTrace ) {

        icon = StateIcon.danger
    }


    if( icon === StateIcon.danger ) {

        status = EmptyStateStatus.danger;

    } else if( icon === StateIcon.warning ) {

        status = EmptyStateStatus.warning;

    }


    return (
        <EmptyState
            headingLevel="h4"
            icon={icons[icon]}
            status={status}
            titleText = {titleText}
            variant={ stackTrace ? EmptyStateVariant.full : EmptyStateVariant.sm }
        >

            {(body || stackTrace) && <EmptyStateBody>
                {body}
                <br />
                { stackTrace && <ExpandableSection
                    toggleText={isExpanded ? 'Hide details' : 'Show details'}
                    onToggle={onToggle}
                    isExpanded={isExpanded}
                >

                    <CodeBlock
                        style={{
                            textAlign: "left"
                        }}
                    >
                        <CodeBlockCode>
                            {stackTrace}
                        </CodeBlockCode>
                    </CodeBlock>

                </ExpandableSection>}

            </EmptyStateBody>}

            <EmptyStateFooter>

            </EmptyStateFooter>

        </EmptyState>
    );
}

export default StateSplash
