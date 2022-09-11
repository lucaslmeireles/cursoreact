import P from 'prop-types';
import React from 'react';

export const PostCard = ({ post }) => {
  return (
    <div className="post">
      <img src={post.cover} alt={post.title} />
      <div className="post-content">
        <h1 className="title">{post.title}</h1>
        <p className="description">{post.body}</p>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: P.objectOf(
    P.shape({
      title: P.string.isRequired,
      cover: P.string.isRequired,
      body: P.string.isRequired,
      id: P.number.isRequired,
    }),
  ),
};
