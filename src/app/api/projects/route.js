import { authOptions } from "@/utils/auth"
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache";
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
        const userId = session?.user?.id;

        const { name, description, slug } = await req.json();

        if (!name || !description || !slug) {
            return new NextResponse("All feilds are required", { status: 400 });
        }

        const createProject = await prisma.project.create({
            data: {
                name, description, slug, userId,
            }
        });

        revalidateTag('products')

        return NextResponse.json(createProject, {
            status: 201, statusText: "Project Created"
        })
    } catch (error) {
        console.log("error", error);
        return new NextResponse("Failed to create data", { status: 500 })
    }
}

export const PATCH = async (req, res) => {
    const { name, id, description, slug } = await req.json();

    if (!name || !description || !slug || !id) {
        return new NextResponse("All feilds are required", { status: 400 });
    }
    try {
        const updatedProject = await prisma.project.update({
            where: { id },
            data: {
                name,
                description,
                slug
            }
        });
        return NextResponse.json(updatedProject, {
            status: 200, statusText: "Project Updated"
        })
    } catch (error) {
        console.log("error", error);
        return new NextResponse("Failed to update data", { status: 500 })
    }
}

export const DELETE = async (req, res) => {
    const { data  } = await req.json();
    console.log(data);

    // if (!projectId) {
    //     return new NextResponse("Server Error", { status: 400 });
    // }

    // console.log(projectId);

    try {
        // const deleteProject = await prisma.project.delete({
        //     where: {
        //         id: projectId
        //     }
        // });

        // return NextResponse.json(deleteProject, {
        //     status: 200, statusText: "Project Deleted"
        // })
    } catch (error) {
        console.log("error", error);
        return new NextResponse("Failed to Delete project", { status: 500 })
    }
}