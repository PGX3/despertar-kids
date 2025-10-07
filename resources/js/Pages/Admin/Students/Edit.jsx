import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AdminLayout from "@/Layouts/AdminLayout";

export default function Edit({ student }) {
    const [values, setValues] = useState({
        name: student.name || "",
        class: student.class || "",
        age: student.age || "",
        guardian_name: student.guardian_name || "",
        guardian_contact: student.guardian_contact || "",
    });

    function handleChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.put(`/students/${student.id}`, values);
    }

    return (
        <AdminLayout>
            <div className="flex-1 min-h-screen bg-gradient-to-r from-blue-600 to-yellow-400 flex items-center justify-center">
                <div className="flex w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden">
                    {/* Lado azul fixo */}
                    <div className="hidden md:flex flex-col justify-center items-center w-1/3 bg-blue-600 p-8">
                        <h2 className="text-3xl font-extrabold text-white">
                            Editar Aluno
                        </h2>
                        <p className="text-sm text-white/90 mt-2 text-center">
                            Atualize as informações do aluno
                        </p>
                    </div>

                    {/* Formulário lado direito */}
                    <div className="flex-1 bg-black/90 text-white p-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nome do Aluno
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    className="w-full rounded px-3 py-2 text-black"
                                    placeholder="Digite o nome"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Turma
                                    </label>
                                    <select
                                        name="class"
                                        value={values.class}
                                        onChange={handleChange}
                                        className="w-full rounded px-3 py-2 text-black"
                                    >
                                        <option value="">
                                            Selecione a turma
                                        </option>
                                        <option value="Sementinhas">
                                            Sementinhas
                                        </option>
                                        <option value="Juniores">
                                            Juniores
                                        </option>
                                        <option value="MMs">MMs</option>
                                        <option value="Tropa">Tropa</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Idade
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={values.age}
                                        onChange={handleChange}
                                        className="w-full rounded px-3 py-2 text-black"
                                        placeholder="Idade"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nome do Responsável
                                </label>
                                <input
                                    type="text"
                                    name="guardian_name"
                                    value={values.guardian_name}
                                    onChange={handleChange}
                                    className="w-full rounded px-3 py-2 text-black"
                                    placeholder="Nome do Responsável"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Contato do Responsável
                                </label>
                                <input
                                    type="text"
                                    name="guardian_contact"
                                    value={values.guardian_contact}
                                    onChange={handleChange}
                                    className="w-full rounded px-3 py-2 text-black"
                                    placeholder="Telefone ou WhatsApp"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-yellow-400 text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
                            >
                                Atualizar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
