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

  // Eventos do dia selecionado
  const eventsOfDay = schedules.filter(
    (event) =>
      dayjs(event.schedule_date).format("YYYY-MM-DD") ===
      dayjs(selectedDate).format("YYYY-MM-DD")
  );

  // Eventos do mês atual
  const eventsOfMonth = schedules.filter(
    (event) =>
      dayjs(event.schedule_date).month() === dayjs(selectedDate).month() &&
      dayjs(event.schedule_date).year() === dayjs(selectedDate).year()
  );

  // Agrupa por tipo
  const groupByType = (list) =>
    list.reduce((groups, event) => {
      const type = event.type || "outros";
      if (!groups[type]) groups[type] = [];
      groups[type].push(event);
      return groups;
    }, {});

  const groupedDayEvents = groupByType(eventsOfDay);
  const groupedMonthEvents = groupByType(eventsOfMonth);

  const typeLabels = {
    onibus: "🚌 Ônibus",
    reforco: "📘 Reforço",
    palavra: "📖 Palavra",
    evento: "🎉 Evento / Atividade",
    outros: "📅 Outros",
  };

  const typeColors = {
    onibus: "border-blue-300 bg-blue-50",
    reforco: "border-green-300 bg-green-50",
    palavra: "border-purple-300 bg-purple-50",
    evento: "border-yellow-300 bg-yellow-50",
    outros: "border-gray-300 bg-gray-50",
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Cabeçalho */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              Calendário de Eventos
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
                {dayjs(selectedDate).format("D [de] MMMM")}
              </h2>

              {/* Quadros fixos do dia selecionado */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {/* Ônibus */}
                <div className={`border ${typeColors.onibus} rounded-xl p-4`}>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    {typeLabels.onibus}
                  </h3>
                  {groupedDayEvents.onibus?.length ? (
                    <ul className="space-y-2">
                      {groupedDayEvents.onibus.map((event) => (
                        <li
                          key={event.id}
                          className="bg-white border rounded-lg p-4 flex justify-between items-start shadow-sm hover:shadow transition"
                        >
                          <div>
                            <p className="text-blue-600 font-semibold text-base">
                              {event.activity || "Sem título"}
                            </p>
                            {event.teachers?.length > 0 && (
                              <p className="text-sm text-gray-500 mt-1">
                                👩‍🏫{" "}
                                {event.teachers.map((t) => t.name).join(", ")}
                              </p>
                            )}
                            <p className="text-xs text-gray-400 mt-1">
                              {dayjs(event.schedule_date).format(
                                "DD/MM/YYYY HH:mm"
                              )}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      Nenhuma escala de ônibus neste dia.
                    </p>
                  )}
                </div>

                {/* Reforço */}
                <div className={`border ${typeColors.reforco} rounded-xl p-4`}>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    {typeLabels.reforco}
                  </h3>
                  {groupedDayEvents.reforco?.length ? (
                    <ul className="space-y-2">
                      {groupedDayEvents.reforco.map((event) => (
                        <li
                          key={event.id}
                          className="bg-white border rounded-lg p-4 shadow-sm"
                        >
                          <p className="text-blue-600 font-semibold text-base">
                            {event.activity}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      Nenhum reforço cadastrado neste dia.
                    </p>
                  )}
                </div>

                {/* Palavra */}
                <div className={`border ${typeColors.palavra} rounded-xl p-4`}>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    {typeLabels.palavra}
                  </h3>
                  {groupedDayEvents.palavra?.length ? (
                    <ul className="space-y-2">
                      {groupedDayEvents.palavra.map((event) => (
                        <li
                          key={event.id}
                          className="bg-white border rounded-lg p-4 shadow-sm"
                        >
                          <p className="text-blue-600 font-semibold text-base">
                            {event.activity}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      Nenhuma palavra cadastrada neste dia.
                    </p>
                  )}
                </div>

                {/* Eventos gerais */}
                <div className={`border ${typeColors.evento} rounded-xl p-4`}>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    {typeLabels.evento}
                  </h3>
                  {groupedDayEvents.evento?.length ? (
                    <ul className="space-y-2">
                      {groupedDayEvents.evento.map((event) => (
                        <li
                          key={event.id}
                          className="bg-white border rounded-lg p-4 shadow-sm"
                        >
                          <p className="text-blue-600 font-semibold text-base">
                            {event.activity}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      Nenhum evento geral neste dia.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          </div>
        </div>
      
    </AdminLayout>
  );
}
