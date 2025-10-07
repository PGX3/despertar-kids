import React from "react";
import { usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Index() {
    const { teachers } = usePage().props;

    function handleDelete(id) {
        if (confirm("Tem certeza que deseja excluir este professor?")) {
            Inertia.delete(route("teachers.destroy", id));
        }
    }

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Professores Cadastrados
                </h1>
                <div className="overflow-x-auto bg-white shadow rounded-lg p-4">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                                <th className="px-4 py-2 text-left">Nome</th>
                                <th className="px-4 py-2 text-left">Turma</th>
                                <th className="px-4 py-2 text-left">Cargo</th>
                                <th className="px-4 py-2 text-left">Contato</th>
                                <th className="px-4 py-2 text-left">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-4 text-gray-500"
                                    >
                                        Nenhum professor cadastrado
                                    </td>
                                </tr>
                            ) : (
                                teachers.map((t) => (
                                    <tr
                                        key={t.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2">{t.name}</td>
                                        <td className="px-4 py-2">
                                            {t.class ?? "-"}
                                        </td>
                                        <td className="px-4 py-2">
                                            {t.role ?? "-"}
                                        </td>
                                        <td className="px-4 py-2">
                                            {t.contact ?? "-"}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() =>
                                                    handleDelete(t.id)
                                                }
                                                className="text-red-500 hover:underline"
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
