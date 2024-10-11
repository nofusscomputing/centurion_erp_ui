import { Link, redirect, useLocation, useNavigate, useParams } from "react-router-dom";
import IconLoader from "../IconLoader";
import { useEffect, useState } from "react";
import { ResponseException } from "../../classes/Exceptions";
import { apiFetch } from "../../hooks/apiFetch";



const Navbar = ({
    nav_visible,
}) => {

    const params = useParams();

    const [ navigation, SetNavigationEntries ] = useState(null)

    const [ nav_menu, setNavMenu ] = useState(null);

    const [ nav_page, setNavPage ] = useState(null);

    const location = useLocation();

    const navigate = useNavigate();

    useEffect(() => {

        let response = apiFetch(
            '',
            (data) => {

                SetNavigationEntries(data.navigation)

                if( params.module ){

                    setNavMenu(params.module);

                }

                if( params.model ) {

                    setNavPage(String(params.module + '-' + params.model))

                }
            },
            'OPTIONS'
        )

            .then(response => {

                console.log(`the data returned`)

                if( response.status === 401 ) {
                    navigate('/login')
                }
            })

    },[])


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
                                            name = {String(module.display_name)}
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
                                                    name = {String(page.display_name)}
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
