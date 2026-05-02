import {
    useContext
} from "react";

import {
    Link
} from "react-router";

import Badge from "../components/Badge";
import { FormatTime } from "./FormatTime";
import IconLoader from "../components/IconLoader";
import RenderMarkdown from "./RenderMarkdown";
import URLSanitize from "./URLSanitize";
import UserContext from "../hooks/UserContext";



/**
 * Fetch the field data from Django API Data
 *
 * @param {Object} metadata  Django API HTTP/OPTION request body
 * @param {String} field_name name of the field. Must match the API field key
 * @param {Object} data The API request body.
 * @param {Boolean} autolink Format the Field as a URL using `data._urls._self` as the anchor
 * 
 * @returns {String} The value of the field
 */
export default function FieldData({
    full_width = false,
    metadata,
    field_name,
    data = null,
    autolink = false,
    /**
     * Post PatternFly refactor
     */
    withFormatting = true,    // will this be required post refactor????
})  {

    const user = useContext(UserContext)

    if( ! data ) {

        return null;
    }

    let field_data = withFormatting ? '-' : null;

    let data_field = field_lookup(field_name, data)
    if( typeof(field_name) === 'object' ) {

        data_field = field_lookup(field_name.field, data)

    }

    if( data_field != null ) {

        let field_type = null

        if( field_name in metadata.fields ) {

            field_type = metadata.fields[field_name].type

        } else if( typeof(field_name) === 'object' ) {

            field_type = metadata.fields[field_name.field].type

        }

        switch(field_type) {

            case 'Badge':

                field_data = data_field.text

                if( data_field.url ) {
                    field_data = (
                        <Badge
                            icon={data_field.icon.name}
                            to={URLSanitize(data['_urls'][data_field.url])+'/edit'}
                        >
                            {data_field.text}
                        </Badge>
                    )
                } else {

                    field_data = (
                        <Badge
                            icon={data_field.icon.name}
                            classNameSuffix={String(data_field.icon.style).replace(' ', '-')}
                        >
                            {data_field.text}
                        </Badge>
                    )

                }

                break;

            case 'Boolean':

                if( ! withFormatting ) {

                    return Boolean(data_field);

                }

                if( Boolean(data_field) ) {

                    field_data = 'Yes'

                } else {

                    field_data = 'No'

                }

                break;

            case 'Choice':

                for( const [key, choice] of Object.entries(metadata.fields[field_name].choices) ) {

                    if( Number(data_field) == Number(choice.value) ) {

                        field_data = String(choice.display_name)

                        if( ! withFormatting ) {

                            return Number(data_field);

                        }

                        break;

                    } else if( typeof(data_field) === 'string' && data_field === choice.value ) {

                        field_data = choice.value
                        if( ! withFormatting ) {

                            return String(choice.value);

                        }

                    }

                }

                break;

            case 'DateTime':

                if( ! withFormatting ) {
                    return String(FormatTime({
                        time: String(data_field),
                        iso: true,
                        tz: user.settings.timezone
                    })).replace('Z', '')
                }

                field_data = FormatTime({
                    time: String(data_field),
                    tz: user.settings.timezone
                })

                break;

            case 'Icon':

                field_data = (
                    <>
                        {data_field.map((icon) => {
                            return (
                                <span className={icon.style}>
                                    <IconLoader name={icon.name} fill={null} height='20px' width='20px' />
                                </span>
                            )
                        })}
                    </>
                )

                break;

            case 'GenericField':
            case 'Relationship':
            case 'Serializer':

                if( metadata.fields[field_name]?.relationship_type === 'ManyToMany' ) {

                    if( typeof(data_field) === 'object' ) {

                        field_data = (

                            data_field.map((field) => {

                                if( field.hasOwnProperty('url') ) {

                                    if( ! withFormatting ) {
                                        return field.id
                                    }

                                    return (
                                        <>
                                        <Link to={URLSanitize(field.url)}>{field.display_name}</Link>&nbsp;,
                                        </>
                                    );

                                } else {

                                    if( ! withFormatting ) {
                                        return field.value
                                    }

                                    return (
                                        <>
                                        {field.display_name}&nbsp;,
                                        </>
                                    );
                                }
                            })
                        )
                    }

                } else {

                    if( data_field === null ) {

                        field_data = '-'

                    } else if( typeof( data_field ) === 'object' ) {

                        if( 'url' in data_field ) {

                                if( ! withFormatting ) {
                                    return data_field.id
                                }

                            field_data = (
                                <Link to={URLSanitize(data_field.url)}>{data_field.display_name}</Link>
                            )

                        } else {

                                if( ! withFormatting ) {
                                    return data_field.id
                                }

                            field_data = data_field.display_name

                        }

                    } else if( typeof( field_name ) === 'object' && autolink ) {

                        field_data = (
                            <Link to={URLSanitize(data['_urls'][field_name.key])}>{data_field}</Link>
                        )

                    } else if( typeof (data_field) === 'list' ) {

                        field_data = 'data_field'

                    } else {

                        field_data = data_field

                    }
                }

                break;

            case 'JSON':

                if( ! withFormatting ) {
                    return JSON.stringify(data_field, null, 4);
                }

                let markdown = "``` json"
                    + "\r\n\r\n"
                    + JSON.stringify(data_field, null, 4)
                    + "\r\n\r\n"
                    + "```"
                    + "\r\n"

                field_data = (
                    <RenderMarkdown env={{}} full_width={full_width}>
                        {markdown}
                    </RenderMarkdown>
                )

                // const clipboardCopyFunc = (event, text) => {
                //     navigator.clipboard.writeText(text.toString());
                // };

                // const [copied, setCopied] = useState(false);

                // const onClick = (event, text) => {
                //     clipboardCopyFunc(event, text);
                //     setCopied(true);
                // };

                // const code = JSON.stringify(data_field, null, 4)

                // field_data = (
                //     <CodeBlock
                //         actions={
                //             <CodeBlockAction>
                //                 <ClipboardCopyButton
                //                     id="basic-copy-button"
                //                     textId="code-content"
                //                     aria-label="Copy to clipboard basic example code block"
                //                     onClick={e => onClick(e, code)}
                //                     exitDelay={copied ? 1500 : 600}
                //                     maxWidth="110px"
                //                     variant="plain"
                //                     onTooltipHidden={() => setCopied(false)}
                //                     >
                //                 {copied ? 'Successfully copied to clipboard!' : 'Copy to clipboard'}
                //                 </ClipboardCopyButton>
                //             </CodeBlockAction>
                //         }
                //     >
                //         <CodeBlockCode>{code}</CodeBlockCode>
                //     </CodeBlock>
                // )

                break;

            case 'Markdown':

            if( ! withFormatting ) {
                return data_field.markdown;
            }

                field_data = (
                    <RenderMarkdown env={data_field.render ?? {}}>
                        {data_field.markdown}
                    </RenderMarkdown>
                )

                break;
            default:

                if(
                    (
                        (
                            field_name === 'name'
                            || field_name === 'title'
                        )
                        && autolink
                    )
                    || (
                        '_urls' in data
                        && (
                            autolink
                            && Boolean(metadata.fields[field_name]?.autolink)
                        )
                    )
                    || autolink
                ) {

                    field_data = (
                        <Link to={URLSanitize(data['_urls']._self)}>{data_field}</Link>
                    )

                } else {


                    field_data = data_field

                }

                break;

        }

    }

    return field_data;
}

export function field_lookup(field_name, data) {

    if( String(field_name).includes('.') ) {

        let field = String( field_name ).split( '.' )

        if( ! field[0] in data) {

            return null

        }

        return field_lookup( field[1], data[field[0]] )

    }

    if( ! field_name in data) {

        return null

    }
    return data[field_name]
}
