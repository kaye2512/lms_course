"use client"
import React from 'react';
import {Category} from "@prisma/client";
import {
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode
} from "react-icons/fc"
import {IconType} from "react-icons";
import CategoryItem from "@/app/(dashboard)/(routes)/search/_components/category-item";


interface CategoriesProps {
    items: Category[]
}

// match icon to a category
const iconMap: Record<Category["name"], IconType> = {
    "Music": FcMusic,
    "Photography": FcOldTimeCamera,
    "Fitness": FcSportsMode,
    "Accounting": FcSalesPerformance,
    "Computer": FcMultipleDevices,
    "Filming": FcFilmReel,
    "Engeneering": FcEngineering,
}

const Categories = ({items}:CategoriesProps) => {



    return (
        <div className={"flex items-center gap-x-2 overflow-x-auto pb-2"}>
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    );
};

export default Categories;