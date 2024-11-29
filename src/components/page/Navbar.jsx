import { Link, redirect, useLocation, useNavigate, useParams } from "react-router";
import IconLoader from "../IconLoader";
import { useEffect, useState } from "react";
import { ResponseException } from "../../classes/Exceptions";
import { apiFetch } from "../../hooks/apiFetch";
import urlBuilder from "../../hooks/urlBuilder";



const Navbar = ({
    nav_visible,
}) => {

    const params = useParams();

    const [ navigation, SetNavigationEntries ] = useState(null)

    const [ nav_menu, setNavMenu ] = useState(null);

    const [ nav_page, setNavPage ] = useState(null);

    const location = useLocation();

    const url_builder = urlBuilder(
        params
    )

    const navigate = useNavigate();

    useEffect(() => {

        let response = apiFetch(
            '',
            (data) => {

                SetNavigationEntries(data.navigation)

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


        setNavMenu(url_builder.params.module);

        setNavPage(String(url_builder.params.module + '-' + url_builder.params.model))


    }, [
        url_builder.params.module,
        url_builder.params.model,
    ])


    if( nav_visible ) {
        
        return (
            <div id="navigation" key={'navigation'} className="nav">
            <nav>
                {navigation != null && navigation.map((module, index) =>{

                    const paths = String(location.pathname).split('/')

                    return(
                        <div className="group">
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
                                            className={nav_page === module.name.toLowerCase()+'-'+page.name.toLowerCase() ? 'page active' : 'page'}
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
