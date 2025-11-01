import { Outlet } from "react-router-dom";
import Navbar from '../components/navbar';

const HomeLayout = () => {
    return (
        <div className="h-dvh flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <footer>footer</footer>
        </div>
    )
};

export default HomeLayout;