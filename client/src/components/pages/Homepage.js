import React from 'react';
import moment from 'moment';
import { FaHeart } from 'react-icons/fa';

const posts = [
  {
    title: 'Learning React',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: {
      firstName: 'Stojan',
      lastName: 'Kisic'
    },
    category: 'Programming',
    likes: 124,
    createdAt: "2019-08-12T19:07:56.488Z"
  },
  {
    title: 'Learning Redux',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: {
      firstName: 'Stojan',
      lastName: 'Kisic'
    },
    category: 'Programming',
    likes: 124,
    createdAt: "2019-08-12T19:07:56.488Z"
  },
  {
    title: 'Learning Webpack',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: {
      firstName: 'Stojan',
      lastName: 'Kisic'
    },
    category: 'Programming',
    likes: 124,
    createdAt: "2019-08-12T19:07:56.488Z"
  },
  {
    title: 'Learning MongoDB',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: {
      firstName: 'Stojan',
      lastName: 'Kisic'
    },
    category: 'Programming',
    likes: 124,
    createdAt: "2019-08-12T19:07:56.488Z"
  },
  {
    title: 'Learning Angular',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: {
      firstName: 'Stojan',
      lastName: 'Kisic'
    },
    category: 'Programming',
    likes: 124,
    createdAt: "2019-08-12T19:07:56.488Z"
  },
  {
    title: 'Learning PHP',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: {
      firstName: 'Stojan',
      lastName: 'Kisic'
    },
    category: 'Programming',
    likes: 124,
    createdAt: "2019-08-12T19:07:56.488Z"
  },
  {
    title: 'Learning GraphQL',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: {
      firstName: 'Stojan',
      lastName: 'Kisic'
    },
    category: 'Programming',
    likes: 124,
    createdAt: "2019-08-12T19:07:56.488Z"
  }
]

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="homepage__container">
        <div className="homepage__latest">
          <div>
            <article className="homepage__latest__post-big">
              <div className="img"></div>
              <div className="text">
                <a href="#">
                  <h1>{posts[0].title}</h1>
                </a>
                <p>{posts[0].text.slice(0, 100)}...</p>
                <span>
                  <a>{posts[0].author.firstName} {posts[0].author.lastName}</a> in <a>{posts[0].category}</a>
                </span>
                <br/>
                <span>{moment(posts[0].createdAt).format('MMM D, YYYY')}<FaHeart />{posts[0].likes}</span>
              </div>
            </article>
          </div>
          <div>
            {posts.slice(1, 4).map((article) => (
              <article className="homepage__latest__post">
                <div className="img"></div>
                <div className="text">
                  <a href="#">
                    <h1>{article.title}</h1>
                  </a>
                  <span>
                    <a href="#">{article.author.firstName} {article.author.lastName}</a> in <a>{article.category}</a>
                    <br />
                    {moment(article.createdAt).format('MMM D, YYYY')}<FaHeart />{article.likes}
                  </span>
                </div>
              </article>
            ))}
          </div>
          <div>
            {posts.slice(4, 7).map((article) => (
              <article className="homepage__latest__post">
                <div className="img"></div>
                <div className="text">
                  <a href="#">
                    <h1>{article.title}</h1>
                  </a>
                  <span>
                    <a href="#">{article.author.firstName} {article.author.lastName}</a> in <a>{article.category}</a>
                    <br />
                    {moment(article.createdAt).format('MMM D, YYYY')}<FaHeart />{article.likes}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="homepage__following">
          {posts.map((article) => (
            <article className="homepage__following__post">
              <div className="text">
                <a href="#">
                  <h1>{article.title}</h1>
                </a>
                <p>{posts[0].text.slice(0, 100)}...</p>
                <span>
                  <a href="#">{article.author.firstName} {article.author.lastName}</a> in <a>{article.category}</a>
                  <br />
                  {moment(article.createdAt).format('MMM D, YYYY')}<FaHeart />{article.likes}
                </span>
              </div>
              <div className="img"></div>
            </article>
          ))}
        </div>
        <div className="homepage__popular">
          <h1>POPULAR</h1>
          {posts.slice(0, 4).map((article) => (
            <article className="homepage__popular__post">
              <div className="img"></div>
              <div className="text">
                <a href="#">
                  <h1>{article.title}</h1>
                </a>
                <span>
                  <a href="#">{article.author.firstName} {article.author.lastName}</a> in <a>{article.category}</a>
                  <br />
                  {moment(article.createdAt).format('MMM D, YYYY')}<FaHeart />{article.likes}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage;
