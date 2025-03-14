import {Category, Chapter, Course} from "@prisma/client";
import {db} from "@/lib/db";
import {getProgress} from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
    category: Category;
    chapter: Chapter[];
    progress: number | null;
}

type DassboardCourses = {
    completedCourses: any[];
    coursesInProgress: any[];
}

export const getDashboardCourses = async (userId: string): Promise<DassboardCourses> => {
    try {
        const purchasedCourses = await db.purchase.findMany({
            where: {
                userId: userId,
            },
            select: {
                course: {
                    include:{
                        category: true,
                        chapter: {
                            where: {
                                isPublished: true,
                            }
                        }
                    }
                }
            }
        })

        const courses = purchasedCourses.map((purchase) => purchase.course) as CourseWithProgressWithCategory[];

        for (let course of courses) {
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress;
        }

        const completedCourses = courses.filter((course) => course.progress === 100)
        const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100)

        return {
            completedCourses,
            coursesInProgress,
        }
    } catch (error) {
        console.log("[GET_DASHBOARD_COURSES]",error);
        return {
            completedCourses: [],
            coursesInProgress: [],
        }
    }
}