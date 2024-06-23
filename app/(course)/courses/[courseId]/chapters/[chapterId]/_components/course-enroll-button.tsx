"use client"

import {Button} from "@/components/ui/button"
import {formatprice} from "@/lib/format";

interface CourseEnrollButtonProps {
    price: number
    courseId: string
}

export const CourseEnrollButton = ({price,courseId}:CourseEnrollButtonProps) => {
    return (
        <Button size={"sm"} className={"w-full md:w-auto"}>
            Enroll for {formatprice(price)}
        </Button>
    )
}