import AssistanceIcon from "./icons/AssistanceIcon";
import DeviceIcon from "./icons/DeviceIcon";
import EditIcon from "./icons/EditIcon";
import ItamIcon from "./icons/ItamIcon";
import MenuIcon from "./icons/MenuIcon";
import NavDownIcon from "./icons/NavDownIcon";
import NavRightIcon from "./icons/NavRightIcon";
import SoftwareIcon from "./icons/SoftwareIcon";
import ReplyIcon from "./icons/ReplyIcon";
import NotificationIcon from "./icons/ticket/NotificationIcon";
import TaskIcon from "./icons/TaskIcon";
import NavDoubleLeftIcon from "./icons/NavDoubleLeftIcon";
import LinkIcon from "./icons/LinkIcon";
import ActionInstallIcon from "./icons/ActionInstallIcon";
import ActionAddIcon from "./icons/ActionAddIcon";
import ActionRemoveIcon from "./icons/ActionRemoveIcon";
import InventoryStatusUknIcon from "./icons/InventoryStatusUknIcon";
import InventoryStatusBadIcon from "./icons/InventoryStatusBadIcon";
import InventoryStatusWarnIcon from "./icons/InventoryStatusWarnIcon";
import InventoryStatusOkIcon from "./icons/InventoryStatusOkIcon";
import StatusNewIcon from "./icons/ticket/StatusNewIcon";
import StatusAssignedIcon from "./icons/ticket/StatusAssignedIcon";
import StatusClosedIcon from "./icons/ticket/StatusClosedIcon";
import StatusInvalidIcon from "./icons/ticket/StatusInvalidIcon";
import StatusAssignedPlanningIcon from "./icons/ticket/StatusAssignedPlanningIcon";
import StatusPendingIcon from "./icons/ticket/StatusPendingIcon";
import StatusSolvedIcon from "./icons/ticket/StatusSolvedIcon";
import StatusAcceptedIcon from "./icons/ticket/StatusAcceptedIcon";
import StatusEvaluationIcon from "./icons/ticket/StatusEvaluationIcon";
import StatusApprovalsIcon from "./icons/ticket/StatusApprovalsIcon";
import StatusTestingIcon from "./icons/ticket/StatusTestingIcon";
import RelatedTicketRelated from "./icons/ticket/RelatedTicketRelated";
import RelatedTicketBlocks from "./icons/ticket/RelatedTicketBlocks";
import RelatedTicketBlocked from "./icons/ticket/RelatedTicketBlocked";
import HelpIcon from "./icons/HelpIcon";
import DeleteIcon from "./icons/DeleteIcon";
import HistoryIcon from "./icons/HistoryIcon";
import AccessIcon from "./icons/AccessIcon";
import AnsibleIcon from "./icons/AnsibleIcon";
import ClusterIcon from "./icons/ClusterIcon";
import ConfigManagementIcon from "./icons/ConfigManagementIcon";
import InformationIcon from "./icons/InformationIcon";
import ITIMIcon from "./icons/ITIMIcon";
import ServiceIcon from "./icons/ServiceIcon";
import SettingsIcon from "./icons/SettingsIcon";
import ProjectIcon from "./icons/ProjectIcon";
import OrganizationIcon from "./icons/OrganizationIcon";
import OperatingSystem from "./icons/OperatingSystem";
import TicketRequest from "./icons/TicketRequest";
import TicketIncident from "./icons/TicketIncident";
import TicketProblem from "./icons/TicketProblem";
import TicketChange from "./icons/TicketChange";
import Webhook from "./icons/Webhook";
import Documentation from "./icons/documentation";
import SwaggerDcoumentation from "./icons/SwaggerDcoumentation";
import Git from "./icons/Git";
import CircleIcon from "./icons/Circle";


const icon_components = {
    access: AccessIcon,
    action_add:ActionAddIcon,
    action_install: ActionInstallIcon,
    action_remove: ActionRemoveIcon,
    ansible: AnsibleIcon,
    assistance: AssistanceIcon,
    circle: CircleIcon,
    cluster: ClusterIcon,
    config_group: ConfigManagementIcon,
    config_management: ConfigManagementIcon,
    device_status_bad: InventoryStatusBadIcon,
    device_status_ok: InventoryStatusOkIcon,
    device_status_unk: InventoryStatusUknIcon,
    device_status_warn: InventoryStatusWarnIcon,
    documentation: Documentation,
    reply: ReplyIcon,
    delete: DeleteIcon,
    device: DeviceIcon,
    edit: EditIcon,
    git: Git,
    help: HelpIcon,
    history: HistoryIcon,
    information: InformationIcon,
    kb: InformationIcon,
    itam: ItamIcon,
    itim: ITIMIcon,
    link: LinkIcon,
    menu: MenuIcon,
    navdown: NavDownIcon,
    navdoubleleft: NavDoubleLeftIcon,
    navright: NavRightIcon,
    notification: NotificationIcon,
    operating_system: OperatingSystem,
    organization: OrganizationIcon,
    project: ProjectIcon,
    service: ServiceIcon,
    software: SoftwareIcon,
    settings: SettingsIcon,
    swagger_docs: SwaggerDcoumentation,
    task: TaskIcon,
    ticket_change: TicketChange,
    ticket_incident: TicketIncident,
    ticket_problem: TicketProblem,
    ticket_related_blocks: RelatedTicketBlocks,
    ticket_related_blocked_by: RelatedTicketBlocked,
    ticket_related_related: RelatedTicketRelated,
    ticket_request: TicketRequest,
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
    webhook: Webhook,
    
};

const IconLoader = ({
    fill = '#FFF',
    name = null,
    height = '20px',
    width = '20px'
}) => {

    if( String(name).toLocaleLowerCase() in icon_components ) {

        const icon_name = String(name).toLocaleLowerCase().replace(' ', '_')

        const IconComponent = icon_components[ icon_name ];

        return (
            <IconComponent 
                fill = { fill }
                name = { name }
                height = { height }
                width = { width }
                class_name = { name }
            />
        );
    }

    return( <span>&nbsp;</span> )

}
 
export default IconLoader;
