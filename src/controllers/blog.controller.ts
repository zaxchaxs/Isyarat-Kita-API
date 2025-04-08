import { Request, Response } from "express";
import { errorResponse, successResponse } from "../utils/response";
import prisma from "../configs/prismaClient";

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const blogs = await prisma.blog.findMany();
        res.status(200).json(successResponse(blogs));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
};

export const getDetailBlog = async (req: Request, res: Response) => {
    try {
        const { id: blogId } = req.params;
        const id = Number(blogId);

        const blog = await prisma.blog.findUnique({
            where: {
                id
            }
        });

        if (!blog) {
            res.status(404).json(errorResponse(404, 'not found', "Data Not Found", "Blog Not Found"))
            return;
        };
        res.status(200).json(successResponse(blog));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
};

export const getBlogsByAuthor = async (req: Request, res: Response) => {
    try {
        const { authorId } = req.params;
        const blog = await prisma.blog.findMany({
            where: {
                authorId: authorId
            }
        });
        if (!blog) {
            res.status(404).json(errorResponse(404, 'not found', "Data Not Found", "Blog Not Found"))
            return;
        };
        res.status(200).json(successResponse(blog));
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
};

export const getLatestBlogs = async (req: Request, res: Response) => {
    try {
    const limit = Number(req.query.limit) || 1;

    const blogs = await prisma.blog.findMany({
    orderBy: {
        createdAt: 'desc'
    },
    take: limit
    });

    if (!blogs || blogs.length === 0) {
    res.status(404).json(errorResponse(404, 'not found', "Data Not Found", "Blog Not Found"));
    return;
    }

    res.status(200).json(successResponse(blogs));
} catch (error) {
    const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error(errMessage);
    res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage));
}
};

export const postBlog = async  (req: Request, res: Response) => {
    try {
        const {authorId, title, content, image, createdBy, type} = req.body;

        const blog = await prisma.blog.create({
            data: {
                authorId,
                title,
                content,
                image,
                createdBy,
                type
            },
        })

        res.status(200).json(successResponse(blog))
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
}

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const {id: blogId} = req.params;
        const id = Number(blogId)
        const {title, content, image, type} = req.body;
        
        const blog = await prisma.blog.update({
            where: {
                id
            },
            data: {
                title,
                content,
                image,
                type
            }
        },)

        res.status(200).json(successResponse(blog))
    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }    
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const {id: blogId} = req.params;
        const id = Number(blogId);

        await prisma.blog.delete({
            where: {
                id
            }
        })

        res.status(200).json(successResponse(null, "Blog Deleted!"))

    } catch (error) {
        const errMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error(errMessage)
        res.status(500).json(errorResponse(500, 'Internal Server Error', error, errMessage))
    }
}
