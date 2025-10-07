import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AdminLayout from "@/Layouts/AdminLayout";
import { User } from "lucide-react"; // Ícone

export default function Create() {
    const [values, setValues] = useState({
        name: "",
        class: "",
        role: "",
        contact: "",
    });

    function handleChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post(route("teachers.store"), values);
    }

    return (
        <AdminLayout>
            <div className="flex-1 min-h-screen bg-gradient-to-r from-blue-600 to-yellow-400 flex items-center justify-center">
                <div className="flex w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden">
                    {/* Lado esquerdo fixo */}
                    <div className="hidden md:flex flex-col justify-center items-center w-1/3 bg-blue-600 p-8 text-white">
                        <User size={48} className="mb-4" />
                        <h2 className="text-3xl font-extrabold">
                            Registrar Professor
                        </h2>
                        <p className="text-sm text-white/90 mt-2 text-center">
                            Preencha as informações para cadastrar um novo
                            professor no sistema
                        </p>
                    </div>

                    {/* Formulário */}
                    <div className="flex-1 bg-white p-8">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nome */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome do Professor
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Digite o nome"
                                    required
                                />
                            </div>

                            {/* Turma */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Turma
                                </label>
                                <select
                                    name="class"
                                    value={values.class}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Selecione a Turma</option>
                                    <option value="Sementinhas">
                                        Sementinhas
                                    </option>
                                    <option value="Juniores">Juniores</option>
                                    <option value="As MMs">As MMs</option>
                                    <option value="Tropa">Tropa</option>
                                </select>
                            </div>

                            {/* Cargo */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cargo
                                </label>
                                <select
                                    name="role"
                                    value={values.role}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Selecione o Cargo</option>
                                    <option value="Professor">Professor</option>
                                    <option value="Auxiliar">Auxiliar</option>
                                </select>
                            </div>

                            {/* Contato */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Contato
                                </label>
                                <input
                                    type="text"
                                    name="contact"
                                    value={values.contact}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Telefone ou WhatsApp"
                                />
                            </div>

                            {/* Botão */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-6 py-3 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition"
                            >
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
