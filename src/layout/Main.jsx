import { PageSection } from "@patternfly/react-core";
import { Outlet } from "react-router";



const MainLayout = () => {

    return (
        <PageSection
            aria-labelledby="page-content"
            isFilled={true}
        >
            <Outlet />
        </PageSection>
    );
}

export default MainLayout;
