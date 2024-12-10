export function Button({ children, onClick }) {
    return (
        <button
            className="rounded bg-slate-500 px-3 py-2 w-full text-white font-medium"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
