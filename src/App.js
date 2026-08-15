import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router'

import {
    Content,
    EmptyState,
    Spinner
} from '@patternfly/react-core';

import Detail from "./layout/Detail";
import ErrorPage from "./layout/Error";
import List from "./layout/List";
import RootLayout from "./layout/Root";
import Ticket from "./layout/Ticket";
import History from "./layout/history";
import Settings from "./layout/Settings";
import { apiFetch } from "./hooks/apiFetch";
import { UserProvider } from './hooks/UserContext';
import { APISubmitAction } from './components/DisplayFields';
import dynamicRouter from './App/router';

const Login = () => {

    if (!window.env) {
        return <div>Loading...</div>; // Wait until `window.env` is defined
      }
    
      window.location.replace(window.env.API_URL + '/auth/login');
      return <section>redirecting...</section>;

  };
const Logout = () => {

    const logout = apiFetch(
        window.env.API_URL + '/auth/logout',
        null,
        'POST',
        null,
        false
    )

    window.location.replace( window.env.API_URL + '/auth/login');

    return(
        <section>logout</section>
    )
}


function App() {

    const router = dynamicRouter();

    return (
        <RouterProvider router={router} />
    );
}

export default App;


const pagedLoader = async ({request, params}) => {

    console.debug('Page Loader', request)

    const {api_metadata, api_page_data} = await apiFetch(
        String(request.url).replace(document.location.origin, '')
    )

    return {
        metadata: api_metadata,
        page_data: api_page_data
    }

}
