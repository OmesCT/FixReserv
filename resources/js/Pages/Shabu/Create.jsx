import React from "react";
import { useForm, Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
    const { table_id, table } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        table_id: table_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/customers", {
            onSuccess: () => {
                window.location.href = "/reserve"; // กลับไปหน้าเลือกโต๊ะ
            },
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Reserve Table</h2>}>
            <Head title="Reserve Table" />
            <div>
                <h1>จองโต๊ะ</h1>
                {table && (
                    <div>
                        <h2>โต๊ะที่จอง: {table.name}</h2>
                        <p>จำนวนที่นั่ง: {table.capacity}</p>
                        <form onSubmit={handleSubmit}>
                            <label>
                                ชื่อ:
                                <input
                                    type="text"
                                    name="first_name"
                                    value={data.first_name}
                                    onChange={(e) => setData("first_name", e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                นามสกุล:
                                <input
                                    type="text"
                                    name="last_name"
                                    value={data.last_name}
                                    onChange={(e) => setData("last_name", e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                อีเมล:
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData("email", e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                เบอร์โทร:
                                <input
                                    type="text"
                                    name="phone"
                                    value={data.phone}
                                    onChange={(e) => setData("phone", e.target.value)}
                                    required
                                />
                            </label>
                            <button type="submit" disabled={processing}>จองโต๊ะ</button>
                        </form>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
