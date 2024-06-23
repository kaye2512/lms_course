import React from 'react';
import {Chapter, Course, UserProgress} from "@prisma/client";
import NavbarRoutes from "@/components/navbar-routes";


interface CourseNavbarProps {
    course: Course & {
        chapter: (Chapter & {
            userProgress: UserProgress[] | null
        })[]
    };
    progressCount: number

}
const CourseNavbar = ({course,progressCount}:CourseNavbarProps) => {
    return (
        <div className={"p-4 border-b h-full flex items-center bg-white shadow-sm"}>

            <NavbarRoutes />
        </div>
    );
};

export default CourseNavbar;