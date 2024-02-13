import BlogList from '@/components/BlogList/BlogList';
import { fetchData } from '@/lib/axios';
import { BlogPostState } from '@/types';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import React from 'react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let posts: BlogPostState[] = [];

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

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}

const AllBlogsPage = ({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <BlogList posts={posts} />;
};

export default AllBlogsPage;
