import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function AttendanceChart({ data = [] }) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Presença Semanal
            </h3>
            <p className="text-sm text-gray-500 mb-6">
                Acompanhamento de frequência dos alunos
            </p>

            <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorPresencas" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="presencas"
                        stroke="#2563eb"
                        fillOpacity={1}
                        fill="url(#colorPresencas)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
