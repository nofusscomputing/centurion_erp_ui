
import {
    useLayoutEffect,
    useState
} from 'react';

import { Icon } from "@patternfly/react-core";

import AccessIcon from "../images/icons/AccessIcon.svg";
import ActionAddIcon from "../images/icons/ActionAddIcon.svg";
import ActionInstallIcon from "../images/icons/ActionInstallIcon.svg";
import ActionRemoveIcon from "../images/icons/ActionRemoveIcon.svg";
import AssistanceIcon from "../images/icons/AssistanceIcon.svg";
import CircleIcon from "../images/icons/CircleIcon.svg";
import ClusterIcon from "../images/icons/ClusterIcon.svg";
import CodeIcon from "../images/icons/CodeIcon.svg";
import CopyIcon from "../images/icons/CopyIcon.svg";
import ConfigManagementGroupIcon from "../images/icons/ConfigManagementGroupIcon.svg";
import CustomerIcon from "../images/icons/CustomerIcon.svg";
import DeleteIcon from "../images/icons/DeleteIcon.svg";
import DeviceIcon from "../images/icons/DeviceIcon.svg";
import DirectoryIcon from "../images/icons/DirectoryIcon.svg";
import Documentation from "../images/icons/DocumentationIcon.svg"
import EditIcon from "../images/icons/EditIcon.svg";
import EmployeeIcon from "../images/icons/EmployeeIcon.svg";
import FeatureFlagIcon from "../images/icons/FeatureFlagIcon.svg";
import GitIcon from "../images/icons/GitIcon.svg";
import HelpIcon from "../images/icons/HelpIcon.svg";
import HistoryIcon from "../images/icons/HistoryIcon.svg";
import HumanResourcesIcon from "../images/icons/HumanResourcesIcon.svg";
import InformationIcon from "../images/icons/InformationIcon.svg";
import InventoryStatusBadIcon from "../images/icons/InventoryStatusBadIcon.svg";
import InventoryStatusOkIcon from "../images/icons/InventoryStatusOkIcon.svg";
import InventoryStatusUknIcon from "../images/icons/InventoryStatusUknIcon.svg";
import InventoryStatusWarnIcon from "../images/icons/InventoryStatusWarnIcon.svg";
import ItamIcon from "../images/icons/ItamIcon.svg";
import ITIMIcon from "../images/icons/ITIMIcon.svg";
import ITOPSIcon from "../images/icons/ITOPSIcon.svg";
import LinkIcon from "../images/icons/LinkIcon.svg";
import MenuIcon from "../images/icons/MenuIcon.svg";
import NotificationIcon from "../images/icons/ticket/NotificationIcon.svg";
import OperatingSystemIcon from "../images/icons/OperatingSystemIcon.svg";
import OrganizationIcon from "../images/icons/OrganizationIcon.svg";
import ProjectIcon from "../images/icons/ProjectIcon.svg";
import RelatedTicketBlocked from "../images/icons/ticket/RelatedTicketBlocked.svg";
import RelatedTicketBlocks from "../images/icons/ticket/RelatedTicketBlocks.svg";
import RelatedTicketRelated from "../images/icons/ticket/RelatedTicketRelated.svg";
import ReplyIcon from "../images/icons/ReplyIcon.svg";
import RoleIcon from "../images/icons/RoleIcon.svg";
import ServiceIcon from "../images/icons/ServiceIcon.svg";
import SettingsIcon from "../images/icons/SettingsIcon.svg";
import SoftwareIcon from "../images/icons/SoftwareIcon.svg";
import StatusAcceptedIcon from "../images/icons/ticket/StatusAcceptedIcon.svg";
import StatusApprovalsIcon from "../images/icons/ticket/StatusApprovalsIcon.svg";
import StatusAssignedIcon from "../images/icons/ticket/StatusAssignedIcon.svg";
import StatusAssignedPlanningIcon from "../images/icons/ticket/StatusAssignedPlanningIcon.svg";
import StatusClosedIcon from "../images/icons/ticket/StatusClosedIcon.svg";
import StatusEvaluationIcon from "../images/icons/ticket/StatusEvaluationIcon.svg";
import StatusInvalidIcon from "../images/icons/ticket/StatusInvalidIcon.svg";
import StatusNewIcon from "../images/icons/ticket/StatusNewIcon.svg";
import StatusPendingIcon from "../images/icons/ticket/StatusPendingIcon.svg";
import StatusSolvedIcon from "../images/icons/ticket/StatusSolvedIcon.svg";
import StatusTestingIcon from "../images/icons/ticket/StatusTestingIcon.svg";
import SwaggerDocumentationIcon from "../images/icons/SwaggerDocumentationIcon.svg";
import TaskIcon from "../images/icons/TaskIcon.svg";
import TenantIcon from "../images/icons/TenantIcon.svg";
import TicketChangeIcon from "../images/icons/TicketChangeIcon.svg";
import TicketIncidentIcon from "../images/icons/TicketIncidentIcon.svg";
import TicketProblemIcon from "../images/icons/TicketProblemIcon.svg";
import TicketRequestIcon from "../images/icons/TicketRequestIcon.svg";
import UserIcon from "../images/icons/UserIcon.svg";
import Webhook from "../images/icons/WebhookIcon.svg";


