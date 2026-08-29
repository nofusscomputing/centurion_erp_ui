import { render, waitFor } from "@testing-library/react";
import StateSplash, { StateIcon } from "../../StateSplash";
import { EmptyStateStatus } from "@patternfly/react-core";


describe("StateSplash", () => {

    const svgIconDangerPathValue = '<path d="M16 1C7.729 1 1 7.729 1 16s6.729 15 15 15 15-6.729 15-15S24.271 1 16 1Zm-1.5 8a1.5 1.5 0 1 1 3 0v7a1.5 1.5 0 1 1-3 0V9ZM16 25.001a2 2 0 1 1-.001-3.999A2 2 0 0 1 16 25.001Z"></path>';

    const svgIconEmptyPathValue = '<path d="M488.6 250.2L392 214V105.5c0-15-9.3-28.4-23.4-33.7l-100-37.5c-8.1-3.1-17.1-3.1-25.3 0l-100 37.5c-14.1 5.3-23.4 18.7-23.4 33.7V214l-96.6 36.2C9.3 255.5 0 268.9 0 283.9V394c0 13.6 7.7 26.1 19.9 32.2l100 50c10.1 5.1 22.1 5.1 32.2 0l103.9-52 103.9 52c10.1 5.1 22.1 5.1 32.2 0l100-50c12.2-6.1 19.9-18.6 19.9-32.2V283.9c0-15-9.3-28.4-23.4-33.7zM358 214.8l-85 31.9v-68.2l85-37v73.3zM154 104.1l102-38.2 102 38.2v.6l-102 41.4-102-41.4v-.6zm84 291.1l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6zm240 112l-85 42.5v-79.1l85-38.8v75.4zm0-112l-102 41.4-102-41.4v-.6l102-38.2 102 38.2v.6z"></path>';

    const svgIconLoadingPathValue = '<circle class="pf-v6-c-spinner__path" cx="50" cy="50" r="45" fill="none"></circle>';

    const svgIconSearchPathValue = '<path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>';

    const svgIconWarningPathValue = '<path d="m31.874 28.514-15.011-27a1.001 1.001 0 0 0-1.748 0l-15.011 27A1 1 0 0 0 .978 30H31a1 1 0 0 0 .874-1.486ZM14.5 12a1.5 1.5 0 0 1 3 0v5a1.5 1.5 0 0 1-3 0v-5ZM16 26.001a2 2 0 1 1-.001-3.999A2 2 0 0 1 16 26.001Z"></path>';





    describe("Default / Empty values", () => {

        let rendered;
        let element;

        beforeEach(()=> {

            rendered = render(
                    <StateSplash
                        titleText = "the title"
                        // body = ""
                        // icon = {StateIcon.empty}
                        // stackTrace = {null}
                        // status = {EmptyStateStatus.danger}
                    />
            );

            element = rendered.baseElement.querySelector('.pf-v6-c-empty-state');

        });



        test("Title", () => {

            const testElement = element.querySelector('.pf-v6-c-empty-state__title-text');

            expect(testElement.innerHTML).toEqual('the title')

        });



        test("Body", () => {

            expect(
                element.querySelector('.pf-v6-c-empty-state__body')
            ).not.toBeInTheDocument();

        });



        test("Icon", () => {

            const iconContainer = element.querySelector('.pf-v6-c-empty-state__icon');

            const testElement = iconContainer.querySelector('.pf-v6-icon-default');

            expect(testElement.innerHTML).toEqual(svgIconEmptyPathValue)

        });



        test("stackTrace", () => {

            expect(
                element.querySelector('.pf-v6-c-expandable-section__content')
            ).not.toBeInTheDocument();

        });



        /**
         * must not have classes:
         * 
         * - pf-m-custom
         * - pf-m-danger
         * - pf-m-info
         * - pf-m-success
         * - pf-m-warning
         * 
         * Which means it is set to null.
         */
        describe("Status is 'null'", () => {


            let stateStatusClasses;

            beforeEach(() => {

                stateStatusClasses = element.classList

            })


            test("Not - custom", () => {

                expect(stateStatusClasses.contains('pf-m-custom')).toBe(false)

            });



            test("Not - danger", () => {

                expect(stateStatusClasses.contains('pf-m-danger')).toBe(false)

            });



            test("Not - info", () => {

                expect(stateStatusClasses.contains('pf-m-info')).toBe(false)

            });



            test("Not - success", () => {

                expect(stateStatusClasses.contains('pf-m-success')).toBe(false)

            });



            test("Not - warning", () => {

                expect(stateStatusClasses.contains('pf-m-warning')).toBe(false)

            });

        });

    });



    describe("Supplying stackTrace", () => {

        const rendered = render(
                    <StateSplash
                        titleText = "the title"
                        // body = null
                        // icon = {StateIcon.empty}
                        stackTrace = "my stack trace value"
                        // status = {null}
                    />
            );

        const element = rendered.baseElement.querySelector('.pf-v6-c-empty-state');


        test("Title", () => {

            const testElement = element.querySelector('.pf-v6-c-empty-state__title-text');

            expect(testElement.innerHTML).toEqual('the title')

        });



        test("Body", () => {

            expect(
                element.querySelector('.pf-v6-c-empty-state__body')
            ).not.toBeInTheDocument();

        });



        test("Icon", () => {

            const rendered = render(
                <StateSplash
                    titleText = "the title"
                    // body = null
                    // icon = {StateIcon.empty}
                    stackTrace = "my stack trace value"
                    // status = {null}
                />
            );

            const testElement = rendered.baseElement.querySelector('.pf-v6-svg');

            expect(testElement.innerHTML).toEqual(svgIconDangerPathValue)

        });



        test("stackTrace", () => {

            const rendered = render(
                <StateSplash
                    titleText = "the title"
                    // body = null
                    // icon = {StateIcon.empty}
                    stackTrace = "my stack trace value"
                    // status = {null}
                />
            );

            const expandableElement = rendered.baseElement.querySelector('.pf-v6-c-expandable-section__content');

            const testElement = expandableElement.querySelector('.pf-v6-c-code-block__code');

            // const val = 'pf-v6-c-code-block__code'

            expect(testElement.innerHTML).toEqual("my stack trace value");

        });



        /**
         * must not have classes:
         * 
         * - pf-m-custom
         * - pf-m-danger
         * - pf-m-info
         * - pf-m-success
         * - pf-m-warning
         * 
         * Which means it is set to null.
         */
        describe("Status", () => {

            let stateStatusClasses;

            beforeEach(() => {

                stateStatusClasses = element.classList

            })



            test("Not - custom", () => {

                expect(stateStatusClasses.contains('pf-m-custom')).toBe(false)

            });



            test("Is - danger", () => {

                expect(stateStatusClasses.contains('pf-m-danger')).toBe(true)

            });



            test("Not - info", () => {

                expect(stateStatusClasses.contains('pf-m-info')).toBe(false)

            });



            test("Not - success", () => {

                expect(stateStatusClasses.contains('pf-m-success')).toBe(false)

            });



            test("Not - warning", () => {

                expect(stateStatusClasses.contains('pf-m-warning')).toBe(false)

            });

        });

    });



    describe("Set icon, status updates", () => {



        describe("Danger", () => {

            const rendered = render(
                        <StateSplash
                            titleText = "the title"
                            // body = ""
                            icon = {StateIcon.danger}
                            // stackTrace = {null}
                            // status = {EmptyStateStatus.danger}
                        />
                );

            const element = rendered.baseElement.querySelector('.pf-v6-c-empty-state');


            test("Title", () => {

                const testElement = element.querySelector('.pf-v6-c-empty-state__title-text');

                expect(testElement.innerHTML).toEqual('the title')

            });



            test("Body", () => {

                expect(
                    element.querySelector('.pf-v6-c-empty-state__body')
                ).not.toBeInTheDocument();

            });



            test("Icon", () => {

                const rendered = render(
                    <StateSplash
                        titleText = "the title"
                        // body = ""
                        icon = {StateIcon.danger}
                        // stackTrace = {null}
                        // status = {EmptyStateStatus.danger}
                    />
                );
                const tester = rendered.baseElement;

                const testElement = rendered.baseElement.querySelector('.pf-v6-svg');

                expect(testElement.innerHTML).toEqual(svgIconDangerPathValue)

            });



            test("stackTrace", () => {

                expect(
                    element.querySelector('.pf-v6-c-expandable-section__content')
                ).not.toBeInTheDocument();

            });



            /**
             * must not have classes:
             * 
             * - pf-m-custom
             * - pf-m-danger
             * - pf-m-info
             * - pf-m-success
             * - pf-m-warning
             * 
             * Which means it is set to null.
             */
            describe("Status", () => {

                let stateStatusClasses;

                beforeEach(() => {

                    stateStatusClasses = element.classList

                })



                test("Not - custom", () => {

                    expect(stateStatusClasses.contains('pf-m-custom')).toBe(false)

                });



                test("Is - danger", () => {

                    expect(stateStatusClasses.contains('pf-m-danger')).toBe(true)

                });



                test("Not - info", () => {

                    expect(stateStatusClasses.contains('pf-m-info')).toBe(false)

                });



                test("Not - success", () => {

                    expect(stateStatusClasses.contains('pf-m-success')).toBe(false)

                });



                test("Not - warning", () => {

                    expect(stateStatusClasses.contains('pf-m-warning')).toBe(false)

                });

            });

        });



        describe("Empty", () => {

            let rendered;
            let element;

            beforeEach(()=> {

                rendered = render(
                        <StateSplash
                            titleText = "the title"
                            // body = ""
                            icon = {StateIcon.empty}
                            // stackTrace = {null}
                            // status = {EmptyStateStatus.danger}
                        />
                );

                element = rendered.baseElement.querySelector('.pf-v6-c-empty-state');

            });



            test("Title", () => {

                const testElement = element.querySelector('.pf-v6-c-empty-state__title-text');

                expect(testElement.innerHTML).toEqual('the title')

            });



            test("Body", () => {

                expect(
                    element.querySelector('.pf-v6-c-empty-state__body')
                ).not.toBeInTheDocument();

            });



            test("Icon", () => {

                const iconContainer = element.querySelector('.pf-v6-c-empty-state__icon');

                const testElement = iconContainer.querySelector('.pf-v6-icon-default');

                expect(testElement.innerHTML).toEqual(svgIconEmptyPathValue)

            });



            test("stackTrace", () => {

                expect(
                    element.querySelector('.pf-v6-c-expandable-section__content')
                ).not.toBeInTheDocument();

            });



            /**
             * must not have classes:
             * 
             * - pf-m-custom
             * - pf-m-danger
             * - pf-m-info
             * - pf-m-success
             * - pf-m-warning
             * 
             * Which means it is set to null.
             */
            describe("Status is 'null'", () => {


                let stateStatusClasses;

                beforeEach(() => {

                    stateStatusClasses = element.classList

                })


                test("Not - custom", () => {

                    expect(stateStatusClasses.contains('pf-m-custom')).toBe(false)

                });



                test("Not - danger", () => {

                    expect(stateStatusClasses.contains('pf-m-danger')).toBe(false)

                });



                test("Not - info", () => {

                    expect(stateStatusClasses.contains('pf-m-info')).toBe(false)

                });



                test("Not - success", () => {

                    expect(stateStatusClasses.contains('pf-m-success')).toBe(false)

                });



                test("Not - warning", () => {

                    expect(stateStatusClasses.contains('pf-m-warning')).toBe(false)

                });

            });

        });



        describe("Loading", () => {


            let rendered;
            let element;

            beforeEach(()=> {

                rendered = render(
                        <StateSplash
                            titleText = "the title"
                            // body = ""
                            icon = {StateIcon.loading}
                            // stackTrace = {null}
                            // status = {EmptyStateStatus.danger}
                        />
                );

                element = rendered.baseElement.querySelector('.pf-v6-c-empty-state');

            });



            test("Title", () => {

                const testElement = element.querySelector('.pf-v6-c-empty-state__title-text');

                expect(testElement.innerHTML).toEqual('the title')

            });



            test("Body", () => {

                expect(
                    element.querySelector('.pf-v6-c-empty-state__body')
                ).not.toBeInTheDocument();

            });



            test("Icon", async () => {

                const testElement = rendered.baseElement.querySelector('.pf-v6-c-spinner');

                expect(testElement.innerHTML).toEqual(svgIconLoadingPathValue)

            });



            test("stackTrace", () => {

                expect(
                    element.querySelector('.pf-v6-c-expandable-section__content')
                ).not.toBeInTheDocument();

            });



            /**
             * must not have classes:
             * 
             * - pf-m-custom
             * - pf-m-danger
             * - pf-m-info
             * - pf-m-success
             * - pf-m-warning
             * 
             * Which means it is set to null.
             */
            describe("Status is 'null'", () => {


                let stateStatusClasses;

                beforeEach(() => {

                    stateStatusClasses = element.classList

                })



                test("Not - custom", () => {

                    expect(stateStatusClasses.contains('pf-m-custom')).toBe(false)

                });



                test("Not - danger", () => {

                    expect(stateStatusClasses.contains('pf-m-danger')).toBe(false)

                });



                test("Not - info", () => {

                    expect(stateStatusClasses.contains('pf-m-info')).toBe(false)

                });



                test("Not - success", () => {

                    expect(stateStatusClasses.contains('pf-m-success')).toBe(false)

                });



                test("Not - warning", () => {

                    expect(stateStatusClasses.contains('pf-m-warning')).toBe(false)

                });

            });

        });



        describe("Search", () => {


            let rendered;
            let element;

            beforeEach(()=> {

                rendered = render(
                        <StateSplash
                            titleText = "the title"
                            // body = ""
                            icon = {StateIcon.search}
                            // stackTrace = {null}
                            // status = {EmptyStateStatus.danger}
                        />
                );

                element = rendered.baseElement.querySelector('.pf-v6-c-empty-state');

            });



            test("Title", () => {

                const testElement = element.querySelector('.pf-v6-c-empty-state__title-text');

                expect(testElement.innerHTML).toEqual('the title')

            });



            test("Body", () => {

                expect(
                    element.querySelector('.pf-v6-c-empty-state__body')
                ).not.toBeInTheDocument();

            });



            test("Icon", async () => {


                const rendered = render(
                    <StateSplash
                        titleText = "the title"
                        // body = ""
                        icon = {StateIcon.search}
                        // stackTrace = {null}
                        // status = {EmptyStateStatus.danger}
                    />
                );

                const testElement = rendered.baseElement.querySelector('.pf-v6-icon-default');

                expect(testElement.innerHTML).toEqual(svgIconSearchPathValue)

            });



            test("stackTrace", () => {

                expect(
                    element.querySelector('.pf-v6-c-expandable-section__content')
                ).not.toBeInTheDocument();

            });



            /**
             * must not have classes:
             * 
             * - pf-m-custom
             * - pf-m-danger
             * - pf-m-info
             * - pf-m-success
             * - pf-m-warning
             * 
             * Which means it is set to null.
             */
            describe("Status is 'null'", () => {


                let stateStatusClasses;

                beforeEach(() => {

                    stateStatusClasses = element.classList

                })



                test("Not - custom", () => {

                    expect(stateStatusClasses.contains('pf-m-custom')).toBe(false)

                });



                test("Not - danger", () => {

                    expect(stateStatusClasses.contains('pf-m-danger')).toBe(false)

                });



                test("Not - info", () => {

                    expect(stateStatusClasses.contains('pf-m-info')).toBe(false)

                });



                test("Not - success", () => {

                    expect(stateStatusClasses.contains('pf-m-success')).toBe(false)

                });



                test("Not - warning", () => {

                    expect(stateStatusClasses.contains('pf-m-warning')).toBe(false)

                });

            });

        });



        describe("Warning", () => {


            let rendered;
            let element;

            beforeEach(()=> {

                rendered = render(
                        <StateSplash
                            titleText = "the title"
                            // body = ""
                            icon = {StateIcon.warning}
                            // stackTrace = {null}
                            // status = {EmptyStateStatus.danger}
                        />
                );

                element = rendered.baseElement.querySelector('.pf-v6-c-empty-state');

            });



            test("Title", () => {

                const testElement = element.querySelector('.pf-v6-c-empty-state__title-text');

                expect(testElement.innerHTML).toEqual('the title')

            });



            test("Body", () => {

                expect(
                    element.querySelector('.pf-v6-c-empty-state__body')
                ).not.toBeInTheDocument();

            });



            test("Icon", async () => {


                const rendered = render(
                    <StateSplash
                        titleText = "the title"
                        // body = ""
                        icon = {StateIcon.warning}
                        // stackTrace = {null}
                        // status = {EmptyStateStatus.danger}
                    />
                );


                const testElement = rendered.baseElement.querySelector('.pf-v6-svg');

                expect(testElement.innerHTML).toEqual(svgIconWarningPathValue)

            });



            test("stackTrace", () => {

                expect(
                    element.querySelector('.pf-v6-c-expandable-section__content')
                ).not.toBeInTheDocument();

            });



            /**
             * must not have classes:
             * 
             * - pf-m-custom
             * - pf-m-danger
             * - pf-m-info
             * - pf-m-success
             * - pf-m-warning
             * 
             * Which means it is set to null.
             */
            describe("Status is 'null'", () => {


                let stateStatusClasses;

                beforeEach(() => {

                    stateStatusClasses = element.classList

                })



                test("Not - custom", () => {

                    expect(stateStatusClasses.contains('pf-m-custom')).toBe(false)

                });



                test("Not - danger", () => {

                    expect(stateStatusClasses.contains('pf-m-danger')).toBe(false)

                });



                test("Not - info", () => {

                    expect(stateStatusClasses.contains('pf-m-info')).toBe(false)

                });



                test("Not - success", () => {

                    expect(stateStatusClasses.contains('pf-m-success')).toBe(false)

                });



                test("Is - warning", () => {

                    expect(stateStatusClasses.contains('pf-m-warning')).toBe(true)

                });

            });

        });

    });

});
