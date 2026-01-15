export default function Card({ title, children }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow">
            {title && (
                <h3 className="text-sm font-medium text-gray-600 mb-4">
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
}
