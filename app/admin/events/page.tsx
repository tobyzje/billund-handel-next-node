const events = [
    {
        id: 1,
        title: "Sommerfest 2024",
        date: "15. juni 2024",
        location: "Byparken",
        status: "upcoming",
        participants: 45
    },
    {
        id: 2, 
        title: "Workshop: Introduktion til Yoga",
        date: "1. maj 2024",
        location: "Yogastudiet",
        status: "upcoming",
        participants: 12
    }
]

export default function AdminEventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-gray-500">Administrer kommende og tidligere events</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Opret Event
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-4">Titel</th>
                <th className="text-left pb-4">Dato</th>
                <th className="text-left pb-4">Lokation</th>
                <th className="text-left pb-4">Status</th>
                <th className="text-left pb-4">Deltagere</th>
                <th className="text-right pb-4">Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-b">
                  <td className="py-4">{event.title}</td>
                  <td className="py-4">{event.date}</td>
                  <td className="py-4">{event.location}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {event.status === 'upcoming' ? 'Kommende' : 'Afholdt'}
                    </span>
                  </td>
                  <td className="py-4">{event.participants}</td>
                  <td className="py-4 text-right space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      Rediger
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Slet
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}