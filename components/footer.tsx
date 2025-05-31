import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Navigation",
      links: [
        { href: "/", label: "Home" },
        { href: "/news", label: "News" },
        { href: "/research", label: "Research" },
        { href: "/blog", label: "Blog" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
      ]
    },
    {
      title: "Categories",
      links: [
        { href: "/category/crops", label: "Crops & Farming" },
        { href: "/category/livestock", label: "Livestock" },
        { href: "/category/technology", label: "AgTech" },
        { href: "/category/sustainability", label: "Sustainability" },
        { href: "/category/markets", label: "Market News" },
        { href: "/category/policy", label: "Policy & Regulation" },
      ]
    },
    {
      title: "Resources",
      links: [
        { href: "/weather", label: "Weather Updates" },
        { href: "/prices", label: "Market Prices" },
        { href: "/tools", label: "Farm Tools" },
        { href: "/guides", label: "Farming Guides" },
        { href: "/newsletter", label: "Newsletter" },
        { href: "/events", label: "Agriculture Events" },
      ]
    }
  ]

  const socialLinks = [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AN</span>
              </div>
              <span className="font-bold text-xl">AgriNews</span>
            </Link>
            <p className="text-gray-400 mb-4 text-sm">
              Your trusted source for agricultural news, research, and insights. 
              Keeping farmers and agriculture professionals informed and connected.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>contact@agrinews.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Agricultural District, Farm City, FC 12345</span>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Newsletter */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Follow us:</span>
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>

            {/* Newsletter Signup */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Stay updated:</span>
              <Link
                href="/newsletter"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors"
              >
                Subscribe to Newsletter
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <span>&copy; {currentYear} AgriNews. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <Link href="/privacy" className="hover:text-green-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-green-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-green-400 transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              Made with 🌱 for farmers everywhere
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}