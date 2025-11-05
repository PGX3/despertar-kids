import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { CalendarDays, Users, Type, FileText } from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/pt-br";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("pt-br");

export default function Create({ date, teachers }) {
  const [values, setValues] = useState({
    schedule_date: date || dayjs().format("YYYY-MM-DD"),
    type: "",
    title: "",
    teacher_ids: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeacherChange = (e) => {
    const id = parseInt(e.target.value);
    setValues((prev) => ({
      ...prev,
      teacher_ids: e.target.checked
        ? [...prev.teacher_ids, id]
        : prev.teacher_ids.filter((t) => t !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      schedule_date: dayjs(values.schedule_date)
        .tz("America/Sao_Paulo")
        .hour(12)
        .minute(0)
        .second(0)
        .format("YYYY-MM-DD HH:mm:ss"),
      type: values.type,
      activity: values.title,
      teacher_ids: values.teacher_ids,
    };

    router.post(route("schedules.store"), payload, {
      onSuccess: () => router.visit(route("schedules.index")),
    });
  };

  return (
    <AdminLayout>
      <div className="min-h-[90vh] flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10 border border-gray-100 animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-blue-700 flex justify-center items-center gap-2">
              <span className="text-4xl">＋</span> Novo Evento
            </h1>
            <p className="text-gray-500 mt-2">
              Preencha os campos abaixo para adicionar um evento ao calendário.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Nome do Evento */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                <FileText className="w-4 h-4 text-blue-500" />
                Nome do Evento
              </label>
              <input
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Ex: Reunião de Pais, Festa Junina..."
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                <Type className="w-4 h-4 text-blue-500" />
                Tipo de Evento
              </label>
              <select
                name="type"
                value={values.type}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="">Selecione...</option>
                <option value="palavra">Palavra</option>
                <option value="onibus">Ônibus</option>
                <option value="reforco">Reforço</option>
                <option value="evento">Evento / Atividade</option>
              </select>
            </div>

            {/* Data */}
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-medium mb-1">
                <CalendarDays className="w-4 h-4 text-blue-500" />
                Data do Evento
              </label>
              <input
                type="date"
                name="schedule_date"
                value={dayjs(values.schedule_date).format("YYYY-MM-DD")}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Professores */}
            {values.type !== "evento" && values.type !== "" && (
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  Professores Responsáveis
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {teachers.map((teacher) => (
                    <label
                      key={teacher.id}
                      className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition"
                    >
                      <input
                        type="checkbox"
                        value={teacher.id}
                        onChange={handleTeacherChange}
                        checked={values.teacher_ids.includes(teacher.id)}
                        className="text-blue-600 focus:ring-blue-500 rounded"
                      />
                      {teacher.name}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex justify-end mt-10 gap-4">
              <button
                type="button"
                onClick={() => router.visit(route("schedules.index"))}
                className="px-6 py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 shadow transition"
              >
                Salvar Evento
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
