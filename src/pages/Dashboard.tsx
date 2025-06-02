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
import { useState, useEffect } from "react"
import getAllUsers from "../api/user/getAllUsers"
import { useDispatch } from "react-redux"
import { setError } from "../store/userSlice"
import type { User } from '../types/user'
import { statusMap, UserStatus } from '../utils/statusMap'
import { roleMap } from '../utils/readableRole'
import deleteUser from "../api/user/deleteUser"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import updateUser from "../api/user/updateUser"

type SortField = 'name' | 'email' | 'role' | 'status' | 'createdAt'
type SortDirection = 'asc' | 'desc'

const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "E-mail inválido" }).optional(),
  role: z.enum(["admin", "user"]).optional(),
  status: z.enum(["active", "inactive"]).optional(),
}).refine((data) => {
  const isAnyFieldChanged = data.name || data.email || data.role || data.status;
  return isAnyFieldChanged;
}, {
  message: "Pelo menos um campo deve ser alterado",
  path: ["name"]
});

const Dashboard = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema)
  })

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers()
        setUsers(data.body)
      } catch (error) {
        console.log(error)
        dispatch(setError("Erro ao carregar usuários"))
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [dispatch])

  const handleEdit = (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (!user) return

    setSelectedUser(user)
    reset({
      name: user.name,
      email: user.email,
      role: user.role as "admin" | "user",
      status: user.status as "active" | "inactive"
    })
  }

  const handleDelete = async (userId: string) => {
    const currentUser = users.find(user => user.id === userId)

    if (currentUser?.role === 'admin') {
      dispatch(setError("Não é possível deletar um administrador"))
      return
    }

    try {
      const response = await deleteUser(userId)

      if (response.status === 204) {
        setUsers(users.filter(user => user.id !== userId))
      } else {
        dispatch(setError("Erro ao deletar usuário"))
      }
    } catch (error) {
      console.log(error)
      dispatch(setError("Erro ao deletar usuário"))
    }
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

  const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    if (!selectedUser?.id) return

    try {
      const response = await updateUser(selectedUser.id, {
        name: data.name || selectedUser.name,
        email: data.email || selectedUser.email,
        role: data.role || selectedUser.role,
        status: data.status || selectedUser.status
      })

      if (response.status === 201) {
        const data = await getAllUsers()
        setUsers(data.body)
        setSelectedUser(null)
      }
    } catch (error) {
      console.log(error)
      dispatch(setError("Erro ao atualizar usuário"))
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-96">Carregando...</div>
  }

  return (
    <>
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
              className="px-4 py-2 pl-9 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                            ? 'text-primary-500'
                            : 'text-muted-foreground/30'
                            }`}
                        />
                        <CaretDown
                          className={`w-3 h-3 ${sortField === column.field && sortDirection === 'desc'
                            ? 'text-primary-500'
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
                  <TableCell>{roleMap[user.role]}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === UserStatus.ACTIVE
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {statusMap[user.status as UserStatus]}
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
                          <Trash className="w-4 h-4" />
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

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              <input
                type="text"
                {...register("name")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Nome do usuário"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="E-mail do usuário"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Função</label>
              <Select onValueChange={(value) => setValue("role", value as "admin" | "user")} defaultValue={selectedUser?.role}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="user">Usuário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <Select onValueChange={(value) => setValue("status", value as "active" | "inactive")} defaultValue={selectedUser?.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none cursor-pointer"
            >
              Salvar alterações
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Dashboard
