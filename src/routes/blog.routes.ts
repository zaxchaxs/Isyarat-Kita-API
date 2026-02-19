import { Router } from "express";
import { deleteBlog, getBlogs, getBlogsByAuthor, getDetailBlog, getLatestBlogs, postBlog, updateBlog } from "../controllers/blog.controller";
import { addBlogMiddleware, deleteBlogMiddleware, updateBlogMiddleware } from "../middlewares/blog";
const router = Router();

router.get('/', getBlogs)
router.get('/latest', getLatestBlogs)
router.get('/:id', getDetailBlog)
router.get('/author/:authorId', getBlogsByAuthor)
router.post('/', addBlogMiddleware, postBlog)
router.put('/:id', updateBlogMiddleware, updateBlog)
router.delete('/:id', deleteBlogMiddleware, deleteBlog)

export default router;
