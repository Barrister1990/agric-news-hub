"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Download, Lock } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function ResearchPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [filteredArticles, setFilteredArticles] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const { user, profile } = useAuth()

  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      setFilteredArticles(filtered)
    } else {
      setFilteredArticles(articles)
    }
  }, [articles, searchTerm])

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from("research_articles")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      // If no data exists, insert some mock data
      if (!data || data.length === 0) {
        await insertMockData()
        fetchArticles()
        return
      }

      setArticles(data)
      setFilteredArticles(data)
    } catch (error) {
      console.error("Error fetching articles:", error)
    } finally {
      setLoading(false)
    }
  }

  const insertMockData = async () => {
    const mockArticles = [
      {
        title: "Climate-Resilient Crop Varieties for Sustainable Agriculture",
        abstract:
          "This comprehensive study examines the development and implementation of climate-resilient crop varieties designed to withstand extreme weather conditions while maintaining high yields.",
        author_name: "Dr. Sarah Johnson",
        content: "Full research content would be here...",
        tags: ["climate", "crops", "sustainability", "resilience"],
        is_premium: false,
        download_url: "/research/climate-resilient-crops.pdf",
      },
      {
        title: "AI-Powered Precision Agriculture: A Machine Learning Approach",
        abstract:
          "An in-depth analysis of machine learning algorithms applied to precision agriculture, demonstrating significant improvements in crop yield prediction and resource optimization.",
        author_name: "Prof. Michael Chen",
        content: "Full research content would be here...",
        tags: ["AI", "machine learning", "precision agriculture", "technology"],
        is_premium: true,
        download_url: "/research/ai-precision-agriculture.pdf",
      },
      {
        title: "Sustainable Livestock Management in Changing Climates",
        abstract:
          "Research on adaptive livestock management strategies that promote animal welfare while reducing environmental impact in the face of climate change.",
        author_name: "Dr. Emily Rodriguez",
        content: "Full research content would be here...",
        tags: ["livestock", "sustainability", "climate change", "management"],
        is_premium: false,
        download_url: "/research/sustainable-livestock.pdf",
      },
      {
        title: "Soil Health Assessment Using Remote Sensing Technologies",
        abstract:
          "A novel approach to soil health monitoring using satellite imagery and IoT sensors, providing farmers with real-time soil condition data.",
        author_name: "Dr. James Wilson",
        content: "Full research content would be here...",
        tags: ["soil health", "remote sensing", "IoT", "monitoring"],
        is_premium: true,
        download_url: "/research/soil-health-remote-sensing.pdf",
      },
      {
        title: "Organic Farming Practices and Their Economic Impact",
        abstract:
          "Economic analysis of organic farming practices, comparing profitability, market demand, and long-term sustainability with conventional farming methods.",
        author_name: "Dr. Lisa Thompson",
        content: "Full research content would be here...",
        tags: ["organic farming", "economics", "sustainability", "market analysis"],
        is_premium: false,
        download_url: "/research/organic-farming-economics.pdf",
      },
    ]

    await supabase.from("research_articles").insert(mockArticles)
  }

  const canAccessPremium = profile?.subscription_tier === "premium" || profile?.role === "admin"

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
          <p className="text-gray-600">Loading research articles...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Research Articles Database</h1>
          <p className="text-lg text-gray-600">
            Access comprehensive research articles and studies from leading agricultural institutions and researchers.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by title, abstract, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map((tag: string) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {article.is_premium && (
                    <Badge variant="default" className="flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      Premium
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="text-sm">
                  By {article.author_name} • {formatDate(article.created_at)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-4 mb-4">{article.abstract}</p>
                <div className="flex items-center justify-between">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`/research/${article.id}`}>Read More</a>
                  </Button>
                  {article.download_url && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={article.is_premium && !canAccessPremium}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-3 w-3" />
                      {article.is_premium && !canAccessPremium ? "Premium Only" : "Download"}
                    </Button>
                  )}
                </div>
                {article.is_premium && !canAccessPremium && (
                  <p className="text-xs text-gray-500 mt-2">Upgrade to premium to access this research article.</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No research articles found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}
