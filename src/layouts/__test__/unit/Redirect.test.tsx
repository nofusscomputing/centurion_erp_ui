
import { createRoutesStub } from "react-router";
import * as fetcherDjango from "../../../hooks/useDjangoFetcher"
import Redirect from "../../Redirect";
import { render } from "@testing-library/react";



describe("Redirect Route Layout", () => {


    afterEach(() => {

        jest.restoreAllMocks();

    });


    test.skip("Redirect occurs", () => {
        /**
         * This will need to be tested in a browser
         * as jest doesn't allow mocking the location object.
         */

                
        const replaceMock = jest
            .spyOn(window.location, "replace")
            .mockImplementation(() => {});

        const Stub = createRoutesStub([
            {
                path: "/",
                Component: Redirect,
                handle: {
                    url_redirect: "http://localhost/some-path"
                }
            }
        ]);
            

        const rendered = render(
            <Stub initialEntries={["/"]} />
        );

        expect(replaceMock).toHaveBeenCalledWith(
            "http://domain.tld/some-path"
        );

    });



    test("Post URL called", () => {

        const replaceMock = jest
            .spyOn(fetcherDjango, "default")
            .mockResolvedValue(null);

        const Stub = createRoutesStub([
            {
                path: "/",
                Component: Redirect,
                handle: {
                    url_post: "http://localhost/some-path-post",
                    url_redirect: "http://localhost/some-path"
                }
            }
        ]);
            

        const rendered = render(
            <Stub initialEntries={["/"]} />
        );

        expect(replaceMock).toHaveBeenCalledWith({
            url: "http://localhost/some-path-post",
            body: '',
            method: "POST"
        });

    });



    test("Post URL not called", () => {

        const replaceMock = jest
            .spyOn(fetcherDjango, "default")
            .mockResolvedValue(null);

        const Stub = createRoutesStub([
            {
                path: "/",
                Component: Redirect,
                handle: {
                    url_redirect: "http://localhost/some-path"
                }
            }
        ]);
            

        const rendered = render(
            <Stub initialEntries={["/"]} />
        );

        expect(replaceMock).not.toHaveBeenCalled();

    });



    test("Spinner Present", () => {

        const replaceMock = jest
            .spyOn(fetcherDjango, "default")
            .mockResolvedValue(null);

        const Stub = createRoutesStub([
            {
                path: "/",
                Component: Redirect,
                handle: {
                    url_redirect: "http://localhost/some-path"
                }
            }
        ]);
            

        const rendered = render(
            <Stub initialEntries={["/"]} />
        );


        const element = rendered.container.querySelector('svg[class="pf-v6-c-spinner pf-m-xl"]')

        expect(element).not.toBe(null)


    });


});
