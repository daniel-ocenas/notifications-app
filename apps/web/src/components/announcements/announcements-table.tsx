"use client";
import { Announcement } from "@/components/announcements/announcements.types";
import {
  formatPublicationDate,
  formatUpdateDate,
} from "@/utils/date-formatter";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Image from "next/image";

const columns: ColumnDef<Announcement>[] = [
  { accessorKey: "title", header: "Title" },
  {
    accessorKey: "publicationDate",
    header: "Publication date",
    cell: ({ row }) => {
      return <div>{formatPublicationDate(row.original.publicationDate)}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last update",
    cell: ({ row }) => {
      return <div>{formatUpdateDate(row.original.updatedAt)}</div>;
    },
  },
  {
    accessorKey: "category",
    header: () => <div className={"flex items-start"}>Categories</div>,
    cell: ({ row }) => {
      return (
        <div className={"relative flex items-start text-left"}>
          {row.original.category.join(", ")}
          <a
            href={`/announcements/${row.original.id}`}
            className="absolute top-0 right-0 hover:shadow-xl active:scale-90"
          >
            <Image
              src="/static/icons/edit.svg"
              alt="edit-icon"
              width={28}
              height={28}
              loading="lazy"
            />
          </a>
        </div>
      );
    },
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
      <thead className={"h-14 border-b border-t border-gray-300"}>
        {table.getHeaderGroups().map((hg) => (
          <tr key={hg.id}>
            {hg.headers.map((header) => (
              <th key={header.id} className="px-3 py-2 font-semibold ">
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
          <tr key={row.id} className={"border-b border-gray-300 h-14"}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-3 py-2 text-center">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
