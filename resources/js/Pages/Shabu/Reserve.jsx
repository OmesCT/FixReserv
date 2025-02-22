import React from "react";
import { usePage, Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { router } from "@inertiajs/react";
import { useEffect } from "react";


export default function Reserve() {
    const { tables } = usePage().props; // Fetch tables data from props

    const handleReserve = (table) => {
        if (table.available) {
            window.location.href = `/create?table_id=${table.id}`; // Redirect to the create page with table_id
        }
    };
    

    useEffect(() => {
        router.reload(); // โหลดข้อมูลใหม่
    }, []);




    return (
        <AuthenticatedLayout key={tables.length} header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Select Your Table</h2>}>
            <Head title="Reserve Table" />
            <div className="grid grid-cols-3 gap-4 p-4">
                {tables && tables.length > 0 ? (
                    tables.map((table) => (
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
                    ))
                ) : (
                    <p>No tables available.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}