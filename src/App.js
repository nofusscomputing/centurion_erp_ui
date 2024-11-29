import { useMemo, useState } from "react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router'


import './index.css'
import Detail from "./layout/Detail";
import ErrorPage from "./layout/Error";
import { getCookie } from "./hooks/getCookie";
import List from "./layout/List";
import { ResponseException } from "./classes/Exceptions";
import RootLayout from "./layout/Root";
import Ticket from "./layout/Ticket";
import ModelForm from "./layout/ModelForm";
import History from "./layout/history";
import Settings from "./layout/Settings";
import urlBuilder from "./hooks/urlBuilder";
import { apiFetch } from "./hooks/apiFetch";

const Login = () => {

    window.location.replace( window.env.API_URL + '/auth/login');

    return (
        <section>redirect</section>
    );
}
 


function App() {

    const [content_heading, setContentHeading] = useState(null)
    const [ content_header_icon, SetContentHeaderIcon ] = useState(null)

    const router = useMemo(() => {

        return createBrowserRouter(

            createRoutesFromElements(

                <Route path="/"
                    element={<RootLayout
                        content_heading={content_heading}
                        content_header_icon={content_header_icon}
                    />}
                    errorElement={<ErrorPage /> }
                >
                    <Route path='/login' element={<Login/>}/>

                    <Route path="/core/:model/:pk/history"
                        element={<History
                            setContentHeading={setContentHeading}
                            SetContentHeaderIcon={SetContentHeaderIcon}
                        />}
                        errorElement={<ErrorPage /> }
                    />

                    <Route path="/settings"
                        element={<Settings
                            setContentHeading={setContentHeading}
                            SetContentHeaderIcon={SetContentHeaderIcon}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

                    < Route path=":module">

                        <Route
                            element={<ModelForm
                                setContentHeading={setContentHeading}
                                SetContentHeaderIcon={SetContentHeaderIcon}
                            />}
                            errorElement={<ErrorPage /> }
                            loader = {detailsLoader}
                        >

                            <Route path=":common_model/:common_pk/:sub_model/:sub_model_pk/:model/add" element={null} />
                            <Route path=":common_model/:common_pk/:model/:pk/edit" element={null} />
                            <Route path=":common_model/:common_pk/project_task/add" element={null} />
                            <Route path=":common_model/:common_pk/:model/add" element={null} />
                            <Route path=":common_model/:model/:pk/edit" element={null} />
                            
                            <Route path="ticket/:model/add" element={null} />
                            <Route path=":model/add" element={null} />
                            <Route path=":model/:pk/edit" element={null} />

                        </Route>

                        <Route
                            element={<List
                                setContentHeading={setContentHeading}
                                SetContentHeaderIcon={SetContentHeaderIcon}
                            />}
                            errorElement={<ErrorPage /> }
                            loader = {detailsLoader}
                        >

                            <Route path="ticket/:model" element={null} />
                            <Route path=":model" element={null} />

                        </Route>

                        <Route
                            element={<Ticket
                                setContentHeading={setContentHeading}
                                SetContentHeaderIcon={SetContentHeaderIcon}
                            />}
                            errorElement={<ErrorPage /> }
                            loader = {detailsLoader}
                        >

                            <Route path=":common_model/:common_pk/project_task/:pk" element={null} />
                            <Route path="ticket/:model/:pk" element={null} />

                        </Route>


                        <Route
                            element={<Detail
                                setContentHeading={setContentHeading}
                                SetContentHeaderIcon={SetContentHeaderIcon}
                            />}
                            errorElement={<ErrorPage /> }
                            loader = {detailsLoader}
                        >

                            <Route path=":common_model/:common_pk/:model/:pk" element={null} />
                            <Route path=":model/:pk" element={null} />

                        </Route>
                    </Route>
                </Route>
            ));

    }, [
        content_heading,
        setContentHeading,
    ]);


    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;


const detailsLoader = async ({request, params}) => {

    let loader = null

    const url_builder = urlBuilder(
        params = params
    )


    const data = await apiFetch(
        url_builder.api.url,
        (data) => {

            loader = data

        }
    )

    return loader

}
