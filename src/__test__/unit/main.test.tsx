import React from "react";
import ReactDOM from "react-dom/client";



jest.mock("react-dom/client", () => ({
    createRoot: jest.fn(),
}));



const MockApp = jest.fn(() => {
    return (
        <span>app was called</span>
    );
});



jest.mock("../../App", () => ({
    __esModule: true,
    default: MockApp,
}));



describe("Entrypoint", () => {


    test("Calls App", () => {
        const render = jest.fn();

        (ReactDOM.createRoot as jest.Mock).mockReturnValue({
            render,
        });

        jest.isolateModules(() => {
            require("../../main");
        });

        expect(render).toHaveBeenCalledTimes(1);

    });


    test("Renders App Component", () => {
        const render = jest.fn();

        (ReactDOM.createRoot as jest.Mock).mockReturnValue({
            render,
        });

        jest.isolateModules(() => {
            require("../../main");
        });

        const element = render.mock.calls[0][0];

        expect(element.props.children.type).toBe(MockApp);
    });


    test("Is strict mode", () => {
        const render = jest.fn();

        (ReactDOM.createRoot as jest.Mock).mockReturnValue({
            render,
        });

        jest.isolateModules(() => {
            require("../../main");
        });

        const element = render.mock.calls[0][0];

        expect(element.type).toBe(React.StrictMode);
    });
});
