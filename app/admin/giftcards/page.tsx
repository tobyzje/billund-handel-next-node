import { GiftCardTable } from "../../components/admin/GiftCardTable"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function AdminGiftCardsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gavekort</h1>
          <p className="text-gray-500">Administrer gavekort bestillinger</p>
        </div>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Opret Gavekort
        </Button>
      </div>

      <GiftCardTable />
    </div>
  )
} 