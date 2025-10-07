import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Create({ date, teachers }) {
    const [values, setValues] = useState({
        schedule_date: date || "",
        type: "",
        description: "", // Palavra ou Evento
        teacher_ids: [],
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleTeacherChange = (e) => {
        const id = parseInt(e.target.value);
        if (e.target.checked) {
            setValues({
                ...values,
                teacher_ids: [...values.teacher_ids, id],
            });
        } else {
            setValues({
                ...values,
                teacher_ids: values.teacher_ids.filter((t) => t !== id),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post(route("schedules.store"), values);
    };

    return (
        <AdminLayout>
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Criar Evento
                </h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Data (só exibe, não edita) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Data
                        </label>
                        <input
                            type="text"
                            value={values.schedule_date}
                            readOnly
                            className="w-full rounded-lg border px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    {/* Tipo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tipo
                        </label>
                        <select
                            name="type"
                            value={values.type}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecione...</option>
                            <option value="palavra">Palavra</option>
                            <option value="onibus">Ônibus</option>
                            <option value="reforco">Reforço</option>
                            <option value="evento">Evento/Atividade</option>
                        </select>
                    </div>

                    {/* Palavra/Eventos - campo de descrição */}
                    {values.type && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                {values.type === "evento"
                                    ? "Descrição do Evento"
                                    : "Palavra / Tema"}
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                placeholder={
                                    values.type === "evento"
                                        ? "Ex: Apresentação das aulas, culto especial..."
                                        : "Ex: Carolina, Natália, João..."
                                }
                            />
                        </div>
                    )}

                    {/* Professores (multi-select) → só se não for evento */}
                    {values.type !== "evento" && values.type !== "" && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Professores responsáveis
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {teachers.map((teacher) => (
                                    <label
                                        key={teacher.id}
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="checkbox"
                                            value={teacher.id}
                                            onChange={handleTeacherChange}
                                            checked={values.teacher_ids.includes(
                                                teacher.id
                                            )}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        {teacher.name}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Botão */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Salvar Evento
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
}
