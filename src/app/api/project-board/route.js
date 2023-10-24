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
        }

        if (type === 'feature') {
            const project = await prisma.project.findUnique({
                where: {
                    id: projectId
                },
                include: {
                    projectBoards: {
                        include: {
                            feature: true
                        }
                    }
                }
            });

            if (!project) return new NextResponse("project not found", { status: 500 });

            const sourceBoard = project.projectBoards.find(board => board.id === sourceBoardId);
            const destinationBoard = project.projectBoards.find(board => board.id === destinationBoardId);

            if (!sourceBoard || !destinationBoard) return new NextResponse("Error updating", { status: 500 });

            const movedFeature = sourceBoard.feature[sourceIndex];

            if (sourceBoardId === destinationBoardId) {
                const sourceFeatures = [...sourceBoard.feature];
                const movedFeature = sourceFeatures.splice(sourceIndex, 1)[0];

                const destinationOrder = sourceFeatures[destinationIndex].order || destinationIndex + 1;

                movedFeature.order = destinationOrder;

                sourceFeatures.forEach((feature, index) => {
                    if (index >= Math.min(sourceIndex, destinationIndex) && index <= Math.max(sourceIndex, destinationIndex)) {
                        feature.order = index + 1;
                    }
                });

                await prisma.projectBoard.update({
                    where: {
                        id: sourceBoardId
                    },
                    data: {
                        order: destinationOrder
                    }
                })

                await prisma.feature.update({
                    where: { id: movedFeature.id },
                    data: { order: destinationOrder }
                })
            } else {
                destinationBoard.feature.splice(destinationIndex, 0, movedFeature);

                await prisma.projectBoard.update({
                    where: { id: destinationBoardId },
                    data: { feature: { set: destinationBoard.feature } }
                })

                sourceBoard.feature.splice(sourceIndex, 1);
                await prisma.projectBoard.update({
                    where: { id: sourceBoardId },
                    data: { feature: { set: sourceBoard.feature } }
                })

                return NextResponse.json("update successfull", {
                    status: 200,
                    statusText: "successfull"
                })
            }

        }

    } catch (error) {
        console.log("error", error);
        return new NextResponse("Error Updating", { status: 400 });
    }
}

export const DELETE = async (req, res) => {
    const body = await req.json();
    const projectId = body.projectId; // Get the project ID from the request body

    try {
        // Delete the project using Prisma
        const deleteProject = await prisma.project.delete({
            where: {
                id: projectId
            }
        });

        return NextResponse.json({ statusText: "Project Deleted", data: deleteProject });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to Delete Project" });
    }
};