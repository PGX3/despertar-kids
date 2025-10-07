import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Home,
    Users,
    ChevronDown,
    ClipboardCheck,
    GraduationCap,
    BookOpen,
    CalendarDays,
} from "lucide-react";

export default function AdminLayout({ children }) {
    const { url } = usePage();
    const [openAlunos, setOpenAlunos] = useState(false);
    const [openProf, setOpenProf] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg">
                <h1 className="text-2xl font-bold mb-6 px-4 pt-6">
                    Despertar Kids
                </h1>
                <nav className="space-y-2 px-2">
                    {/* Dashboard */}
                    <Link
                        href={route("dashboard")}
                        className={`flex items-center gap-2 p-3 rounded-lg transition ${
                            url === "/dashboard"
                                ? "bg-blue-700"
                                : "hover:bg-blue-700"
                        }`}
                    >
                        <Home size={18} /> Dashboard
                    </Link>

                    {/* Chamada */}
                    <Link
                        href={route("attendances.index")}
                        className={`flex items-center gap-2 p-3 rounded-lg transition ${
                            url.startsWith("/attendances")
                                ? "bg-blue-700"
                                : "hover:bg-blue-700"
                        }`}
                    >
                        <ClipboardCheck size={18} /> Chamada
                    </Link>

                    {/* Calendário */}
                    <button
                        onClick={() => setOpenCalendar(!openCalendar)}
                        className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        <span className="flex items-center gap-2">
                            <CalendarDays size={18} /> Calendário
                        </span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform ${
                                openCalendar ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                    {openCalendar && (
                        <div className="pl-6 space-y-1">
                            <Link
                                href={route("schedules.index")}
                                className={`block p-2 rounded hover:bg-blue-700 ${
                                    url === "/schedules" ? "bg-blue-700" : ""
                                }`}
                            >
                                Ver Eventos
                            </Link>
                            <Link
                                href={route("schedules.create")}
                                className={`block p-2 rounded hover:bg-blue-700 ${
                                    url === "/schedules/create"
                                        ? "bg-blue-700"
                                        : ""
                                }`}
                            >
                                Criar Evento
                            </Link>
                        </div>
                    )}

                    {/* Alunos */}
                    <button
                        onClick={() => setOpenAlunos(!openAlunos)}
                        className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        <span className="flex items-center gap-2">
                            <GraduationCap size={18} /> Alunos
                        </span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform ${
                                openAlunos ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                    {openAlunos && (
                        <div className="pl-6 space-y-1">
                            <Link
                                href={route("students.create")}
                                className={`block p-2 rounded hover:bg-blue-700 ${
                                    url === "/students/create"
                                        ? "bg-blue-700"
                                        : ""
                                }`}
                            >
                                Registrar Aluno
                            </Link>
                            <Link
                                href={route("students.index")}
                                className={`block p-2 rounded hover:bg-blue-700 ${
                                    url === "/students" ? "bg-blue-700" : ""
                                }`}
                            >
                                Ver Alunos
                            </Link>
                        </div>
                    )}

                    {/* Professores */}
                    <button
                        onClick={() => setOpenProf(!openProf)}
                        className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        <span className="flex items-center gap-2">
                            <BookOpen size={18} /> Professores
                        </span>
                        <ChevronDown
                            size={16}
                            className={`transition-transform ${
                                openProf ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                    {openProf && (
                        <div className="pl-6 space-y-1">
                            <Link
                                href={route("teachers.create")}
                                className={`block p-2 rounded hover:bg-blue-700 ${
                                    url === "/teachers/create"
                                        ? "bg-blue-700"
                                        : ""
                                }`}
                            >
                                Registrar Professor
                            </Link>
                            <Link
                                href={route("teachers.index")}
                                className={`block p-2 rounded hover:bg-blue-700 ${
                                    url === "/teachers" ? "bg-blue-700" : ""
                                }`}
                            >
                                Ver Professores
                            </Link>
                        </div>
                    )}
                </nav>
            </div>

            {/* Conteúdo */}
            <div className="flex-1 p-0">{children}</div>
        </div>
    );
}
