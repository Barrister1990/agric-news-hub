import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: "free" | "premium"
          role: "user" | "admin"
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: "free" | "premium"
          role?: "user" | "admin"
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: "free" | "premium"
          role?: "user" | "admin"
          created_at?: string
        }
      }
      research_articles: {
        Row: {
          id: string
          title: string
          abstract: string
          author_name: string
          content: string
          tags: string[]
          is_premium: boolean
          download_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          abstract: string
          author_name: string
          content: string
          tags?: string[]
          is_premium?: boolean
          download_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          abstract?: string
          author_name?: string
          content?: string
          tags?: string[]
          is_premium?: boolean
          download_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string
          author_id: string
          author_name: string
          image_url: string | null
          tags: string[]
          status: "draft" | "published" | "pending"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt: string
          author_id: string
          author_name: string
          image_url?: string | null
          tags?: string[]
          status?: "draft" | "published" | "pending"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string
          author_id?: string
          author_name?: string
          image_url?: string | null
          tags?: string[]
          status?: "draft" | "published" | "pending"
          created_at?: string
          updated_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          subscribed_at: string
        }
        Insert: {
          id?: string
          email: string
          subscribed_at?: string
        }
        Update: {
          id?: string
          email?: string
          subscribed_at?: string
        }
      }
    }
  }
}
