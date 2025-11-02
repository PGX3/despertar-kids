import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, usePage } from "@inertiajs/react";
import { CalendarClock } from "lucide-react";

export default function History() {
    const { history = [] } = usePage().props;

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                <h1 className="text-2xl font-bold text-center text-gray-900">
                    Histórico de Chamadas
                </h1>

                {history.length === 0 ? (
                    <div className="text-center text-gray-500 py-10">
                        Nenhuma chamada registrada ainda 👀
                    </div>
                ) : (
                    <div className="space-y-3">
                        {history.map((item, index) => {
                            const date = item.attendance_date
                                .substring(0, 10); // YYYY-MM-DD ✅

                            return (
                                <Link
                                    key={index}
                                    href={route("attendances.show", date)}
                                    className="flex items-center justify-between bg-white p-4 rounded-xl shadow hover:bg-gray-50 transition border"
                                >
                                    {/* Esquerda */}
                                    <div className="flex items-center gap-3">
                                        <CalendarClock className="text-blue-600" />
                                        <span className="font-medium text-gray-800">
                                            {item.formatted}
                                        </span>
                                    </div>

                                    {/* Direita */}
                                    <div className="text-right">
                                        <span className="text-xs text-gray-600">
                                            {item.total} registros
                                        </span>
                                        <span className="block text-xs text-blue-600 font-medium">
                                            Ver detalhes →
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