// Brand Icons
import AnsibleIcon from "../images/icons/brands/AnsibleIcon.svg";
import GitHubIconColour from "../images/icons/brands/GitHubIconColour.svg";
import GitLabIconColour from "../images/icons/brands/GitLabIconColour.svg";



const icon_components = {
    access: AccessIcon,
    action_add: ActionAddIcon,
    action_install: ActionInstallIcon,
    action_remove: ActionRemoveIcon,
    ansible: AnsibleIcon,
    assistance: AssistanceIcon,
    circle: CircleIcon,
    cluster: ClusterIcon,
    code: CodeIcon,
    config_group: ConfigManagementGroupIcon,
    config_management: ConfigManagementGroupIcon,
    copy: CopyIcon,
    customer: CustomerIcon,
    delete: DeleteIcon,
    device: DeviceIcon,
    device_status_bad: InventoryStatusBadIcon,
    device_status_ok: InventoryStatusOkIcon,
    device_status_unk: InventoryStatusUknIcon,
    device_status_warn: InventoryStatusWarnIcon,
    devops: CodeIcon,
    directory: DirectoryIcon,
    documentation: Documentation,
    edit: EditIcon,
    employee: EmployeeIcon,
    feature_flag: FeatureFlagIcon,
    git: GitIcon,
    github: GitHubIconColour,
    gitlab: GitLabIconColour,
    help: HelpIcon,
    history: HistoryIcon,
    human_resources: HumanResourcesIcon,
    information: InformationIcon,
    itam: ItamIcon,
    itim: ITIMIcon,
    itops: ITOPSIcon,
    kb: InformationIcon,
    link: LinkIcon,
    menu: MenuIcon,
    notification: NotificationIcon,
    operating_system: OperatingSystemIcon,
    organization: OrganizationIcon,
    project: ProjectIcon,
    reply: ReplyIcon,
    role: RoleIcon,
    service: ServiceIcon,
    settings: SettingsIcon,
    software: SoftwareIcon,
    software_version: SoftwareIcon,
    swagger_docs: SwaggerDocumentationIcon,
    task: TaskIcon,
    tenant: TenantIcon,
    ticket_change: TicketChangeIcon,
    ticket_incident: TicketIncidentIcon,
    ticket_problem: TicketProblemIcon,
    ticket_related_blocked_by: RelatedTicketBlocked,
    ticket_related_blocks: RelatedTicketBlocks,
    ticket_related_related: RelatedTicketRelated,
    ticket_request: TicketRequestIcon,
    ticket_status_accepted: StatusAcceptedIcon,
    ticket_status_approvals: StatusApprovalsIcon,
    ticket_status_assigned: StatusAssignedIcon,
    ticket_status_assigned_planning: StatusAssignedPlanningIcon,
    ticket_status_closed: StatusClosedIcon,
    ticket_status_draft: StatusNewIcon,
    ticket_status_evaluation: StatusEvaluationIcon,
    ticket_status_invalid: StatusInvalidIcon,
    ticket_status_new: StatusNewIcon,
    ticket_status_pending: StatusPendingIcon,
    ticket_status_solved: StatusSolvedIcon,
    ticket_status_testing: StatusTestingIcon,
    user: UserIcon,
    webhook: Webhook,

};



const svgCache = new Map();

const svgFetchCache = new Map();


/** Fetch and Cache SVG image
 * 
 * Fetch an SVG from a URL and cache it.
 * 
 * @param {str} src URL to the SVG to fetch 
 * @returns Request SVG Document
 */
