import {
    createRoutesStub
} from "react-router";

import {
    render
} from "@testing-library/react";

import BackendLayout from "../../Backend";

import { useBackendProvider } from "../../../App/providers/backend";




describe("Backend Layout", () => {


    test("Has Provider", () => {

        const InnerComponent = () => {

            const backend = useBackendProvider();

            return (
                <>
                    {backend.url && <p>exists</p>}
                </>
            );
        };


        const Stub = createRoutesStub([
            {
                Component: BackendLayout,
                handle: {
                    backend_url: "a url would normally go here"
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
