import { useMemo, useState } from "react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'


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

                    <Route path="/core/:model/:pk/:action"
                        element={<History
                            setContentHeading={setContentHeading}
                            SetContentHeaderIcon={SetContentHeaderIcon}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

                    <Route path="/settings"
                        element={<Settings
                            setContentHeading={setContentHeading}
                            SetContentHeaderIcon={SetContentHeaderIcon}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

                    <Route path="/:module/ticket/:model"
                        element={<List
                            setContentHeading={setContentHeading}
                            SetContentHeaderIcon={SetContentHeaderIcon}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

                    <Route path="/:module/ticket/:model/:pk"
                        element={<Ticket
                            setContentHeading={setContentHeading}
                            SetContentHeaderIcon={SetContentHeaderIcon}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

                    <Route path="/:module/:common_model/:model/:pk/:action"
                        element={<ModelForm
                            setContentHeading={setContentHeading}
                            SetContentHeaderIcon={SetContentHeaderIcon}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

                    <Route path="/:module/:model"
                        element={<List
                            setContentHeading={setContentHeading}
                            SetContentHeaderIcon={SetContentHeaderIcon}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

                    <Route path="/:module/:model/add"    // add
                        element={<ModelForm
                            setContentHeading={setContentHeading}
                            SetContentHeaderIcon={SetContentHeaderIcon}
                        />}
                        errorElement={<ErrorPage /> }
                    />

                    <Route path="/:module/:model/:pk"
                        element={<Detail
                            setContentHeading={setContentHeading}
                            SetContentHeaderIcon={SetContentHeaderIcon}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

                    <Route path="/:module/:model/:pk/:action"    // edit | delete
                        element={<ModelForm
                            setContentHeading={setContentHeading}
                            SetContentHeaderIcon={SetContentHeaderIcon}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

                    <Route path="/:module/:common_model/:common_pk/:model/add"    // add
                        element={<ModelForm
                            setContentHeading={setContentHeading}
                            SetContentHeaderIcon={SetContentHeaderIcon}
                        />}
                        errorElement={<ErrorPage /> }
                    />

                    <Route path="/:module/:common_model/:common_pk/:model/:pk/:action"    // add
                        element={<ModelForm
                            setContentHeading={setContentHeading}
                            SetContentHeaderIcon={SetContentHeaderIcon}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

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

    let url = '/' + params.module + '/' + params.model // + '/' + params.pk    // default edit

    if( params.common_pk ) {

        url = '/' + params.module + '/' + params.common_model + '/' + params.common_pk + '/' + params.model

    }

    if( String(window.location.pathname).includes('/ticket/') ) {
        
        url = '/' + params.module + '/ticket/' + params.model

    }

    if( params.model && params.pk && params.action ) {

        url = '/core/' + params.model + '/' + params.pk + '/' + params.action

    }


    if( String(window.location.pathname).startsWith('/settings') ) {

        url = '/settings'
        
        if( params.model ) {
            url = url + '/' + params.model
        }

        // url = '/' + params.module + '/ticket/' + params.model

    }


    url = 'http://127.0.0.1:8002/api/v2' + url

        if( ! (params.model && params.pk && params.action) && params.pk ) {

            url = url + '/' + params.pk

        }



    const response = await fetch(url, {
        headers: {'X-CSRFToken': getCookie('csrftoken')},
        credentials: 'include'
    })

        .then( response => {

            if( ! response.ok ) {

                throw new ResponseException(response)

            }

            loader = response.json()

        })

        .catch(err => {

            throw Error(err)

        })

    return loader

}
