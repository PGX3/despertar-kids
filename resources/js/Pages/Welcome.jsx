import React from "react";
import { Link } from "@inertiajs/react";

export default function Welcome() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 text-gray-900 relative overflow-hidden">
            {/* 🔹 Navbar fixa */}
            <header className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-4 bg-blue-600/80 backdrop-blur-md text-white shadow-md z-50">
                {/* Logo e nome */}
                <div className="flex items-center gap-3">
                    <img
                        src="/logo.jpg"
                        alt="Logo Despertar Kids"
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md object-cover"
                    />
                    <span className="text-lg md:text-xl font-bold tracking-tight">
                        Despertar Kids
                    </span>
                </div>

                {/* Botões de ação */}
                <div className="flex gap-3">
                    <Link
                        href={route("login")}
                        className="px-5 py-2 rounded-full border border-white text-white bg-white/10 hover:bg-white/20 transition font-medium"
                    >
                        Entrar
                    </Link>
                    <Link
                        href={route("register")}
                        className="px-5 py-2 rounded-full bg-yellow-400 text-blue-900 font-semibold hover:bg-yellow-300 transition"
                    >
                        Registrar
                    </Link>
                </div>
            </header>

            {/* 🔹 Conteúdo central */}
            <main className="flex-1 flex flex-col items-center justify-center text-center px-6 mt-28 md:mt-32 relative">
                {/* Formas decorativas animadas */}
                <div className="absolute -top-16 -left-10 w-40 h-40 bg-white/15 rounded-2xl rotate-45 animate-float-slow"></div>
                <div className="absolute top-32 right-10 w-28 h-28 bg-white/15 rounded-3xl rotate-12 animate-float-slower"></div>
                <div className="absolute bottom-24 left-16 w-28 h-28 bg-white/15 rounded-xl -rotate-12 animate-float-slow"></div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg leading-tight">
                    Bem-vindo{" "}
                    <span className="inline-block animate-wiggle">👋</span>
                </h1>

                <p className="mt-6 text-white/90 text-base md:text-xl max-w-2xl leading-relaxed">
                    Gerencie alunos, professores e eventos do{" "}
                    <span className="font-semibold text-white">
                        Despertar Kids
                    </span>{" "}
                    de maneira simples, bonita e moderna.
                </p>

                <Link
                    href={route("register")}
                    className="mt-10 px-8 py-3 bg-white text-blue-700 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-transform duration-300"
                >
                    Começar Agora
                </Link>
            </main>

            {/* 🔹 Rodapé */}
            <footer className="py-5 text-center text-white/80 text-sm md:text-base backdrop-blur-sm mt-8">
                © {new Date().getFullYear()} Igreja Despertar — Todos os
                direitos reservados
            </footer>

            {/* 🔹 Animações CSS */}
            <style>
                {`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(45deg); }
                    50% { transform: translateY(-10px) rotate(45deg); }
                }
                @keyframes float-slower {
                    0%, 100% { transform: translateY(0) rotate(12deg); }
                    50% { transform: translateY(-15px) rotate(12deg); }
                }
                @keyframes wiggle {
                    0%, 100% { transform: rotate(0deg); }
                    25% { transform: rotate(15deg); }
                    75% { transform: rotate(-10deg); }
                }
                .animate-float-slow { animation: float 6s ease-in-out infinite; }
                .animate-float-slower { animation: float-slower 8s ease-in-out infinite; }
                .animate-wiggle { animation: wiggle 2s ease-in-out infinite; display:inline-block; }
                `}
            </style>
        </div>
    );
}
