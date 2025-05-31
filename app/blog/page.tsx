"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Plus, Calendar, User } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [loading, setLoading] = useState(true)
  const { user, profile } = useAuth()

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag))
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedTag])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })

      if (error) throw error

      // If no data exists, insert some mock data
      if (!data || data.length === 0) {
        await insertMockPosts()
        fetchPosts()
        return
      }

      setPosts(data)
      setFilteredPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  const insertMockPosts = async () => {
    const mockPosts = [
      {
        title: "My Journey into Sustainable Farming Practices",
        content: "As a third-year agriculture student, I've been exploring various sustainable farming practices...",
        excerpt:
          "Exploring sustainable farming practices as an agriculture student and the lessons learned along the way.",
        author_id: "mock-user-1",
        author_name: "Alex Johnson",
        image_url: "/placeholder.svg?height=300&width=500",
        tags: ["sustainability", "farming", "student experience"],
        status: "published",
      },
      {
        title: "The Future of Precision Agriculture Technology",
        content: "Technology is revolutionizing agriculture in ways we never imagined...",
        excerpt: "An analysis of how precision agriculture technology is transforming modern farming operations.",
        author_id: "mock-user-2",
        author_name: "Maria Garcia",
        image_url: "/placeholder.svg?height=300&width=500",
        tags: ["technology", "precision agriculture", "innovation"],
        status: "published",
      },
      {
        title: "Climate Change Adaptation Strategies for Small Farms",
        content: "Small farms face unique challenges when adapting to climate change...",
        excerpt:
          "Practical strategies for small farms to adapt to changing climate conditions and maintain productivity.",
        author_id: "mock-user-3",
        author_name: "David Kim",
        image_url: "/placeholder.svg?height=300&width=500",
        tags: ["climate change", "adaptation", "small farms"],
        status: "published",
      },
      {
        title: "Organic Certification: A Student's Guide",
        content: "Understanding the organic certification process can be overwhelming for new farmers...",
        excerpt: "A comprehensive guide to understanding organic certification requirements and processes.",
        author_id: "mock-user-4",
        author_name: "Sarah Wilson",
        image_url: "/placeholder.svg?height=300&width=500",
        tags: ["organic", "certification", "guide"],
        status: "published",
      },
    ]

    await supabase.from("blog_posts").insert(mockPosts)
  }

  const getAllTags = () => {
    const allTags = posts.flatMap((post) => post.tags)
    return [...new Set(allTags)]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Student Blog</h1>
            <p className="text-lg text-gray-600">
              Insights, experiences, and knowledge shared by agriculture students and researchers.
            </p>
          </div>
          {user && (
            <Button asChild>
              <Link href="/blog/create">
                <Plus className="h-4 w-4 mr-2" />
                Write Post
              </Link>
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant={selectedTag === "" ? "default" : "outline"} size="sm" onClick={() => setSelectedTag("")}>
              All Topics
            </Button>
            {getAllTags().map((tag) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              {post.image_url && (
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={post.image_url || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex flex-wrap gap-1 mb-2">
                  {post.tags.slice(0, 2).map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.created_at)}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/blog/${post.id}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
