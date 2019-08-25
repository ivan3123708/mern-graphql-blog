import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_LATEST_POSTS, GET_POPULAR_POSTS } from '../../queries/queries';
import moment from 'moment';
import { FaHeart } from 'react-icons/fa';

const Homepage = () => {
  const { loading: latestPostsLoading, data: { posts: latestPosts } } = useQuery(GET_LATEST_POSTS);
  const { loading: popularPostsLoading, data: { posts: popularPosts } } = useQuery(GET_POPULAR_POSTS);

  if (latestPostsLoading || popularPostsLoading) {
    return (
      <h1>LOADING</h1>
    )
  }

  return (
    <div className="homepage">
      <div className="homepage-container">
        <section className="homepage__latest">
          <div>
            {latestPosts.length && <article className="homepage__latest__post-big">
              <div className="img"></div>
              <div className="text">
                <Link to={`/posts/${latestPosts[0].id}`}>
                  <h1>{latestPosts[0].title}</h1>
                </Link>
                <p>{latestPosts[0].text.slice(0, 100)}...</p>
                <span>
                  <a>{latestPosts[0].author.firstName} {latestPosts[0].author.lastName}</a> in <a>{latestPosts[0].category}</a>
                </span>
                <br/>
                <span>{moment(latestPosts[0].createdAt).format('MMM D, YYYY')}<FaHeart />{latestPosts[0].likes}</span>
              </div>
            </article>}
          </div>
          <div>
            {latestPosts.slice(1, 4).map((post) => (
              <article className="homepage__latest__post">
                <div className="img"></div>
                <div className="text">
                  <Link to={`/posts/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <span>
                    <a href="#">{post.author.firstName} {post.author.lastName}</a> in <a>{post.category}</a>
                    <br />
                    {moment(post.createdAt).format('MMM D, YYYY')}<FaHeart />{post.likes}
                  </span>
                </div>
              </article>
            ))}
          </div>
          <div>
            {latestPosts.slice(4, 7).map((post) => (
              <article className="homepage__latest__post">
                <div className="img"></div>
                <div className="text">
                  <Link to={`/posts/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <span>
                    <a href="#">{post.author.firstName} {post.author.lastName}</a> in <a>{post.category}</a>
                    <br />
                    {moment(post.createdAt).format('MMM D, YYYY')}<FaHeart />{post.likes}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="homepage__following">
          {/*followingPosts.map((article) => (
            <article className="homepage__following__post">
              <div className="text">
                <a href="#">
                  <h1>{article.title}</h1>
                </a>
                <p>{article.text.slice(0, 100)}...</p>
                <span>
                  <a href="#">{article.author.firstName} {article.author.lastName}</a> in <a>{article.category}</a>
                  <br />
                  {moment(article.createdAt).format('MMM D, YYYY')}<FaHeart />{article.likes}
                </span>
              </div>
              <div className="img"></div>
            </article>
          ))*/}
        </section>
        <aside className="homepage__popular">
          <h1>POPULAR</h1>
          {popularPosts.slice(0, 4).map((post) => (
            <article className="homepage__popular__post">
              <div className="img"></div>
              <div className="text">
                <Link to={`/posts/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <span>
                  <a href="#">{post.author.firstName} {post.author.lastName}</a> in <a>{post.category}</a>
                  <br />
                  {moment(post.createdAt).format('MMM D, YYYY')}<FaHeart />{post.likes}
                </span>
              </div>
            </article>
          ))}
        </aside>
      </div>
    </div>
  )
}

export default Homepage;
