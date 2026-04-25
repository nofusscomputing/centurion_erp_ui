import {
    render,
    screen
} from "@testing-library/react";

import FormField from "../../FormField";
import { FormatTime } from "../../../functions/FormatTime";


const fs = require('fs')
const path = require('path')



// jest.mock('../../../hooks/UserContext', () => {

//     const React = require('react');

//     const UserContext = React.createContext();

//     const UserProvider = ({ children }) => {

//         let contextData = {
//             user: {},
//             settings: {}
//         };

//         const demoRootPath = `${process.cwd()}/includes/usr/share/nginx/html/mock/api/v2`;

//         try {

//             const settingsRaw = require('fs').readFileSync(
//                 `${demoRootPath}/settings/user_settings/1/GET.json`,
//                 'utf-8'
//             );

//             const userRaw = require('fs').readFileSync(
//                 `${demoRootPath}/base/user/1/GET.json`,
//                 'utf-8'
//             );

//             contextData.settings = JSON.parse(settingsRaw);
//             contextData.user = JSON.parse(userRaw);

//         } catch (err) {
//             // fallback already empty
//         }

//         return React.createElement(
//             UserContext.Provider,
//             { value: contextData },
//             children
//         );
//     };


//     return {
//         __esModule: true,
//         default: UserContext,
//         UserProvider
//     };

// });



jest.mock('../../../hooks/UserContext', () => {
    const React = require('react');

    const demoRootPath = `${process.cwd()}/includes/usr/share/nginx/html/mock/api/v2`;

    const user = require(`${demoRootPath}/base/user/1/GET.json`);
    const user_settings = require(`${demoRootPath}/settings/user_settings/1/GET.json`);

    const mockContext = {
        user: user,
        settings: user_settings
    };

    const UserContext = React.createContext(mockContext);

    return {
        __esModule: true,
        default: UserContext,
        UserContext,
        UserProvider: ({ children }) => children,
    };
});


