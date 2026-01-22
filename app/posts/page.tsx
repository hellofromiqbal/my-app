'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

type Post = {
  id: number;
  title: string;
  body: string;
};

type Comment = {
  id: number;
  body: string;
  email: string;
};

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [filteredPost, setFilteredPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_JSON_PLACEHOLDER_API + "/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      };
    };
    fetchPosts();
  }, []);
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    try {
      const postResponse = await fetch(`${process.env.NEXT_PUBLIC_JSON_PLACEHOLDER_API}/posts/${searchId}`);
      if (!postResponse.ok) {
        setFilteredPost(null);
        setComments([]);
        return;
      };
      const postData = await postResponse.json();
      setFilteredPost(postData);
      const commentsResponse = await fetch(`${process.env.NEXT_PUBLIC_JSON_PLACEHOLDER_API}/comments?postId=${searchId}`);
      const commentsData = await commentsResponse.json();
      setComments(commentsData);
    } catch (error) {
      console.error("Failed to fetch post or comments:", error);
      setFilteredPost(null);
      setComments([]);
    };
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black px-4">
        <p className="text-gray-500">Loading posts...</p>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black px-4">
        <div className="flex flex-col gap-2 w-lg">
          <div className="flex items-center gap-2">
            <Link href="/"><BiArrowBack className="cursor-pointer"/></Link>
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Posts
            </h1>
          </div>
          <form className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Search by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-900 w-full rounded-md outline-0 border border-white"
            />
            <button
              onClick={handleSearch}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-39.5 cursor-pointer"
            >
              Search
            </button>
          </form>
          {filteredPost ? (
            <>
              <div className="bg-gray-200 shadow-md dark:shadow-none dark:bg-gray-950 rounded-xl p-4">
                <h2 className="text-xl font-bold text-black dark:text-white">{filteredPost.title}</h2>
                <p className="text-gray-700 dark:text-gray-300">{filteredPost.body}</p>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-black dark:text-white">Comments</h3>
              <ul className="mt-2 flex flex-col gap-2 w-full h-48 overflow-y-auto">
                {comments.map((comment) => (
                  <li key={comment.id} className="bg-gray-200 shadow-md dark:shadow-none dark:bg-gray-950 rounded-xl p-4">
                    <p className="text-sm text-gray-800 dark:text-gray-200">{comment.body}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">- {comment.email}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ul className="flex flex-col gap-2 w-full h-96 overflow-y-auto">
              {posts.map((post) => (
                <li key={post.id} className="w-full bg-gray-200 shadow-md dark:shadow-none dark:bg-gray-950 rounded-xl flex flex-col gap-2 p-4">
                  <h2 className="text-xl font-bold text-black dark:text-white">{post.title}</h2>
                  <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };
};

export default PostsPage;