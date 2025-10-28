import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight, Users, Calendar, Shield, CheckCircle } from "lucide-react";

export default function Welcome() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* 🔹 Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-blue-900/80 to-transparent backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <img
                            src="/logo.jpg"
                            alt="Logo Despertar Kids"
                            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                        />
                        <span className="text-lg md:text-xl font-bold text-white">
                            Despertar Kids
                        </span>
                    </div>

                    {/* Botões */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={route("login")}
                            className="px-5 py-2 rounded-full border border-white text-white hover:bg-white/10 transition"
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
                </div>
            </nav>

            {/* 🔹 Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-yellow-400" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />

                <div className="relative z-10 text-center px-6">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
                        Bem-vindo ao <br /> Despertar Kids
                    </h1>
                    <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
                        A plataforma completa para gerenciar alunos, professores
                        e eventos da sua igreja. Simples, moderna e eficiente.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href={route("register")}
                            className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-full shadow-lg hover:bg-yellow-300 transition-all hover:scale-105 flex items-center justify-center"
                        >
                            Começar Agora
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                        <a
                            href="#sobre"
                            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all"
                        >
                            Saiba Mais
                        </a>
                    </div>
                </div>
            </section>

            {/* 🔹 Features */}
            <section id="sobre" className="py-20 px-6 md:px-10 bg-background">
                <div className="max-w-6xl mx-auto space-y-24">
                    {/* Feature 1 */}
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                                Gestão de Alunos Completa
                            </h2>
                            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                                Controle matrículas, frequência e dados dos seus
                                alunos em um só lugar. Simples, rápido e
                                organizado.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Cadastro completo de alunos",
                                    "Controle de frequência",
                                    "Relatórios detalhados",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-yellow-400" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 p-12 flex items-center justify-center">
                            <Users className="w-28 h-28 text-white/40" />
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                                Agenda de Eventos
                            </h2>
                            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                                Organize todos os eventos e atividades com
                                facilidade e eficiência.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Calendário integrado",
                                    "Notificações automáticas",
                                    "Gestão de participantes",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-yellow-400" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="order-1 md:order-2 aspect-video rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 p-12 flex items-center justify-center">
                            <Calendar className="w-28 h-28 text-white/40" />
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                                Seguro e Confiável
                            </h2>
                            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                                Seus dados estão protegidos com a melhor
                                tecnologia de segurança disponível.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Criptografia de dados",
                                    "Backup automático",
                                    "Acesso controlado",
                                ].map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-yellow-400" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-700 to-yellow-500 p-12 flex items-center justify-center">
                            <Shield className="w-28 h-28 text-white/40" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 🔹 CTA Final */}
            <section className="py-20 px-6 md:px-10 bg-gradient-to-br from-blue-700 to-yellow-400 text-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    Pronto para começar?
                </h2>
                <p className="text-lg md:text-xl text-white/90 mb-8">
                    Junte-se às igrejas que já usam o Despertar Kids
                </p>
                <Link
                    href={route("register")}
                    className="px-8 py-4 bg-white text-blue-700 font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center justify-center"
                >
                    Registrar Gratuitamente
                    <ArrowRight className="ml-2 w-6 h-6" />
                </Link>
            </section>

            {/* 🔹 Rodapé */}
            <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border bg-background">
                © {new Date().getFullYear()} Igreja Despertar — Todos os
                direitos reservados
            </footer>
        </div>
    );
}
