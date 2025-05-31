"use client"
import { useAuth } from '@/contexts/auth-context'
import { supabase } from '@/lib/supabase'
import { Calendar, Crown, Edit3, LogOut, Mail, Settings, User } from 'lucide-react'
import React, { useState } from 'react'

interface EditData {
  full_name: string
  bio: string
  website: string
  location: string
}

export default function ProfilePage(){
  const { user, profile, signOut } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<EditData>({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    website: profile?.website || '',
    location: profile?.location || ''
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (): Promise<void> => {
    if (!user) return
    
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update(editData)
        .eq('id', user.id)
      
      if (!error) {
        setIsEditing(false)
        // You might want to refresh the profile data here
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = (): void => {
    setEditData({
      full_name: profile?.full_name || '',
      bio: profile?.bio || '',
      website: profile?.website || '',
      location: profile?.location || ''
    })
    setIsEditing(false)
  }

  const navigateToCreatePost = (): void => {
    window.location.href = '/blog/create'
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Please sign in to view your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <div className="flex gap-3">
              <button
                onClick={navigateToCreatePost}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Edit3 className="w-4 h-4" />
                Write a Post
              </button>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6">
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <User className="w-10 h-10 text-gray-600" />
                </div>
                <div className="pb-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {profile.full_name || 'Anonymous User'}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 sm:mt-0">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {/* About Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">About</h3>
                  
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={editData.full_name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditData({...editData, full_name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          value={editData.bio}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditData({...editData, bio: e.target.value})}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Website
                        </label>
                        <input
                          type="url"
                          value={editData.website}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditData({...editData, website: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={editData.location}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditData({...editData, location: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {profile.bio ? (
                        <p className="text-gray-700">{profile.bio}</p>
                      ) : (
                        <p className="text-gray-500 italic">No bio added yet</p>
                      )}
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {profile.website && (
                          <a 
                            href={profile.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 transition-colors"
                          >
                            🌐 Website
                          </a>
                        )}
                        {profile.location && (
                          <span>📍 {profile.location}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Subscription Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    Subscription
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Plan:</span>
                      <span className="font-medium capitalize">
                        {profile.subscription_tier || 'Free'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Role:</span>
                      <span className="font-medium capitalize">
                        {profile.role || 'User'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Account Info
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Joined:</span>
                      <span>
                        {new Date(user.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email verified:</span>
                      <span className={user.email_confirmed_at ? 'text-green-600' : 'text-yellow-600'}>
                        {user.email_confirmed_at ? 'Yes' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}