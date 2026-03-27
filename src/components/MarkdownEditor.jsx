import {
    useState
} from "react";

import {
    Tab,
    TabContentBody,
    Tabs,
    TabTitleText,
    TextArea
} from "@patternfly/react-core";

import RenderMarkdown from "../functions/RenderMarkdown";



/** Markdown Field with Editor and Preview tab.
 *
 * This component is intended to act as if its a HTML TextArea field in so far
 * as the data and HTML form are concerned. Everything else related to the
 * markdown itself is contained within this component.
 * 
 * @param {object} params
 * @param {string} params.ariaLabel Label for the form field.
 * @param {boolean} params.grow Allow the editable text area to grow for every line.
 * @param {boolean} [params.isRequired=false] Form field is mandatory.
 * @param {String} params.id Form field id.
 * @param {String} params.name Form field name.
 * @param {object} params.objectData Object data as provided by the API.
 * @param {(e) => void} params.onChange Callback to run when field value changes.
 * @param {boolean} params.readOnly Is the form field read-only?
 * @param {"vertical" | "horizontal" | "both" } [params.resizeOrientation="vertical"] Allow User to resize in specified direction.
 * @param {string} params.value Current value of the field.
 * 
 * @returns TextArea HTML form field for editing and previewing markdown.
 */
const MarkdownEditor = ({
    ariaLabel = null,
    grow = false,
    isRequired = false,
    id,
    name,
    objectData = null,
    onChange = null,
    readOnly = false,
    resizeOrientation = "vertical",
    value = null,
}) => {


    const [activeTabKey, setActiveTabKey] = useState(0);

    const handleTabClick = (event, tabIndex) => {

        setActiveTabKey(tabIndex);

    };



    return (
        <Tabs
            activeKey = {activeTabKey}
            onSelect = {handleTabClick}
            aria-label = "Markdown edit and preview tabs"
            role = "region"
            unmountOnExit
        >
            <Tab
                aria-label = "Edit"
                eventKey = {0}
                title = {<TabTitleText>Edit</TabTitleText>}
            >
                <TabContentBody hasPadding>
                    <TextArea
                        aria-label = {ariaLabel}
                        isRequired = {isRequired}
                        id = {id}
                        key = {name}
                        name = {name}
                        onChange = {onChange}

                        onClick={(e) =>{

                            if( !grow ) return;


                            if( e.target.scrollHeight > e.target.clientHeight) {

                                e.target.style.height = ( 25 + e.target.scrollHeight ) + "px";

                            }

                        }}

                        onKeyUp={(e) =>{

                            if( !grow ) return;

                            const currentScrollY = window.scrollY

                            if( e.code === 'Enter'  && ! e.ctrlKey) {

                                e.target.style.height = ( 25 + e.target.scrollHeight ) + "px";

                            } else if( e.code === 'Enter' && e.ctrlKey ) {    // Enable ctrl-enter to be used to submit

                                e.target.form.requestSubmit()

                            }

                            window.scrollTo(0, currentScrollY);    // Prevent window scrolling to y=0

                        }}

                        readOnly = {readOnly}
                        resizeOrientation = {resizeOrientation}
                        value = {value}
                    />
                </TabContentBody>
            </Tab>
            <Tab
                aria-label = "Preview"
                eventKey = {1}
                title = {<TabTitleText>Preview</TabTitleText>}
            >
                <TabContentBody hasPadding>
                    {value &&
                    <RenderMarkdown
                        full_width={true}
                        env={objectData?.[name]?.render ?? {}}
                    >
                        {value}
                    </RenderMarkdown>
                    }
                </TabContentBody>
            </Tab>
        </Tabs>
    );

}
 
export default MarkdownEditor;
