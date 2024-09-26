import { Link, useLocation } from "react-router-dom";
import IconLoader from "../IconLoader";
import { useEffect, useState } from "react";
import { ResponseException } from "../../classes/Exceptions";



const Navbar = ({
    nav_visible,
}) => {

    const [ menu_entries, SetMenuEntries ] = useState(null)

    const [ nav_menu, setNavMenu ] = useState(null);

    const [ nav_page, setNavPage ] = useState(null);

    const location = useLocation();

    useEffect(() => {

        fetch('http://localhost:8003/api/options/navigation')

            .then(response => {

                if( ! response.ok ) {

                    throw new ResponseException(response)

                }

                return response.json()
            
            })
            
            .then(data => {
            
                SetMenuEntries(data)
            
            })

            .catch(err => {

                throw Error(err)

            })
    },[])


    if( nav_visible ) {
        
        return (
            <div id="navigation" key={'navigation'} className="nav">
            <nav>
                {menu_entries!= null && menu_entries.map((module, index) =>{

                    const paths = String(location.pathname).split('/')

                    if(
                        module.name.toLowerCase() === paths[1] &&
                        nav_menu === null

                    ) {

                        setNavMenu(module.name.toLowerCase())

                    }

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
                                <span className="text">{module.name}</span>
                                <span className="menu-icon">{
                                    nav_menu === module.name.toLowerCase() ?
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
                            {nav_menu === module.name.toLowerCase() &&
                            
                                <div id={module.name.toLowerCase()+'-'+index} className="sub-menu">
                                {module.pages.map((page) => {

                                    if(
                                        location.pathname === page.link &&
                                        nav_page === null

                                    ) {

                                        setNavPage(module.name.toLowerCase()+'-'+page.name.toLowerCase())

                                    }

                                        return(
                                            <Link to={ page.link }><div
                                                className={nav_page === module.name.toLowerCase()+'-'+page.name.toLowerCase() ? 'page active' : 'page'}
                                                onClick={()=> setNavPage(module.name.toLowerCase()+'-'+page.name.toLowerCase())}
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
                                                    { page.name }
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
