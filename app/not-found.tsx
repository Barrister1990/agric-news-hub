"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ArrowLeft, BookOpen, Home, Newspaper, Search, Sparkles, Users } from "lucide-react"
import { useEffect, useState } from "react"

const floatingElements = [
  { icon: "🌱", delay: 0, duration: 3 },
  { icon: "🚜", delay: 1, duration: 4 },
  { icon: "🌾", delay: 2, duration: 3.5 },
  { icon: "📊", delay: 0.5, duration: 4.5 },
  { icon: "🔬", delay: 1.5, duration: 3.2 },
  { icon: "📰", delay: 2.5, duration: 3.8 },
]

const quickLinks = [
  {
    icon: Home,
    title: "Home",
    description: "Return to our homepage",
    href: "/",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Newspaper,
    title: "Latest News",
    description: "Browse agricultural news",
    href: "/news",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: BookOpen,
    title: "Research",
    description: "Explore research articles",
    href: "/research",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Users,
    title: "Community",
    description: "Join our community",
    href: "/community",
    gradient: "from-orange-500 to-red-500"
  },
]

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Floating Background Elements */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {floatingElements.map((element, index) => (
            <div
              key={index}
              className="absolute text-6xl opacity-10 animate-bounce"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
                animationDelay: `${element.delay}s`,
                animationDuration: `${element.duration}s`,
              }}
            >
              {element.icon}
            </div>
          ))}
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 via-blue-600/5 to-purple-600/5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          {/* Error Badge */}
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 mb-8">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <span className="text-sm font-medium text-red-700">Page Not Found</span>
          </div>

          {/* Main 404 Display */}
          <div className="relative mb-12">
            <div className="text-[12rem] lg:text-[16rem] font-black bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 text-[12rem] lg:text-[16rem] font-black bg-gradient-to-r from-green-600/20 via-blue-600/20 to-purple-600/20 bg-clip-text text-transparent leading-none blur-sm">
              404
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-blue-900 bg-clip-text text-transparent mb-8 leading-tight">
              Oops! Page Not Found
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Looks like this page got lost in the fields! The page you're looking for doesn't exist or has been moved to greener pastures.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3">
              <Sparkles className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">Don't worry, we'll help you find your way</span>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Home className="h-5 w-5" />
              Go Home
            </Button>
            <Button 
              variant="outline" 
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 hover:border-green-300 transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Or explore these popular sections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <CardContent className="relative p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${link.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg mx-auto`}>
                      <link.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{link.title}</h3>
                    <p className="text-gray-600">{link.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/5 to-blue-500/5 rounded-3xl"></div>
            <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl shadow-gray-500/10 p-12 lg:p-16">
              <div className="text-center">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-gray-900 mb-6">Still can't find what you're looking for?</h3>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Try using our search feature to find the agricultural news, research, or information you need.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Search for articles, research, news..."
                      className="w-full h-14 px-6 text-lg bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-50/50 to-transparent pointer-events-none"></div>
    </div>
  )
}