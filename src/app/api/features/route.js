import prisma from "@/utils/prisma";
import { parseISO } from "date-fns";
import { NextResponse } from "next/server"
import slugify from "slugify";

export const POST = async (req, res) => {
    const { name, description, finishDate, projectBoardId } = await req.json();

    if (!name || !description || !finishDate || !projectBoardId) {
        return new NextResponse("All fields are reqiured!", { status: 400 })
    }
    const slug = slugify(name);
    try {
        const projectBoard = await prisma.projectBoard.findUnique({
            where: {
                id: projectBoardId
            },
            include: {
                feature: true
            }
        })

        if (!projectBoard)
            return new NextResponse("Card must belong to a project board", { status: 400 });
        const order = projectBoard.feature.length + 1;

        const feature = await prisma.feature.create({
            data: {
                name,
                description,
                finishDate: parseISO(finishDate),
                slug,
                order,
                ProjectBoard: {
                    connect: {
                        id: projectBoardId
                    }
                }
            }
        })

        return NextResponse.json(feature, { status: 201, statusText: "Card Created" })
    } catch (error) {
        console.log(error);
        return new NextResponse("operation failed!", { status: 500 })
    }
}