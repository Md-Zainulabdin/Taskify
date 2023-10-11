import prisma from "@/utils/prisma"
import { NextResponse } from "next/server"

export const GET = async (req, { params }) => {
    const slug = params.slug;
    try {
        const project = await prisma.project.findUnique({
            where: {
                slug: params.slug,
            },
            include: {
                projectBoards: {
                    include: {
                        feature: true
                    }
                },
            }
        });

        return NextResponse.json(project, { status: 200, statusText: "Successfull" })
    } catch (error) {
        return new NextResponse('Cannot fetch data', { status: 500 })
    }
}