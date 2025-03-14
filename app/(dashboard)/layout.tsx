import React from 'react';
import SideBar from "@/app/(dashboard)/_components/side-bar";
import Navbar from "@/app/(dashboard)/_components/navbar";


const DashboardLayout = ({children}:{children: React.ReactNode}) => {
    return (
        <div className={"h-full"}>
            <div className={"h-[80px] md:pl-56 fixed inset-y-0 w-full z-50"}>
                <Navbar/>
            </div>
            <div className={"hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50"}>
                <SideBar />
            </div>
            <main className={"md:pl-56 pt-[80px] h-full"}>
                {children}
            </main>

        </div>
    );
};

export default DashboardLayout;