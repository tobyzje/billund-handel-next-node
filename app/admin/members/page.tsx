const members = [
    {
        id: 1,
        name: "Anders Andersen",
        email: "anders@example.com",
        createdAt: "20. marts 2024",
    },
    {
        id: 2,
        name: "Bente Bentsen",
        email: "bente@example.com",
        createdAt: "21. marts 2024",
    }
]

export default function AdminMembersPage() {
    
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Medlemmer</h1>
          <p className="text-gray-500">Administrer medlemmer og deres konti</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-4">Navn</th>
                <th className="text-left pb-4">Email</th>
                <th className="text-left pb-4">Oprettet</th>
                <th className="text-left pb-4">Status</th>
                <th className="text-right pb-4">Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {/* Her skal der mappes over medlemmer fra databasen */}
              {members.map((member) => (
                <tr key={member.id} className="border-b">
                  <td className="py-4">{member.name}</td>
                  <td className="py-4">{member.email}</td>
                  <td className="py-4">{member.createdAt}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Aktiv
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="text-gray-600 hover:text-gray-900">
                      Rediger
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