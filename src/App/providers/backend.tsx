import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    useMatches
} from "react-router";



/**
 * Stores the URL of the backend for the current context. This location is the
 * only location that is to be used to obtain the backend details. The intent
 * is that everything that requires backend information will obtain it from
 * this context. Access is via {@link useBackendProvider}
 * 
 * @summary Backend Context
 * 
 * @category Type
 * @since 0.13.0
 */
export type BackendContext = {

    /**
     * Url to the backend
     */
    url: string
}



const backendContext = createContext<BackendContext>({url: null});



/**
 * @summary Props for the {@link BackendProvider}
 * 
 * @category Props
 * @since 0.13.0
 */
export interface BackendProviderProps {

    /**
     * The nodes to wrap in this provider.
     */
    children: React.ReactNode
}



/**
 * This provider stores the {@link BackendContext | data} about the current backend. This provider is
 * intended to be used so that every object under the route layout will use
 * the details within this provider. For example:
 * 
 * - Around a RouterProvider
 * 
 * - Around a route layout.
 * 
 * To use this provider {@link useBackendProvider} is available.
 * 
 * @example
 * 
 * ``` js
 * 
 * ...
 * 
 * return (
 *     <BackendProvider url = "https://my-backend-provider-url.tld/api/v2">
 *         <RouterProvider router={router} />
 *     </BackendProvider>
 * );
 * 
 * ...
 * 
 * ```
 * 
 * @summary Backend context provider.
 * 
 * @category Provider
 * @expandType BackendProviderProps
 * @since 0.13.0
 */
export function BackendProvider({
    children
}: BackendProviderProps) {

    const routes = useMatches();

    const [ url, setURL ] = useState(null);

    useEffect(() => {

        if( routes.length > 0 && url === null ) {

            for( let i = (routes.length - 1); i >= 0;  i-- ) {

                if( ! Object(routes[i]).hasOwnProperty('handle') ) continue;

                if( ! Object(routes[i].handle).hasOwnProperty('backend_url') ) continue;

                setURL(routes[i].handle.backend_url);

                break;
            }
        }
    }, []);


    return (
        <backendContext.Provider value = {{url: url}}>
            {children}
        </backendContext.Provider>
    );
}



/**
 * This hook obtains the values of the {@link BackendProvider}.
 * 
 * @summary Hook to use BackendProvider
 * 
 * @category Hook
 * @since 0.13.0
 */
export function useBackendProvider(): BackendContext {

    return useContext(backendContext);

}
