import { BlogPostState } from '@/types';
import React from 'react';
import styles from './BlogPost.module.scss';
import Image from 'next/image';

interface BlogPostPropsType {
  post: BlogPostState;
}

export const BlogPost = ({ post }: BlogPostPropsType) => {
  return (
    <div className={styles.post}>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.body}>{post.body}</p>
      <div className={styles.imageWrapper}>
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
          priority={true}
        />
      </div>
    </div>
  );
};

export default BlogPost;
