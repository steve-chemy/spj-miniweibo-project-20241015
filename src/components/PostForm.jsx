import React, { useState } from 'react';

function PostForm({ onSubmit }) {
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() && content.length <= 140) {
      onSubmit({ content, images });
      setContent('');
      setImages([]);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-blue-200">
      <textarea
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's happening?"
        maxLength={140}
      />
      <div className="flex justify-between items-center mt-2">
        <span className={`text-sm ${content.length > 140 ? 'text-red-500' : 'text-gray-500'}`}>
          {content.length}/140
        </span>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {images.slice(0, 9).map((image, index) => (
          <img key={index} src={image} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded" />
        ))}
      </div>
      <button
        type="submit"
        disabled={!content.trim() || content.length > 140}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline disabled:opacity-50 transition duration-300"
      >
        Post
      </button>
    </form>
  );
}

export default PostForm;