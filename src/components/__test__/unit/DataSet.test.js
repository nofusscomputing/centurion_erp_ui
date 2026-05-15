import {
    render,
    screen
} from "@testing-library/react";

import FormField from "../../FormField";
import { FormatTime } from "../../../functions/FormatTime";
import { DataSetFooter, DataSetHeader, DataSetList } from "../../DataSet";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";


const fs = require('fs')
const path = require('path')






describe("DataSet", () => {


    const baseDir = path.join(__dirname, '../../../../includes/usr/share/nginx/html/mock/api/v2')

    const listBaseDir = path.join(baseDir, '/layout')

    const listIds = fs.readdirSync(listBaseDir)

    const backendAPIData = listIds
        .filter(viewName => [ 'table' ].includes(viewName))
        .map(viewName => {
        

        const filePath = path.join(listBaseDir, viewName, 'GET.json')

        const raw = fs.readFileSync(filePath, 'utf8')

        const json = JSON.parse(raw)

        const optionsFilePath = path.join(listBaseDir, viewName, 'OPTIONS.json')

        const rawOptions = fs.readFileSync(optionsFilePath, 'utf8')

        const jsonOptions = JSON.parse(rawOptions)


        return {
            data: json,
            options: jsonOptions
        }
        // }
    })


    const { data: objectData, options: objectMetadata } = backendAPIData[0];

    let consoleErrorSpy;

    const allowedErrors = [];

    beforeEach(() => {
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleErrorSpy.mockRestore();
    });



    describe("DataSetFooter", () => {


        test("Page number and item count on page.", () => {


            const rendered = render(
                <MemoryRouter>
                    <DataSetFooter
                        itemCount = {objectData.meta.pagination.count}
                        pageNumber = {1}
                        perPage = {10}
                    />
                </MemoryRouter>
            );


            expect(
                screen.getByText(/1 - 10/i)
            ).toBeInTheDocument();

            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();

        });


        test("Setting page number calls the callback.", async () => {


            let UpdatedValue = 1;

            const setPageNumber = (pageNumber) => {

                UpdatedValue = pageNumber;
            }

            const rendered = render(
                <MemoryRouter>
                    <DataSetFooter
                        itemCount = {objectData.meta.pagination.count}
                        pageNumber = {UpdatedValue}
                        perPage = {5}
                        setPageNumber={setPageNumber}
                    />
                </MemoryRouter>
            );


            const user = userEvent.setup();

            const input = screen.getByRole("spinbutton"); // number inputs usually map here

            await user.clear(input);
            await user.type(input, "2");

            input.focus();

            await user.keyboard("{Enter}");

            expect(UpdatedValue).toBe(2);

            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();

        });


    });



    describe("DataSetHeader", () => {


        test('Has Add Button', () => {


            const { container } = render(
                <MemoryRouter>
                    <DataSetHeader
                        itemCount = {objectData.meta.pagination.count}
                        metadata = {objectMetadata}
                        perPage = {10}
                        selectedRows = {[]}
                    />
                </MemoryRouter>
            );

            const rendered = container.querySelector('span[class="pf-v6-c-button__text"]')

            expect(String(rendered.innerHTML)).toBe('Add New')

            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();
        
        });


        describe("Checkbox Selector / Dropdown object", () => {


            test('Has Checkbox Selector', () => {


                const { container } = render(
                    <MemoryRouter>
                        <DataSetHeader
                            itemCount = {objectData.meta.pagination.count}
                            metadata = {objectMetadata}
                            perPage = {10}
                            selectedRows = {[]}
                        />
                    </MemoryRouter>
                );


                const rendered = container.querySelector('div[class="pf-v6-c-menu-toggle pf-m-split-button"]')

                expect(String(rendered.innerHTML)).not.toBe('')

                // No errors are to be thrown
                expect(consoleErrorSpy).not.toHaveBeenCalled();

            });



            describe("Dropdown Menu", () => {


                test('Has "select all" when no items selected.', async () => {


                    const rendered = render(
                        <MemoryRouter>
                            <DataSetHeader
                                itemCount = {objectData.meta.pagination.count}
                                metadata = {objectMetadata}
                                perPage = {10}
                                selectedRows = {[]}
                            />
                        </MemoryRouter>
                    );


                    const user = userEvent.setup();

                    const button = screen.getByRole("button");

                    await user.click(button);


                    expect(
                        screen.getByText(/select page\s*\(\s*10\s*items\s*\)/i)
                    ).toBeInTheDocument();

                    // No errors are to be thrown
                    expect(consoleErrorSpy).not.toHaveBeenCalled();
                
                });


                test('Has "select none" when some items selected.', async () => {


                    const rendered = render(
                        <MemoryRouter>
                            <DataSetHeader
                                itemCount = {objectData.meta.pagination.count}
                                metadata = {objectMetadata}
                                perPage = {10}
                                selectedRows = {[2]}
                            />
                        </MemoryRouter>
                    );


                    const user = userEvent.setup();

                    const button = screen.getByRole("button");

                    await user.click(button);


                    expect(
                        screen.getByText(/select none\s*\(\s*0\s*items\s*\)/i)
                    ).toBeInTheDocument();

                    // No errors are to be thrown
                    expect(consoleErrorSpy).not.toHaveBeenCalled();
                
                });


                test('Has "select none" when all items selected.', async () => {


                    const rendered = render(
                        <MemoryRouter>
                            <DataSetHeader
                                itemCount = {objectData.meta.pagination.count}
                                metadata = {objectMetadata}
                                perPage = {10}
                                selectedRows = {[...objectData.results.map((obj) => obj.id)]}
                            />
                        </MemoryRouter>
                    );


                    const user = userEvent.setup();

                    const button = screen.getByRole("button");

                    await user.click(button);


                    expect(
                        screen.getByText(/select none\s*\(\s*0\s*items\s*\)/i)
                    ).toBeInTheDocument();

                    // No errors are to be thrown
                    expect(consoleErrorSpy).not.toHaveBeenCalled();
                
                });


                test('Does not have "select all" when all selected', async () => {


                    const rendered = render(
                        <MemoryRouter>
                            <DataSetHeader
                                itemCount = {objectData.meta.pagination.count}
                                metadata = {objectMetadata}
                                perPage = {10}
                                selectedRows = {[...objectData.results.map((obj) => obj.id)]}
                            />
                        </MemoryRouter>
                    );


                    const user = userEvent.setup();

                    const button = screen.getByRole("button");

                    await user.click(button);


                    expect(
                        screen.queryByText(/select page\s*\(\s*10\s*items\s*\)/i)
                    ).not.toBeInTheDocument();

                    // No errors are to be thrown
                    expect(consoleErrorSpy).not.toHaveBeenCalled();
                
                });


            });



            describe("Checkbox status text", () => {


                test('Shows `"no"" count` when some items selected ', () => {


                    const rendered = render(
                        <MemoryRouter>
                            <DataSetHeader
                                itemCount = {objectData.meta.pagination.count}
                                metadata = {objectMetadata}
                                perPage = {10}
                                selectedRows = {[2]}
                            />
                        </MemoryRouter>
                    );


                    expect(
                        screen.queryByText(/selected/i)
                    ).toBeInTheDocument();

                    // No errors are to be thrown
                    expect(consoleErrorSpy).not.toHaveBeenCalled();

                });


                test('Shows `item count` when some items selected ', () => {


                    const rendered = render(
                        <MemoryRouter>
                            <DataSetHeader
                                itemCount = {objectData.meta.pagination.count}
                                metadata = {objectMetadata}
                                perPage = {10}
                                selectedRows = {[2]}
                            />
                        </MemoryRouter>
                    );


                    expect(
                        screen.getByText(/1 selected/i)
                    ).toBeInTheDocument();

                    // No errors are to be thrown
                    expect(consoleErrorSpy).not.toHaveBeenCalled();

                });


                test('Shows `total count` when all items selected ', () => {


                    const rendered = render(
                        <MemoryRouter>
                            <DataSetHeader
                                itemCount = {objectData.meta.pagination.count}
                                metadata = {objectMetadata}
                                perPage = {10}
                                selectedRows = {[...objectData.results.map((obj) => obj.id)]}
                            />
                        </MemoryRouter>
                    );


                    expect(
                        screen.getByText(/10 selected/i)
                    ).toBeInTheDocument();

                    // No errors are to be thrown
                    expect(consoleErrorSpy).not.toHaveBeenCalled();

                });


            });


        });


    });



    describe("DataSetList", () => {


        
        test("Renders correct number of rows", () => {


            const rendered = render(
                <MemoryRouter>
                    <DataSetList
                        metadata = {objectMetadata}
                        rowData = {objectData}
                        selectedRows = {[]}
                    />
                </MemoryRouter>
            );


            const rows = Array.from(rendered.container.querySelectorAll('li[class="pf-v6-c-data-list__item"]'));


            expect(rows.length).toBe(objectData.results.length);

            // No errors are to be thrown
            expect(consoleErrorSpy).not.toHaveBeenCalled();

        });

    });

});
