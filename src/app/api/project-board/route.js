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
                project: {
                    connect: {
                        id: projectId
                    }
                },
                order: nextOrder,
            }
        });

        return NextResponse.json(createdProjectBoard, {status: 201, statusText: "Project board created"})
    } catch (error) {
        return new NextResponse('Cannot create board', { status: 500 })
    }
}