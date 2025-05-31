import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Award, Globe, Sparkles, Target, Users } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "Advancing agricultural knowledge through accessible research and cutting-edge insights.",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Users,
    title: "Community-Focused",
    description: "Building a global network of agriculture students and researchers worldwide.",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: Award,
    title: "Quality Content",
    description: "Curating high-quality, peer-reviewed research and trusted news sources.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "Supporting sustainable agriculture practices and food security initiatives.",
    gradient: "from-orange-500 to-red-500"
  },
]

const stats = [
  { number: "50K+", label: "Students Served", icon: "👥" },
  { number: "2.5K+", label: "Research Articles", icon: "📊" },
  { number: "80+", label: "Countries Reached", icon: "🌍" },
  { number: "5K+", label: "Blog Posts", icon: "✍️" }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Transforming Agricultural Knowledge</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-blue-900 bg-clip-text text-transparent mb-8 leading-tight">
              About AgriNews &<br />Research Hub
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're revolutionizing agricultural education by connecting students, researchers, and professionals
              through comprehensive news coverage, cutting-edge research, and collaborative innovation.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <section className="py-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-3xl"></div>
            <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl shadow-green-500/10 p-12 lg:p-16">
              <div className="text-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Our Mission</h2>
                <p className="text-xl lg:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
                  To democratize access to agricultural knowledge and foster innovation in farming practices by providing a
                  comprehensive platform where students, researchers, and professionals can access the latest insights, share
                  research findings, and collaborate on solutions for global food security and sustainable agriculture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">The principles that drive everything we do</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <CardHeader className="relative p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-4">{value.title}</CardTitle>
                  <CardDescription className="text-lg text-gray-600 leading-relaxed">{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-3xl"></div>
            <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-3xl text-white p-12 lg:p-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">Our Global Impact</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold mb-2 bg-white/20 backdrop-blur-sm rounded-2xl py-4">
                      {stat.number}
                    </div>
                    <div className="text-lg text-white/90 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">Our Journey</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  AgriNews & Research Hub was founded in 2020 by a visionary group of agricultural researchers and students 
                  who identified a critical gap in accessible, centralized agricultural knowledge sharing.
                </p>
                <p>
                  What began as an ambitious project to democratize access to research papers has evolved into a 
                  comprehensive ecosystem serving tens of thousands of users across the globe. We've forged strategic 
                  partnerships with premier agricultural institutions, cutting-edge research organizations, and trusted news outlets.
                </p>
                <p>
                  Today, we continue to push boundaries and expand our platform's capabilities, always with our North Star: 
                  empowering the next generation of agricultural innovators and contributing to global food security through 
                  knowledge democratization and collaborative innovation.
                </p>
              </div>
              <div className="mt-8">
                <button className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  Join Our Mission
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 bg-white/80 rounded-2xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">2020</div>
                    <div className="text-gray-600">Founded</div>
                  </div>
                  <div className="text-center p-6 bg-white/80 rounded-2xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                    <div className="text-gray-600">Available</div>
                  </div>
                  <div className="text-center p-6 bg-white/80 rounded-2xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                    <div className="text-gray-600">Open Access</div>
                  </div>
                  <div className="text-center p-6 bg-white/80 rounded-2xl">
                    <div className="text-3xl font-bold text-orange-600 mb-2">∞</div>
                    <div className="text-gray-600">Possibilities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}