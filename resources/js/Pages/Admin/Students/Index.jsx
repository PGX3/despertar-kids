import React, { useState, useMemo } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { Search, Edit, Trash2, X } from "lucide-react";

export default function Index({ students }) {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [values, setValues] = useState({
        name: "",
        class: "",
        age: "",
        guardian_name: "",
        guardian_contact: "",
    });

    // abrir modal
    function openModal(student) {
        setEditing(student);
        setValues({
            name: student.name || "",
            class: student.class || "",
            age: student.age || "",
            guardian_name: student.guardian_name || "",
            guardian_contact: student.guardian_contact || "",
        });
        setIsOpen(true);
    }

    // fechar modal
    function closeModal() {
        setIsOpen(false);
        setEditing(null);
    }

    // atualizar valores
    function handleChange(e) {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    // salvar
    function handleSubmit(e) {
        e.preventDefault();
        if (!editing) return;

        Inertia.put(`/students/${editing.id}`, values, {
            onSuccess: () => closeModal(),
        });
    }

    // filtro
    const filtered = useMemo(() => {
        if (!search) return students;
        return students.filter(
            (s) =>
                s.name.toLowerCase().includes(search.toLowerCase()) ||
                (s.guardian_name &&
                    s.guardian_name
                        .toLowerCase()
                        .includes(search.toLowerCase()))
        );
    }, [students, search]);

    // agrupar por turma
    const grouped = useMemo(() => {
        return students.reduce((acc, student) => {
            const turma = student.class || "Sem turma";
            if (!acc[turma]) acc[turma] = [];
            acc[turma].push(student);
            return acc;
        }, {});
    }, [students]);

    const turmas = ["Sementinhas", "Juniores", "MMs", "Tropa"];

    return (
        <AdminLayout>
            <div className="max-w-6xl mx-auto space-y-10">
                <h1 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
                    📚 Alunos Cadastrados
                </h1>

                {/* Filtro global */}
                <div className="relative max-w-md">
                    <Search
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Pesquisar por nome ou responsável..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Cards se tiver busca */}
                {search ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.length === 0 && (
                            <p className="text-gray-500">
                                Nenhum aluno encontrado.
                            </p>
                        )}
                        {filtered.map((student) => (
                            <div
                                key={student.id}
                                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
                            >
                                <p className="font-semibold text-lg text-gray-800">
                                    {student.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Turma: {student.class ?? "-"}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Idade: {student.age ?? "-"}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Responsável: {student.guardian_name ?? "-"}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Contato: {student.guardian_contact ?? "-"}
                                </p>

                                <div className="mt-4 flex gap-3">
                                    <button
                                        onClick={() => openModal(student)}
                                        className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100 text-sm font-medium"
                                    >
                                        <Edit size={16} /> Editar
                                    </button>
                                    <a
                                        href={`/students/${student.id}`}
                                        data-method="delete"
                                        className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-lg hover:bg-red-100 text-sm font-medium"
                                    >
                                        <Trash2 size={16} /> Excluir
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Tabelas agrupadas por turma
                    turmas.map((turma) => (
                        <div
                            key={turma}
                            className="bg-white shadow-lg rounded-xl overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 flex justify-between items-center">
                                <h2 className="text-lg font-semibold">
                                    {turma}
                                </h2>
                                <span className="text-sm opacity-90">
                                    {grouped[turma]?.length || 0} aluno(s)
                                </span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
                                            <th className="px-6 py-3">Nome</th>
                                            <th className="px-6 py-3">Idade</th>
                                            <th className="px-6 py-3">
                                                Responsável
                                            </th>
                                            <th className="px-6 py-3">
                                                Contato
                                            </th>
                                            <th className="px-6 py-3 text-center">
                                                Ações
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {grouped[turma] &&
                                        grouped[turma].length > 0 ? (
                                            grouped[turma].map(
                                                (student, idx) => (
                                                    <tr
                                                        key={student.id}
                                                        className={`${
                                                            idx % 2 === 0
                                                                ? "bg-white"
                                                                : "bg-gray-50"
                                                        } hover:bg-blue-50 transition`}
                                                    >
                                                        <td className="px-6 py-3 font-medium text-gray-800">
                                                            {student.name}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {student.age ?? "-"}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {student.guardian_name ??
                                                                "-"}
                                                        </td>
                                                        <td className="px-6 py-3">
                                                            {student.guardian_contact ??
                                                                "-"}
                                                        </td>
                                                        <td className="px-6 py-3 flex gap-2 justify-center">
                                                            <button
                                                                onClick={() =>
                                                                    openModal(
                                                                        student
                                                                    )
                                                                }
                                                                className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100 text-sm font-medium"
                                                            >
                                                                <Edit
                                                                    size={16}
                                                                />{" "}
                                                                Editar
                                                            </button>
                                                            <a
                                                                href={`/students/${student.id}`}
                                                                data-method="delete"
                                                                className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-lg hover:bg-red-100 text-sm font-medium"
                                                            >
                                                                <Trash2
                                                                    size={16}
                                                                />{" "}
                                                                Excluir
                                                            </a>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="5"
                                                    className="text-center text-gray-500 py-6 italic"
                                                >
                                                    Nenhum aluno nesta turma
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* MODAL DE EDIÇÃO */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white w-full max-w-lg rounded-lg shadow-xl p-6 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            <X size={20} />
                        </button>
                        <h2 className="text-xl font-bold mb-4 text-gray-800">
                            ✏️ Editar Aluno
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Turma
                                    </label>
                                    <select
                                        name="class"
                                        value={values.class}
                                        onChange={handleChange}
                                        className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Selecione</option>
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
                                        className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Responsável
                                </label>
                                <input
                                    type="text"
                                    name="guardian_name"
                                    value={values.guardian_name}
                                    onChange={handleChange}
                                    className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Contato
                                </label>
                                <input
                                    type="text"
                                    name="guardian_contact"
                                    value={values.guardian_contact}
                                    onChange={handleChange}
                                    className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                            >
                                Salvar alterações
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
