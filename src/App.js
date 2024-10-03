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



function App() {

    const [content_heading, setContentHeading] = useState(null)

    const router = useMemo(() => {

        return createBrowserRouter(

            createRoutesFromElements(

                <Route path="/"
                    element={<RootLayout
                        content_heading={content_heading}
                    />}
                    errorElement={<ErrorPage /> }
                >
                    <Route path="/:module/:model"
                        element={<List
                            setContentHeading={setContentHeading}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

                    <Route path="/:module/:model/add"    // add
                        element={<ModelForm
                            setContentHeading={setContentHeading}
                        />}
                        errorElement={<ErrorPage /> }
                    />

                    <Route path="/:module/:model/:pk"
                        element={<Detail
                            setContentHeading={setContentHeading}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

                    <Route path="/:module/:model/:pk/:action"    // edit | delete
                        element={<ModelForm
                            setContentHeading={setContentHeading}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

                    <Route path="/:module/:common_model/:common_pk/:model/add"    // add
                        element={<ModelForm
                            setContentHeading={setContentHeading}
                        />}
                        errorElement={<ErrorPage /> }
                    />

                    <Route path="/:module/ticket/:model"
                        element={<List
                            setContentHeading={setContentHeading}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
                    />

                    <Route path="/:module/ticket/:model/:pk"
                        element={<Ticket
                            setContentHeading={setContentHeading}
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

    let url = 'http://127.0.0.1:8002/api/v2/' + params.module + '/' + params.model

        if( params.pk ) {

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
