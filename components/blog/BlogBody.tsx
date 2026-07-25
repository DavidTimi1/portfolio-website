"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CopyIcon, CheckIcon, TerminalIcon, X, ZoomIn } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface BlogBodyProps {
  content: string;
}

export function BlogBody({ content }: BlogBodyProps) {
  return (
    <div className="blog-body prose prose-invert max-w-none pt-8 pb-16 font-sans">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Paragraphs
          p: ({ children }) => (
            <p className="text-zinc-300 text-[16px] sm:text-[18px] leading-relaxed mb-6 font-light">
              {children}
            </p>
          ),
          // Headings
          h1: ({ children }) => (
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-12 mb-6 tracking-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-10 mb-5 tracking-tight border-b border-zinc-800 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4 tracking-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg sm:text-xl font-bold text-white mt-6 mb-3 tracking-tight">
              {children}
            </h4>
          ),
          // Lists
          ul: ({ children }) => (
            <ul className="list-disc pl-6 mb-6 space-y-2 text-zinc-300 text-[16px] sm:text-[18px] font-light">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 mb-6 space-y-2 text-zinc-300 text-[16px] sm:text-[18px] font-light">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-accent hover:underline underline-offset-4 transition-all duration-300 font-medium cursor-pointer"
            >
              {children}
            </a>
          ),
          // Blockquotes and Alerts
          blockquote: ({ children }) => {
            // Check if it's an Alert (GitHub style blockquotes)
            const childrenArray = React.Children.toArray(children);
            let isAlert = false;
            let alertType: "note" | "tip" | "important" | "warning" | "caution" = "note";
            let cleanChildren = children;

            // Attempt to detect alert tokens in first child
            if (childrenArray.length > 0) {
              const firstChild = childrenArray[0];
              if (React.isValidElement(firstChild)) {
                const element = firstChild as React.ReactElement<{ children?: React.ReactNode }>;
                if (element.props && element.props.children) {
                  const innerChildren = React.Children.toArray(element.props.children);
                  if (innerChildren.length > 0 && typeof innerChildren[0] === "string") {
                    const text = innerChildren[0].trim();
                    const alertMatch = text.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i);

                    if (alertMatch) {
                      isAlert = true;
                      alertType = alertMatch[1].toLowerCase() as "note" | "tip" | "important" | "warning" | "caution";

                      // Remove the token from rendering
                      const remainingText = text.replace(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i, "").trim();
                      const updatedInner = [...innerChildren];
                      if (remainingText) {
                        updatedInner[0] = remainingText;
                      } else {
                        updatedInner.shift(); // remove completely
                      }

                      // Reconstruct elements
                      const updatedFirstChild = React.cloneElement(firstChild as React.ReactElement, {}, updatedInner);
                      cleanChildren = [updatedFirstChild, ...childrenArray.slice(1)];
                    }
                  }
                }
              }
            }

            if (isAlert) {
              const styles = {
                note: "border-blue-500/50 bg-blue-500/5 text-blue-200",
                tip: "border-emerald-500/50 bg-emerald-500/5 text-emerald-200",
                important: "border-purple-500/50 bg-purple-500/5 text-purple-200",
                warning: "border-amber-500/50 bg-amber-500/5 text-amber-200",
                caution: "border-red-500/50 bg-red-500/5 text-red-200",
              };

              const titles = {
                note: "Note",
                tip: "Tip",
                important: "Important",
                warning: "Warning",
                caution: "Caution",
              };

              return (
                <div className={`my-6 p-4 border-l-4 rounded-r-xl ${styles[alertType]} space-y-1`}>
                  <p className="text-xs font-bold tracking-widest uppercase font-mono">
                    {titles[alertType]}
                  </p>
                  <div className="text-sm sm:text-base leading-relaxed font-light">{cleanChildren}</div>
                </div>
              );
            }

            return (
              <blockquote className="border-l-4 border-accent bg-zinc-900/40 px-6 py-4 rounded-r-xl italic my-6 text-zinc-200 font-light leading-relaxed">
                {children}
              </blockquote>
            );
          },
          // Custom Image Renderer
          img: ({ src, alt }) => {
            const imageSrc = typeof src === "string" ? src : "";
            const imageAlt = typeof alt === "string" ? alt : "";
            return <ZoomableImage src={imageSrc} alt={imageAlt} />;
          },
          // Custom Code Renderer
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const codeString = String(children).replace(/\n$/, "");
            const isInline = !match;

            if (isInline) {
              return (
                <code
                  className="bg-zinc-800/80 text-accent font-mono text-[14px] px-1.5 py-0.5 rounded border border-zinc-700/50"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock code={codeString} language={language} />
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// Zoomable Image Component for Markdown
function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal when pressing escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <span 
        onClick={() => setIsOpen(true)}
        className="relative block group my-8 overflow-hidden rounded-xl border border-zinc-850 bg-zinc-900/10 cursor-zoom-in transition-all duration-300 hover:border-zinc-700/50 shadow-md"
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-auto object-cover max-h-[500px] transition-transform duration-500 group-hover:scale-[1.01]"
        />
        {/* Hover overlay with ZoomIn Icon */}
        <span className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="bg-black/60 backdrop-blur-sm border border-white/10 p-3 rounded-full text-white shadow-lg">
            <ZoomIn className="w-5 h-5 text-accent" />
          </span>
        </span>
        {alt && (
          <span className="px-4 py-2 border-t border-zinc-850 bg-zinc-950/40">
            <span className="text-xs mx-auto text-zinc-500 italic font-mono">{alt}</span>
          </span>
        )}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="absolute top-6 right-6 p-3 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-405 hover:text-white hover:border-zinc-700 hover:scale-105 transition-all duration-205 cursor-pointer shadow-lg z-50"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Container with entrance animation */}
            <motion.span
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // Prevent close on clicking image itself
              className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center select-none"
            >
              <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-zinc-800"
              />
              {alt && (
                <span className="mt-4 text-center">
                  <p className="text-sm text-zinc-400 font-mono tracking-wide">{alt}</p>
                </span>
              )}
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
}

// Code Block Component with Copy Action
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950/80 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/60 border-b border-zinc-800/80">
        <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono">
          <TerminalIcon className="w-3.5 h-3.5 text-accent" />
          <span className="uppercase">{language || "code"}</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <CopyIcon className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-300 scrollbar-hide">
        <pre className="bg-transparent p-0 m-0">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
