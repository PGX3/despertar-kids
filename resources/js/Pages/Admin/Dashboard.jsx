import React from "react";
import { usePage } from "@inertiajs/react";
import {
    Users,
    GraduationCap,
    BookOpen,
    TrendingUp,
} from "lucide-react";

// COMPONENTES
import AttendanceChart from "@/Components/Dashboard/AttendanceChart";
import RecentActivity from "@/Components/Dashboard/RecentActivity";
import MetricCard from "@/Components/Dashboard/MetricCard";
import FloatingActionButton from "@/Components/Dashboard/FloatingActionButton";

export default function Dashboard() {
    const { stats = {}, recent = [] } = usePage().props ?? {};

    return (
        <div className="space-y-8 animate-fadeIn mt-2">
            {/* HEADER */}

            {/* CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    icon={Users}
                    title="Alunos Ativos"
                    value={stats.students ?? 0}
                    trend="+12%"
                />
                <MetricCard
                    icon={GraduationCap}
                    title="Professores"
                    value={stats.teachers ?? 0}
                    trend="+2%"
                />
                <MetricCard
                    icon={BookOpen}
                    title="Turmas"
                    value={stats.classes ?? 0}
                />
                <MetricCard
                    icon={TrendingUp}
                    title="Presença Semanal"
                    value={(stats.attendanceAvg ?? 0) + "%"}
                    trend="+5%"
                />
            </div>

            {/* CHART + ATIVIDADES */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                    <AttendanceChart data={stats.attendanceData ?? []} />
                </div>

                <RecentActivity recent={recent ?? []} />
            </div>

            {/* FLOAT BUTTON */}
            <FloatingActionButton href={route("events.create")} />
        </div>
    );
}

// ✅ 🧩 AQUI GARANTE QUE O LAYOUT SEJA USADO!
import AdminLayout from "@/Layouts/AdminLayout";
Dashboard.layout = (page) => <AdminLayout>{page}</AdminLayout>;
