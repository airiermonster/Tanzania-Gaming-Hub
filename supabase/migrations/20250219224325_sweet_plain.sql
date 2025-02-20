/*
  # Initial Schema for Tanzania Gaming Hub

  1. Tables
    - profiles (extends auth.users)
      - id (uuid, references auth.users)
      - username (text, unique)
      - full_name (text)
      - avatar_url (text)
      - bio (text)
      - role (text)
      - created_at (timestamp)
      - updated_at (timestamp)

    - tournaments
      - id (uuid)
      - title (text)
      - description (text)
      - game (text)
      - start_date (timestamp)
      - end_date (timestamp)
      - prize_pool (numeric)
      - max_participants (integer)
      - status (text)
      - created_by (uuid, references profiles)
      - created_at (timestamp)
      - updated_at (timestamp)

    - marketplace_listings
      - id (uuid)
      - title (text)
      - description (text)
      - price (numeric)
      - category (text)
      - condition (text)
      - status (text)
      - seller_id (uuid, references profiles)
      - created_at (timestamp)
      - updated_at (timestamp)

    - news_articles
      - id (uuid)
      - title (text)
      - content (text)
      - image_url (text)
      - status (text)
      - author_id (uuid, references profiles)
      - created_at (timestamp)
      - updated_at (timestamp)

    - forum_categories
      - id (uuid)
      - name (text)
      - description (text)
      - created_at (timestamp)

    - forum_threads
      - id (uuid)
      - title (text)
      - content (text)
      - category_id (uuid, references forum_categories)
      - author_id (uuid, references profiles)
      - status (text)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add admin-specific policies
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE tournament_status AS ENUM ('draft', 'upcoming', 'active', 'completed', 'cancelled');
CREATE TYPE listing_status AS ENUM ('active', 'sold', 'cancelled');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE item_condition AS ENUM ('new', 'like_new', 'good', 'fair', 'poor');

-- Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  username text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  bio text,
  role user_role DEFAULT 'user'::user_role,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tournaments table
CREATE TABLE tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  game text NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  prize_pool numeric(10,2) DEFAULT 0,
  max_participants integer,
  status tournament_status DEFAULT 'draft'::tournament_status,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create marketplace_listings table
CREATE TABLE marketplace_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  category text NOT NULL,
  condition item_condition NOT NULL,
  status listing_status DEFAULT 'active'::listing_status,
  seller_id uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create news_articles table
CREATE TABLE news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text,
  status content_status DEFAULT 'draft'::content_status,
  author_id uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create forum_categories table
CREATE TABLE forum_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create forum_threads table
CREATE TABLE forum_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category_id uuid REFERENCES forum_categories(id),
  author_id uuid REFERENCES profiles(id),
  status content_status DEFAULT 'published'::content_status,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_threads ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for tournaments
CREATE POLICY "Tournaments are viewable by everyone"
  ON tournaments FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage tournaments"
  ON tournaments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'::user_role
    )
  );

-- Create policies for marketplace listings
CREATE POLICY "Listings are viewable by everyone"
  ON marketplace_listings FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own listings"
  ON marketplace_listings FOR ALL
  USING (auth.uid() = seller_id);

-- Create policies for news articles
CREATE POLICY "Published news are viewable by everyone"
  ON news_articles FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can manage news"
  ON news_articles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'::user_role
    )
  );

-- Create policies for forum categories
CREATE POLICY "Forum categories are viewable by everyone"
  ON forum_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage forum categories"
  ON forum_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'::user_role
    )
  );

-- Create policies for forum threads
CREATE POLICY "Forum threads are viewable by everyone"
  ON forum_threads FOR SELECT
  USING (status = 'published');

CREATE POLICY "Users can create and manage own threads"
  ON forum_threads FOR ALL
  USING (auth.uid() = author_id);

-- Create indexes for better query performance
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_tournaments_status ON tournaments(status);
CREATE INDEX idx_marketplace_status ON marketplace_listings(status);
CREATE INDEX idx_news_status ON news_articles(status);
CREATE INDEX idx_forum_threads_category ON forum_threads(category_id);