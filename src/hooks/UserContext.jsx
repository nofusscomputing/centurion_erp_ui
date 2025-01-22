import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "./apiFetch";


/**
 * Users Details
 * 
 * {user: user details, settings: user settings}
 * 
 */
const UserContext = createContext()

export default UserContext;

/**
 * User Object
 * 
 * Fetches the users details and settings
 * 
 * @param {React.JSX} children Objects passed to provider 
 * @returns User Context
 */
export const UserProvider = ({children}) => {

    const [ user_settings, setUserSettings ] = useState({})

    const [ user, setUser ] = useState({})

    const fetchUserSettings = async () => {

        const settings_url = await apiFetch(
            '/settings',
            null,
            'GET',
            null,
            false
        )
    
        const usr_settings = await apiFetch(
            settings_url.api_page_data.user_settings.split('api/v2')[1],
            null,
            'GET',
            null,
            false
        )

        setUserSettings(usr_settings.api_page_data)

        const usr = await apiFetch(
            '/base/user/' + String(usr_settings.api_page_data.user),
            null,
            'GET',
            null,
            false
        )

        setUser(usr.api_page_data)
    
    }

    useEffect(() => {
        fetchUserSettings()
    },[])


    let contextData = {
        user: user,
        settings: user_settings

    }

    return (
        <UserContext.Provider value = {contextData} >
            {children}
        </UserContext.Provider>
    )
}
