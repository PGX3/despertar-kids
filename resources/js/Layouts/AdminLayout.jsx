import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Home,
    Calendar,
    Users,
    GraduationCap,
    BookOpen,
    BarChart3,
    Settings,
    Bell,
    LogOut,
    Sparkles,
    ClipboardCheck,
    ChevronDown,
    ChevronRight,
    Plus,
} from "lucide-react";
import { cn } from "@/lib/utils"; // cria se não existir

export default function AdminLayout({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [openMenus, setOpenMenus] = useState({
        calendario: false,
        alunos: false,
        professores: false,
    });
    const { auth } = usePage().props;

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* SIDEBAR */}
            <aside
                className={cn(
                    "h-screen bg-primary text-white sticky top-0 transition-all duration-300 flex flex-col",
                    isCollapsed ? "w-20" : "w-64"
                )}
            >
                {/* LOGO */}
                <div className="p-6 border-b border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-md">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    {!isCollapsed && (
                        <div>
                            <h1 className="text-lg font-semibold">
                                Despertar Kids
                            </h1>
                            <p className="text-xs opacity-80">
                                Painel do Diretor
                            </p>
                        </div>
                    )}
                </div>

                {/* MENU */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {/* Dashboard */}
                    <Link
                        href={route("dashboard")}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/10 transition"
                    >
                        <Home className="w-5 h-5" />
                        {!isCollapsed && <span>Dashboard</span>}
                    </Link>

                    {/* Chamada */}
                    <Link
                        href={route("attendances.index")}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/10 transition"
                    >
                        <ClipboardCheck className="w-5 h-5" />
                        {!isCollapsed && <span>Chamada</span>}
                    </Link>

                    {/* Calendário */}
                    <div>
                        <button
                            onClick={() => toggleMenu("calendario")}
                            className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg hover:bg-white/10 transition"
                        >
                            <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5" />
                                {!isCollapsed && <span>Calendário</span>}
                            </div>
                            {!isCollapsed &&
                                (openMenus.calendario ? (
                                    <ChevronDown className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4" />
                                ))}
                        </button>
                        {openMenus.calendario && !isCollapsed && (
                            <div className="ml-10 mt-1 space-y-1 text-sm">
                                <Link
                                    href={route("events.index")}
                                    className="block px-2 py-1.5 rounded hover:bg-white/10"
                                >
                                    Ver Eventos
                                </Link>
                                <Link
                                    href={route("events.create")}
                                    className="block px-2 py-1.5 rounded hover:bg-white/10"
                                >
                                    Criar Evento
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Alunos */}
                    <div>
                        <button
                            onClick={() => toggleMenu("alunos")}
                            className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg hover:bg-white/10 transition"
                        >
                            <div className="flex items-center gap-3">
                                <GraduationCap className="w-5 h-5" />
                                {!isCollapsed && <span>Alunos</span>}
                            </div>
                            {!isCollapsed &&
                                (openMenus.alunos ? (
                                    <ChevronDown className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4" />
                                ))}
                        </button>
                        {openMenus.alunos && !isCollapsed && (
                            <div className="ml-10 mt-1 space-y-1 text-sm">
                                <Link
                                    href={route("students.create")}
                                    className="block px-2 py-1.5 rounded hover:bg-white/10"
                                >
                                    Registrar Aluno
                                </Link>
                                <Link
                                    href={route("students.index")}
                                    className="block px-2 py-1.5 rounded hover:bg-white/10"
                                >
                                    Ver Alunos
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Professores */}
                    <div>
                        <button
                            onClick={() => toggleMenu("professores")}
                            className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg hover:bg-white/10 transition"
                        >
                            <div className="flex items-center gap-3">
                                <BookOpen className="w-5 h-5" />
                                {!isCollapsed && <span>Professores</span>}
                            </div>
                            {!isCollapsed &&
                                (openMenus.professores ? (
                                    <ChevronDown className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4" />
                                ))}
                        </button>
                        {openMenus.professores && !isCollapsed && (
                            <div className="ml-10 mt-1 space-y-1 text-sm">
                                <Link
                                    href={route("teachers.create")}
                                    className="block px-2 py-1.5 rounded hover:bg-white/10"
                                >
                                    Registrar Professor
                                </Link>
                                <Link
                                    href={route("teachers.index")}
                                    className="block px-2 py-1.5 rounded hover:bg-white/10"
                                >
                                    Ver Professores
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>

                {/* BOTÃO FECHAR */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="m-4 p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
                >
                    {isCollapsed ? (
                        <ChevronRight className="w-5 h-5" />
                    ) : (
                        <ChevronLeft className="w-5 h-5" />
                    )}
                </button>
            </aside>

            {/* MAIN */}
            <div className="flex-1 flex flex-col w-full">
                <header className="h-20 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-6 md:px-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-foreground">
                            Painel do Diretor
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Bem-vindo de volta, {auth?.user?.name ?? "Usuário"}!
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 rounded-xl hover:bg-secondary transition-colors">
                            <Bell className="w-5 h-5 text-muted-foreground" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                        </button>

                        <div className="flex items-center gap-3 pl-4 border-l border-border">
                            <div className="hidden md:block text-right">
                                <p className="text-sm font-medium text-foreground">
                                    {auth?.user?.name ?? "Diretora"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Diretora
                                </p>
                            </div>
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                                    auth?.user?.name ?? "Diretora"
                                }`}
                                alt="Avatar"
                                className="w-10 h-10 rounded-full ring-2 ring-primary/10 object-cover"
                            />
                        </div>

                        <Link
                            href={route("logout")}
                            method="post"
                            as="button"
                            className="p-2 rounded-xl hover:bg-secondary transition-colors"
                        >
                            <LogOut className="w-5 h-5 text-muted-foreground" />
                        </Link>
                    </div>
                </header>

                <main className="flex-1 p-6 md:p-8 overflow-auto animate-fade-in">
                    {children}
                </main>
            </div>
        </div>
    );
}
