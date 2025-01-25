import Badge from "../components/Badge";
import IconLoader from "../components/IconLoader";
import Table from "../components/Table";
import ContentHeader from "../components/page/ContentHeader";

const Testing = () => {
    return (
        <>
        <ContentHeader
            content_heading={'content_heading'}
            // content_header_icon={'content_header_icon'}
        />
        <section>
            text 
                <ul>
                    <li><Badge message="Very Low" icon_style='status priority very-low'><IconLoader name='circle' /></Badge></li>
                    <li><Badge message="Low" icon_style='status priority low'><IconLoader name='circle' /></Badge></li>
                    <li><Badge message="Medium" icon_style='status priority med'><IconLoader name='circle' /></Badge></li>
                    <li><Badge message="High" icon_style='status priority high'><IconLoader name='circle' /></Badge></li>
                    <li><Badge message='Very High' icon_style='status priority very-high'><IconLoader name='circle' /></Badge></li>
                </ul>
                
        </section>
        </>
    );
}
 
export default Testing;