import {
    createRoutesStub
} from "react-router";

import {
    render
} from "@testing-library/react";

import NotificationLayout from "../../Notifications";

import {
    useNotificationContext
} from "../../../components/NotificationDrawer";



describe("Notification Layout", () => {


    test("Has Provider", () => {

        const InnerComponent = () => {

            const provider = useNotificationContext();

            return (
                <>
                    {provider && <p>exists</p>}
                </>
            );
        };


        const Stub = createRoutesStub([
            {
                Component: NotificationLayout,
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
