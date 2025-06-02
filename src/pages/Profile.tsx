import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, Envelope, Calendar, At, Lock } from "phosphor-react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import { setError, setUser } from "../store/userSlice"
import { useEffect } from "react"
import getProfile from "../api/user/getProfile";
import updateProfile from "../api/user/updateProfile"

const updateProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "E-mail inválido" }).optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmNewPassword: z.string().optional()
}).refine((data) => {
  const isAnyFieldChanged = data.name || data.email || data.newPassword;
  return isAnyFieldChanged;
}, {
  message: "Pelo menos um campo deve ser alterado",
  path: ["name"]
});

const Profile = () => {
  const dispatch = useDispatch();
  const { auth, user } = useSelector((state: RootState) => state);


  const { register, handleSubmit, formState: { errors }, reset } = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.user?.name,
      email: user.user?.email,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    },
  })

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.user) return;

      const profile = await getProfile(auth.user.id);

      if (profile.error) {
        dispatch(setError(profile.error));
        return;
      }

      dispatch(setUser(profile));
      reset({
        name: profile.name,
        email: profile.email,
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      })
    }

    fetchProfile();
  }, [dispatch, auth.user, reset]);

  const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
    if (!user.user?.id) return

    if (data.newPassword) {
      if (data.newPassword !== data.confirmNewPassword) {
        dispatch(setError("As senhas não coincidem"));
        return;
      }

      if (!data.currentPassword) {
        dispatch(setError("A senha atual é necessária para alterar a senha"));
        return;
      }

      if (data.currentPassword !== user.user.password) {
        dispatch(setError("Senha atual incorreta"));
        return;
      }
    }

    const response = await updateProfile(user.user.id, {
      name: data.name || user.user.name,
      email: data.email || user.user.email,
      password: data.newPassword || user.user.password,
      updatedAt: new Date().toISOString()
    })

    console.log(user.user)

    if (response.status === 201) {
      dispatch(setUser({
        ...user.user,
        name: data.name,
        email: data.email,
        updatedAt: new Date().toISOString()
      }))
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8">Perfil</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-6">Informações da Conta</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <At className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Nome</p>
              <p className="font-medium">{user.user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Envelope className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">E-mail</p>
              <p className="font-medium">{user.user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Data de criação</p>
              <p className="font-medium">
                {user.user?.createdAt ? new Date(user.user.createdAt).toLocaleDateString('pt-BR') : '-'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-500">Data de atualização</p>
              <p className="font-medium">{user.user?.updatedAt ? new Date(user.user.updatedAt).toLocaleDateString('pt-BR') : '-'}</p>
            </div>
          </div>
        </div>
      </div>

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
              E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Envelope className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="email"
                {...register("email")}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Seu e-mail"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
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
