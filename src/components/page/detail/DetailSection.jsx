import {
    useEffect,
    useState
} from "react";

import { Link } from "react-router";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    DescriptionList,
    Flex,
    FlexItem,
} from "@patternfly/react-core";


import nunjucks from 'nunjucks'

import { apiFetch } from "../../../hooks/apiFetch";
import Badge from "../../Badge";
import IconLoader from "../../IconLoader";
import DisplayTable from "../../DisplayTable"
import DisplayFields from "../../DisplayFields";
import { useIsMobile } from "../../../hooks/useIsMobile";


/** DetailView Section
 * 
 * Builds a tab section for DetailView.
 * 
 * @param {Object} layout Section layout.
 * @param {Object} data Section data.
 * @param {Object} metadata API Metadata.
 * @param {Object} name Tab name
 * 
 * @returns Card Component ready to be placed.
 */
const DetailSection = ({
    layout,
    data,
    metadata,
    name,
    index = null,
}) => {

    const [external_links, setExternalLinks] = useState({})

    const isMobile = useIsMobile()

    let cardData

    const ModelFields = ({children}) => (
        <DescriptionList
            autoFitMinModifier={{default:"140px"}}
            columnModifier={{
                default: '1Col'
            }}
            aria-label="Model fields"
            horizontalTermWidthModifier={{default:"140px"}}
            isAutoFit
            isHorizontal={!isMobile}
            isInlineGrid
        >
            {children}
        </DescriptionList>
    )



    if( layout.layout === 'double' ) {

        cardData = (
            <Flex direction={{ default: 'row' }} >
                <FlexItem flex={{ default: 'flex_1' }} >
                    <Card isPlain>
                        <CardBody>
                            <ModelFields>
                                    <DisplayFields
                                        data={data}
                                        fields={layout.left}
                                        metadata={metadata}
                                    />
                            </ModelFields>
                        </CardBody>
                    </Card>
                </FlexItem>

                 <FlexItem flex={{ default: 'flex_1' }} >
                    <Card isPlain>
                        <CardBody>
                            <ModelFields>
                                    <DisplayFields
                                        data={data}
                                        fields={layout.right}
                                        metadata={metadata}
                                    />
                            </ModelFields>
                        </CardBody>
                    </Card>
                </FlexItem>
            </Flex>
        )

    } else if( layout.layout === 'single' ) {

        cardData = (
            <ModelFields>
                <DisplayFields
                    data={data}
                    metadata={metadata}
                    fields={layout.fields}
                />
            </ModelFields>
        )

    } else if( layout.layout === 'table' ) {

        if( layout.field in data._urls ) {

            cardData = (
                <DisplayTable
                    data_url_path={String(data._urls[layout.field]).split('api/v2')[1]}
                    add_button_filter = {layout?.sub_models ? layout.sub_models : []}
                />
            )
        } else {
            cardData = 'column data missing'
        }

    }


    useEffect(() => {

        if( index === 0 ) {

            if( 'external_links' in data._urls ) {

                apiFetch(
                    data._urls.external_links,
                    (response) =>{

                        setExternalLinks(response)

                    },
                )
            }
        }

    },[])

    let context = {}

    context[String(metadata.name).toLowerCase()] = data

    return (
        <Card
            grow={{ default: 'grow' }}
            isPlain
        >

            <CardHeader
                actions={{
                    actions: (Object.keys(external_links).length > 0 &&

                        (index === 0 && String(name).toLowerCase() == 'details') &&

                            external_links.results.map((external_link) => (
                            <Link to={nunjucks.renderString(external_link.display_name, context)} target="_blank">

                                <Badge
                                    background = {external_link.colour ? external_link.colour : 'var(--contrasting-colour)'}
                                    message = {external_link.button_text ? external_link.button_text : external_link.name}
                                >

                                    <IconLoader name={'link'} fill="var(--background-colour-active)" height='15px' width='15px'/>

                                </Badge>

                            </Link>))

                    ), 
                    hasNoOffset: false
                }}
            >

                <CardTitle>{'name' in layout ? layout.name : index === 0 ? name : ''}</CardTitle>

            </CardHeader>

            <CardBody>{cardData}</CardBody>

                {(
                    index === 0
                    && String(name).toLowerCase() == 'details'
                    && metadata.allowed_methods.includes('PUT')
                ) &&

                <CardFooter>
                    <Button
                        variant="primary"
                        component={(props) => <Link {...props} to={String(metadata.urls.self).split('api/v2')[1] + '/edit'} />}
                    >
                        Edit
                    </Button>
                </CardFooter>
                }
        </Card>
    );
}

export default DetailSection;
