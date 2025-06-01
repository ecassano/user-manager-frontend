import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Envelope, Lock } from "phosphor-react";
import logo from "../assets/logo-conectar.svg"
import { Link, useNavigate } from "react-router-dom"
import login from "../api/auth/login";
import me from "../api/auth/me";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";

const formSchema = z.object({
  email: z.string().email({ message: "O e-mail informado é inválido" }),
  password: z.string().min(6, { message: "A senha deve conter pelo menos 6 caracteres" }),
});


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await me();

        if (!res.authenticated) throw new Error()

        const user = res.user
        console.log('Usuário autenticado:', user)
      } catch (err) {
        console.warn('Token expirado ou inválido. Redirecionando...', err)
        navigate('/')
      }
    }

    checkAuth()

    const interval = setInterval(checkAuth, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [navigate])


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await login(data.email, data.password);

      const { authenticated, user } = await me();

      console.log(authenticated, user);

      if (!authenticated) {
        setErrorMessage("Usuário não autenticado");
        return;
      }

      dispatch(setCredentials({ authenticated, user }));

      if (user?.role === "admin") {
        navigate("/admin/users");
      } else {
        navigate("/profile");
      }


    } catch {
      setErrorMessage("E-mail ou senha inválidos");
    }
  }

  return (
    <div className="w-96 mx-auto flex flex-col items-center justify-center h-screen">
      <img src={logo} alt="logo" className="w-full mb-10" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Envelope className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="email"
              {...register("email")}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Email address"
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
              placeholder="Password"
            />
          </div>
          {errors.password ? <p className="text-red-500 text-sm h-1.5 mt-1">{errors?.password?.message}</p> : <p className="h-1.5 mt-1"></p>}
        </div>
        {errorMessage && <p className="text-red-500 text-sm h-1.5 mt-1">{errorMessage}</p>}
        <button
          type="submit"
          className="w-full bg-primary-500 text-white mt-4 py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none cursor-pointer"
        >
          Login
        </button>
        <p className="text-sm text-gray-500 text-center">
          Não tem uma conta? <Link to="/register" className="text-primary-500">Registre-se</Link>
        </p>
      </form>
    </div>
  )
}

export default Login