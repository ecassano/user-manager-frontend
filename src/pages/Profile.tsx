import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, Envelope, Calendar, At, Lock } from "phosphor-react"

// Mock user data - replace with actual user data from your auth system
const userData = {
  name: "John Doe",
  email: "john@example.com",
  username: "@johndoe",
  createdAt: "2024-03-20T10:00:00.000Z"
}

const updateProfileSchema = z.object({
  name: z.string().min(3, { message: "O nome deve conter pelo menos 3 caracteres" }),
  currentPassword: z.string().min(6, { message: "A senha deve conter pelo menos 6 caracteres" }),
  newPassword: z.string().min(6, { message: "A senha deve conter pelo menos 6 caracteres" }),
  confirmNewPassword: z.string()
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "As senhas não coincidem",
  path: ["confirmNewPassword"]
});

const Profile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: userData.name,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    },
  })

  const onSubmit = (data: z.infer<typeof updateProfileSchema>) => {
    console.log(data)
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Perfil</h1>

      {/* User Info Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Informações da Conta</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <At className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium">{userData.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Envelope className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">E-mail</p>
              <p className="font-medium">{userData.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Data de criação</p>
              <p className="font-medium">
                {new Date(userData.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-6">Editar Perfil</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                {...register("name")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Seu nome"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha atual
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="password"
                {...register("currentPassword")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Sua senha atual"
              />
            </div>
            {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nova senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="password"
                {...register("newPassword")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Nova senha"
              />
            </div>
            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar nova senha
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="password"
                {...register("confirmNewPassword")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Confirmar nova senha"
              />
            </div>
            {errors.confirmNewPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmNewPassword.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none cursor-pointer"
          >
            Salvar alterações
          </button>
        </form>
      </div>
    </div>
  )
}

export default Profile
