import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Envelope, Lock, User } from "phosphor-react";
import logo from "../assets/logo-conectar.svg"
import { Link, useNavigate } from "react-router-dom"
import createUser from "../api/auth/register";

const formSchema = z.object({
  name: z.string().min(3, { message: "O nome deve conter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "O e-mail informado é inválido" }),
  password: z.string().min(6, { message: "A senha deve conter pelo menos 6 caracteres" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
});

const Register = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await createUser({
      name: data.name,
      email: data.email,
      password: data.password,
    })

    if (response.status === 201) {
      navigate("/");
    }
  }

  return (
    <div className="w-96 mx-auto flex flex-col items-center justify-center h-screen">
      <img src={logo} alt="logo" className="w-full mb-10" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              {...register("name")}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Nome completo"
            />
          </div>
          {errors.name ? <p className="text-red-500 text-sm h-1.5 mt-1">{errors?.name?.message}</p> : <p className="h-1.5 mt-1"></p>}
        </div>

        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Envelope className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="email"
              {...register("email")}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="E-mail"
            />
          </div>
          {errors.email ? <p className="text-red-500 text-sm h-1.5 mt-1">{errors?.email?.message}</p> : <p className="h-1.5 mt-1"></p>}
        </div>

        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="password"
              {...register("password")}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Senha"
            />
          </div>
          {errors.password ? <p className="text-red-500 text-sm h-1.5 mt-1">{errors?.password?.message}</p> : <p className="h-1.5 mt-1"></p>}
        </div>

        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Confirmar senha"
            />
          </div>
          {errors.confirmPassword ? <p className="text-red-500 text-sm h-1.5 mt-1">{errors?.confirmPassword?.message}</p> : <p className="h-1.5 mt-1"></p>}
        </div>

        <button
          type="submit"
          className="w-full bg-primary-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none cursor-pointer"
        >
          Cadastrar
        </button>
        <p className="text-sm text-gray-500 text-center">
          Já tem uma conta? <Link to="/" className="text-primary-500">Faça login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
