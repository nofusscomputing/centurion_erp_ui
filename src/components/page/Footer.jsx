import { useEffect, useState } from "react";
import IconLoader from "../IconLoader";

const Footer = ({
    api_version_data
}) => {

    const [api_version, SetAPIVersion] = useState(null)

    useEffect(() => {

        if( api_version_data ) {

            let api_version = 'API release: '

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

            SetAPIVersion(api_version)

        }


    },[
        api_version_data
    ])

    let ui_version = 'UI release: '

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
        <footer>
            <div className="column left footer-icons">
                <a href="https://nofusscomputing.com/projects/centurion_erp/" target="_blank"><IconLoader name = 'documentation' /></a>
                <a href="/api/v2" target="_blank"><IconLoader name = 'webhook' /></a>
                <a href="/api/v2/docs" target="_blank"><IconLoader name = 'swagger_docs' /></a>
                <a href="https://github.com/nofusscomputing/centurion_erp" target="_blank"><IconLoader name = 'git' /></a>
            </div>
            <div className="column center">Centurion ERP brought to you by <a href="https://nofusscomputing.com" target="new">No Fuss Computing</a></div>
            <div className="column right">{api_version}<br />{ui_version}</div>
        </footer>
     );
}
 
export default Footer;