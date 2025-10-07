import React, { useMemo, useState } from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Index({ date, groups, existingRecords }) {
    // Junta todos os alunos numa lista única
    const orderedList = useMemo(() => {
        const list = [];
        Object.entries(groups).forEach(([groupName, students]) => {
            list.push({ type: "header", name: groupName });
            students.forEach((s) => list.push({ type: "student", ...s }));
        });
        return list;
    }, [groups]);

    // Presenças
    const initial = useMemo(() => {
        const map = {};
        orderedList.forEach((item) => {
            if (item.type === "student") {
                map[item.id] = !!existingRecords?.[item.id];
            }
        });
        return map;
    }, [orderedList, existingRecords]);

    const [presence, setPresence] = useState(initial);
    const form = useForm({ date, records: [] });

    const toggle = (id) =>
        setPresence((prev) => ({ ...prev, [id]: !prev[id] }));

    const salvar = () => {
        const records = Object.entries(presence).map(
            ([student_id, present]) => ({
                student_id: Number(student_id),
                present: !!present,
            })
        );

        form.transform(() => ({ date, records })).post(
            route("attendances.store"),
            { preserveScroll: true }
        );
    };

    return (
        <AdminLayout>
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                        📋 Chamada Geral
                    </h1>
                    <span className="text-sm text-gray-600">Data: {date}</span>
                </div>

                <div className="bg-white rounded-lg shadow divide-y">
                    {orderedList.map((item, idx) => {
                        if (item.type === "header") {
                            return (
                                <div
                                    key={`h-${idx}`}
                                    className="bg-gray-50 px-4 py-2 font-semibold text-gray-700"
                                >
                                    {item.name}
                                </div>
                            );
                        }

                        const checked = !!presence[item.id];
                        return (
                            <div
                                key={item.id}
                                className="flex items-center justify-between px-4 py-3"
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`w-2 h-2 rounded-full ${
                                            checked
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }`}
                                    />
                                    <span className="text-gray-800">
                                        {item.name}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => toggle(item.id)}
                                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${
                                        checked ? "bg-green-500" : "bg-red-500"
                                    }`}
                                    aria-pressed={checked}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 bg-white rounded-full transform transition ${
                                            checked
                                                ? "translate-x-6"
                                                : "translate-x-1"
                                        }`}
                                    />
                                </button>
                            </div>
                        );
                    })}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={salvar}
                        disabled={form.processing}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 disabled:opacity-60"
                    >
                        {form.processing ? "Salvando..." : "Salvar chamada"}
                    </button>

                    {form.recentlySuccessful && (
                        <span className="text-green-600 font-medium self-center">
                            ✅ Chamada salva!
                        </span>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
