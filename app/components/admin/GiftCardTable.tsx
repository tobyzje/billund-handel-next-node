"use client"

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
import { useState } from "react"

// Dette skal erstattes med data fra din database
const dummyData = [
  {
    id: "GC-001",
    date: "2024-03-20",
    amount: 500,
    status: "pending",
    buyerName: "John Doe",
    buyerEmail: "john@example.com",
    recipientName: "Jane Doe",
    recipientEmail: "jane@example.com"
  },
  // Tilføj flere eksempler...
]

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
  const [giftCards, setGiftCards] = useState(dummyData)

  const handleSendEmail = (id: string) => {
    console.log("Send email for:", id)
  }

  const handleDownload = (id: string) => {
    console.log("Download gift card:", id)
  }

  const handleDelete = (id: string) => {
    console.log("Delete gift card:", id)
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
              <TableCell>{new Date(giftCard.date).toLocaleDateString('da-DK')}</TableCell>
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