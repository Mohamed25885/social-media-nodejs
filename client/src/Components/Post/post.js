import React, { useState, useEffect } from 'react';
import Comment from './../Comment/Comment';
import AddComment from './../Comment/AddComment';
import PostImage from './PostImage';
import PostCreator from './PostCreator';
import PostContent from './PostContent';
import PostLikes from './PostLikes';
import NewPostForm from './NewPostForm';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const addCommentToPost = (postId, commentOwnerId) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        // Add the comment owner ID to the comments array of the post
        const updatedComments = [...post.comments, commentOwnerId];
        return {
          ...post,
          comments: updatedComments,
        };
      }
      return post;
    });
    setPosts(updatedPosts);
  };
  
  

  const toggleLike =  (postId) => {
    if (!loggedUser) {
      alert('Please login first');
      return;
    }
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        if (!post.likes.includes(loggedUser._id)) {
          return {
            ...post,
            likes: [...post.likes, loggedUser._id],
          };
        } else {
          return {
            ...post,
            likes: post.likes.filter((like) => like !== loggedUser._id),
          };
        }
      } 
      return post;
    });
    setPosts(updatedPosts);
    
  }

  return (
    <div className="text-black dark:text-slate-100 bg-slate-900">
      <div className="wrapper pt-10 max-w-3xl ml-auto mr-auto mt-6">
      { loggedUser && <h1 className="text-4xl font-bold text-center mt-4 mb-10">
        Hi <span className="text-blue-500">{loggedUser.username}</span>, welcome back!
      </h1>}
        {/* Add the form for creating new posts */}
        <NewPostForm addPost={addPost}/>

        {/* Title for the posts */}
        <h2 className="text-3xl font-bold mb-4 mt-10 relative">Posts</h2>
        <div className="title-line"></div>

        <div className="box-border max-w-7xl mx-auto sm:columns-1 md:columns-2 lg:columns-3 xl:columns-1">
          {/* Render each post */}
          {posts.map((post) => (
            <article key={post._id} className="mb-4 break-inside p-6 rounded-xl bg-white dark:bg-slate-800 flex flex-col bg-clip-border">
              <PostCreator userId={post.userId} postTime={post.createdAt}/>
              
              <PostContent content={post.content} />
              <PostImage imageUrl={post.imageUrl} />
              <PostLikes likes={post.likes.length} postId={post._id} toggleLike={toggleLike}/>
              <AddComment postId={post._id} addCommentToPost={addCommentToPost}/>
              <Comment postId={post._id} userId={post.userId} />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
