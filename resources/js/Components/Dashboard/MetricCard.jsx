import React from "react";

export const MetricCard = ({ title, value, icon: Icon, trend }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between mb-2">
            <div className="p-3 rounded-lg bg-blue-50">
                <Icon className="w-6 h-6 text-blue-600" />
            </div>
            {trend && (
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-md">
                    {trend}
                </span>
            )}
        </div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
);
