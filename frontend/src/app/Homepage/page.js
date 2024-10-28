"use client";
import React, { useEffect, useState } from "react";
import LeftSideBar from "../components/LeftSideBar";
import RightSideBar from "../components/RightSideBar";
import StorySection from "@/app/story/StorySection";
import NewPostForm from "../posts/NewPostForm";
import PostCard from "../posts/PostCard";
import { usePostStore } from "@/store/usePostStore";
import toast from "react-hot-toast";

const HomePage = () => {
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [likePosts, setLikePosts] = useState(new Set());
  const {
    posts,
    fetchPost,
    handleLikePost,
    handleCommentPost,
    handleSharePost,
  } = usePostStore();

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    const saveLikes = localStorage.getItem("likePosts");
    if (saveLikes) {
      setLikePosts(new Set(JSON.parse(saveLikes)));
    }
  }, []);

  const handleLike = async (postId) => {
    const updatedLikePost = new Set(likePosts);
    if (updatedLikePost.has(postId)) {
      updatedLikePost.delete(postId);
      toast.error("post disliked successfully");
    } else {
      updatedLikePost.add(postId);
      toast.success("post like successfully");
    }
    setLikePosts(updatedLikePost);
    localStorage.setItem(
      "likePosts",
      JSON.stringify(Array.from(updatedLikePost))
    );

    try {
      await handleLikePost(postId);
      await fetchPost();
    } catch (error) {
      console.error(error);
      toast.error("failed to like or unlike the post");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex flex-1 pt-10">
        <LeftSideBar />
        <div className="flex-1 sm:px-2 sm:py-6 md:ml-64 lg:max-w-2xl 2xl:mx-auto overscroll-x-auto sm:max-w-[100vw]">
          <div className=" 2xl:ml-28">
            <div className="overflow-x-auto max-w-[100vw] pl-1 dark:bg-[rgb(36,37,38)] my-1 sm:rounded-lg   mt-[8px] ">
              <StorySection />
            </div>
            <NewPostForm
              isPostFormOpen={isPostFormOpen}
              setIsPostFormOpen={setIsPostFormOpen}
            />
            <div className=" mt-1 sm:mt-6 sm:space-y-6 mb-4 ">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  isLiked={likePosts.has(post?._id)}
                  onLike={() => handleLike(post?._id)}
                  onComment={async (comment) => {
                    await handleCommentPost(post?._id, comment.text);
                    await fetchPost();
                  }}
                  onShare={async () => {
                    await handleSharePost(post?._id);
                    await fetchPost();
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hidden 2xl:block lg:w-64 xl:w-80 fixed right-0 top-10 sm:top-16 bottom-0 overflow-y-auto p-4">
          <RightSideBar />
        </div>
      </main>
    </div>
  );
};

export default HomePage;