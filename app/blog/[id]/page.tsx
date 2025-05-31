"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import {
    ArrowLeft,
    Bookmark,
    Calendar,
    Clock,
    Heart,
    MessageCircle,
    Share2
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  author_id: string
  author_name: string
  image_url: string
  tags: string[]
  status: string
  created_at: string
  updated_at: string
  reading_time?: number
}

export default function BlogDetailPage() {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const { user } = useAuth()
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    if (params?.id) {
      fetchPost(params.id as string)
    }
  }, [params?.id])

  const fetchPost = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", postId)
        .eq("status", "published")
        .single()

      if (error) throw error

      if (data) {
        // Calculate reading time (assuming 200 words per minute)
        const wordCount = data.content.split(/\s+/).length
        data.reading_time = Math.ceil(wordCount / 200)
        
        setPost(data)
        fetchRelatedPosts(data.tags, postId)
      }
    } catch (error) {
      console.error("Error fetching post:", error)
      router.push("/blog")
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedPosts = async (tags: string[], currentPostId: string) => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id, title, excerpt, author_name, image_url, tags, created_at")
        .eq("status", "published")
        .neq("id", currentPostId)
        .limit(3)

      if (error) throw error

      // Filter posts that share at least one tag
      const related = data?.filter(relatedPost => 
        relatedPost.tags.some(tag => tags.includes(tag))
      ) || []

      setRelatedPosts(related.slice(0, 3))
    } catch (error) {
      console.error("Error fetching related posts:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getAuthorInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase()
  }

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // Here you would typically save to database
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
    // Here you would typically save to database
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h2>
          <p className="text-gray-600 mb-4">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Image */}
        {post.image_url && (
          <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden mb-8">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author and Meta Info */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`/avatars/${post.author_id}.jpg`} />
                <AvatarFallback className="bg-green-100 text-green-700">
                  {getAuthorInitials(post.author_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{post.author_name}</p>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(post.created_at)}
                  </span>
                  {post.reading_time && (
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.reading_time} min read
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLike}
                className={isLiked ? "text-red-600" : ""}
              >
                <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                {likeCount}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 mr-1" />
                Comment
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleBookmark}
                className={isBookmarked ? "text-blue-600" : ""}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-gray max-w-none mb-12">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {post.content}
          </div>
        </div>

        {/* Article Footer */}
        <footer className="border-t pt-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`/avatars/${post.author_id}.jpg`} />
                <AvatarFallback className="bg-green-100 text-green-700 text-lg">
                  {getAuthorInitials(post.author_name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{post.author_name}</h3>
                <p className="text-gray-600">Agriculture Student & Researcher</p>
              </div>
            </div>
            <Button variant="outline">Follow</Button>
          </div>
        </footer>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                  {relatedPost.image_url && (
                    <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                      <img
                        src={relatedPost.image_url}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {relatedPost.tags.slice(0, 2).map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {relatedPost.author_name}
                      </span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/blog/${relatedPost.id}`}>Read More</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}