'use client'

import { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsersThisMonth: 0,
    newUsersLastMonth: 0,
    adminUsers: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/users/stats')
        const data = await res.json()
        
        // Beregn totaler
        const thisMonthTotal = data.thisMonth.reduce((a: number, b: number) => a + b, 0)
        const lastMonthTotal = data.lastMonth.reduce((a: number, b: number) => a + b, 0)
        
        // Hent total antal brugere og admins
        const usersRes = await fetch('/api/users')
        const usersData = await usersRes.json()
        const totalUsers = usersData.users.length
        const adminUsers = usersData.users.filter((user: any) => user.role === 'ADMIN').length

        setStats({
          totalUsers,
          newUsersThisMonth: thisMonthTotal,
          newUsersLastMonth: lastMonthTotal,
          adminUsers
        })
      } catch (err) {
        console.error('Fejl ved hentning af statistik:', err)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Administrator Dashboard</h1>
        <p className="text-gray-500">Oversigt over brugerstatistik</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total antal brugere</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Nye brugere denne måned</h3>
          <p className="text-3xl font-bold mt-2">{stats.newUsersThisMonth}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Nye brugere sidste måned</h3>
          <p className="text-3xl font-bold mt-2">{stats.newUsersLastMonth}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Antal administratorer</h3>
          <p className="text-3xl font-bold mt-2">{stats.adminUsers}</p>
        </Card>
      </div>
    </div>
  )
}