const loadSvg = async (src) => {

    if (svgCache.has(src)) {

        return svgCache.get(src);

    }


    if (!svgFetchCache.has(src)) {

        svgFetchCache.set(

            src,

            fetch(src, { cache: "default" })

                .then(r => r.text())

                .then(svgText => {

                    const parser = new DOMParser();

                    const doc = parser.parseFromString(svgText, "image/svg+xml");

                    const svg = doc.querySelector("svg");

                    svgCache.set(src, svg);

                    svgFetchCache.delete(src);

                    return svg;

                })
        );
    }

    return svgFetchCache.get(src);

};



/** Dynamically load SVG
 * 
 * Loads SVG from URL and updates the XML attributes before loading into DOM.
 * 
 * @param {Sring} src Imported SVG Object or URL.
 * 
 * The Following parameters are optional:
 * @param {Sring} className Additional CSS class names to apply to the SVG.
 * @param {Sring} fill HTML fill colour for the SVG.
 * @param {Sring} height Height of the SVG icon.
 * @param {Sring} size Display size of Icon. see iconSize -> https://www.patternfly.org/components/icon/#props
 * @param {Sring} width Width of the SVG icon.
 * @returns SVG with attributes updated from params.
 */
const SvgIcon = ({ src, ...kwargs }) => {

    const {
        fill = 'currentColor',
        width = 'auto',
        height = 'auto',
        className = null,
        size = null,
        id = null,
        ...props 
    } = kwargs;


    const [svg, setSvg] = useState(null);

    useLayoutEffect(() => {

        let mounted = true;

        loadSvg(src).then((baseSvg) => {

            if (!mounted) {

                return;

            }

            const classNames = ['pf-v6-svg'];

            const cloned_svg = baseSvg.cloneNode(true);


            if (className) {
                classNames.push(className);
            }


            cloned_svg.setAttribute("className", classNames.join(' '));

            if (fill) cloned_svg.setAttribute("fill", fill);


            if (height) cloned_svg.setAttribute("height", height);


            cloned_svg.setAttribute("role", "img");

            if (width) cloned_svg.setAttribute("width", width);


            setSvg(cloned_svg)


            return () => {

                mounted = false;

            };

        });

    }, [src]);

    return (
        <Icon size={size}>
            {svg && <span ref={el => el?.appendChild(svg)} />}
        </Icon>
    );

}



/** Dynamic Icon Loader
 * 
 * Load an icon by name.
 * 
 * @param {*} param0 
 * @returns Icon Component ready for placement.
 */
const IconLoader = ({
    fill = '#FFF',
    name = null,
    height = '40px',
    width = '40px',
    class_name = null,
    ...kwargs
}) => {

    const icon_name = String(name).toLocaleLowerCase().replace(' ', '_')

    if( icon_name in icon_components ) {

        const IconComponent = icon_components[ icon_name ];

        const dynamic_icon = [
            "access",
            "action_add",
            "action_install",
            "action_remove",
            "ansible",
            "assistance",
            "circle",
            "cluster",
            "code",
            "config_group",
            "config_management",
            "copy",
            "customer",
            "delete",
            "device",
            "device_status_bad",
            "device_status_ok",
            "device_status_unk",
            "device_status_warn",
            "devops",
            "directory",
            "documentation",
            "edit",
            "employee",
            "feature_flag",
            "git",
            "github",
            "gitlab",
            "help",
            "history",
            "human_resources",
            "information",
            "itam",
            "itim",
            "itops",
            "kb",
            "link",
            "menu",
            "operating_system",
            "organization",
            "project",
            "reply",
            "role",
            "service",
            "settings",
            "software",
            "software_version",
            "swagger_docs",
            "task",
            "tenant",
            "ticket_change",
            "ticket_incident",
            "ticket_problem",
            "ticket_related_blocked_by",
            "ticket_related_blocks",
            "ticket_related_related",
            "ticket_request",
            "ticket_status_accepted",
            "ticket_status_approvals",
            "ticket_status_assigned",
            "ticket_status_assigned_planning",
            "ticket_status_closed",
            "ticket_status_draft",
            "ticket_status_evaluation",
            "ticket_status_invalid",
            "ticket_status_new",
            "ticket_status_pending",
            "ticket_status_solved",
            "ticket_status_testing",
            "user",
            "webhook",
        ]

        return (
                <SvgIcon
                    src={IconComponent}
                    {...kwargs}
                />
        );

    }

    return( <span>&nbsp;</span> )

}
 
export default IconLoader;
