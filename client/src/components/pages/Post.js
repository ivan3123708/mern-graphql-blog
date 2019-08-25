import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_POST } from '../../queries/queries';
import { CREATE_COMMENT } from '../../queries/mutations';
import moment from 'moment';
import { FaHeart } from 'react-icons/fa';

const Post = (props) => {
  const id = props.match.params.id;

  const { loading, data: { post }, refetch } = useQuery(GET_POST, {
    variables: {
      id
    }
  });

  const [createComment] = useMutation(CREATE_COMMENT);

  const submitComment = (e) => {
    e.preventDefault();

    const commentInput = e.target.comment;

    createComment({
      variables: {
        data: {
          post: post.id,
          text: commentInput.value
        }
      }
    }).then(() => {
      commentInput.value = '';

      refetch();
    });
  }

  if (loading) {
    return <h1>LOADING</h1>
  }

  return (
    <div className="post">
      <div className="post-container">
        <section className="post__info">
          <div className="post__info-container">
            <h2>{post.category}</h2>
            <h1>{post.title}</h1>
            <div className="post__info__author">
              <span>
                <a>{post.author.firstName} {post.author.lastName}</a>
              </span>
              <span>
                <a className="btn-outline-small">Follow</a>
              </span>
            </div>
            <span>{moment(post.createdAt).format('MMM D, YYYY')}<FaHeart />{post.likes}</span>
          </div>
        </section>
        <figure className="post__image">
          <div className="img"></div>
        </figure>
        <section className="post__text">
          <div className="post__text-container">
            <p>{post.text}</p>
          </div>
        </section>
        <section className="post__comments">
          <div className="post__comments-container">
            <header className="post__comments__header">Comments</header>
            <div className="post__comments__create">
              <div>
                <div className="img"></div>
                <a href="#">Ivan Jakimovski</a>
              </div>
              <form onSubmit={submitComment}>
                <textarea name="comment"></textarea>
                <button type="submit" className="btn-outline">Publish</button>
              </form>
            </div>
            <div className="post__comments__list">
              {post.comments.map((comment) => (
                <div>
                  <h1>{comment.text}</h1>
                  <h1>{comment.author.firstName}</h1>
                  <h1>{comment.createdAt}</h1>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Post;
