import React from "react";
import { useForm, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        customer_count: "",
        table_id: new URLSearchParams(window.location.search).get("table_id"),
    });

    const submit = (e) => {
        e.preventDefault();
        post("/customers", {
            onSuccess: () => {
                window.location.href = "/tables/reserve"; // กลับไปหน้าจองโต๊ะ
            },
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Reserve Table</h2>}>
            <Head title="Reserve Table" />
            <form onSubmit={submit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
                <label className="block mb-2">ชื่อ-นามสกุล</label>
                <input type="text" value={data.name} onChange={(e) => setData("name", e.target.value)} className="w-full border p-2 rounded" />

                <label className="block mt-4 mb-2">จำนวนลูกค้า</label>
                <input type="number" value={data.customer_count} onChange={(e) => setData("customer_count", e.target.value)} className="w-full border p-2 rounded" />

                <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" disabled={processing}>บันทึก</button>
            </form>
        </AuthenticatedLayout>
    );
}