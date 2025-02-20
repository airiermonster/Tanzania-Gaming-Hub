'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'

export function ResetPasswordForm() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })
      if (error) throw error
      setMessage('Check your email for the password reset link')
    } catch (error) {
      setMessage('Error sending reset email')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Reset Password</h2>
        <p className="text-muted-foreground mt-2">
          Enter your email to receive a password reset link
        </p>
      </div>

      <form onSubmit={handleReset} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>

      {message && (
        <p className="text-center text-sm text-muted-foreground">{message}</p>
      )}
    </div>
  )
}