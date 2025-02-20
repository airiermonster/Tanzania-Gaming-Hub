'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'

export function ProfileForm() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    getProfile()
  }, [])

  async function getProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
          .single()

        if (data) {
          setUsername(data.username)
          setFullName(data.full_name)
          setAvatar(data.avatar_url)
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            username,
            full_name: fullName,
            avatar_url: avatar,
            updated_at: new Date().toISOString(),
          })
        if (error) throw error
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Username</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <Button
          onClick={updateProfile}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Loading...' : 'Update Profile'}
        </Button>
      </div>
    </div>
  )
}