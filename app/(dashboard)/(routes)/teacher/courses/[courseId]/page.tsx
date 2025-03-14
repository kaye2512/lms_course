import {db} from "@/lib/db"
import React from 'react';
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {IconBadge} from "@/components/icon-badge";
import {CircleDollarSign, FileBadge, LayoutDashboard, ListChecks} from "lucide-react";
import TitleForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/title-form";
import DescriptionForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/description-form";
import ImageForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/image-form";
import CategoryForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/category-form";
import PriceForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/price-form";
import AttachementForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/attachment-form";
import ChaptersForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/chapters-form";
import chaptersForm from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/chapters-form";
import {Banner} from "@/components/banner";
import CourseActions from "@/app/(dashboard)/(routes)/teacher/courses/[courseId]/_components/course-actions";

const CourseIdPage = async ({params}: {
    params: {courseId: string}
}) => {
    const {userId} = auth()

    if (!userId) {
        return redirect("/")
    }
    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId
        },
        include: {
            chapter: {
                orderBy: {
                    position: "asc"
                }
            },
            attachments: {
                orderBy: {
                    createdAt: "desc",
                }
            }
        }
    })

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    })


    if (!course) {
        return redirect("/")
    }

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.price,
        course.categoryId,
        course.chapter.some(chapter => chapter.isPublished)
    ]

    const totalsFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length

    const completionText = `(${completedFields}/${totalsFields})`

    const isComplete = requiredFields.every(Boolean)


    return (
        <>
            {!course.isPublished && (
                <Banner
                    label={"This course is unpublished. it will not be visible to the students"}

                />
            )}
            <div className={"p-6"}>
               <div className={"flex items-center justify-between"}>
                   <div className={"flex flex-col gap-y-2"}>
                    <h1 className={"text-2xl font-medium"}>
                        Course setup
                    </h1>
                       <span className={"text-sm text-slate-700"}>
                           Complete all fields {completionText}
                       </span>
                   </div>
               <CourseActions
                   courseId={params.courseId}
                   disabled={!isComplete}
                   isPublished={course.isPublished}
               />

               </div>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"}>
                    <div>
                        <div className={"flex items-center gap-x-2"}>
                            <IconBadge icon={LayoutDashboard}/>
                            <h2 className={"text-xl"}>
                                Customize your course
                            </h2>
                        </div>
                        <TitleForm
                            initialData={course}
                            courseId={course.id}
                        />

                        <DescriptionForm
                            initialData={course}
                            courseId={course.id}
                        />

                        <ImageForm
                            initialData={course}
                            courseId={course.id}
                        />
                        <CategoryForm
                            initialData={course}
                            courseId={course.id}
                            options={categories.map((category) => ({
                                label: category.name,
                                value: category.id,
                        }))} />
                    </div>
                    <div className={"space-y-6"}>
                        <div>
                            <div className={"flex items-center gap-x-2"}>
                                <IconBadge icon={ListChecks}/>
                                <h2 className={"text-xl"}>
                                    Course chapters
                                </h2>
                            </div>
                            <div>
                                <ChaptersForm
                                    initialData={course}
                                    courseId={course.id}
                                />
                            </div>
                        </div>
                        <div className={"flex items-center gap-x-2"}>
                            <IconBadge icon={CircleDollarSign}/>
                            <h2 className={"text-xl"}>
                                Sell your course
                            </h2>
                        </div>
                        <PriceForm
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                    <div>
                        <div className={"flex items-center gap-x-2"}>
                            <IconBadge icon={FileBadge}/>
                            <h2 className={"text-xl"}>
                                Resources & Attachments
                            </h2>
                        </div>
                        <AttachementForm
                            initialData={course}
                            courseId={course.id}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseIdPage;