import React, { useState } from 'react';

const AddComment = ({ postId, addCommentToPost }) => {
  const userId = JSON.parse(localStorage.getItem("User"));

  const [commentContent, setCommentContent] = useState('');
  const handleInputChange = (event) => {
    setCommentContent(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert('Please login first');
      return;
    }
    try {
      console.log({userId, postId})
      let response = await fetch(`http://localhost:5000/api/comments/${userId}/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'authorization': "Bearer " + localStorage.getItem('Token'),
       },
        body: JSON.stringify({
          content: commentContent,
        }),
      });
      response = await response.json();
      if (response.status === "success") { 
        // Clear the input field after successful comment submission
        setCommentContent('');
        addCommentToPost(postId, userId)
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="relative">
      <input
        className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20"
        type="text"
        placeholder="Write a comment"
        value={commentContent}
        onChange={handleInputChange}
      /> 
      <button
        className="flex absolute right-3 top-2/4 -mt-3 items-center"
        onClick={handleSubmit}
      >

        <svg className="w-10 fill-blue-500 dark:fill-slate-50" viewBox="0 0 50 50">
          <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
        </svg>
      </button>
    </div>
  );
};

export default AddComment;
