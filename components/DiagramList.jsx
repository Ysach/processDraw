"use client";

import { useEffect, useState } from "react";
import { getDiagramList } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function DiagramList() {
  const [list, setList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getDiagramList().then(setList);
  }, []);

  return (
    <div className="space-y-3 mt-4">
      {list.map((item) => (
        <div
          key={item.id}
          className="border p-3 rounded cursor-pointer hover:bg-gray-100"
          onClick={() => router.push(`/editor?id=${item.id}`)}
        >
          <div className="font-semibold">{item.name}</div>
          <div className="text-xs opacity-60">
            {new Date(item.updatedAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
