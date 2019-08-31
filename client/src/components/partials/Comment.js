import React from 'react';
import moment from 'moment';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment__author">
        <div className="img"></div>
        <span>
          <a href="#">{comment.author.firstName} {comment.author.lastName}</a>
          {moment(comment.createdAt).format('MMM D, YYYY')}
        </span>
      </div>
      <div className="comment__text">
        <p>{comment.text}</p>
      </div>
    </div>
  );
}

export default Comment;
