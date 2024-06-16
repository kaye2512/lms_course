"use client"
import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import ConfirmModal from "@/components/modal/confirm-modal";
import toast from "react-hot-toast";
import axios from "axios";
import {useRouter} from "next/navigation";

interface CourseActionsProps {
    disabled: boolean
    courseId: string
    isPublished: boolean
}

const CourseActions = ({disabled,courseId,isPublished}:CourseActionsProps) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
        try {
            setIsLoading(true)

            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`)
                toast.success("Course unpublished")
            }else {
                await axios.patch(`/api/courses/${courseId}/publish`)
                toast.success("Course published")
            }

            router.refresh()
        }catch {
            toast.error("Error creating chapter");
        }finally {
            setIsLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/courses/${courseId}`);
            toast.success("Course deleted!");
            router.refresh();
            router.push(`/teacher/courses`);
        }catch {
            toast.error("Something went wrong ");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm"
            >
                {isPublished ? "Unpublished" : "Published"}
            </Button>
            <ConfirmModal onConfirm={onDelete}>
                <Button
                    size={"sm"}
                >
                    <Trash className={"h-4 w-4"}/>
                </Button>
            </ConfirmModal>

        </div>
    );
};

export default CourseActions;