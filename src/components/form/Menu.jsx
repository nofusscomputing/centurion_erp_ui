import JSX, { useEffect } from "react"

import { useId } from "react";

/** Drop down menu
 * 
 * A Dropdown menu that can be used as a navigation menu or a select form 
 * element. This includes multi-select.
 * 
 * latter is ToDo.
 * 
 * @param {Object} children objects to include.
 * @param {Boolean} hover Open menu on hover.
 * @param {JSX.Element} element HTML Element to show where menu will be.
 * @param {Object} style_menu Additional CSS Styles for the menu block (outer block).
 * @param {Object} style_dropdown_menu Additional CSS Styles for the dropdown menu block (outer block).
 * @param {String} width Width of the menu. Must be specified in valid CSS.
 * @returns 
 */
const Menu = ({
    children = null,
    hover = false,
    element = 'menu',
    style_menu = {},
    style_dropdown_menu = {},
    width = '200px',
}) => {

    const dropDownId = useId();
    const dropDownMenuId = useId();
    const dropDownMenuItemsId = useId();

    const dropDownMenu = document.getElementById(dropDownMenuId)

    document.onclick = (e) => {
        handleMenuClose(e)
      }


      const handleMenuClose = (e) => {

        e.stopPropagation()

        dropDownMenu.classList.remove("show")
    }


    const handleMenuToggle = (e) => {

        e.stopPropagation()

        dropDownMenu.classList.toggle("show")
    }

    useEffect(() => {

        document.getElementById(dropDownId).style.width = width;

    },[])


    return (
        <div
            className="menu"
            id = {dropDownId}
            style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "1rem",
                ...style_menu,
            }}
        >
            <div
                className="menu-button"
                onClick={handleMenuToggle}
                onMouseOver={ hover ? handleMenuToggle : null }
                style={{
                    lineHeight: "2rem",
                    padding: "0.1rem",
                }}
            >
                {element}
            </div>

            <div
                id = {dropDownMenuId}
                className = "dropdown-menu"
                onClick={handleMenuClose}
                style={{
                    backgroundColor: "var(--background-colour-active)",
                    color: "var(--text-colour)",
                    position: "absolute",
                    width: "inherit",
                    ...style_dropdown_menu
                }}
            >

                <div
                    id = {dropDownMenuItemsId}
                    className = "dropdown-menu-items"
                    style={{
                        border: "1px solid var(--border-colour)",
                        borderTop: "none",
                        boxShadow: "5px 5px 5px #575757",
                        display: "flex",
                        flexDirection: "column",
                        width: "100%"
                    }}
                >

                    { children && children }

                    { ! children && <>boo</> }

                </div>
            </div>
        </div>

    );

}
 
export default Menu;