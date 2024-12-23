"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { format } from "date-fns"
import { da } from "date-fns/locale"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageIcon, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  title: z.string().min(1, "Titel er påkrævet"),
  description: z.string().min(1, "Beskrivelse er påkrævet"),
  date: z.string().min(1, "Dato er påkrævet"),
  time: z.string().min(1, "Tidspunkt er påkrævet"),
  location: z.string().min(1, "Lokation er påkrævet"),
  maxSeats: z.string().optional(),
  price: z.string().optional(),
  cityName: z.string().optional(),
  image: z.any().optional()
})

interface EventFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  defaultValues?: z.infer<typeof formSchema>
  submitButtonText?: string
  showImageUpload?: boolean
}

export function EventForm({ 
  onSubmit, 
  onCancel, 
  defaultValues,
  submitButtonText = "Opret Event",
  showImageUpload = false
}: EventFormProps) {
  const { toast } = useToast()
  const [showPreview, setShowPreview] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      maxSeats: "",
      price: "",
      cityName: ""
    }
  })

  const formData = form.watch()

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    setShowPreview(true)
  }

  const handleConfirm = () => {
    onSubmit(formData)
    setShowPreview(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Fejl",
          description: "Kun billedfiler er tilladt",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {showImageUpload && (
            <FormField
              control={form.control}
              name="image"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Billede</FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {imagePreview ? (
                          <div className="relative">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="max-h-40 mx-auto rounded"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6 bg-white rounded-full"
                              onClick={(e) => {
                                e.preventDefault()
                                setImagePreview(null)
                                onChange(undefined)
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="py-4">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-500">
                              Klik for at vælge et billede
                            </p>
                          </div>
                        )}
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            handleImageChange(e)
                            onChange(e.target.files)
                          }}
                          {...field}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titel</FormLabel>
                <FormControl>
                  <Input placeholder="Indtast titel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beskrivelse</FormLabel>
                <FormControl>
                  <Textarea placeholder="Indtast beskrivelse" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dato</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tidspunkt</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lokation</FormLabel>
                <FormControl>
                  <Input placeholder="Indtast lokation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>By</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Vælg by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="billund">Billund</SelectItem>
                      <SelectItem value="grindsted">Grindsted</SelectItem>
                      <SelectItem value="hejnsvig">Hejnsvig</SelectItem>
                      <SelectItem value="filskov">Filskov</SelectItem>
                      <SelectItem value="stenderup-kroager">Stenderup Kroager</SelectItem>
                      <SelectItem value="sdr-omme">Sdr. Omme</SelectItem>
                      <SelectItem value="vorbasse">Vorbasse</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="maxSeats"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max antal pladser</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Valgfrit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pris (kr)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Valgfrit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuller
            </Button>
            <Button type="submit">
              {submitButtonText || "Opret Event"}
            </Button>
          </div>
        </form>
      </Form>

      <AlertDialog open={showPreview} onOpenChange={setShowPreview}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bekræft oprettelse af event</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <span className="font-semibold">Titel:</span> {formData.title}
            </div>
            <div>
              <span className="font-semibold">Beskrivelse:</span> {formData.description}
            </div>
            <div>
              <span className="font-semibold">Dato:</span> {formData.date && format(new Date(formData.date), 'dd. MMMM yyyy', { locale: da })}
            </div>
            <div>
              <span className="font-semibold">Tidspunkt:</span> {formData.time}
            </div>
            <div>
              <span className="font-semibold">Lokation:</span> {formData.location}
            </div>
            {formData.cityName && (
              <div>
                <span className="font-semibold">By:</span> {formData.cityName}
              </div>
            )}
            {formData.maxSeats && (
              <div>
                <span className="font-semibold">Max antal pladser:</span> {formData.maxSeats}
              </div>
            )}
            {formData.price && (
              <div>
                <span className="font-semibold">Pris:</span> {formData.price} kr
              </div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Gå tilbage</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Opret Event</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
