
import { createRoutesStub, Outlet } from "react-router";
import * as fetcherDjango from "../../../hooks/useDjangoFetcher"
import Redirect from "../../Redirect";
import { render } from "@testing-library/react";
import RouteErrorBoundary from "../../ErrorBoundary";
import { HTTPNotAuthenticated, HTTPNotAuthorised } from "../../../classes/Exceptions";



jest.mock("../../../components/StateSplash", () => {
    const actual = jest.requireActual("../../../components/StateSplash");

    const MockApp = jest.fn(() => (
        <span>was called</span>
    ));

    return {
        __esModule: true,
        ...actual,
        default: MockApp,
        __mock: {
            StateSplash: MockApp,
        },
    };
});



describe("Error Boundary", () => {


    let MockApp = null

    afterEach(() => {

        jest.restoreAllMocks();

        MockApp = null

    });

    beforeEach(() => {

        const { __mock } = jest.requireMock("../../../components/StateSplash");

        MockApp = __mock.StateSplash
        


    })

    const httpErrorTestParams = [
        {
            name: 'HTTP/401',
            error: HTTPNotAuthenticated,
            status: 401,
            statusText: 'Not Authenticated',
            expectedArgs: {
                body: 'HTTP 401: Not Authenticated',
                icon: 'danger',
                titleText: 'Well this is awkward'
            }
        },

        {
            name: 'HTTP/403',
            error: HTTPNotAuthorised,
            status: 403,
            statusText: 'Not Authorised',
            expectedArgs: {
                body: 'HTTP 403: Not Authorised',
                icon: 'danger',
                titleText: 'Well this is awkward'
            }
        },
        {
            name: 'HTTP/400',
            error: HTTPNotAuthorised,
            status: 400,
            statusText: 'Error',
            expectedArgs: {
                body: 'HTTP 400: Error',
                icon: 'danger',
                titleText: 'Well this is awkward'
            }
        },
        {
            name: 'HTTP/500',
            error: HTTPNotAuthorised,
            status: 500,
            statusText: 'Error',
            expectedArgs: {
                body: 'HTTP 500: Error',
                icon: 'danger',
                titleText: 'Well this is awkward'
            }
        }
    ]

    const routeErrorTestParams = [
        {
            name: 'Component undefined variable',
            invalidRouteObject: {
                index: true,
                Component: () => { boo }
            },
            expectedArgs: {
                body: 'boo is not defined',
                icon: 'danger',
                titleText: 'Well this is awkward'
            }
        },
        // {
        //     name: 'invalid route',
        //     invalidRouteObject: {
        //         index: false,
        //         // Component: 'fas'
        //     },
        //     expectedArgs: {
        //         body: 'boo is not defined',
        //         icon: 'danger',
        //         titleText: 'Well this is awkward'
        //     }
        // }
    ]

    const testParams = [
        ...httpErrorTestParams
    ]

    describe("StateSplash Call Args", () => {


        describe("Other Errors", () => {


            test.each(routeErrorTestParams)(
                "Body - $name",
                ({invalidRouteObject, expectedArgs}) => {


                const Stub = createRoutesStub([
                    {
                        path: "/",
                        ErrorBoundary: RouteErrorBoundary,
                        Component: () => { return (<Outlet />); },
                        children: [
                            invalidRouteObject,
                            {
                                path: 'login',
                                Component: () => { return (<></>); }
                            }
                        ]
                    }
                ]);


                const rendered = render(
                    <Stub initialEntries={["/"]} />
                );

                const { body, icon, stackTrace, titleText } = MockApp.mock.calls[0][0]

                expect(body).toEqual(expectedArgs.body);

            });


            test.each(routeErrorTestParams)(
                "Icon - $name",
                ({invalidRouteObject, expectedArgs}) => {


                const Stub = createRoutesStub([
                    {
                        path: "/",
                        ErrorBoundary: RouteErrorBoundary,
                        Component: () => { return (<Outlet />); },
                        children: [
                            invalidRouteObject,
                            {
                                path: 'login',
                                Component: () => { return (<></>); }
                            }
                        ]
                    }
                ]);


                const rendered = render(
                    <Stub initialEntries={["/"]} />
                );

                const { body, icon, stackTrace, titleText } = MockApp.mock.calls[0][0]

                expect(icon).toEqual(expectedArgs.icon);

            });


            test.each(routeErrorTestParams)(
                "stackTrace - $name",
                ({invalidRouteObject, expectedArgs}) => {


                const Stub = createRoutesStub([
                    {
                        path: "/",
                        ErrorBoundary: RouteErrorBoundary,
                        Component: () => { return (<Outlet />); },
                        children: [
                            invalidRouteObject,
                            {
                                path: 'login',
                                Component: () => { return (<></>); }
                            }
                        ]
                    }
                ]);


                const rendered = render(
                    <Stub initialEntries={["/"]} />
                );

                const { body, icon, stackTrace, titleText } = MockApp.mock.calls[0][0]

                /**
                 * stackTrace must exist and be a string.
                 * 
                 * As this value is built at runtime, exact comparison not possible.
                 */
                expect(stackTrace).toBeDefined()
                expect(stackTrace).not.toBeNull()
                expect(typeof stackTrace).toEqual('string')


            });


            test.each(routeErrorTestParams)(
                "titleText - $name",
                ({invalidRouteObject, expectedArgs}) => {


                const Stub = createRoutesStub([
                    {
                        path: "/",
                        ErrorBoundary: RouteErrorBoundary,
                        Component: () => { return (<Outlet />); },
                        children: [
                            invalidRouteObject,
                            {
                                path: 'login',
                                Component: () => { return (<></>); }
                            }
                        ]
                    }
                ]);


                const rendered = render(
                    <Stub initialEntries={["/"]} />
                );

                const { body, icon, stackTrace, titleText } = MockApp.mock.calls[0][0]

                expect(titleText).toEqual(expectedArgs.titleText);

            });

        });

        describe("HTTP Errors", () => {

            test.each(httpErrorTestParams)(
                "Body - $name",
                ({error, expectedArgs, status = 200, statusText = ''}) => {


                const response = new Response(null,{
                    status: status,
                    statusText: statusText
                })


                const mockComponent = () => {

                    throw new error(response)

                    return (<></>);
                };


                const Stub = createRoutesStub([
                    {
                        path: "/",
                        ErrorBoundary: RouteErrorBoundary,
                        Component: () => { return (<Outlet />); },
                        children: [
                            {
                                index: true,
                                Component: mockComponent,
                            },
                            {
                                path: 'login',
                                Component: () => { return (<></>); }
                            }
                        ]
                    }
                ]);


                const rendered = render(
                    <Stub initialEntries={["/"]} />
                );

                const { body, icon, stackTrace, titleText } = MockApp.mock.calls[0][0]

                expect(body).toEqual(expectedArgs.body);

            });



            test.each(httpErrorTestParams)(
                "Icon - $name",
                ({error, expectedArgs, status = 200, statusText = ''}) => {


                const response = new Response(null,{
                    status: status,
                    statusText: statusText
                })


                const mockComponent = () => {

                    throw new error(response)

                    return (<></>);
                };


                const Stub = createRoutesStub([
                    {
                        path: "/",
                        ErrorBoundary: RouteErrorBoundary,
                        Component: () => { return (<Outlet />); },
                        children: [
                            {
                                index: true,
                                Component: mockComponent,
                            },
                            {
                                path: 'login',
                                Component: () => { return (<></>); }
                            }
                        ]
                    }
                ]);


                const rendered = render(
                    <Stub initialEntries={["/"]} />
                );

                const { body, icon, stackTrace, titleText } = MockApp.mock.calls[0][0]

                expect(icon).toEqual(expectedArgs.icon);

            });



            test.each(httpErrorTestParams)(
                "stackTrace - $name",
                ({error, expectedArgs, status = 200, statusText = ''}) => {


                const response = new Response(null,{
                    status: status,
                    statusText: statusText
                })


                const mockComponent = () => {

                    throw new error(response)

                    return (<></>);
                };


                const Stub = createRoutesStub([
                    {
                        path: "/",
                        ErrorBoundary: RouteErrorBoundary,
                        Component: () => { return (<Outlet />); },
                        children: [
                            {
                                index: true,
                                Component: mockComponent,
                            },
                            {
                                path: 'login',
                                Component: () => { return (<></>); }
                            }
                        ]
                    }
                ]);


                const rendered = render(
                    <Stub initialEntries={["/"]} />
                );

                const { body, icon, stackTrace, titleText } = MockApp.mock.calls[0][0]

                /**
                 * stackTrace must exist and be a string.
                 * 
                 * As this value is built at runtime, exact comparison not possible.
                 */
                expect(stackTrace).toBeDefined()
                expect(stackTrace).not.toBeNull()
                expect(typeof stackTrace).toEqual('string')

            });



            test.each(httpErrorTestParams)(
                "titleText - $name",
                ({error, expectedArgs, status = 200, statusText = ''}) => {


                const response = new Response(null,{
                    status: status,
                    statusText: statusText
                })


                const mockComponent = () => {

                    throw new error(response)

                    return (<></>);
                };


                const Stub = createRoutesStub([
                    {
                        path: "/",
                        ErrorBoundary: RouteErrorBoundary,
                        Component: () => { return (<Outlet />); },
                        children: [
                            {
                                index: true,
                                Component: mockComponent,
                            },
                            {
                                path: 'login',
                                Component: () => { return (<></>); }
                            }
                        ]
                    }
                ]);


                const rendered = render(
                    <Stub initialEntries={["/"]} />
                );

                const { body, icon, stackTrace, titleText } = MockApp.mock.calls[0][0]

                expect(titleText).toEqual(expectedArgs.titleText);

            });

        });


    });


});
