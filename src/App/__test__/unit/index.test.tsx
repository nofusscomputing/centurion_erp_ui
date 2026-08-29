import {
    render
} from '@testing-library/react';

import App from '../..';

import dynamicRouter from '../../router/dynamicRouter';



jest.mock("../../router/dynamicRouter", () => ({
    __esModule: true,
    default: jest.fn(),
}));



jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    RouterProvider: jest.fn(() => null),
}));



describe("App creates routes", () => {

    test("Dynamic router used",() => {

        render( <App />);


        expect(dynamicRouter).toHaveBeenCalledTimes(1);
    });


    test("Dynamic router has no args",() => {

        render( <App />);


        expect(dynamicRouter).toHaveBeenCalledWith();
    });
});
