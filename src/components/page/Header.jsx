import { Link } from "react-router";
import IconLoader from "../IconLoader";
import Slider from "../form/Slider";
import { useEffect, useState } from "react";



const Header = ({
    nav_visible,
    setNavVisible
}) => {

    let [dark_theme, setThemeDark] = useState(false)


    // useEffect(() => { // AutoMagic set based off of user preferences
    //     window.matchMedia('(prefers-color-scheme: dark)').matches ? setThemeDark(true) : setThemeDark(false)

    //     document.documentElement.setAttribute(
    //         'data-theme',
    //         window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    //     )
    // })
    

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
