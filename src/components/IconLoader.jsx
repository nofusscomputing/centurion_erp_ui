import AssistanceIcon from "./icons/AssistanceIcon";
import DeviceIcon from "./icons/DeviceIcon";
import EditIcon from "./icons/EditIcon";
import ItamIcon from "./icons/ItamIcon";
import MenuIcon from "./icons/MenuIcon";
import NavDownIcon from "./icons/NavDownIcon";
import NavRightIcon from "./icons/NavRightIcon";
import OrganizationIcon from "./icons/OrganizationIcon";
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
import StatusAssignedIcon from "./icons/ticket/StatusAssignedIcon";
import StatusClosedIcon from "./icons/ticket/StatusClosedIcon";
import StatusInvalidIcon from "./icons/ticket/StatusInvalidIcon";
import StatusAssignedPlanningIcon from "./icons/ticket/StatusAssignedPlanningIcon";
import StatusAcceptedIcon from "./icons/ticket/StatusAcceptedIcon";
import StatusEvaluationIcon from "./icons/ticket/StatusEvaluationIcon";
import StatusApprovalsIcon from "./icons/ticket/StatusApprovalsIcon";


const icon_components = {
    action_add:ActionAddIcon,
    action_install: ActionInstallIcon,
    action_remove: ActionRemoveIcon,
    assistance: AssistanceIcon,
    device_status_bad: InventoryStatusBadIcon,
    device_status_ok: InventoryStatusOkIcon,
    device_status_unk: InventoryStatusUknIcon,
    device_status_warn: InventoryStatusWarnIcon,
    reply: ReplyIcon,
    device: DeviceIcon,
    edit: EditIcon,
    itam: ItamIcon,
    link: LinkIcon,
    menu: MenuIcon,
    navdown: NavDownIcon,
    navdoubleleft: NavDoubleLeftIcon,
    navright: NavRightIcon,
    notification: NotificationIcon,
    organization: OrganizationIcon,
    software: SoftwareIcon,
    task: TaskIcon,
    ticket_status_accepted: StatusAcceptedIcon,
    ticket_status_approvals: StatusApprovalsIcon,
    ticket_status_assigned: StatusAssignedIcon,
    ticket_status_assigned_planning: StatusAssignedPlanningIcon,
    ticket_status_closed: StatusClosedIcon,
    ticket_status_evaluation: StatusEvaluationIcon,
    ticket_status_invalid: StatusInvalidIcon,
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
            />
        );
    }

    return( <span>&nbsp;</span> )

}
 
export default IconLoader;
