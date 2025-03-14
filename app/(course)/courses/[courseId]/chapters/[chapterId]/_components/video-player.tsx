"use client"
import React, {useState} from 'react';

import axios from 'axios';
import MuxPlayer from "@mux/mux-player-react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";
import {Loader2, Lock} from "lucide-react";

import {cn} from "@/lib/utils"

interface VideoPlayerProps {
    chapterId: string,
    title: string,
    courseId: string,
    nextChapterId?: string,
    playbackId: string,
    isLocked: boolean,
    completeOnEnd: boolean,
    nextChapter?: string | undefined
}

const VideoPlayer = ({
                         chapterId,
                         title,
                         courseId,
                         completeOnEnd,
                         playbackId,
                         nextChapterId,
                         isLocked,
                         nextChapter
                     }: VideoPlayerProps) => {

    const [isReady, setReady] = useState(false);

    const router = useRouter();

    const onEnd = async () => {
        try {
            if (completeOnEnd) {
                await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {isCompleted: true})

                if (!nextChapterId) {
                    toast.success("Chapter completed");
                }
                toast.success("Progress updated");
                router.refresh()

                if (nextChapterId) {
                    router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
                }
            }
        } catch {
            toast.error("Something went wrong");
        }
    }
    return (
        <div className={"relative aspect-video"}>
            {!isReady && !isLocked && (
                <div className={"absolute inset-0 flex items-center justify-center bg-slate-700"}>
                    <Loader2 className={"h-8 w-8 animate-spin text-secondary"}/>
                </div>
            )}
            {isLocked && (
                <div
                    className={"absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary"}>
                    <Lock className={"h-8 w-8"}/>
                    <p className={"text-sm"}>
                        This chapter is locked
                    </p>
                </div>
            )}
            {!isLocked && (
                <MuxPlayer
                    title={title}
                    className={cn(!isReady && "hidden")}
                    onCanPlay={() => setReady(true)}
                    onEnded={onEnd}
                    autoPlay
                    playbackId={playbackId}
                />

            )}
        </div>
    );
};

export default VideoPlayer;