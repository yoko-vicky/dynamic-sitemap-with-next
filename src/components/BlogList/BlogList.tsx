import { BlogPostState } from '@/types';
import React from 'react';
import BlogListItem from '../BlogListItem/BlogListItem';
import uuid from '@/lib/uuid';
import styles from './BlogList.module.scss';

interface BlogListPropsType {
  posts: BlogPostState[];
}

const BlogList = ({ posts }: BlogListPropsType) => {
  return (
    <div className={styles.posts}>
      {posts.length > 0 ? (
        posts.map((post: BlogPostState) => (
          <BlogListItem key={uuid()} post={post} />
        ))
      ) : (
        <div>Sorry, we do not have a post to show.</div>
      )}
    </div>
  );
};

export default BlogList;
