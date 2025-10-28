import { Plus } from "lucide-react";

export const FloatingActionButton = () => (
    <button className="fixed bottom-8 right-8 w-14 h-14 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition">
        <Plus className="w-6 h-6" />
    </button>
);
