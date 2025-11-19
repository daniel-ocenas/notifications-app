"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";

type Announcement = {
  id: number;
  title: string;
  publicationDate: string;
  lastUpdate: string;
  categories: string[];
};

const columns: ColumnDef<Announcement>[] = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "publicationDate", header: "Publication date" },
  { accessorKey: "lastUpdate", header: "Last update" },
  {
    accessorKey: "categories",
    header: "Categories",
    cell: ({ row }) => (
      <div className="flex flex-row items-center justify-between ">
        <span>{row.original.categories.join(", ")}</span>
        <a
          href={`/announcements/${row.original.title}`}
          className="hover:shadow-xl active:scale-90"
        >
          <Image
            src="/static/icons/edit.svg"
            alt="edit-icon"
            width={24}
            height={24}
          />
        </a>
      </div>
    ),
  },
];

export default function AnnouncementsTable({
  announcements,
}: {
  announcements: Announcement[];
}) {
  const table = useReactTable({
    data: announcements,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table-auto w-full border-collapse">
      <thead className={"h-12 border-b border-t border-gray-300"}>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header) => (
              <th
                key={header.id}
                className="px-3 py-2 text-left font-semibold w-1/4 "
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className={"border-b border-gray-300 h-12"}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-3 py-2 w-1/4 ">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
