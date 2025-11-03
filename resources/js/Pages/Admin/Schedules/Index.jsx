import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Calendar from "react-calendar";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export default function ScheduleIndex({ schedules = [] }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filtra os eventos do dia selecionado
  const eventsOfDay = schedules.filter(
    (event) =>
      dayjs(event.schedule_date).format("YYYY-MM-DD") ===
      dayjs(selectedDate).format("YYYY-MM-DD")
  );

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-blue-600">📅</span> Calendário de Eventos
            </h1>

            <button
              onClick={() => router.visit(route("schedules.create"))}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition"
            >
              + Novo Evento
            </button>
          </div>

          {/* Grade principal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calendário */}
            <div className="bg-white shadow rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Selecione uma data
              </h2>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                locale="pt-BR"
                tileClassName={({ date }) =>
                  schedules.some(
                    (event) =>
                      dayjs(event.schedule_date).format("YYYY-MM-DD") ===
                      dayjs(date).format("YYYY-MM-DD")
                  )
                    ? "bg-blue-100 text-blue-700 font-semibold rounded-lg"
                    : null
                }
              />
            </div>

            {/* Eventos do dia */}
            <div className="bg-white shadow rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                {eventsOfDay.length > 0
                  ? `Eventos em ${dayjs(selectedDate).format("D [de] MMMM")}`
                  : `Nenhum evento em ${dayjs(selectedDate).format("D [de] MMMM")}`}
              </h2>

              {eventsOfDay.length > 0 ? (
                <ul className="space-y-4">
                  {eventsOfDay.map((event) => (
                    <li
                      key={event.id}
                      className="border rounded-xl p-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-blue-600 font-semibold text-base">
                            {event.activity || "Sem título"}
                          </p>
                          <p className="text-sm text-gray-500 capitalize mt-0.5">
                            Tipo: {event.type}
                          </p>
                          {event.teachers?.length > 0 && (
                            <p className="text-sm text-gray-500 mt-1">
                              👩‍🏫{" "}
                              {event.teachers.map((t) => t.name).join(", ")}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            {dayjs(event.schedule_date).format("DD/MM/YYYY HH:mm")}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              router.visit(route("schedules.edit", event.id))
                            }
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() =>
                              router.delete(route("schedules.destroy", event.id))
                            }
                            className="text-sm text-red-500 hover:underline"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400 py-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10m-12 8h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm">Nenhum evento nesta data</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
