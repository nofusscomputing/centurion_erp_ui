import { useMemo, useState } from "react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom'

import './index.css'

import { ResponseException } from "./classes/Exceptions";

import RootLayout from "./layout/Root";
import Detail from "./layout/Detail";
import List from "./layout/List";
import Ticket from "./layout/Ticket";
import ErrorPage from "./layout/Error";



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

                    <Route path="/:module/:model/:pk"
                        element={<Detail
                            setContentHeading={setContentHeading}
                        />}
                        errorElement={<ErrorPage /> }
                        loader = {detailsLoader}
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

    let url = 'http://localhost:8003/api/' + params.module + '/' + params.model

    if( params.pk ) {

        url = url + '/' + params.pk

    }

    let loader = null

    const response = await fetch(url)

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
