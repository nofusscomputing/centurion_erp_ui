import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router'

import {
    Content,
    PageSection
} from '@patternfly/react-core';

import Detail from "./layout/Detail";
import ErrorPage from "./layout/Error";
import List from "./layout/List";
import RootLayout from "./layout/Root";
import Ticket from "./layout/Ticket";
import ModelForm from "./layout/ModelForm";
import History from "./layout/history";
import Settings from "./layout/Settings";
import { apiFetch } from "./hooks/apiFetch";
import { InlineFieldAction } from "./components/InlineFields";
import { UserProvider } from './hooks/UserContext';
import { APISubmitAction } from './components/DisplayFields';

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

function DefaultFallback() {
    return (
        <PageSection isFilled>
            <Content>Loading</Content>
        </PageSection>
    );
  }


function App() {

    const router = createBrowserRouter(

        createRoutesFromElements(
            <Route element={<RootLayout />}
                    errorElement={<ErrorPage />}
                >

                <Route path="/"
                    errorElement={<ErrorPage />}
                    HydrateFallback={DefaultFallback}
                >

                    {/* ********************************************************
                        SoF - Re-Write
                    ******************************************************** */}


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


                    {/* ********************************************************
                        Site Routes
                    ******************************************************** */}

                    <Route path=":module">



                    {/* ********************************************************
                        SoF - Old Routes Model Form
                    ******************************************************** */}


                        <Route
                            element={<ModelForm />}
                            loader = {pagedLoader}
                        >


                            <Route path=":user/token/add" element={null} />


                        </Route>
                    {/* ********************************************************
                        EoF - Old Routes Model Form
                    ******************************************************** */}



                        {/* ********************************************************
                            Entity models
                        ******************************************************** */}

                        <Route path="entity">


                            <Route path=":model" element={<List />}
                                loader = {pagedLoader} />


                            <Route path=":model/add" element={<Detail />} 
                                loader = {pagedLoader}
                                action={APISubmitAction} shouldRevalidate={() => false}
                            />


                            <Route path=":model/:pk" element={<Detail />} 
                                loader = {pagedLoader}
                                action={APISubmitAction} shouldRevalidate={() => false}
                            />

                        </Route>


                        {/* ********************************************************
                            Git Repository Models
                        ******************************************************** */}

                        <Route path="git_repository">


                            <Route index element={<List />}
                                loader = {pagedLoader} />


                            <Route path="add" element={<Detail />} 
                                loader = {pagedLoader}
                                action={APISubmitAction} shouldRevalidate={() => false}
                            />


                            <Route path=":pk" element={<Detail />} 
                                loader = {pagedLoader}
                                action={APISubmitAction} shouldRevalidate={() => false}
                            />

                        </Route>


                        {/* ********************************************************
                            Tickets View
                        ******************************************************** */}

                        <Route path="ticket">


                            <Route path=":model" element={<List />}
                                loader = {pagedLoader} />


                            <Route path=":model/add" element={<Ticket />}
                                action={InlineFieldAction} loader = {pagedLoader} />


                            <Route path=":model/:pk" element={<Ticket />}
                                loader = {pagedLoader} action={InlineFieldAction} />

                        </Route>


                        <Route path=":model">


                            <Route index element={<List />} loader = {pagedLoader} />


                            <Route path="add" element={<Detail />} 
                                loader = {pagedLoader}
                                action={APISubmitAction} shouldRevalidate={() => false}
                            />


                            <Route path=":pk"
                                action={APISubmitAction}
                                shouldRevalidate={({ currentParams, nextParams }) => {

                                    const reValidate = (
                                        currentParams.module !== nextParams.module ||
                                        currentParams.model !== nextParams.model ||
                                        currentParams.id !== nextParams.id
                                    )

                                    return reValidate

                                }}
                            >


                                <Route index element={<Detail />} 
                                    loader = {pagedLoader}
                                    action={APISubmitAction}
                                    shouldRevalidate={({ currentParams, nextParams }) => {

                                        const reValidate = (
                                            currentParams.module !== nextParams.module ||
                                            currentParams.model !== nextParams.model ||
                                            currentParams.pk !== nextParams.pk
                                        )

                                        return reValidate

                                    }}
                                />


                                {/* ********************************************************
                                    History View
                                ******************************************************** */}

                                <Route path="history" element={<History />}
                                    loader = {pagedLoader} />


                                <Route path="project_task">


                                    <Route path="add" element={<ModelForm />}
                                        loader = {pagedLoader} />

                                    <Route path=":sub_model_pk" element={<Ticket />}
                                        loader = {pagedLoader} 
                                        action={InlineFieldAction} shouldRevalidate={() => false}
                                    />

                                </Route>


                                <Route path=":sub_model">


                                    <Route index element={<List />} 
                                        loader = {pagedLoader}
                                        action={APISubmitAction} shouldRevalidate={() => false}
                                    />


                                    <Route path=":sub_model_pk" element={<Detail />}
                                        loader = {pagedLoader}
                                        action={APISubmitAction} shouldRevalidate={() => false}
                                    />

                                </Route>

                            </Route>

                        </Route>

                    </Route>

                    {/* ********************************************************
                        EoF - Re-Write
                    ******************************************************** */}

                </Route>
            </Route>
        ));


    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
}

export default App;


const pagedLoader = async ({request, params}) => {

    const {api_metadata, api_page_data} = await apiFetch(
        String(request.url).replace(document.location.origin, '')
    )

    return {
        metadata: api_metadata,
        page_data: api_page_data
    }

}
