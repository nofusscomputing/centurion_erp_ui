import { createRoutesStub, Outlet } from "react-router";
import { BackendProvider, useBackendProvider } from "../../backend";
import { render } from "@testing-library/react";


describe("Backend Provider", () => {


    test("has url", () => {

        const InnerComponent = () => {

            const provider = useBackendProvider();

            return (
                <>
                    {provider.url && <p>exists</p>}
                </>
            );
        };


        const Stub = createRoutesStub([
            {
                Component: () => {
                    return (
                        <BackendProvider >
                            <Outlet />
                        </BackendProvider>
                    );
                },
                handle: {
                    backend_url: "https://some-value"
                },
                children: [
                    {
                        path: "/",
                        Component: InnerComponent
                    }
                ]
            }
        ]);


        const rendered = render(
            <Stub initialEntries={["/"]} />
        );

        expect(rendered.baseElement.innerHTML).toBe('<div><p>exists</p></div>')
    });

});
