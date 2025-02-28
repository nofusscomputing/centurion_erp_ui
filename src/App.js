import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router'


import './index.css'
import Detail from "./layout/Detail";
import ErrorPage from "./layout/Error";
import List from "./layout/List";
import RootLayout from "./layout/Root";
import Ticket from "./layout/Ticket";
import ModelForm from "./layout/ModelForm";
import History from "./layout/history";
import Settings from "./layout/Settings";
import urlBuilder from "./hooks/urlBuilder";
import { apiFetch } from "./hooks/apiFetch";
import { InlineFieldAction } from "./components/InlineFields";
import MainLayout from "./layout/Main";
import { UserProvider } from './hooks/UserContext';

const Login = () => {

    window.location.replace( window.env.API_URL + '/auth/login');

    return (
        <section>redirect</section>
    );
}

const Logout = () => {

    const logout = apiFetch(
        window.env.API_URL + '/auth/logout/',
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

    const router = createBrowserRouter(

        createRoutesFromElements(
            <Route element={<RootLayout />} >

                <Route path="/"
                    element={<MainLayout />}
                    errorElement={<ErrorPage />}
                >

                    {/* ********************************************************
                        Redirects
                    ******************************************************** */}

                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element = {<Logout />} />


                    {/* ********************************************************
                        Settings View
                    ******************************************************** */}

                    <Route path="/settings"
                        element={<Settings />}
                        loader = {pagedLoader}
                    />

                    < Route path=":module">

                        {/* ********************************************************
                            History View
                        ******************************************************** */}

                        <Route path=":model/:pk/history"
                            element={<History />}
                        />

                        {/* ********************************************************
                            Form View
                        ******************************************************** */}

                        <Route
                            element={<ModelForm />}
                            loader = {pagedLoader}
                        >

                            <Route path=":common_model/:common_pk/:sub_model/:sub_model_pk/:model/add" element={null} />
                            <Route path=":common_model/:common_pk/:model/:pk/delete" element={null} />
                            <Route path=":common_model/:common_pk/:model/:pk/edit" element={null} />
                            <Route path=":common_model/:common_pk/project_task/add" element={null} />
                            <Route path=":common_model/:common_pk/:model/add" element={null} />
                            <Route path=":common_model/:model/:pk/edit" element={null} />

                            <Route path=":model/add" element={null} />
                            <Route path=":model/:pk/delete" element={null} />
                            <Route path=":model/:pk/edit" element={null} />

                        </Route>

                        {/* ********************************************************
                            List View
                        ******************************************************** */}

                        <Route path="ticket/:model" element={<List
                        />} loader = {pagedLoader} />

                        <Route path=":model" element={<List
                        />} loader = {pagedLoader} />

                        {/* ********************************************************
                            Tickets View
                        ******************************************************** */}

                        <Route path=":common_model/:common_pk/project_task/:pk" element={<Ticket
                            />} loader = {pagedLoader} action={InlineFieldAction} />

                        <Route path="ticket/:model/:pk" element={<Ticket
                            />} loader = {pagedLoader} action={InlineFieldAction} />

                        <Route path="ticket/:model/add" element={<Ticket
                        />} action={InlineFieldAction} loader = {pagedLoader}/>

                        {/* ********************************************************
                            Detail View
                        ******************************************************** */}

                        <Route path=":common_model/:common_pk/:model/:pk" element={<Detail
                            />} loader = {pagedLoader} />

                        <Route path=":model/:pk" element={<Detail
                            />}  loader = {pagedLoader} />

                    </Route>
                </Route>
            </Route>
        ));


    return (
        <div className="app">
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </div>
    );
}

export default App;


const pagedLoader = async ({request, params}) => {

    const url_builder = urlBuilder(
        params = params
    )

    const {api_metadata, api_page_data} = await apiFetch(
        // url_builder.api.url,
        String(request.url).replace(document.location.origin, '')
    )

    return {
        metadata: api_metadata,
        page_data: api_page_data
    }

}
