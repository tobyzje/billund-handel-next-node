'use client'

import { useState, useEffect } from 'react'
import { User } from '@/app/types'
import { Button } from '@/components/ui/button'

export default function AdminMembersPage() {
  const [members, setMembers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('/api/users')
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setMembers(data.users)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Der skete en fejl')
      } finally {
        setLoading(false)
      }
    }

    fetchMembers()
  }, [])

  const handleRoleUpdate = async (userId: string, newRole: 'USER' | 'ADMIN') => {
    try {
      const res = await fetch(`/api/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRole })
      })
      
      if (!res.ok) throw new Error('Kunne ikke opdatere rolle')
      
      const data = await res.json()
      setMembers(members.map(member => 
        member.id === userId ? { ...member, role: newRole } : member
      ))
    } catch (err) {
      console.error('Fejl ved opdatering af rolle:', err)
    }
  }
    
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Medlemmer</h1>
          <p className="text-gray-500">Administrer medlemmer og deres konti</p>
        </div>
      </div>

      {loading && <p>Indlæser medlemmer...</p>}
      {error && <p className="text-red-500">Fejl: {error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-4">Navn</th>
                  <th className="text-left pb-4">Email</th>
                  <th className="text-left pb-4">Oprettet</th>
                  <th className="text-left pb-4">Rolle</th>
                  <th className="text-right pb-4">Handlinger</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className="border-b">
                    <td className="py-4">{member.name}</td>
                    <td className="py-4">{member.email}</td>
                    <td className="py-4">{new Date(member.createdAt).toLocaleDateString('da-DK', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        member.role === 'ADMIN' 
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {member.role === 'ADMIN' ? 'Administrator' : 'Bruger'}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Button
                        variant="outline"
                        onClick={() => handleRoleUpdate(
                          member.id, 
                          member.role === 'ADMIN' ? 'USER' : 'ADMIN'
                        )}
                      >
                        {member.role === 'ADMIN' ? 'Fjern admin' : 'Gør til admin'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}