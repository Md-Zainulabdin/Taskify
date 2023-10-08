import { authOptions } from "@/utils/auth"
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse("Not Authenticated", { status: 500 })
    }

    try {
        const projects = await prisma.project.findMany();

        return NextResponse.json(projects, { status: 200, success: true })
    } catch (error) {
        console.log("error", error);
        return NextResponse("cannot fetch data", { status: 500 })
    }
}