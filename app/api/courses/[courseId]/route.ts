import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import Mux from "@mux/mux-node"


const  mux  = new Mux({
    tokenId: process.env.MUX_TOKEN_ID,
    tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function DELETE(req: Request, {params}:{params:{courseId:string}}) {
    try{
        const {userId} = auth();

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }

        const course = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            },
            include: {
                chapter: {
                    include: {
                        muxData: true,
                    }
                }
            }
        })

        if (!course){
            return new NextResponse("Not found", {status: 404})
        }

        for(const chapter of course.chapter){
            if(chapter.muxData?.assetId){
                await mux.video.assets.delete(chapter.muxData.assetId);
            }
        }

        const deletedCourse = await db.course.delete({
            where: {
                id: params.courseId,
            }
        })

        return  NextResponse.json(deletedCourse)

    }catch (error){
        console.log("[COURSE_ID_DELETE]", error);
        return new NextResponse("Internal Error", {status: 500})
    }
}

export async function PATCH(req: Request, {params}:{params:{courseId:string}}) {
    try {
        const {userId} = auth()
        const {courseId} = params
        const values = await req.json()

        if (!userId) {
            return new NextResponse("Not authorized", {status: 401})
        }

        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(course)
    }catch (error) {
        console.log('[COURSE_ID]: ', error);
        return new NextResponse("Internal Server Error", {status: 500});
    }
}