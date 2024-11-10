import { Link } from "react-router-dom";
import IconLoader from "../IconLoader";



const Header = ({
    nav_visible,
    setNavVisible
}) => {

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
        </header>
    );
}


export default Header;
