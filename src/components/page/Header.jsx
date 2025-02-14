import { Link } from "react-router";
import IconLoader from "../IconLoader";
import Slider from "../form/Slider";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../hooks/UserContext";



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
                <Slider
                    onChange={(e) => {

                        setThemeDark(e.target.checked ? true : false )

                        document.documentElement.setAttribute(
                            'data-theme',
                            e.target.checked ? 'dark' : 'light'
                        )

                    }}
                    value = { dark_theme }
                />
            </div>
        </header>
    );
}


export default Header;
