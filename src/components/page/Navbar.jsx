import { Link, redirect, useLocation, useNavigate, useParams } from "react-router";
import IconLoader from "../IconLoader";
import { useEffect, useState } from "react";
import { apiFetch } from "../../hooks/apiFetch";



const Navbar = ({
    nav_visible,
    api_version_callback
}) => {

    const params = useParams();

    const [ navigation, SetNavigationEntries ] = useState(null)

    const [ nav_menu, setNavMenu ] = useState(null);

    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {

        let response = apiFetch(
            '',
            (data) => {

                SetNavigationEntries(data.navigation)

                api_version_callback(data.version)

            },
            'OPTIONS'
        )

            .then(response => {

                if( response.status === 401 ) {
                    navigate('/login')
                }
            })

    },[])

    useEffect(() => {

        if( navigation ) {

            for(let menu of navigation) {

                for(let page of menu.pages) {

                    if( String(location.pathname).startsWith( page.link ) ) {

                        setNavMenu(menu.name);

                    }

                }

            }
        }

    }, [
        location.pathname,
        navigation,
    ])


    if( nav_visible ) {
        
        return (
            <div id="navigation" key={'navigation'} className="nav">
            <nav>
                {navigation != null && navigation.map((module, index) =>{

                    const paths = String(location.pathname).split('/')

                    return(
                        <div key={'menu-' + module.name} className="group">
                            <div id={module.name+'-'+index} className="menu" onClick={()=> setNavMenu(
                                (module.name.toLowerCase() === nav_menu ? null : module.name.toLowerCase())
                            )}>

                                <span className="icon">
                                    { 'icon' in module ? 
                                        <IconLoader
                                            name = {String(module.icon)}
                                        />
                                        : 
                                        <IconLoader
                                            name = {String(module.name)}
                                        />
                                    }
                                </span>
                                <span className="text">{module.display_name}</span>
                                <span className="menu-icon">{
                                    nav_menu === module.name ?
                                    <IconLoader
                                        name='navdown'
                                        height = '25px'
                                        width = '25px'
                                    />
                                    :
                                    <IconLoader
                                        name='navright'
                                        height = '25px'
                                        width = '25px'
                                    />
                                }</span>
                            </div>
                            {nav_menu === module.name &&
                            
                                <div id={module.module+'-'+index} className="sub-menu">
                                {module.pages.map((page) => {

                                    return(
                                        <Link to={ page.link }><div
                                            className={String(location.pathname).startsWith( page.link ) ? 'page active' : 'page'}
                                        >
                                            <span className="icon">
                                            { 'icon' in page ? 
                                                <IconLoader
                                                    name = {String(page.icon)}
                                                />
                                                : 
                                                <IconLoader
                                                    name = {String(page.name)}
                                                />
                                            }
                                            </span>
                                            <span className="text">
                                                { page.display_name }
                                            </span>
                                        </div></Link>
                                    )
                                })}
                                </div>
                            }
                        </div>
                    )
                })}
            </nav>
            </div>
        );
    }
}
 
export default Navbar;
