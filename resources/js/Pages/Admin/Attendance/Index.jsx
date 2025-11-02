import React, { useMemo, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import {
    Users,
    CheckCircle2,
    XCircle,
    CalendarDays,
    Save,
} from "lucide-react";

export default function Index({ date, groups, existingRecords }) {
    const orderedGroups = useMemo(() => {
        return Object.entries(groups).map(([groupName, students]) => ({
            name: groupName,
            students,
        }));
    }, [groups]);

    const totalStudents = Object.values(groups).flat().length;

    const [presence, setPresence] = useState(() => {
        const initial = {};
        Object.values(groups).flat().forEach((s) => {
            initial[s.id] = !!existingRecords?.[s.id];
        });
        return initial;
    });

   const form = useForm({
    date,
    records: []
});


    const presentCount = Object.values(presence).filter(Boolean).length;
    const absentCount = totalStudents - presentCount;

    const toggle = (id) => {
        setPresence((prev) => ({ ...prev, [id]: !prev[id] }));
    };

const salvar = () => {
    const records = Object.entries(presence).map(([student_id, present]) => ({
        student_id: Number(student_id),
        present
    }));

    form.setData({
        date,
        records
    });

    form.post(route("attendances.store"), {
        preserveScroll: true,
        onSuccess: () => {
            console.log("✅ Chamada salva com sucesso!");
        },
        onError: (errors) => {
            console.error("❌ Erros:", errors);
        }
    });
};


    return (
        <AdminLayout title="Chamada Geral">
            <div className="p-6 space-y-10">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <div>
                        <p className="flex items-center gap-2 text-sm font-medium text-gray-600 uppercase">
                            <CalendarDays className="w-4 h-4" />
                            {new Date(date).toLocaleDateString("pt-BR", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </p>
                        <h1 className="text-5xl font-black leading-tight mt-1">
                            Chamada <br />
                            <span className="text-blue-600">Geral</span>
                        </h1>
                    </div>

                    <button
                        onClick={salvar}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition text-lg"
                    >
                        <Save className="w-5 h-5" />
                        Salvar
                    </button>
                </div>

                {/* STATUS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Total */}
                    <div className="bg-blue-100/60 border border-blue-300/30 rounded-xl p-6 shadow-sm">
                        <Users className="w-6 h-6 text-blue-500" />
                        <h3 className="text-gray-500 uppercase text-xs mt-3">
                            Total de Estudantes
                        </h3>
                        <p className="text-5xl font-extrabold text-blue-600">
                            {totalStudents}
                        </p>
                    </div>

                    {/* Presentes */}
                    <div className="bg-green-100/60 border border-green-300/30 rounded-xl p-6 shadow-sm">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                        <h3 className="uppercase text-xs text-gray-500 mt-3">
                            Presentes
                        </h3>
                        <p className="text-5xl font-extrabold text-green-600">
                            {presentCount}
                        </p>
                        <div className="w-full h-1 bg-green-300 rounded-full mt-3">
                            <div
                                className="h-1 bg-green-600 rounded-full transition-all"
                                style={{
                                    width: `${
                                        (presentCount / totalStudents) * 100
                                    }%`,
                                }}
                            />
                        </div>
                    </div>

                    {/* Ausentes */}
                    <div className="bg-red-100/60 border border-red-300/30 rounded-xl p-6 shadow-sm">
                        <XCircle className="w-6 h-6 text-red-600" />
                        <h3 className="uppercase text-xs text-gray-500 mt-3">
                            Ausentes
                        </h3>
                        <p className="text-5xl font-extrabold text-red-600">
                            {absentCount}
                        </p>
                        <div className="w-full h-1 bg-red-300 rounded-full mt-3">
                            <div
                                className="h-1 bg-red-600 rounded-full transition-all"
                                style={{
                                    width: `${
                                        (absentCount / totalStudents) * 100
                                    }%`,
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* GRUPOS */}
                {orderedGroups.map((group, idx) => {
                    const groupTotal = group.students.length;
                    const groupPresent = group.students.filter(
                        (s) => presence[s.id]
                    ).length;
                    const percentage = Math.round(
                        (groupPresent / groupTotal) * 100
                    );

                    return (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl p-6 shadow-md border space-y-6"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold">
                                        {group.name}
                                    </h2>
                                    <p className="text-blue-700 font-bold text-lg">
                                        {groupPresent}
                                        <span className="text-gray-500">
                                            {" "}
                                            / {groupTotal}
                                        </span>{" "}
                                        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                                            {percentage}%
                                        </span>
                                    </p>
                                </div>

                                <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center text-sm font-bold text-green-700">
                                    {percentage}%
                                </div>
                            </div>

                            <div className="space-y-3">
                                {group.students.map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border"
                                    >
                                        <span className="text-gray-800 font-medium">
                                            {student.name}
                                        </span>

                                        <button
                                            onClick={() => toggle(student.id)}
                                            className={`relative inline-flex h-6 w-12 items-center rounded-full transition ${
                                                presence[student.id]
                                                    ? "bg-green-600"
                                                    : "bg-gray-400"
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-5 w-5 bg-white rounded-full transform transition ${
                                                    presence[student.id]
                                                        ? "translate-x-6"
                                                        : "translate-x-1"
                                                }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AdminLayout>
    );
}
