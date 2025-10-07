import React from "react";
import { usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Users, UserCheck } from "lucide-react";

export default function Dashboard() {
    const { students = [], teachers = [] } = usePage().props;

    return (
        <AdminLayout>
            <div className="space-y-8">
                <h1 className="text-3xl font-bold text-blue-700">
                    Painel do Diretor
                </h1>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white border-l-4 border-blue-600 shadow rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition">
                        <Users className="text-blue-600 mb-2" size={32} />
                        <p className="text-gray-500 text-sm">Alunos Ativos</p>
                        <p className="text-3xl font-bold text-blue-700">
                            {students.length}
                        </p>
                    </div>

                    <div className="bg-white border-l-4 border-yellow-400 shadow rounded-lg p-6 flex flex-col items-center hover:shadow-lg transition">
                        <UserCheck className="text-yellow-500 mb-2" size={32} />
                        <p className="text-gray-500 text-sm">
                            Professores Ativos
                        </p>
                        <p className="text-3xl font-bold text-yellow-600">
                            {teachers.length}
                        </p>
                    </div>
                </div>

                {/* Tabela de alunos */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-blue-700 mb-4">
                        Alunos Cadastrados
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-blue-50 text-blue-700 uppercase text-sm">
                                    <th className="px-4 py-2 text-left">
                                        Nome
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Turma
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Idade
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Responsável
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Contato
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center text-gray-500 py-4"
                                        >
                                            Nenhum aluno cadastrado
                                        </td>
                                    </tr>
                                ) : (
                                    students.map((s) => (
                                        <tr
                                            key={s.id}
                                            className="border-b hover:bg-blue-50 transition"
                                        >
                                            <td className="px-4 py-2">
                                                {s.name}
                                            </td>
                                            <td className="px-4 py-2">
                                                {s.class ?? "-"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {s.age ?? "-"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {s.guardian_name ?? "-"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {s.guardian_contact ?? "-"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabela de professores */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-yellow-600 mb-4">
                        Professores Cadastrados
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-yellow-50 text-yellow-600 uppercase text-sm">
                                    <th className="px-4 py-2 text-left">
                                        Nome
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Turma
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Cargo
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Contato
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="text-center text-gray-500 py-4"
                                        >
                                            Nenhum professor cadastrado
                                        </td>
                                    </tr>
                                ) : (
                                    teachers.map((t) => (
                                        <tr
                                            key={t.id}
                                            className="border-b hover:bg-yellow-50 transition"
                                        >
                                            <td className="px-4 py-2">
                                                {t.name}
                                            </td>
                                            <td className="px-4 py-2">
                                                {t.class ?? "-"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {t.role ?? "-"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {t.contact ?? "-"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
