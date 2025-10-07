import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Entrar - Despertar Kids" />

            <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400">
                {/* 🔹 Lado esquerdo - Logo e texto */}
                <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-blue-700 text-white p-10 relative overflow-hidden">
                    <div className="absolute w-60 h-60 bg-yellow-400/30 rounded-3xl rotate-45 -top-10 -left-10"></div>
                    <div className="absolute w-40 h-40 bg-white/20 rounded-full bottom-10 right-10"></div>

                    <img
                        src="/logo.jpg"
                        alt="Despertar Kids Logo"
                        className="w-24 mb-6 rounded-full border-4 border-white shadow-lg object-cover z-10"
                    />

                    <h1 className="text-4xl font-extrabold z-10">
                        Despertar Kids
                    </h1>
                    <p className="text-blue-100 mt-3 text-center z-10">
                        Sistema de gerenciamento da Igreja Despertar
                        <br />
                        Acesse sua conta para continuar.
                    </p>
                </div>

                {/* 🔹 Lado direito - Formulário */}
                <div className="flex-1 flex justify-center items-center bg-white p-8 md:p-12">
                    <form
                        onSubmit={submit}
                        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6"
                    >
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <div className="text-center mb-4">
                            <h2 className="text-3xl font-bold text-blue-700">
                                Bem-vindo 👋
                            </h2>
                            <p className="text-gray-500 mt-1">
                                Faça login na sua conta
                            </p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Digite seu email"
                                required
                            />
                            {errors.email && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Senha */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Senha
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Digite sua senha"
                                required
                            />
                            {errors.password && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Lembrar-me */}
                        <div className="flex items-center justify-between text-sm mt-2">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                Lembrar-me
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route("password.request")}
                                    className="text-blue-600 hover:underline"
                                >
                                    Esqueceu a senha?
                                </Link>
                            )}
                        </div>

                        {/* Botão de login */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition transform hover:-translate-y-1 disabled:opacity-70"
                        >
                            {processing ? "Entrando..." : "Entrar"}
                        </button>

                        {/* Registrar */}
                        <p className="text-center text-gray-600 text-sm mt-4">
                            Não tem conta?{" "}
                            <Link
                                href={route("register")}
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Registrar agora
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
