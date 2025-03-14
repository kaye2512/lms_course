"use client"

import { ColumnDef } from "@tanstack/react-table"
import {ArrowUpDown, MoreHorizontal, Pencil} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Course} from "@prisma/client";
import Link from "next/link";
import {Badge} from "@/components/ui/badge";
import {cn} from "@/lib/utils";




export const columns: ColumnDef<Course>[] = [
    {
        accessorKey: "title",
        header: ({column}) => {
            return (
                <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Title
                    <ArrowUpDown className={"h-4 w-4 ml-2"}/>
                </Button>
            )
        },
    },
    {
        accessorKey: "price",
        header: ({column}) => {
            return (
                <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Price
                    <ArrowUpDown className={"h-4 w-4 ml-2"}/>
                </Button>
            )
        },
        cell: ({row}) => {
            const price = parseFloat(row.getValue("price") || "0");
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(price)

            return <div>{formatted}</div>
        }
    },
    {
        accessorKey: "isPublished",
        header: ({column}) => {
            return (
                <Button variant={"ghost"} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Published
                    <ArrowUpDown className={"h-4 w-4 ml-2"}/>
                </Button>
            )
        },
        cell: ({row}) => {
            const isPublished = row.getValue("isPublished") || false;

            return (
                <Badge className={cn("bg-slate-500", isPublished && "bg-sky-700")}>
                    {isPublished ? "Published" : "Draft"}
                </Badge>
            )
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const {id} = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"ghost"} className={"h-4 w-8 p-0"}>
                            <span className={"sr-only"}>Open Menu</span>
                            <MoreHorizontal className={"h-4 w-4"}/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={"end"}>
                        <Link href={`/teacher/courses/${id}`}>
                            <DropdownMenuItem>
                                <Pencil className={"h-4 w-4 m4-2"}/>
                                Edit
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]
