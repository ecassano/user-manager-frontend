import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { DotsThreeVertical, PencilSimple, Trash, CaretUp, CaretDown, MagnifyingGlass } from "phosphor-react"
import { useState } from "react"

// Mock data - replace with actual API call
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Ativo",
    createdAt: "2024-03-15T10:30:00Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Usuário",
    status: "Inativo",
    createdAt: "2024-03-14T15:45:00Z"
  },
  // Add more mock users as needed
]

type SortField = 'name' | 'email' | 'role' | 'status' | 'createdAt'
type SortDirection = 'asc' | 'desc'

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const handleEdit = (userId: number) => {
    console.log("Edit user:", userId)
  }

  const handleDelete = (userId: number) => {
    console.log("Delete user:", userId)
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedAndFilteredUsers = [...filteredUsers].sort((a, b) => {
    if (sortField === 'createdAt') {
      const aDate = new Date(a[sortField])
      const bDate = new Date(b[sortField])
      return sortDirection === 'asc'
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime()
    }

    const aValue = a[sortField].toLowerCase()
    const bValue = b[sortField].toLowerCase()

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-muted-600">Usuários</h1>
        <div className="relative">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Pesquisar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 pl-9 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                { label: 'Nome', field: 'name' },
                { label: 'E-mail', field: 'email' },
                { label: 'Função', field: 'role' },
                { label: 'Status', field: 'status' },
                { label: 'Data de criação', field: 'createdAt' },
              ].map((column) => (
                <TableHead
                  key={column.field}
                  className="cursor-pointer"
                  onClick={() => handleSort(column.field as SortField)}
                >
                  <div className="flex items-center gap-2">
                    {column.label}
                    <div className="flex flex-col">
                      <CaretUp
                        className={`w-3 h-3 -mb-1 ${sortField === column.field && sortDirection === 'asc'
                          ? 'text-primary'
                          : 'text-muted-foreground/30'
                          }`}
                      />
                      <CaretDown
                        className={`w-3 h-3 ${sortField === column.field && sortDirection === 'desc'
                          ? 'text-primary'
                          : 'text-muted-foreground/30'
                          }`}
                      />
                    </div>
                  </div>
                </TableHead>
              ))}
              <TableHead className="w-[70px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredUsers.map((user) => (
              <TableRow key={user.id} className="text-muted-600 hover:bg-muted-200">
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === "Ativo"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-2 rounded-md cursor-pointer focus:outline-none hover:bg-muted-300">
                      <DotsThreeVertical className="w-5 h-5" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleEdit(user.id)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <PencilSimple className="w-4 h-4" />
                        <span>Editar</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(user.id)}
                        className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <Trash className="w-4 h-4 text-red-600" />
                        <span>Remover</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Dashboard
