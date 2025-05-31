import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { ArrowRight, BookOpen, Newspaper, Users, TrendingUp } from "lucide-react"

// Mock data for latest articles
const latestArticles = [
  {
    id: 1,
    title: "Climate-Resilient Crop Varieties Show Promise in Field Trials",
    excerpt: "New drought-resistant wheat varieties demonstrate 30% higher yields under stress conditions...",
    category: "Climate",
    date: "2024-01-15",
    isPremium: false,
  },
  {
    id: 2,
    title: "AI-Powered Precision Agriculture Reduces Fertilizer Use by 25%",
    excerpt: "Machine learning algorithms optimize nutrient application timing and quantities...",
    category: "Technology",
    date: "2024-01-14",
    isPremium: true,
  },
  {
    id: 3,
    title: "Sustainable Livestock Management Practices Gain Traction",
    excerpt: "Rotational grazing systems show environmental and economic benefits for farmers...",
    category: "Livestock",
    date: "2024-01-13",
    isPremium: false,
  },
]

const features = [
  {
    icon: Newspaper,
    title: "Latest News",
    description: "Stay updated with the latest developments in agriculture from trusted sources worldwide.",
  },
  {
    icon: BookOpen,
    title: "Research Database",
    description: "Access comprehensive research articles and studies from leading agricultural institutions.",
  },
  {
    icon: Users,
    title: "Student Community",
    description: "Connect with fellow students and researchers through our collaborative blog platform.",
  },
  {
    icon: TrendingUp,
    title: "Industry Insights",
    description: "Get exclusive insights and analysis on agricultural trends and market developments.",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Stay Updated on the <span className="text-green-600">Future of Agriculture</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your comprehensive hub for agricultural news, research, and insights. Connect with the global farming
              community and stay ahead of industry trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/research">
                  Explore Research
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/news">Browse News</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for Agricultural Research</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From breaking news to in-depth research, we provide the tools and content you need to stay informed and
              advance your agricultural knowledge.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
              <p className="text-lg text-gray-600">Discover the most recent research and insights in agriculture</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/research">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    {article.isPremium && <Badge variant="default">Premium</Badge>}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3 mb-4">{article.excerpt}</p>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/research/${article.id}`}>
                      Read More
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Informed with Our Newsletter</h2>
          <p className="text-xl text-green-100 mb-8">
            Get weekly updates on the latest agricultural research, news, and insights delivered directly to your inbox.
          </p>
          <Suspense fallback={<div>Loading...</div>}>
            <NewsletterSignup />
          </Suspense>
        </div>
      </section>
    </div>
  )
}
