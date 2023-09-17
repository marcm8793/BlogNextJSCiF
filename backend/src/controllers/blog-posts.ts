import { RequestHandler } from "express";
import BlogPostModel from "../models/blog-post";
import assertIsDefined from "../utils/assertIsDefined";
import mongoose from "mongoose";
import sharp from "sharp";
import env from "../env";
import createHttpError from "http-errors";

export const getBlogPosts: RequestHandler = async (req, res, next) => {
  try {
    const allBlogPosts = await BlogPostModel.find().sort({ _id: -1 }).exec();
    res.status(200).json(allBlogPosts);
  } catch (error) {
    next(error);
  }
};

export const getAllBlogPostSlugs: RequestHandler = async (req, res, next) => {
  try {
    const results = await BlogPostModel.find().select("slug").exec();
    const slugs = results.map((post) => post.slug);
    res.status(200).json(slugs);
  } catch (error) {
    next(error);
  }
};

export const getBlogPostBySlug: RequestHandler = async (req, res, next) => {
  try {
    const blogPost = await BlogPostModel.findOne({
      slug: req.params.slug,
    }).exec();
    if (!blogPost) {
      throw createHttpError(404, "Blog post not found for this slug");
    }
    res.status(200).json(blogPost);
  } catch (error) {
    next(error);
  }
};

interface BlogPostBody {
  slug: string;
  title: string;
  summary: string;
  body: string;
}

export const createBlogPost: RequestHandler<
  unknown,
  unknown,
  BlogPostBody,
  unknown
> = async (req, res, next) => {
  const { slug, title, summary, body } = req.body;
  const featuredImage = req.file;

  try {
    assertIsDefined(featuredImage);
    const existingSlug = await BlogPostModel.findOne({ slug }).exec();
    if (existingSlug) {
      throw createHttpError(
        409,
        "Slug already exists. Please choose another one."
      );
    }

    const blogPostId = new mongoose.Types.ObjectId();
    const featuredImageImageDestinationPath =
      "/uploads/featured-images/" + blogPostId + ".png";
    await sharp(featuredImage.buffer)
      .resize(700, 450)
      .toFile("./" + featuredImageImageDestinationPath);

    const newPost = await BlogPostModel.create({
      _id: blogPostId,
      slug,
      title,
      summary,
      body,
      featuredImageUrl: env.SERVER_URL + featuredImageImageDestinationPath,
    });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
