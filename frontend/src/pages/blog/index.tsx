import { BlogPost } from "@/models/blog-post";
import { GetServerSideProps } from "next";
import Head from "next/head";

import * as BlogApi from "@/network/api/blog";
import BlogPostsGrid from "@/components/BlogPostsGrid";

export const getServerSideProps: GetServerSideProps<
  BlogPageProps
> = async () => {
  const posts = await BlogApi.getBlogPosts();
  return { props: { posts } };
};

interface BlogPageProps {
  posts: BlogPost[];
}

const BlogPage = ({ posts }: BlogPageProps) => {
  return (
    <>
      <Head>
        <title>Articles - blog </title>
        <meta name="description" content="read articles" />
      </Head>
      <div>
        <h1>Blog</h1>
        <BlogPostsGrid posts={posts} />
      </div>
    </>
  );
};

export default BlogPage;
