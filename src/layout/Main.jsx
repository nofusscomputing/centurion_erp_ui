import { Outlet } from "react-router";



const MainLayout = () => {

    return (
        <div className="content" style={{
            display: "flex",
            flexDirection: "column"
        }}>
            <Outlet />
        </div>
    );
}

export default MainLayout;
