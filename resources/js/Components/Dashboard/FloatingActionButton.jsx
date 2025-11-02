import { Plus } from "lucide-react";

export default function FloatingActionButton({ href }) {
    return (
        <a
            href={href}
            className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition"
        >
            <Plus className="w-6 h-6" />
        </a>
    );
}
