"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle, ExternalLink, Loader2, Search } from "lucide-react"
import { useEffect, useState } from "react"

// News API configuration
const NEWS_API_KEY = 'YOUR_API_KEY_HERE' // Replace with your actual API key
const NEWS_API_BASE_URL = 'https://newsapi.org/v2'

// Alternative free APIs you can use:
// 1. NewsAPI.org (requires free registration)
// 2. Guardian API (free, no key required for basic usage)
// 3. News Data API (free tier available)

// Type definitions
interface NewsArticle {
  id: number
  title: string
  description: string
  category: string
  source: string
  publishedAt: string
  url: string
  imageUrl: string
}

interface GuardianArticle {
  webTitle: string
  webPublicationDate: string
  webUrl: string
  fields?: {
    trailText?: string
    thumbnail?: string
  }
}

interface GuardianResponse {
  response: {
    results: GuardianArticle[]
  }
}

const categories = ["All", "Policy", "Climate", "Technology", "Crops", "Livestock"]

// Agricultural keywords for search
const agricultureKeywords = [
  'agriculture', 'farming', 'crops', 'livestock', 'farming technology',
  'sustainable agriculture', 'climate farming', 'agricultural policy'
]

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsArticle[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch news from API
  const fetchNews = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Using Guardian API as it's free and doesn't require API key for basic usage
      const response = await fetch(
        `https://content.guardianapis.com/search?` +
        `q=agriculture OR farming OR crops&` +
        `show-fields=thumbnail,trailText&` +
        `page-size=20&` +
        `order-by=newest&` +
        `api-key=test`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch news')
      }

      const data: GuardianResponse = await response.json()
      
      // Transform Guardian API data to match our component structure
      const transformedNews: NewsArticle[] = data.response.results.map((article: GuardianArticle, index: number) => ({
        id: index + 1,
        title: article.webTitle,
        description: article.fields?.trailText || 'Read more about this agricultural development...',
        category: categorizeArticle(article.webTitle, article.fields?.trailText),
        source: "The Guardian",
        publishedAt: article.webPublicationDate,
        url: article.webUrl,
        imageUrl: article.fields?.thumbnail || "/placeholder.svg?height=200&width=300",
      }))

      setNews(transformedNews)
      setFilteredNews(transformedNews)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      // Fallback to demo data if API fails
      setNews(getFallbackNews())
      setFilteredNews(getFallbackNews())
    } finally {
      setLoading(false)
    }
  }

  // Simple categorization based on keywords
  const categorizeArticle = (title: string, description?: string): string => {
    const text = `${title} ${description || ''}`.toLowerCase()
    
    if (text.includes('climate') || text.includes('weather') || text.includes('environment')) {
      return 'Climate'
    } else if (text.includes('technology') || text.includes('drone') || text.includes('ai') || text.includes('digital')) {
      return 'Technology'
    } else if (text.includes('policy') || text.includes('government') || text.includes('regulation')) {
      return 'Policy'
    } else if (text.includes('crop') || text.includes('harvest') || text.includes('organic')) {
      return 'Crops'
    } else if (text.includes('livestock') || text.includes('cattle') || text.includes('dairy')) {
      return 'Livestock'
    }
    
    return 'Policy' // Default category
  }

  // Fallback news data
  const getFallbackNews = (): NewsArticle[] => [
    {
      id: 1,
      title: "Agricultural Innovation Drives Food Security",
      description: "New technologies and farming methods are being developed to address global food security challenges...",
      category: "Technology",
      source: "Demo Source",
      publishedAt: new Date().toISOString(),
      url: "#",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Climate Adaptation in Modern Farming",
      description: "Farmers worldwide are adapting their practices to cope with changing climate conditions...",
      category: "Climate",
      source: "Demo Source",
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      url: "#",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Sustainable Agriculture Practices Gain Momentum",
      description: "Increasing adoption of sustainable farming methods shows promise for environmental conservation...",
      category: "Policy",
      source: "Demo Source",
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      url: "#",
      imageUrl: "/placeholder.svg?height=200&width=300",
    }
  ]

  // Filter news based on search and category
  useEffect(() => {
    let filtered = news

    if (selectedCategory !== "All") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredNews(filtered)
  }, [news, searchTerm, selectedCategory])

  // Fetch news on component mount
  useEffect(() => {
    fetchNews()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Agricultural News</h1>
          <p className="text-lg text-gray-600">
            Stay updated with the latest news and developments in agriculture from trusted sources worldwide.
          </p>
          
          {/* Refresh Button */}
          <div className="mt-4">
            <Button 
              onClick={fetchNews} 
              disabled={loading}
              variant="outline"
              size="sm"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'Refresh News'
              )}
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
            <div>
              <p className="text-yellow-800">
                Unable to fetch latest news. Showing demo content. 
              </p>
              <p className="text-sm text-yellow-700 mt-1">
                To get real news, add your API key or check your internet connection.
              </p>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search news articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Loading latest agricultural news...</p>
          </div>
        )}

        {/* News Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <img
                    src={article.imageUrl || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=200&width=300"
                    }}
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-xs text-gray-500">{article.source}</span>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {formatDate(article.publishedAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3 mb-4">{article.description}</p>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      Read Full Article
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No news articles found matching your criteria.</p>
          </div>
        )}

        {/* API Information */}
        <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">API Configuration</h3>
          <p className="text-sm text-blue-800 mb-2">
            This demo uses The Guardian API for free news access. For more features, consider:
          </p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• <strong>NewsAPI.org:</strong> Comprehensive news with free tier (70,000 requests/month)</li>
            <li>• <strong>Guardian API:</strong> Free access to The Guardian's content</li>
            <li>• <strong>News Data API:</strong> Real-time news with free tier</li>
            <li>• <strong>Currents API:</strong> Global news coverage with free plan</li>
          </ul>
        </div>
      </div>
    </div>
  )
}