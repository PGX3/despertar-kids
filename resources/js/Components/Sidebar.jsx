import React from "react";
import { Link } from "@inertiajs/react";
import { LayoutDashboard, Users, PlusCircle } from "lucide-react"; // ícones

export default function Sidebar() {
    return (
        <div className="w-60 bg-white shadow h-screen fixed top-0 left-0 flex flex-col">
            <div className="p-4 border-b">
                <h1 className="text-xl font-bold text-blue-600">
                    Despertar Kids
                </h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
                >
                    <LayoutDashboard className="text-blue-500" size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link
                    href="/students/create"
                    className="flex items-center gap-2 p-2 rounded hover:bg-blue-50"
                >
                    <PlusCircle className="text-green-500" size={20} />
                    <span>Registrar Alunos</span>
                </Link>
            </nav>
        </div>
    );
}
