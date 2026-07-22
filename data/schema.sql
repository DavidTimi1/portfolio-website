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
