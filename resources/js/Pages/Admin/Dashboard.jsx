import AdminLayout from "@/Layouts/AdminLayout";

import { MetricCard } from "@/Components/dashboard/MetricCard";
import { AttendanceChart } from "@/Components/dashboard/AttendanceChart";
import { RecentActivity } from "@/Components/dashboard/RecentActivity";
import { FloatingActionButton } from "@/Components/dashboard/FloatingActionButton";
import { Users, GraduationCap, BookOpen, CheckCircle2 } from "lucide-react";

export default function Dashboard() {
    return (
        <AdminLayout>
            {/* Cards de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    title="Alunos Ativos"
                    value={247}
                    icon={Users}
                    trend="+12%"
                />
                <MetricCard
                    title="Professores"
                    value={18}
                    icon={GraduationCap}
                    trend="+2"
                />
                <MetricCard title="Turmas" value={12} icon={BookOpen} />
                <MetricCard
                    title="Presença Semanal"
                    value="89%"
                    icon={CheckCircle2}
                    trend="+5%"
                />
            </div>

            {/* Gráfico e Atividades */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <AttendanceChart />
                </div>
                <div>
                    <RecentActivity />
                </div>
            </div>

            <FloatingActionButton />
        </AdminLayout>
    );
}
