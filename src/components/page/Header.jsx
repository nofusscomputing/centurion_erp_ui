import { Link } from "react-router";
import IconLoader from "../IconLoader";
import Slider from "../form/Slider";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../hooks/UserContext";
import Menu from "../form/Menu";

import person_72dp from "../../images/person_72dp.png"



const Header = ({
    nav_visible,
    setNavVisible
}) => {

    let [dark_theme, setThemeDark] = useState(false)

    const user = useContext(UserContext)

    useEffect(() => { // AutoMagic set based off of user preferences

        if( Number(user.settings.browser_mode) === 2 ) {

            document.documentElement.setAttribute(
                'data-theme',
                'dark'
            )
            setThemeDark(true)

        } else if( Number(user.browser_mode) === 3 ) {

            document.documentElement.setAttribute(
                'data-theme',
                'light'
            )
            setThemeDark(false)

        }

    }, [
        user.settings.browser_mode
    ])

    const userAvatar = () => {

        return(
            <img 
                alt = "avatar"
                className = "avatar"
                src = {person_72dp}
                style={{
                    cursor: "Pointer",
                }}
                title={user.user.display_name}
            />
        )
    }


    const user_menu = () => {

        return (
            (user && user.user.display_name && user.settings._urls) && 
            <>
                <Menu
                    element = {userAvatar()}
                    style_menu = {{
                        marginTop: '25px',
                    }}
                    style_dropdown_menu = {{
                        marginTop: "40px",
                    }}
                    width = "150px"
                >
                    <Link to={String(user.settings._urls._self).split('api/v2')[1]}>Settings</Link>
                    <Link to={'logout'}>Log out</Link>
                </Menu>
            </>

        )
    }


    return (
        <header>
            <div
                className="icon"
                onClick={() => setNavVisible(!nav_visible)}
            >
                <IconLoader
                    name='menu'
                    width='25px'
                    height='25px'
                />
            </div>
            <h1><Link to='/'>Centurion ERP</Link></h1>
            <div className="right">
                {user_menu()}
            </div>
        </header>
    );
}


export default Header;
