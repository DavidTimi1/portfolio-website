"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { MessageSquareIcon, SendIcon, UserIcon } from "lucide-react";
import { BlogMetadata } from "@/lib/blog";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogBody } from "@/components/blog/BlogBody";
import { Interactions } from "@/components/blog/Interactions";
import { RecommendedPosts } from "@/components/blog/RecommendedPosts";
import { useBlogComments, useBlogInteractions } from "@/hooks/use-blogs";
import { Button } from "@/components/ui/button";

interface BlogClientPageProps {
  metadata: BlogMetadata;
  content: string;
}

export function BlogClientPage({ metadata, content }: BlogClientPageProps) {
  const { logView } = useBlogInteractions(metadata.slug);
  const { comments, addComment, isPostingComment } = useBlogComments(metadata.slug);

  const [commentUser, setCommentUser] = useState("");
  const [commentContent, setCommentContent] = useState("");

  // Track scroll for the reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Log view on page mount
  useEffect(() => {
    logView();
  }, [logView]);

  // Retrieve saved username from localStorage if available
  useEffect(() => {
    const savedName = localStorage.getItem("devid_blog_commenter_name");
    if (savedName) {
      setTimeout(() => {
        setCommentUser(savedName);
      }, 0);
    }
  }, []);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentUser.trim() || !commentContent.trim()) return;

    // Save commenter name for future comments
    localStorage.setItem("devid_blog_commenter_name", commentUser.trim());

    addComment({
      username: commentUser.trim(),
      content: commentContent.trim(),
    });

    setCommentContent("");
  };

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-foreground selection:bg-accent/30 relative">
      {/* Viewport Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left shadow-[0_0_10px_rgba(0,240,255,0.7)]"
        style={{ scaleX }}
      />

      <div className="py-20 md:py-28 max-w-4xl mx-auto px-4 z-10">
        {/* Header */}
        <BlogHeader metadata={metadata} content={content} />

        {/* Interactions Sidebar & Mobile Docks */}
        <Interactions slug={metadata.slug} />

        {/* Content Body */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <BlogBody content={content} />
        </motion.div>

        {/* Interactions Sidebar & Mobile Docks */}
        <Interactions duplicate={true} slug={metadata.slug} />

        {/* Recommended Posts Section */}
        <RecommendedPosts slug={metadata.slug} />


        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-zinc-800 pt-10 mt-6 space-y-8"
        >
          <div className="flex items-center gap-2">
            <MessageSquareIcon className="w-5 h-5 text-accent" />
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
              Discussion ({comments.length})
            </h3>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="space-y-4 bg-zinc-900/30 p-5 rounded-xl border border-zinc-800">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="username" className="block text-xs font-bold text-zinc-400 uppercase font-mono tracking-wider mb-2">
                  Name
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Your display name"
                  value={commentUser}
                  onChange={(e) => setCommentUser(e.target.value)}
                  required
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 text-sm focus:border-accent focus:outline-none transition-colors duration-200"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-xs font-bold text-zinc-400 uppercase font-mono tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="content"
                  placeholder="Share your thoughts on this post..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  required
                  rows={4}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-200 text-sm focus:border-accent focus:outline-none transition-colors duration-200 resize-y"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isPostingComment || !commentUser.trim() || !commentContent.trim()}
                className="bg-accent text-black font-semibold hover:bg-accent/80 transition-colors duration-200 rounded-full px-6 flex items-center gap-2"
              >
                <span>{isPostingComment ? "Posting..." : "Post Comment"}</span>
                <SendIcon className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Comment List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-zinc-500 text-center py-8 text-sm font-mono">
                No comments yet. Start the discussion!
              </p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/10 flex gap-4"
                  >
                    <div className="size-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0">
                      <UserIcon className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="space-y-1 w-full">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-zinc-200">
                          {comment.username}
                        </span>
                        <span className="text-[11px] text-zinc-500 font-mono">
                          {new Date(comment.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed font-light whitespace-pre-line">
                        {comment.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}