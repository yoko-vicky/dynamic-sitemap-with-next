import { BlogPost } from '@/components/BlogPost';
import { fetchData } from '@/lib/axios';
import { BlogPostState } from '@/types';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import React from 'react';

export async function getStaticPaths() {
  let posts: BlogPostState[] = [];

  try {
    posts = await fetchData('/posts');
  } catch (error) {
    console.log(error);
  }

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  let posts: BlogPostState[] = [];
  let slug = context.params?.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  try {
    posts = await fetchData('/posts');
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }

  if (!posts) {
    return {
      notFound: true,
    };
  }

  const targetPost = posts.find((post) => post.slug === slug);

  if (!targetPost) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: JSON.parse(JSON.stringify(targetPost)),
    },
  };
}

const BlogPostPage = ({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <BlogPost post={post} />;
};

export default BlogPostPage;
