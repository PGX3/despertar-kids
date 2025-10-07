import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { router } from "@inertiajs/react";

// Helper para converter Date -> YYYY-MM-DD local
const toLocalYMD = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
};

export default function Index({ schedules, users = [] }) {
    const [date, setDate] = useState(new Date());
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ type: "", activity: "", user_id: "" });

    // Data selecionada
    const selectedDate = toLocalYMD(date);

    // Eventos do dia
    const eventsOfDay = schedules.filter(
        (s) => s.schedule_date === selectedDate
    );

    // Eventos do mês
    const eventsOfMonth = schedules.filter((s) =>
        s.schedule_date.startsWith(selectedDate.slice(0, 7))
    );

    // Excluir
    const handleDelete = (id) => {
        if (confirm("Tem certeza que deseja excluir este evento?")) {
            router.delete(`/schedules/${id}`);
        }
    };

    // Editar
    const openEdit = (ev) => {
        setEditing(ev);
        setForm({
            type: ev.type,
            activity: ev.activity || "",
            user_id: ev.user_id || "",
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(`/schedules/${editing.id}`, form, {
            onSuccess: () => setEditing(null),
        });
    };

    // Criar novo (ao clicar no dia do calendário)
    const handleClickDay = (value) => {
        const clickedDate = toLocalYMD(value);
        router.visit(`/schedules/create?date=${clickedDate}`);
    };

    return (
        <AdminLayout>
            <div className="flex justify-center items-start py-10 min-h-screen bg-gray-50">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Calendário */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h1 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                            📅 Calendário
                        </h1>
                        <div className="flex justify-center">
                            <Calendar
                                onChange={setDate}
                                value={date}
                                onClickDay={handleClickDay} // 👈 aqui chama o Create
                                className="rounded-lg border shadow-sm p-3"
                            />
                        </div>
                    </div>

                    {/* Eventos do dia */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            📌 Eventos do dia{" "}
                            <span className="text-blue-600 font-medium">
                                {date.toLocaleDateString("pt-BR")}
                            </span>
                        </h2>

                        {eventsOfDay.length > 0 ? (
                            <ul className="space-y-4">
                                {eventsOfDay.map((ev) => (
                                    <li
                                        key={ev.id}
                                        className="p-4 rounded-xl border bg-gradient-to-r from-blue-50 to-blue-100 shadow hover:shadow-md transition"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold text-blue-700 text-lg">
                                                    {ev.type.toUpperCase()}
                                                </h3>
                                                {ev.activity && (
                                                    <p className="text-gray-700">
                                                        📖 {ev.activity}
                                                    </p>
                                                )}
                                                {ev.user && (
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        👨‍🏫 {ev.user.name}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEdit(ev)}
                                                    className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(ev.id)
                                                    }
                                                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 italic">
                                Nenhum evento neste dia.
                            </p>
                        )}
                    </div>

                    {/* Eventos do mês */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
                            📅 Eventos do mês
                        </h2>

                        {eventsOfMonth.length > 0 ? (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {eventsOfMonth.map((ev) => (
                                    <div
                                        key={ev.id}
                                        className="p-5 border rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 shadow hover:shadow-md transition flex flex-col justify-between"
                                    >
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                {new Date(
                                                    ev.schedule_date
                                                ).toLocaleDateString("pt-BR")}
                                            </p>
                                            <h3 className="font-bold text-blue-700 text-lg">
                                                {ev.type.toUpperCase()}
                                            </h3>
                                            {ev.activity && (
                                                <p className="text-gray-700 mt-1">
                                                    📖 {ev.activity}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex gap-2 mt-3">
                                            <button
                                                onClick={() => openEdit(ev)}
                                                className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(ev.id)
                                                }
                                                className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">
                                Nenhum evento este mês.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal edição */}
            {editing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-bold text-blue-700 mb-4">
                            Editar Evento
                        </h2>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">
                                    Tipo
                                </label>
                                <select
                                    value={form.type}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            type: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                >
                                    <option value="onibus">Ônibus</option>
                                    <option value="reforco">Reforço</option>
                                    <option value="atividade">Atividade</option>
                                    <option value="palavra">Palavra</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Descrição
                                </label>
                                <input
                                    type="text"
                                    value={form.activity}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            activity: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Professor responsável
                                </label>
                                <select
                                    value={form.user_id}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            user_id: e.target.value,
                                        })
                                    }
                                    className="w-full border rounded-lg px-3 py-2"
                                >
                                    <option value="">Selecione</option>
                                    {users.map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditing(null)}
                                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
