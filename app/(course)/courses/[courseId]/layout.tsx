import { db } from "@/lib/db"
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {getProgress} from "@/actions/get-progress";
import {CourseSidebar} from "@/app/(course)/courses/[courseId]/_components/course-sidebar";
import CourseNavbar from "@/app/(course)/courses/[courseId]/_components/course-navbar";


const CourseLayout = async ({children, params}:{children: React.ReactNode; params: {courseId: string}}) => {

    const {userId} = auth()

    if (!userId){
        return redirect("/")
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
        },
        include: {
            chapter: {
                where: {
                    isPublished:true,
                },
                include: {
                    userProgress: {
                        where: {
                            userId
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                }
            }
        }
    })

    if (!course){
        return redirect("/")
    }

    const progressCount = await getProgress(userId, course.id)

    return (
        <div className={"h-full"}>
            <div className={"h-[80px] md:pl-80 fixed inset-y-0 w-full -50"}>
                <CourseNavbar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <div className={"h-full hidden md:flex w-80 flex-col fixed inset-y-0 z-50"}>
                <CourseSidebar
                    course={course}
                    progressCount={progressCount}
                />
            </div>
            <main className="h-full md:pl-80 pt-[80px]">
                {children}
            </main>

        </div>
    )
}

export default CourseLayout