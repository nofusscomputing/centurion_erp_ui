import { pageActions, pageComponents, pageLoaders } from "../..";
import { RouteDescription } from "../../../../types/backend/apiMetadata/RouteDescriptions";
import { routesFromObject } from "../../routesFromObject";


describe("routesFromObject", () => {

    const RouteObjectValidActions: Array<{
        name: string,
        routes: Array<RouteDescription>
    }> = [
        {
            name: "Action - api",
            routes: [{
                // id: "root",
                // path: "/",
                // revalidate: false,
                // hydrate: "loader",
                // children: []
                action: "api"
            }]
        }
    ]

    const RouteObjectValidComponents: Array<{
        name: string,
        routes: Array<RouteDescription>
    }> = [
        {
            name: "Component - Backend",
            routes: [{
                handle: {
                    backend_url: "a value"
                },
                component: 'backend'
            }]
        },
        {
            name: "Component - Base",
            routes: [{
                component: 'baseview'
            }]
        },
        {
            name: "Component - Detail",
            routes: [{
                component: 'detail'
            }]
        },
        {
            name: "Component - History",
            routes: [{
                component: 'history'
            }]
        },
        {
            name: "Component - Redirect",
            routes: [{
                component: 'redirect',
                handle: {
                    url_redirect: "a value"
                },
            }]
        },
        {
            name: "Component - List",
            routes: [{
                component: 'list'
            }]
        },
        {
            name: "Component - Markdown",
            routes: [{
                component: 'markdown'
            }]
        },
        {
            name: "Component - Settings",
            routes: [{
                component: 'settings'
            }]
        },
        {
            name: "Component - Ticket",
            routes: [{
                component: 'ticket'
            }]
        }
    ]

    const RouteObjectValidLoaders: Array<{
        name: string,
        routes: Array<RouteDescription>
    }> = [
        {
            name: "Loader - Django",
            routes: [{
                loader: 'django'
            }]
        },
        {
            name: "Loader - Django",
            routes: [{
                loader: 'django'
            }]
        },
        {
            name: "Loader - Django Metadata",
            routes: [{
                loader: 'django_metadata'
            }]
        },
        {
            name: "Loader - Django Root Metadata",
            routes: [{
                loader: 'django_root_metadata'
            }]
        },
        {
            name: "Loader - Github",
            routes: [{
                loader: 'github'
            }]
        },
    ]


    const RouteObjectNoErrors: Array<{
        name: string,
        routes: Array<RouteDescription>
    }> = [
        {
            name: "simple root",
            routes: [{
                id: "root",
                path: "/",
                // revalidate: false,
                // hydrate: "loader",
                // children: []
            }]
        },
        {
            name: "root with index",
            routes: [{
                id: "root",
                path: "/",
                // revalidate: false,
                // hydrate: "loader",
                children: [
                    {
                        index: true
                    }
                ]
            }]
        },
        ...RouteObjectValidActions,
        ...RouteObjectValidComponents,
        ...RouteObjectValidLoaders,
        {
            name: "root with children",
            routes: [{
                id: "root",
                path: "/",
                // revalidate: false,
                // hydrate: "loader",
                children: [
                    {
                        handle: {
                            backend_url: "a value"
                        },
                        children: []
                    },
                    ...(RouteObjectValidActions.map(({name, routes}) => { return routes[0]; })),
                    ...(RouteObjectValidComponents.map(({name, routes}) => { return routes[0]; })),
                    ...(RouteObjectValidLoaders.map(({name, routes}) => { return routes[0]; })),
                    // ...RouteObjectValidComponents,
                    // ...RouteObjectValidLoaders,
                ]
            }]
        },
        {
            name: "hydrate - loader",
            routes: [{
                // id: "root",
                // path: "/",
                // revalidate: false,
                hydrate: "loader",
                // children: []
            }]
        },
        {
            name: "revalidate - true",
            routes: [{
                // id: "root",
                // path: "/",
                revalidate: true,
                // hydrate: "loader",
                // children: []
            }]
        },
        {
            name: "revalidate - false",
            routes: [{
                // id: "root",
                // path: "/",
                revalidate: false,
                // hydrate: "loader",
                // children: []
            }]
        },
    ]


    const RouteObjectExpectErrors: Array<{
        name: string,
        routes: Array<RouteDescription>
    }> = [
        {
            name: "component specified with handle.backend_url. Only handle.backend_url required.",
            routes: [{
                id: "root",
                path: "/",
                handle: {
                    backend_url: "a value"
                },
                component: "redirect"
            }]
        },
        {
            name: "Action - _. Invalid value must fail",
            routes: [{
                // id: "root",
                // path: "/",
                // revalidate: false,
                // hydrate: "loader",
                // children: []
                action: "I dont exist"
            }]
        },
        {
            name: "Component - _. Invalid value must fail",
            routes: [{
                // id: "root",
                // path: "/",
                // revalidate: false,
                // hydrate: "loader",
                // children: []
                component: "I dont exist"
            }]
        },
        {
            name: "Component - Backend, handle.backend_url is required.",
            routes: [{
                // id: "root",
                // path: "/",
                // revalidate: false,
                // hydrate: "loader",
                // children: []
                component: 'backend'
            }]
        },
        {
            name: "Component - Redirect. handle.url_redirect is required.",
            routes: [{
                component: 'redirect'
            }]
        },
        {
            name: "hydrate - _, Non-existent value",
            routes: [{
                // id: "root",
                // path: "/",
                // revalidate: false,
                hydrate: "some random val",
                // children: []
            }]
        },
        {
            name: "Loader - _. Invalid value must fail",
            routes: [{
                // id: "root",
                // path: "/",
                // revalidate: false,
                // hydrate: "loader",
                // children: []
                loader: "I dont exist"
            }]
        },
    ]


    const AllRouteObjects = [
        ...RouteObjectNoErrors,
        ...RouteObjectExpectErrors,
    ]


    describe("Sanity - Test failure means the object is not tested as part of route", () => {

        test("Key length - pageActions", () => {

            expect(Object.keys(pageActions)).toHaveLength(1);

        });


        test("Key length - pageComponents", () => {

            expect(Object.keys(pageComponents)).toHaveLength(9);

        });


        test("Key length - pageLoaders", () => {

            expect(Object.keys(pageLoaders)).toHaveLength(4);

        });

    });


    describe("No errors expected", () => {

        test.each(RouteObjectNoErrors)(
            "$name", ({routes}) => {

                
                expect(
                    () => routesFromObject({routes: routes})
                ).not.toThrow(Error);
        });

    });

    describe("Errors expected", () => {

        test.each(RouteObjectExpectErrors)(
            "$name", async ({routes}) => {

                
                expect(
                    () => routesFromObject({routes: routes})
                ).toThrow(Error);

                // expect(() => routesFromObject({ routes })).toThrow(Error);
        });

    });


    // ToDo: write tests to ensure routes render correctly. i.e. the description adds things in right location
    describe.skip("Correct Objects Render", () => {});

});
