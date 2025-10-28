import { UserPlus, BookOpen, Calendar, Award } from "lucide-react";

const activities = [
    {
        icon: UserPlus,
        title: "Novo aluno matriculado",
        description: "João Pedro - Turma Jardim A",
        time: "Há 2 horas",
    },
    {
        icon: BookOpen,
        title: "Aula registrada",
        description: "Maternal B - Educação Física",
        time: "Há 4 horas",
    },
    {
        icon: Calendar,
        title: "Evento agendado",
        description: "Festa da Primavera - 15/11",
        time: "Há 6 horas",
    },
    {
        icon: Award,
        title: "Certificado emitido",
        description: "Profª Ana - Curso de Primeiros Socorros",
        time: "Ontem",
    },
];

export const RecentActivity = () => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
            Atividades Recentes
        </h3>
        <p className="text-sm text-gray-500 mb-4">
            Últimas atualizações do sistema
        </p>
        <div className="space-y-4">
            {activities.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-blue-50">
                        <a.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            {a.title}
                        </p>
                        <p className="text-xs text-gray-500">{a.description}</p>
                    </div>
                    <span className="text-xs text-gray-400">{a.time}</span>
                </div>
            ))}
        </div>
    </div>
);
