"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { CheckCircle, FileText, Image as ImageIcon, Link, Newspaper, Plus, Upload, Users, X, XCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function AdminPage() {
  const [pendingPosts, setPendingPosts] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user, profile } = useAuth()
  const { toast } = useToast()

  // Form states for new blog post
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    tags: [] as string[],
    status: "draft" as "draft" | "published" | "pending"
  })
  const [newPostTag, setNewPostTag] = useState("")

  // Image upload states
  const [imageUploadMode, setImageUploadMode] = useState<"upload" | "url">("url")
  const [uploadingImage, setUploadingImage] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form states for new research article
  const [newArticle, setNewArticle] = useState({
    title: "",
    abstract: "",
    author_name: "",
    content: "",
    tags: [] as string[],
    is_premium: false,
    download_url: ""
  })
  const [newArticleTag, setNewArticleTag] = useState("")

  const [isCreatingPost, setIsCreatingPost] = useState(false)
  const [isCreatingArticle, setIsCreatingArticle] = useState(false)

  useEffect(() => {
    if (profile?.role === "admin") {
      fetchData()
    }
  }, [profile])

  const fetchData = async () => {
    try {
      const [postsResult, usersResult, articlesResult] = await Promise.all([
        supabase.from("blog_posts").select("*").eq("status", "pending"),
        supabase.from("profiles").select("*"),
        supabase.from("research_articles").select("*"),
      ])

      setPendingPosts(postsResult.data || [])
      setUsers(usersResult.data || [])
      setArticles(articlesResult.data || [])
    } catch (error) {
      console.error("Error fetching admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePostAction = async (postId: string, action: "approve" | "reject") => {
    try {
      const status = action === "approve" ? "published" : "draft"
      const { error } = await supabase.from("blog_posts").update({ status }).eq("id", postId)

      if (error) throw error

      toast({
        title: `Post ${action}d`,
        description: `The blog post has been ${action}d successfully.`,
      })

      fetchData()
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${action} post. Please try again.`,
        variant: "destructive",
      })
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please select an image file.",
          variant: "destructive",
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      setSelectedFile(file)
    }
  }

  const uploadImageToSupabase = async (file: File): Promise<string | null> => {
    try {
      setUploadingImage(true)
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      
      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Upload error:', error)
        throw error
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName)

      return urlData.publicUrl
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Upload Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
      return null
    } finally {
      setUploadingImage(false)
    }
  }

  const handleImageUpload = async () => {
    if (!selectedFile) return

    const imageUrl = await uploadImageToSupabase(selectedFile)
    if (imageUrl) {
      setNewPost(prev => ({ ...prev, image_url: imageUrl }))
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      })
    }
  }

  const addTag = (type: "post" | "article") => {
    if (type === "post" && newPostTag.trim()) {
      setNewPost(prev => ({
        ...prev,
        tags: [...prev.tags, newPostTag.trim()]
      }))
      setNewPostTag("")
    } else if (type === "article" && newArticleTag.trim()) {
      setNewArticle(prev => ({
        ...prev,
        tags: [...prev.tags, newArticleTag.trim()]
      }))
      setNewArticleTag("")
    }
  }

  const removeTag = (type: "post" | "article", index: number) => {
    if (type === "post") {
      setNewPost(prev => ({
        ...prev,
        tags: prev.tags.filter((_, i) => i !== index)
      }))
    } else {
      setNewArticle(prev => ({
        ...prev,
        tags: prev.tags.filter((_, i) => i !== index)
      }))
    }
  }

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content || !newPost.excerpt) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsCreatingPost(true)
    try {
      const { error } = await supabase.from("blog_posts").insert({
        title: newPost.title,
        content: newPost.content,
        excerpt: newPost.excerpt,
        author_id: user?.id,
        author_name: profile?.full_name || "Admin",
        image_url: newPost.image_url || null,
        tags: newPost.tags,
        status: newPost.status
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Blog post created successfully!",
      })

      // Reset form
      setNewPost({
        title: "",
        content: "",
        excerpt: "",
        image_url: "",
        tags: [],
        status: "draft"
      })
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

      fetchData()
    } catch (error) {
      console.error("Error creating post:", error)
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreatingPost(false)
    }
  }

  const handleCreateArticle = async () => {
    if (!newArticle.title || !newArticle.abstract || !newArticle.author_name || !newArticle.content) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsCreatingArticle(true)
    try {
      const { error } = await supabase.from("research_articles").insert({
        title: newArticle.title,
        abstract: newArticle.abstract,
        author_name: newArticle.author_name,
        content: newArticle.content,
        tags: newArticle.tags,
        is_premium: newArticle.is_premium,
        download_url: newArticle.download_url || null
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Research article created successfully!",
      })

      // Reset form
      setNewArticle({
        title: "",
        abstract: "",
        author_name: "",
        content: "",
        tags: [],
        is_premium: false,
        download_url: ""
      })

      fetchData()
    } catch (error) {
      console.error("Error creating article:", error)
      toast({
        title: "Error",
        description: "Failed to create research article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreatingArticle(false)
    }
  }

  if (!user || profile?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">You don't have permission to access the admin panel.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Panel</h1>
          <p className="text-lg text-gray-600">Manage blog posts, research articles, and user accounts.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Posts</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingPosts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Research Articles</CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{articles.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter((u) => u.subscription_tier === "premium").length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="posts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="posts">Pending Posts</TabsTrigger>
            <TabsTrigger value="create-post">Create Post</TabsTrigger>
            <TabsTrigger value="create-article">Create Article</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Blog Posts</CardTitle>
                <CardDescription>Review and approve or reject blog post submissions.</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingPosts.length === 0 ? (
                  <p className="text-gray-500">No pending posts to review.</p>
                ) : (
                  <div className="space-y-4">
                    {pendingPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handlePostAction(post.id, "approve")}
                              className="flex items-center gap-1"
                            >
                              <CheckCircle className="h-3 w-3" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handlePostAction(post.id, "reject")}
                              className="flex items-center gap-1"
                            >
                              <XCircle className="h-3 w-3" />
                              Reject
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">By {post.author_name}</p>
                        <p className="text-gray-700 mb-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1">
                          {post.tags.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create-post" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Blog Post
                </CardTitle>
                <CardDescription>Create a new blog post as an admin user.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-title">Title *</Label>
                    <Input
                      id="post-title"
                      value={newPost.title}
                      onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter post title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-status">Status</Label>
                    <Select
                      value={newPost.status}
                      onValueChange={(value: "draft" | "published" | "pending") => 
                        setNewPost(prev => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-excerpt">Excerpt *</Label>
                  <Textarea
                    id="post-excerpt"
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the post"
                    rows={3}
                  />
                </div>

                {/* Enhanced Image Section */}
                <div className="space-y-4">
                  <Label>Post Image</Label>
                  
                  {/* Image Upload Mode Selector */}
                  <div className="flex gap-2 mb-4">
                    <Button
                      type="button"
                      variant={imageUploadMode === "url" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setImageUploadMode("url")}
                      className="flex items-center gap-2"
                    >
                      <Link className="h-4 w-4" />
                      URL
                    </Button>
                    <Button
                      type="button"
                      variant={imageUploadMode === "upload" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setImageUploadMode("upload")}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload
                    </Button>
                  </div>

                  {imageUploadMode === "url" ? (
                    <div className="space-y-2">
                      <Label htmlFor="post-image-url">Image URL</Label>
                      <Input
                        id="post-image-url"
                        value={newPost.image_url}
                        onChange={(e) => setNewPost(prev => ({ ...prev, image_url: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="post-image-file">Select Image File</Label>
                        <Input
                          id="post-image-file"
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          ref={fileInputRef}
                        />
                        <p className="text-sm text-gray-500">Maximum file size: 5MB. Supported formats: JPG, PNG, GIF, WebP</p>
                      </div>
                      
                      {selectedFile && (
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <ImageIcon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{selectedFile.name}</span>
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleImageUpload}
                            disabled={uploadingImage}
                            className="ml-auto"
                          >
                            {uploadingImage ? "Uploading..." : "Upload"}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Image Preview */}
                  {newPost.image_url && (
                    <div className="space-y-2">
                      <Label>Image Preview</Label>
                      <div className="relative w-full max-w-md">
                        <img
                          src={newPost.image_url}
                          alt="Post preview"
                          className="w-full h-48 object-cover rounded-lg border"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          onClick={() => setNewPost(prev => ({ ...prev, image_url: "" }))}
                          className="absolute top-2 right-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="post-content">Content *</Label>
                  <Textarea
                    id="post-content"
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your blog post content here..."
                    rows={8}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newPostTag}
                      onChange={(e) => setNewPostTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag("post"))}
                    />
                    <Button type="button" onClick={() => addTag("post")} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {newPost.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag("post", index)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleCreatePost} 
                  disabled={isCreatingPost || uploadingImage}
                  className="w-full"
                >
                  {isCreatingPost ? "Creating..." : "Create Blog Post"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create-article" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create New Research Article
                </CardTitle>
                <CardDescription>Create a new research article for the platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="article-title">Title *</Label>
                    <Input
                      id="article-title"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter article title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="article-author">Author Name *</Label>
                    <Input
                      id="article-author"
                      value={newArticle.author_name}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, author_name: e.target.value }))}
                      placeholder="Author's full name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="article-abstract">Abstract *</Label>
                  <Textarea
                    id="article-abstract"
                    value={newArticle.abstract}
                    onChange={(e) => setNewArticle(prev => ({ ...prev, abstract: e.target.value }))}
                    placeholder="Brief summary of the research"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="article-download">Download URL (optional)</Label>
                  <Input
                    id="article-download"
                    value={newArticle.download_url}
                    onChange={(e) => setNewArticle(prev => ({ ...prev, download_url: e.target.value }))}
                    placeholder="https://example.com/research.pdf"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="article-premium"
                    checked={newArticle.is_premium}
                    onCheckedChange={(checked) => 
                      setNewArticle(prev => ({ ...prev, is_premium: !!checked }))
                    }
                  />
                  <Label htmlFor="article-premium">Premium Article</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="article-content">Content *</Label>
                  <Textarea
                    id="article-content"
                    value={newArticle.content}
                    onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Full research article content..."
                    rows={10}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newArticleTag}
                      onChange={(e) => setNewArticleTag(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag("article"))}
                    />
                    <Button type="button" onClick={() => addTag("article")} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {newArticle.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag("article", index)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleCreateArticle} 
                  disabled={isCreatingArticle}
                  className="w-full"
                >
                  {isCreatingArticle ? "Creating..." : "Create Research Article"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage user accounts and subscriptions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex justify-between items-center border rounded-lg p-4">
                      <div>
                        <h3 className="font-semibold">{user.full_name || "No name"}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant={user.subscription_tier === "premium" ? "default" : "secondary"}>
                            {user.subscription_tier}
                          </Badge>
                          <Badge variant={user.role === "admin" ? "destructive" : "outline"}>{user.role}</Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        Joined {new Date(user.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="articles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Research Articles</CardTitle>
                <CardDescription>Manage research articles and their access levels.</CardDescription>
              </CardHeader>
             <CardContent>
                <div className="space-y-4">
                  {articles.length === 0 ? (
                    <p className="text-gray-500">No research articles found.</p>
                  ) : (
                    articles.map((article) => (
                      <div key={article.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{article.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">By {article.author_name}</p>
                            <p className="text-gray-700 mb-2 line-clamp-2">{article.abstract}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {article.tags?.map((tag: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2 items-center text-sm text-gray-500">
                              <Badge variant={article.is_premium ? "default" : "secondary"}>
                                {article.is_premium ? "Premium" : "Free"}
                              </Badge>
                              {article.download_url && (
                                <Badge variant="outline" className="text-xs">
                                  <Link className="h-3 w-3 mr-1" />
                                  Download Available
                                </Badge>
                              )}
                              <span>Created {new Date(article.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-4">
                            {article.download_url && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(article.download_url, '_blank')}
                                className="flex items-center gap-1"
                              >
                                <Link className="h-3 w-3" />
                                View
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={async () => {
                                if (confirm('Are you sure you want to delete this article?')) {
                                  try {
                                    const { error } = await supabase
                                      .from('research_articles')
                                      .delete()
                                      .eq('id', article.id)
                                    
                                    if (error) throw error
                                    
                                    toast({
                                      title: "Success",
                                      description: "Article deleted successfully.",
                                    })
                                    
                                    fetchData()
                                  } catch (error) {
                                    toast({
                                      title: "Error",
                                      description: "Failed to delete article.",
                                      variant: "destructive",
                                    })
                                  }
                                }
                              }}
                              className="flex items-center gap-1"
                            >
                              <X className="h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
                