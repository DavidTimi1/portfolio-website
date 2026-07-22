"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface BlogInteractions {
  total_claps: number;
  total_views: number;
  user_claps: number;
  user_bookmarked: boolean;
  is_mock: boolean;
}

export interface Comment {
  id: number | string;
  username: string;
  content: string;
  created_at: string;
}

export interface BlogComments {
  comments: Comment[];
  is_mock: boolean;
}

// Reading time calculator based on word count
export function getReadingTime(content: string): string {
  const cleanContent = content.replace(/[#*`_\[\]()\-]/g, ''); // strip markdown syntax
  const words = cleanContent.trim().split(/\s+/).filter(Boolean).length;
  const time = Math.ceil(words / 200); // 200 WPM
  return `${time} min read`;
}

export function useBlogInteractions(slug: string) {
  const queryClient = useQueryClient();
  const queryKey = ['blog-interactions', slug];

  // Fetch interactions
  const { data: interactions, isLoading, error } = useQuery<BlogInteractions>({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/blog/${slug}/interactions`);
      if (!res.ok) throw new Error('Failed to fetch interactions');
      return res.json();
    },
  });

  // Increment view count mutation (should run once on mount)
  const viewMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/blog/${slug}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'view' }),
      });
      if (!res.ok) throw new Error('Failed to log view');
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
    },
  });

  // Clap mutation with optimistic update
  const clapMutation = useMutation({
    mutationFn: async (count: number) => {
      const res = await fetch(`/api/blog/${slug}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clap', count }),
      });
      if (!res.ok) throw new Error('Failed to send claps');
      return res.json();
    },
    onMutate: async (count) => {
      await queryClient.cancelQueries({ queryKey });
      const previousInteractions = queryClient.getQueryData<BlogInteractions>(queryKey);

      if (previousInteractions) {
        // Optimistically update
        const newUserClaps = Math.min(50, previousInteractions.user_claps + count);
        const addedClaps = newUserClaps - previousInteractions.user_claps;

        queryClient.setQueryData<BlogInteractions>(queryKey, {
          ...previousInteractions,
          total_claps: previousInteractions.total_claps + addedClaps,
          user_claps: newUserClaps,
        });
      }

      return { previousInteractions };
    },
    onError: (err, count, context) => {
      if (context?.previousInteractions) {
        queryClient.setQueryData(queryKey, context.previousInteractions);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  // Bookmark mutation with optimistic update
  const bookmarkMutation = useMutation({
    mutationFn: async (value: boolean) => {
      const res = await fetch(`/api/blog/${slug}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'bookmark', value }),
      });
      if (!res.ok) throw new Error('Failed to update bookmark');
      return res.json();
    },
    onMutate: async (value) => {
      await queryClient.cancelQueries({ queryKey });
      const previousInteractions = queryClient.getQueryData<BlogInteractions>(queryKey);

      if (previousInteractions) {
        queryClient.setQueryData<BlogInteractions>(queryKey, {
          ...previousInteractions,
          user_bookmarked: value,
        });
      }

      return { previousInteractions };
    },
    onError: (err, value, context) => {
      if (context?.previousInteractions) {
        queryClient.setQueryData(queryKey, context.previousInteractions);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    interactions,
    isLoading,
    error,
    logView: viewMutation.mutate,
    clap: clapMutation.mutate,
    isClapping: clapMutation.isPending,
    toggleBookmark: (currentStatus: boolean) => bookmarkMutation.mutate(!currentStatus),
    isBookmarking: bookmarkMutation.isPending,
  };
}

export function useBlogComments(slug: string) {
  const queryClient = useQueryClient();
  const queryKey = ['blog-comments', slug];

  // Fetch comments
  const { data, isLoading, error } = useQuery<BlogComments>({
    queryKey,
    queryFn: async () => {
      const res = await fetch(`/api/blog/${slug}/comments`);
      if (!res.ok) throw new Error('Failed to fetch comments');
      return res.json();
    },
  });

  // Add comment mutation with optimistic update
  const addCommentMutation = useMutation({
    mutationFn: async ({ username, content }: { username: string; content: string }) => {
      const res = await fetch(`/api/blog/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, content }),
      });
      if (!res.ok) throw new Error('Failed to post comment');
      return res.json();
    },
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey });
      const previousComments = queryClient.getQueryData<BlogComments>(queryKey);

      if (previousComments) {
        const optimisticComment: Comment = {
          id: `temp-${Date.now()}`,
          username: newComment.username,
          content: newComment.content,
          created_at: new Date().toISOString(),
        };

        queryClient.setQueryData<BlogComments>(queryKey, {
          ...previousComments,
          comments: [...previousComments.comments, optimisticComment],
        });
      }

      return { previousComments };
    },
    onError: (err, newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(queryKey, context.previousComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    comments: data?.comments ?? [],
    isLoading,
    error,
    addComment: addCommentMutation.mutate,
    isPostingComment: addCommentMutation.isPending,
  };
}
