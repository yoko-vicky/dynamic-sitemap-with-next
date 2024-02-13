import { BlogPostState } from '@/types';
import React from 'react';
import styles from './BlogListItem.module.scss';
import { generateExcerpt } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPostItemState {
  post: BlogPostState;
}

export const BlogPostItem = ({ post }: BlogPostItemState) => {
  const excerpt = generateExcerpt(post.body);

  return (
    <Link href={`/blogs/${post.slug}`} className={styles.post}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.excerpt}>{excerpt}</p>
      <div className={styles.imageWrapper}>
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          style={{ objectFit: 'cover' }}
          priority={true}
        />
      </div>
    </Link>
  );
};

export default BlogPostItem;
