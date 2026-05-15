
import React, { useEffect, useState } from "react";

import { PageSection } from "@patternfly/react-core";


import IconLoader from "../IconLoader";



/**
 * @summary Props for the Footer Component
 * 
 * @category Props
 * @since 0.1.0
 */
export type FooterProps = {
    
    /**
     * Version data for the API that's in use
     */
    api_version_data
}



/**
 * This component is the sites footer that is intended to be rendered on
 * every page.
 * 
 * @summary Site Footer
 * 
 * @category Component
 * @since 0.1.0
 */
const Footer = ({
    api_version_data
}: FooterProps): React.JSX.Element => {

    const [api_version, SetAPIVersion] = useState<string|React.JSX.Element>(null)

    useEffect(() => {

        let api_version: string | React.JSX.Element = 'API release: '

        if( api_version_data ) {

            if( api_version_data.version ) {

                api_version += api_version_data.version
            }

            if( api_version_data.sha ) {


                if( api_version_data.project_url ) {

                    const sha_url = api_version_data.project_url + '/commit/' + api_version_data.sha

                    api_version = (
                        <>
                        {api_version} (<a href={sha_url} target="_blank">{api_version_data.sha}</a> )
                        </>
                    )

                }

            }

        } else {
            api_version = `${api_version} unknown`
        }

        SetAPIVersion(api_version)


    },[
        api_version_data
    ])

    let ui_version: string | React.JSX.Element = 'UI release: '

    if( window.env.CI_COMMIT_TAG ) {

        ui_version += window.env.CI_COMMIT_TAG

    }else{

        ui_version += 'development'
    }

    if( window.env.CI_COMMIT_SHA ) {

        if( window.env.CI_PROJECT_URL ) {

            const sha_url = window.env.CI_PROJECT_URL + '/commit/' + window.env.CI_COMMIT_SHA

            ui_version = (
                <>
                {ui_version} (<a href={sha_url} target="_blank">{window.env.CI_COMMIT_SHA}</a> )
                </>
            )

        }

    }


    return (
        <PageSection
            aria-labelledby="page-footer"
            isFilled={false}
            variant="secondary"
        >
            <footer
                style={{
                    display: "flex",
                }}
            >
                <div
                    className="column left footer-icons"
                    style={{
                        width: "33%"
                    }}
                >
                    <a href="https://nofusscomputing.com/projects/centurion_erp/" target="_blank"><IconLoader size="xl" name = 'documentation' /></a>
                    <a href={window.env.API_URL} target="_blank"><IconLoader name = 'webhook' size="xl"/></a>
                    <a href={`${window.env.API_URL}/docs`} target="_blank"><IconLoader size="xl" name = 'swagger_docs' /></a>
                    <a href="https://github.com/nofusscomputing/centurion_erp" target="_blank"><IconLoader name = 'git' size="xl" /></a>
                </div>
                <div
                    className="column center"
                    style={{
                        width: "33%"
                    }}
                >
                    Centurion ERP brought to you by <a href="https://nofusscomputing.com" target="new">No Fuss Computing</a></div>
                <div
                    className="column right"
                    style={{
                        textAlign: "right",
                        width: "33%"
                    }}
                >
                    {api_version}<br />{ui_version}
                </div>
            </footer>
        </PageSection>
     );
}
 
export default Footer;