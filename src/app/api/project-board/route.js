import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    const { status, projectId, slug } = await req.json();

    if (!status || !projectId || !slug) {
        return new NextResponse("All feilds are required!", { status: 400 })
    }

    try {
        const maxOrderResult = await prisma.projectBoard.aggregate({
            _max: {
                order: true
            },
            where: {
                projectId,
            }
        });

        const nextOrder = maxOrderResult._max?.order ? maxOrderResult._max.order + 1 : 1;
        const createdProjectBoard = await prisma.projectBoard.create({
            data: {
                slug,
                status,
                Project: {
                    connect: {
                        id: projectId
                    }
                },
                order: nextOrder,
            }
        });

        return NextResponse.json(createdProjectBoard, { status: 201, statusText: "Project board created" })
    } catch (error) {
        return new NextResponse('Cannot create board', { status: 500 })
    }
}

export const PATCH = async (req, res) => {
    const {
        projectId,
        sourceIndex,
        destinationIndex,
        type,
        sourceBoardId,
        destinationBoardId,
    } = await req.json();

    try {
        if (type === "status") {
            const projectBoards = await prisma.projectBoard.findMany({
                where: {
                    projectId
                },
                orderBy: { order: "asc" }
            })

            const sourceBoard = projectBoards[sourceIndex];
            const destinationBoard = projectBoards[destinationIndex];

            await prisma.projectBoard.update({
                where: { id: sourceBoard.id },
                data: {
                    order: destinationBoard.order
                }
            });

            await prisma.projectBoard.update({
                where: {
                    id: destinationBoard.id
                },
                data: {
                    order: sourceBoard.order,
                }
            })

            return NextResponse.json("update successfull", {
                status: 200,
                statusText: "successfull"
            })
        };
    } catch (error) {
        console.log("error", error);
        return new NextResponse("Error Updating", { status: 400 });
    }
}