import React, { useEffect, useContext, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_POST } from '../../queries/queries';
import { CREATE_COMMENT, LIKE_POST } from '../../queries/mutations';
import moment from 'moment';
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';
import { UserContext, ModalContext } from '../../context';
import Comment from '../partials/Comment';

const Post = (props) => {
  const id = props.match.params.id;

  const { user } = useContext(UserContext);
  const { setShowModal } = useContext(ModalContext);
  const aside = useRef(null);
  const postText = useRef(null);
  const commentSection = useRef(null);

  const { loading, data: { post }, refetch } = useQuery(GET_POST, {
    variables: {
      id
    }
  });

  const [createComment] = useMutation(CREATE_COMMENT);
  const [likePost] = useMutation(LIKE_POST);

  const liked = post && !!post.likedBy.find((user) => user.id === user.id);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      try {
        if (window.pageYOffset + 190 > postText.current.offsetTop && window.pageYOffset + 360 < commentSection.current.offsetTop) {
          aside.current.style.display = 'block';
        } else {
          aside.current.style.display = 'none';
        }
      } catch (e) {}
    }, true);
  }, []);

  const onLikePost = () => {
    likePost({
      variables: {
        id: post.id
      }
    }).then(() => {
      refetch();
    });
  }

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
        <section className="post__info wrapper">
          <aside className="no" ref={aside}>
            <span>
              <a>{post.author.firstName} {post.author.lastName}</a>
            </span>
            <span>
              <a className="btn-outline-small">Follow</a>
            </span>
            <br/>
            <span>
              {liked ? <FaHeart onClick={onLikePost} /> : <FaRegHeart onClick={onLikePost} />}<span>{post.likes}</span>
            </span>
          </aside>
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
        <section className="post__text wrapper" ref={postText}>
          <div className="post__text-container">
            <p>{post.text}</p>
          </div>
        </section>
        <section className="post__comments" ref={commentSection}>
          <div className="post__comments-container">
            <header className="post__comments__header">Comments</header>
            {user ?
              <div className="post__comments__create">
                <div>
                  <div className="img"></div>
                  <a href="#">{user.firstName} {user.lastName}</a>
                </div>
                <form onSubmit={submitComment}>
                  <textarea name="comment"></textarea>
                  <button type="submit" className="btn-outline">Publish</button>
                </form>
              </div> :
              <div className="post__comments__create">
                <span id="write-comment" onClick={() => setShowModal('signup')}><FaComment /><span>Write a comment...</span></span>
              </div>
            }
            <div className="post__comments__list">
              {post.comments.map((comment) => <Comment comment={comment} />)}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Post;
