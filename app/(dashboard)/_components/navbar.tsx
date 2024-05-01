import React from 'react';
import MobileSidebar from "@/app/(dashboard)/_components/mobile-sidebar";
import NavbarRoutes from "@/components/navbar-routes";

const Navbar = () => {
    return (
        <div className="p-4 flex border-b h-full items-center bg-white shadow-sm">
            <MobileSidebar/>
            <NavbarRoutes/>
        </div>
    );
};

export default Navbar;