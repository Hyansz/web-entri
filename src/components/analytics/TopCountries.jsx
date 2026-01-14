import { useEffect, useState } from "react";
import { getCountries } from "../../api/analytics";

export default function TopCountries() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        getCountries().then((res) => setItems(res.data));
    }, []);

    return (
        <div className="bg-white rounded-2xl p-6 shadow">
            <p className="font-semibold mb-3">Asal Pengunjung</p>
            {items.slice(0, 5).map((i) => (
                <div key={i.x} className="flex justify-between text-sm">
                    <span>{i.x}</span>
                    <span>{i.y}</span>
                </div>
            ))}
        </div>
    );
}
