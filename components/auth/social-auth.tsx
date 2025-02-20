'use client'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { FaGoogle, FaDiscord } from 'react-icons/fa'
import { useState } from 'react'

export function SocialAuth() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSocialLogin = async (provider: 'google' | 'discord') => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => handleSocialLogin('google')}
        disabled={isLoading}
      >
        <FaGoogle className="mr-2" />
        {isLoading ? 'Loading...' : 'Continue with Google'}
      </Button>
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={() => handleSocialLogin('discord')}
        disabled={isLoading}
      >
        <FaDiscord className="mr-2" />
        {isLoading ? 'Loading...' : 'Continue with Discord'}
      </Button>
    </div>
  )
}