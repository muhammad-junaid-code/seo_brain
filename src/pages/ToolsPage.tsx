import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { tools } from "@/lib/tools-data"
import { Search, Sparkles } from "lucide-react"

const categories = [
  { id: "all", label: "All Tools" },
  { id: "image", label: "Image" },
  { id: "seo", label: "SEO" },
  { id: "writing", label: "AI Writing" },
  { id: "analytics", label: "Analytics" },
  { id: "utility", label: "Utility" },
  { id: "agents", label: "Agents" },
]

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = activeCategory === "all" || tool.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, activeCategory])

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === "all") return tools.length
    return tools.filter(t => t.category === categoryId).length
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-violet-100 text-violet-700 hover:bg-violet-100">
              <Sparkles className="w-3 h-3 mr-1" />
              48 AI-Powered Tools
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">
              Everything you need to dominate SEO
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
              From keyword research to content creation, image generation to analytics - all powered by cutting-edge AI.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 bg-slate-50 border-slate-200"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {category.label}
                  <span className="ml-2 text-xs opacity-70">({getCategoryCount(category.id)})</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-16 gap-y-10 pl-8">
            {filteredTools.map((tool, index) => {
              return (
                <motion.div
                  key={tool.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="canvas-frame group block"
                  >
                    {/* Purple animated border line */}
                    <div className="canvas-frame__border" aria-hidden="true">
                      <svg preserveAspectRatio="none">
                        <defs>
                          <linearGradient id={`grad-purple-${tool.slug}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#b8a4e0" />
                            <stop offset="100%" stopColor="#5b3fa1" />
                          </linearGradient>
                        </defs>
                        <rect
                          className="rect-gradient"
                          fill="none"
                          stroke={`url(#grad-purple-${tool.slug})`}
                          strokeLinecap="square"
                          strokeWidth="3"
                          strokeMiterlimit="30"
                          width="100%"
                          height="100%"
                        />
                      </svg>
                    </div>

                    {/* Sliding tool name text - shows on hover */}
                    <div className="canvas-frame__copy" aria-hidden="true">
                      {tool.name.split(' ').slice(0, 2).map((word, i) => (
                        <strong key={i} className="canvas_copy_title">{word}</strong>
                      ))}
                      <span className="canvas_copy_details">{tool.tier} Tool</span>
                    </div>

                    {/* White card container */}
                    <div
                      className="glass-card-container"
                      style={{
                        padding: "1.5rem",
                        background: "#ffffff",
                        borderRadius: "0.75rem",
                        boxShadow: "0 20px 60px rgba(149, 128, 196, 0.18)",
                        border: "1px solid rgba(149, 128, 196, 0.12)",
                        position: "relative",
                        zIndex: 2,
                      }}
                    >
                      {/* Image card with glassmorphism overlay */}
                      <div
                        className="group/card glass-card"
                        style={{
                          position: "relative",
                          width: "100%",
                          height: "180px",
                          backgroundImage: `url(/images/${tool.slug}.jpg)`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          borderRadius: "0.5rem",
                          boxShadow: "0 25px 60px rgba(80, 60, 130, 0.35), 0 8px 20px rgba(80, 60, 130, 0.2)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* Front overlay - name and tier */}
                        <div
                          className="flex flex-col items-center justify-center transition-all duration-700 ease-out [backface-visibility:hidden] group-hover/card:[transform:rotateY(180deg)]"
                          style={{
                            position: "absolute",
                            width: "70%",
                            minHeight: "50%",
                            background: "rgba(255,255,255,0.55)",
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                            borderRadius: "0.5rem",
                            border: "1px solid rgba(255,255,255,0.6)",
                            boxShadow: "0 8px 24px rgba(149,128,196,0.25)",
                            padding: "0.75rem",
                          }}
                        >
                          <h3 className="text-sm font-semibold text-center" style={{ color: "rgba(40,30,70,0.95)" }}>
                            {tool.name}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={`mt-1 ${tool.tier === "Free" 
                              ? "bg-emerald-50/80 text-emerald-700 border-emerald-200 text-xs" 
                              : "bg-violet-50/80 text-violet-700 border-violet-200 text-xs"
                            }`}
                          >
                            {tool.tier}
                          </Badge>
                        </div>

                        {/* Back overlay - description */}
                        <div
                          className="flex flex-col items-center justify-center transition-all duration-700 ease-out [backface-visibility:hidden] [transform:rotateY(-180deg)] opacity-0 group-hover/card:[transform:rotateY(0deg)] group-hover/card:opacity-100"
                          style={{
                            position: "absolute",
                            width: "calc(100% - 1rem)",
                            height: "calc(100% - 1rem)",
                            background: "rgba(255,255,255,0.85)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            borderRadius: "0.5rem",
                            border: "1px solid rgba(183, 163, 224, 0.4)",
                            boxShadow: "0 10px 30px rgba(149,128,196,0.3)",
                            padding: "0.75rem",
                          }}
                        >
                          <h3 className="text-sm font-semibold mb-1" style={{ color: "#5b3fa1" }}>
                            {tool.name}
                          </h3>
                          <p className="text-xs text-center line-clamp-3" style={{ color: "rgba(60,50,90,0.75)", lineHeight: 1.5 }}>
                            {tool.description}
                          </p>
                          <Badge 
                            variant="outline" 
                            className="mt-2 bg-slate-100/80 text-slate-600 border-slate-200 text-xs capitalize"
                          >
                            {tool.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500">No tools found matching your search.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
