"use client"

import { useEffect } from "react"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Mail, Download, Trash } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface GiftCard {
  id: string
  createdAt: string
  amount: number
  status: string
  buyerName: string
  buyerEmail: string
  recipientName: string
  recipientEmail: string
}

type Status = "pending" | "processed" | "sent" | "cancelled"

const statusStyles: Record<Status, { label: string, className: string }> = {
  pending: { 
    label: "Afventer", 
    className: "bg-yellow-100 text-yellow-800" 
  },
  processed: { 
    label: "Behandlet", 
    className: "bg-green-100 text-green-800" 
  },
  sent: { 
    label: "Sendt", 
    className: "bg-blue-100 text-blue-800" 
  },
  cancelled: { 
    label: "Annulleret", 
    className: "bg-red-100 text-red-800" 
  }
}

export function GiftCardTable() {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchGiftCards()
  }, [])

  const fetchGiftCards = async () => {
    try {
      const response = await fetch('/api/admin/giftcards')
      if (!response.ok) throw new Error('Kunne ikke hente gavekort')
      const data = await response.json()
      setGiftCards(data)
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke hente gavekort",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendEmail = (id: string) => {
    console.log("Send email for:", id)
  }

  const handleDownload = (id: string) => {
    console.log("Download gift card:", id)
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/giftcards/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Kunne ikke slette gavekort')
      
      await fetchGiftCards() // Genindlæs data
      toast({
        title: "Success",
        description: "Gavekort blev slettet",
      })
    } catch (error) {
      toast({
        title: "Fejl",
        description: "Kunne ikke slette gavekort",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Dato</TableHead>
            <TableHead>Beløb</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Køber</TableHead>
            <TableHead>Modtager</TableHead>
            <TableHead className="text-right">Handlinger</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {giftCards.map((giftCard) => (
            <TableRow key={giftCard.id}>
              <TableCell>{giftCard.id}</TableCell>
              <TableCell>{new Date(giftCard.createdAt).toLocaleDateString('da-DK')}</TableCell>
              <TableCell>{giftCard.amount} kr</TableCell>
              <TableCell>
                <Badge className={statusStyles[giftCard.status as Status].className}>
                  {statusStyles[giftCard.status as Status].label}
                </Badge>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{giftCard.buyerName}</div>
                  <div className="text-sm text-gray-500">{giftCard.buyerEmail}</div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{giftCard.recipientName}</div>
                  <div className="text-sm text-gray-500">{giftCard.recipientEmail}</div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSendEmail(giftCard.id)}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload(giftCard.id)}>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(giftCard.id)}
                      className="text-red-600"
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Slet
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 