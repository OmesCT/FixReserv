import React, { useState } from "react";
import { usePage, Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Link } from "@inertiajs/react";



export default function Reserve() {
    const { tables = [] } = usePage().props; // ตั้งค่าเริ่มต้นเป็น array ว่าง

    // ถ้า tables ว่าง ให้สร้างโต๊ะ 2-10 คน แสดงไว้
    const defaultTables = tables.length ? tables : Array.from({ length: 9 }, (_, i) => ({
        id: i + 2,
        name: `โต๊ะนั่ง ${i + 2} คน`,
        available: true, // กำหนดค่าให้ว่าง
        reserved_by_user_id: null,
    }));
    const handleReserve = (table) => {
        if (table.available) {
            window.location.href = `/customers/create?table_id=${table.id}`;
        }
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Select Your Table</h2>}>
            <Head title="Reserve Table" />
            <div className="grid grid-cols-3 gap-4 p-4">
                {defaultTables.map((table) => (
                    <Card
                        key={table.id}
                        className={`p-4 text-center rounded-2xl shadow-lg ${table.available ? "bg-green-200 cursor-pointer" : "bg-red-300"
                            }`}
                        onClick={() => handleReserve(table)}
                    >
                        <CardContent>
                            <h2 className="text-lg font-bold">{table.name}</h2>
                            <p className="text-sm mt-2">
                                {table.available ? "ว่าง" : `จองโดย ${table.reserved_by_user_id ? "User ID: " + table.reserved_by_user_id : "ไม่ระบุ"}`}
                            </p>
                            <Button className="mt-4" variant={table.available ? "outline" : "destructive"} disabled={!table.available}>
                                {table.available ? "จองโต๊ะ" : "ถูกจองแล้ว"}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}
