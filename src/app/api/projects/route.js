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
        return new NextResponse("cannot fetch data", { status: 500 })
    }
}

export const POST = async (req, res) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse("Not Authenticated", { status: 500 })
    }
    try {
        const userEmail = session?.user?.email;

        if (!session) {
            return new NextResponse("Not Authenticated", { status: 500 })
        }

        const user = await prisma.user.findUnique({ where: { email: userEmail } });

        if (!user) return new NextResponse("Not Found", { status: 500 });

        const { name, description, slug } = await req.json();

        if (!name || !description || !slug) {
            return new NextResponse("All feilds are required", { status: 400 });
        }

        const createProject = await prisma.project.create({
            data: {
                name, description, slug, userId: user.id,
            }
        });

        return NextResponse.json(createProject, {
            status: 201, statusText: "Project Created"
        })
    } catch (error) {
        console.log("error", error);
        return new NextResponse("cannot create data", { status: 500 })
    }
}