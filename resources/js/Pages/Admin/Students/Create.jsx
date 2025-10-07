import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import AdminLayout from "@/Layouts/AdminLayout";
import { User, Users, Phone, UserSquare2 } from "lucide-react";

export default function Create() {
    const [values, setValues] = useState({
        name: "",
        class: "",
        age: "",
        guardian_name: "",
        guardian_contact: "",
    });

    function handleChange(e) {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post("/students", values);
    }

    return (
        <AdminLayout>
            {/* fundo com gradiente */}
            <div className="flex-1 min-h-screen bg-gradient-to-br from-blue-600 via-blue-500 to-yellow-400 flex items-center justify-center p-6">
                <div className="flex w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden bg-white">
                    {/* Lado esquerdo fixo */}
                    <div className="hidden md:flex flex-col justify-center items-center w-1/3 bg-gradient-to-b from-blue-700 to-blue-500 p-10 text-white">
                        <h2 className="text-3xl font-extrabold">
                            Registrar Aluno
                        </h2>
                        <p className="text-sm text-blue-100 mt-3 text-center leading-relaxed">
                            Preencha as informações para cadastrar um novo aluno
                            no sistema
                        </p>
                        <Users size={64} className="mt-6 opacity-80" />
                    </div>

                    {/* Formulário */}
                    <div className="flex-1 bg-gray-50 p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Nome */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nome do Aluno
                                </label>
                                <div className="relative">
                                    <User
                                        className="absolute left-3 top-3 text-gray-400"
                                        size={18}
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Digite o nome do aluno"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Turma + Idade */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Turma
                                    </label>
                                    <select
                                        name="class"
                                        value={values.class}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
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
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Idade
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={values.age}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Idade"
                                    />
                                </div>
                            </div>

                            {/* Responsável */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Nome do Responsável
                                </label>
                                <div className="relative">
                                    <UserSquare2
                                        className="absolute left-3 top-3 text-gray-400"
                                        size={18}
                                    />
                                    <input
                                        type="text"
                                        name="guardian_name"
                                        value={values.guardian_name}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Digite o nome do responsável"
                                    />
                                </div>
                            </div>

                            {/* Contato */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Contato do Responsável
                                </label>
                                <div className="relative">
                                    <Phone
                                        className="absolute left-3 top-3 text-gray-400"
                                        size={18}
                                    />
                                    <input
                                        type="text"
                                        name="guardian_contact"
                                        value={values.guardian_contact}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Telefone ou WhatsApp"
                                    />
                                </div>
                            </div>

                            {/* Botão */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-6 py-3 rounded-full shadow-lg hover:scale-[1.02] hover:shadow-xl transition transform"
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
