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


const icon_components = {
    assistance: AssistanceIcon,
    reply: ReplyIcon,
    device: DeviceIcon,
    edit: EditIcon,
    itam: ItamIcon,
    menu: MenuIcon,
    navdown: NavDownIcon,
    navdoubleleft: NavDoubleLeftIcon,
    navright: NavRightIcon,
    notification: NotificationIcon,
    organization: OrganizationIcon,
    software: SoftwareIcon,
    task: TaskIcon
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