describe("FormField", () => {


    const baseDir = path.join(__dirname, '../../../../includes/usr/share/nginx/html/mock/api/v2/features/fields')



    const htmlFieldType = ( fieldType ) => {

        switch( fieldType ) {

            case 'Boolean':

                return 'input';


            case 'Choice':
            case 'Relationship':

                return 'select';


            case 'Date':
            case 'DateTime':
            case 'Email':
            // case 'GenericField':    // 'UUID':    // todo: fix centurion field type
            case 'Integer':
            case 'String':

                return 'input';


            case 'JSON':
            case 'Markdown':

                return 'textarea';

            default:
                throw Error('Test cant continue without knowing the HTML field type.')

        }
    }



    const ids = fs.readdirSync(baseDir)

    /**
     * Select the data for the different field types.
     */
    const fields = ids.map(id => {

        const filePath = path.join(baseDir, id, 'GET.json')

        const raw = fs.readFileSync(filePath, 'utf8')

        const json = JSON.parse(raw)

        const optionsFilePath = path.join(baseDir, id, 'OPTIONS.json')

        const rawOptions = fs.readFileSync(optionsFilePath, 'utf8')

        const jsonOptions = JSON.parse(rawOptions)


        return {
            data: json,
            options: jsonOptions
        }

    })

    describe("Add data", () => {

        const isCreate = true
        const isEdit = false


        test.each(fields)(
            'Enabled - $data.name - $data.id',
           ({ data, options }) => {
            /**
             * A field that is Enabled should display
             */


            const { container } = render(
                <FormField
                    errorState = {{}}
                    fieldName = {"field"}
                    formState = {{}}
                    isEdit = {isEdit}
                    isCreate = {isCreate}
                    objectData = {data}
                    objectMetadata = {options}
                    onChange = {null}
                />
            );


            const rendered = container.querySelector(`${htmlFieldType( options.fields["field"].type )}[name="field"]`)

            // Field must exist in data
            expect(String(rendered.outerHTML).replace("\n", '')).not.toBe('')

            // Field attribute to check
            expect([ null, true]).toContain(rendered.getAttribute('enabled'))

        });


        test.each(fields)(
            'Create Only - $data.name - $data.id',
           ({ data, options }) => {
            /**
             * A field that is read_only and write_only should display
             */


            const testMetadata = { ...options }

            testMetadata['fields']['field'].read_only = true
            testMetadata['fields']['field'].write_only = true

            const { container } = render(
                <FormField
                    errorState = {{}}
                    fieldName = {"field"}
                    formState = {{}}
                    isEdit = {isEdit}
                    isCreate = {isCreate}
                    objectData = {data}
                    objectMetadata = {testMetadata}
                    onChange = {null}
                />
            );

            const rendered = container.querySelector(`${htmlFieldType( options.fields["field"].type )}[name="field"]`)

            // Field must exist in data
            expect(String(rendered.outerHTML).replace("\n", '')).not.toBe('')

            // Field attribute to check
            expect(rendered.getAttribute('readonly')).toBe(null)

        });


        test.each(fields)(
            'Read-Only - $data.name - $data.id',
           ({ data, options }) => {
            /**
             * A field that is read_only and not write_only should not display
             */


            const testMetadata = { ...options }

            testMetadata['fields']['field'].read_only = true
            testMetadata['fields']['field'].write_only = false

            const { container } = render(
                <FormField
                    errorState = {{}}
                    fieldName = {"field"}
                    formState = {{}}
                    isEdit = {isEdit}
                    isCreate = {isCreate}
                    objectData = {data}
                    objectMetadata = {testMetadata}
                    onChange = {null}
                />
            );

            const rendered = container.querySelector(`${htmlFieldType( options.fields["field"].type )}[name="field"]`)

            // Field must not exist in data
            expect(rendered).toBe(null)


        });


        test.each(fields)(
            'Required - $data.name - $data.id',
           ({ data, options }) => {
            /**
             * A field that is required should display
             */


            const testMetadata = { ...options }

            testMetadata['fields']['field'].read_only = false
            testMetadata['fields']['field'].required = true
            testMetadata['fields']['field'].write_only = false

            const { container } = render(
                <FormField
                    errorState = {{}}
                    fieldName = {"field"}
                    formState = {{}}
                    isEdit = {isEdit}
                    isCreate = {isCreate}
                    objectData = {data}
                    objectMetadata = {testMetadata}
                    onChange = {null}
                />
            );

            const rendered = container.querySelector(`${htmlFieldType( options.fields["field"].type )}[name="field"]`)

            // Field must exist in data
            expect(String(rendered.outerHTML).replace("\n", '')).not.toBe('')

            // Field attribute to check
            expect(rendered.getAttribute('required')).toBe(null)

        });


    
        test.each(fields)(
            'Initial Value - $data.name - $data.id',
           ({ data, options }) => {
            /**
             * A field that has an inital value set must add it as its value
             */


            const initialFieldValue = ( fieldType ) => {

                switch( fieldType ) {

                    case 'Boolean':

                        return {
                            value: true,
                            rendered: "on"
                        };

                    case 'Choice':
                    case 'Relationship':

                        return {
                            value: 2,
                            rendered: "2"
                        };

                    case 'Date':
                        return {
                            value: '2024-01-01',
                            rendered: '2024-01-01'
                        };

                    case 'DateTime':
                        return {
                            value: "2023-07-11T17:30",
                            rendered: "2023-07-11T17:30"
                        };

                    case 'Email':
                        return {
                            value: 'username@domain.tld',
                            rendered: 'username@domain.tld'
                        };

                    // case 'GenericField':    // 'UUID':    // todo: fix centurion field type
                    case 'Integer':
                        return {
                            value: 5,
                            rendered: "5"
                        };

                    case 'String':
                        return {
                            value: 'a random string',
                            rendered: 'a random string'
                        };

                    case 'JSON':
                        return {
                            value: JSON.stringify({
                                "a_key": "a_string_value"
                            }),
                            rendered: JSON.stringify({
                                "a_key": "a_string_value"
                            })
                        };

                    case 'Markdown':
                        return {
                            value: '## heading\n\ntext',
                            rendered: '## heading\n\ntext'
                        };

                    default:
                        throw Error('Test cant continue without knowing the HTML field type.')

                }
            }

            const fieldValue = initialFieldValue( options.fields["field"].type )

            const testMetadata = { ...options }

            testMetadata['fields']['field'].initial = fieldValue.value
            testMetadata['fields']['field'].read_only = false
            testMetadata['fields']['field'].required = true
            testMetadata['fields']['field'].write_only = false

            const { container } = render(
                <FormField
                    errorState = {{}}
                    fieldName = {"field"}
                    formState = {{}}
                    isEdit = {isEdit}
                    isCreate = {isCreate}
                    objectData = {data}
                    objectMetadata = {testMetadata}
                    onChange = {null}
                />
            );

            const rendered = container.querySelector(`${htmlFieldType( options.fields["field"].type )}[name="field"]`)

            // Field must exist in data
            expect(String(rendered.outerHTML).replace("\n", '')).not.toBe('')

            // Field attribute to check
            expect(rendered.value).toBe(fieldValue.rendered)
        
        });


    });


    describe("Edit data", () => {

        const isCreate = false
        const isEdit = true


        test.each(fields)(
            'Enabled - $data.name - $data.id',
           ({ data, options }) => {
            /**
             * A field that is Enabled should display
             */


            const { container } = render(
                <FormField
                    errorState = {{}}
                    fieldName = {"field"}
                    formState = {{}}
                    isEdit = {isEdit}
                    isCreate = {isCreate}
                    objectData = {data}
                    objectMetadata = {options}
                    onChange = {null}
                />
            );


            const rendered = container.querySelector(`${htmlFieldType( options.fields["field"].type )}[name="field"]`)

            // Field must exist in data
            expect(String(rendered.outerHTML).replace("\n", '')).not.toBe('')

            // Field attribute to check
            expect([ null, true]).toContain(rendered.getAttribute('enabled'))

        });


        test.each(fields)(
            'Create Only - $data.name - $data.id',
           ({ data, options }) => {
            /**
             * A field that is read_only and write_only should display
             */


            const testMetadata = { ...options }

            testMetadata['fields']['field'].read_only = true
            testMetadata['fields']['field'].write_only = true

            const { container } = render(
                <FormField
                    errorState = {{}}
                    fieldName = {"field"}
                    formState = {{}}
                    isEdit = {isEdit}
                    isCreate = {isCreate}
                    objectData = {data}
                    objectMetadata = {testMetadata}
                    onChange = {null}
                />
            );

            const rendered = container.querySelector(`${htmlFieldType( options.fields["field"].type )}[name="field"]`)

            // Field must not exist in data
            expect(rendered).toBe(null)

        });


        test.each(fields)(
            'Read-Only - $data.name - $data.id',
           ({ data, options }) => {
            /**
             * A field that is read_only and not write_only should not display
             */


            const testMetadata = { ...options }

            testMetadata['fields']['field'].read_only = true
            testMetadata['fields']['field'].write_only = false

            const { container } = render(
                <FormField
                    errorState = {{}}
                    fieldName = {"field"}
                    formState = {{}}
                    isEdit = {isEdit}
                    isCreate = {isCreate}
                    objectData = {data}
                    objectMetadata = {testMetadata}
                    onChange = {null}
                />
            );

            const rendered = container.querySelector(`${htmlFieldType( options.fields["field"].type )}[name="field"]`)

            // Field must not exist in data
            expect(rendered).toBe(null)


        });


        test.each(fields)(
            'Required - $data.name - $data.id',
           ({ data, options }) => {
            /**
             * A field that is required should display
             */


            const testMetadata = { ...options }

            testMetadata['fields']['field'].read_only = false
            testMetadata['fields']['field'].required = true
            testMetadata['fields']['field'].write_only = false

            const { container } = render(
                <FormField
                    errorState = {{}}
                    fieldName = {"field"}
                    formState = {{}}
                    isEdit = {isEdit}
                    isCreate = {isCreate}
                    objectData = {data}
                    objectMetadata = {testMetadata}
                    onChange = {null}
                />
            );

            const rendered = container.querySelector(`${htmlFieldType( options.fields["field"].type )}[name="field"]`)

            // Field must exist in data
            expect(String(rendered.outerHTML).replace("\n", '')).not.toBe('')

            // Field attribute to check
            expect(rendered.getAttribute('required')).toBe(null)

        });


    
        test.each(fields)(
            'Initial Value - $data.name - $data.id',
           ({ data, options }) => {
            /**
             * A field that has an initial value set must add it as its value
             */


            const initialFieldValue = ( fieldType ) => {

                switch( fieldType ) {

                    case 'Boolean':

                        return {
                            value: data['field'],
                            rendered: "on"
                        };

                    case 'Choice':

                        return {
                            value: data['field'],
                            rendered: String(data['field'])
                        };

                    case 'Relationship':

                        return {
                            value: data['field'],
                            rendered: String(data['field'].id)
                        };

                    case 'Date':
                        return {
                            value: data['field'],
                            rendered: data['field']
                        };

                    case 'DateTime':
                        return {
                            value: data['field'],
                            // rendered: FormatTime({
                            //     time: data['field'],
                            //     tz: "Australia/Darwin"
                            // })
                            rendered: String(FormatTime({
                                time: data['field'],
                                iso: true,
                                tz: "Australia/Darwin"
                            })).replace('Z', '').substring(0, 16)
                        };

                    case 'Email':
                        return {
                            value: data['field'],
                            rendered: data['field']
                        };

                    // case 'GenericField':    // 'UUID':    // todo: fix centurion field type
                    case 'Integer':
                        return {
                            value: data['field'],
                            rendered: String(data['field'])
                        };

                    case 'String':
                        return {
                            value: data['field'],
                            rendered: data['field']
                        };

                    case 'JSON':
                        return {
                            value: JSON.stringify( data['field'] ),
                            rendered: JSON.stringify( data['field'], null, 4 )
                        };

                    case 'Markdown':
                        return {
                            value: data['field'],
                            rendered: data['field'].markdown
                        };

                    default:
                        throw Error('Test cant continue without knowing the HTML field type.')

                }
            }

            const fieldValue = initialFieldValue( options.fields["field"].type )

            const testMetadata = { ...options }

            testMetadata['fields']['field'].initial = fieldValue.value
            testMetadata['fields']['field'].read_only = false
            testMetadata['fields']['field'].required = true
            testMetadata['fields']['field'].write_only = false

            const { container } = render(
                <FormField
                    errorState = {{}}
                    fieldName = {"field"}
                    formState = {{}}
                    isEdit = {isEdit}
                    isCreate = {isCreate}
                    objectData = {data}
                    objectMetadata = {testMetadata}
                    onChange = {null}
                />
            );

            const rendered = container.querySelector(`${htmlFieldType( options.fields["field"].type )}[name="field"]`)

            // Field must exist in data
            expect(String(rendered.outerHTML).replace("\n", '')).not.toBe('')

            // Field attribute to check
            expect(rendered.value).toBe(fieldValue.rendered)
        
        });


    });

});