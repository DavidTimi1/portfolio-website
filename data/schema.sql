CREATE TABLE IF NOT EXISTS blog_interactions (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    claps INT DEFAULT 0,
    bookmarked BOOLEAN DEFAULT FALSE,
    views INT DEFAULT 0,
    impressions INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(slug, user_id)
);

CREATE TABLE IF NOT EXISTS blog_comments (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- Migration statements for existing databases (23 / 07 /2026)
-- =============================================================================

-- Add impressions column if it doesn't exist yet on existing tables
ALTER TABLE blog_interactions ADD COLUMN IF NOT EXISTS impressions INT DEFAULT 0;

-- Backfill impressions from existing accumulated view counts (if impressions is not set)
UPDATE blog_interactions 
SET impressions = views 
WHERE (impressions IS NULL OR impressions = 0) AND views > 0;

-- Normalize existing view counts so each user record represents max 1 unique view
UPDATE blog_interactions 
SET views = 1 
WHERE views > 1;

