"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Clock, HelpCircle, Mail, MapPin, MessageCircle, Phone, Send, Sparkles } from "lucide-react"
import { useState } from "react"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    primary: "contact@agrinewsgh.com",
    secondary: "support@agrinewsgh.com",
    description: "Reach out via email for detailed inquiries and support.",
    gradient: "from-yellow-600 to-green-600"
  },
  {
    icon: Phone,
    title: "Phone Support",
    primary: "+233 (0)30 123 4567",
    secondary: "+233 (0)54 987 6543",
    description: "Call us for quick help or general questions.",
    gradient: "from-green-600 to-teal-500"
  },
  {
    icon: MapPin,
    title: "Visit Our Office",
    primary: "Plot 42 Agric-Tech Road",
    secondary: "East Legon, Accra, Ghana",
    description: "You’re welcome to visit our head office.",
    gradient: "from-red-600 to-yellow-500"
  },
  {
    icon: Clock,
    title: "Business Hours",
    primary: "Mon-Fri: 8:00 AM - 5:00 PM",
    secondary: "Sat: 9:00 AM - 1:00 PM | Sun: Closed",
    description: "We’re available during these working hours.",
    gradient: "from-orange-500 to-red-600"
  }
];


const faqs = [
  {
    question: "How do I submit a research article?",
    answer: "You can submit research articles through our admin panel if you have the appropriate permissions, or contact us directly to discuss publication opportunities and our peer-review process."
  },
  {
    question: "What's included in the premium subscription?",
    answer: "Premium subscribers get access to exclusive research content, advanced search features, priority support, early access to new features, and detailed analytics on agricultural trends."
  },
  {
    question: "How can I contribute to the blog?",
    answer: "Create an account and use our intuitive blog editor to submit posts. All submissions go through a comprehensive review process to ensure quality and accuracy before publication."
  },
  {
    question: "Do you accept guest contributors?",
    answer: "Absolutely! We welcome contributions from agriculture students, researchers, and professionals worldwide. Contact us to discuss collaboration opportunities and our contributor program."
  },
  {
    question: "How fast do you respond to inquiries?",
    answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our phone support for immediate assistance."
  },
  {
    question: "Can I request specific research topics?",
    answer: "Yes! We value community input and regularly consider topic suggestions from our users. Reach out with your ideas and we'll explore coverage possibilities."
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully! ✨",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      })
      setFormData({ name: "", email: "", subject: "", message: "" })
      setLoading(false)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-200 rounded-full px-4 py-2 mb-8">
              <MessageCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Let's Connect</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-blue-900 bg-clip-text text-transparent mb-8 leading-tight">
              Get In Touch
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Have questions, suggestions, or want to collaborate? We'd love to hear from you. 
              Connect with our team and we'll respond faster than you can say "sustainable agriculture."
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Contact Methods */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
                <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <CardHeader className="relative text-center p-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${method.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg mx-auto`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-4">{method.title}</CardTitle>
                  <div className="space-y-2">
                    <p className="font-semibold text-gray-800">{method.primary}</p>
                    <p className="text-gray-600">{method.secondary}</p>
                    <p className="text-sm text-gray-500 mt-4">{method.description}</p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-3xl"></div>
            <div className="relative bg-white/60 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl shadow-green-500/10 p-12 lg:p-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Fill out the form below and we'll get back to you within 24 hours with a thoughtful response
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-lg font-semibold text-gray-800">Full Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className="h-14 text-lg bg-white/80 backdrop-blur-sm border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-lg font-semibold text-gray-800">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="h-14 text-lg bg-white/80 backdrop-blur-sm border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div className="mb-8 space-y-3">
                  <Label htmlFor="subject" className="text-lg font-semibold text-gray-800">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    required 
                    className="h-14 text-lg bg-white/80 backdrop-blur-sm border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
                    placeholder="What's this about?"
                  />
                </div>
                <div className="mb-10 space-y-3">
                  <Label htmlFor="message" className="text-lg font-semibold text-gray-800">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={8}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="text-lg bg-white/80 backdrop-blur-sm border-gray-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl resize-none"
                    placeholder="Tell us more about your inquiry, suggestion, or collaboration idea..."
                  />
                </div>
                <div className="text-center">
                  <Button 
                    type="submit" 
                    disabled={loading} 
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-6 rounded-2xl font-semibold text-xl hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full px-4 py-2 mb-8">
              <HelpCircle className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Quick Answers</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find quick answers to common questions about our platform and services
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="relative pb-4">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">Q</span>
                    </div>
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative pt-0">
                  <div className="ml-11">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-3xl"></div>
            <div className="relative bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-3xl text-white p-12 lg:p-16">
              <Sparkles className="h-16 w-16 mx-auto mb-8 opacity-80" />
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Still Have Questions?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Our team is always here to help. Don't hesitate to reach out through any of our contact methods above.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-300">
                  <Mail className="h-5 w-5" />
                  Email Support
                </button>
                <button className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-300">
                  <Phone className="h-5 w-5" />
                  Call Us Now
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}