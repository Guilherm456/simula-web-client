import { Button, Checkbox } from "@components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Parameter } from "@models/parameters.model";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Plus, Trash } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

interface Props {
  data: Parameter[];
  columns: ColumnDef<Parameter>[];
  editable?: boolean;
  onRowChange?: (rowIndex: number, column: string, value: any) => void;
  onRowCreate?: (rowIndex: number, row: Parameter) => void;
  onRowsDelete?: (rowIndices: number[]) => void;
}

const Tabela: React.FC<Props> = ({
  data,
  columns,
  editable = false,
  onRowChange,
  onRowCreate,
  onRowsDelete,
}) => {
  const [editData, setEditData] = useState<Parameter[]>(data);
  const [selectedRows, setSelectedRows] = useState({});

  const handleAddRow = () => {
    const newRow = columns.reduce((acc, column) => {
      return { ...acc, [column.accessorKey]: "" };
    }, {});

    onRowCreate?.(0, newRow);

    setEditData([newRow, ...editData]);
  };

  const handleDeleteRows = () => {
    const selectedRowIndices = Object.keys(selectedRows)
      .map(Number)
      .filter((index) => selectedRows[index]) as number[];

    const updatedData = editData.filter(
      (_, index) => !selectedRowIndices.includes(index),
    );

    onRowsDelete?.(selectedRowIndices);

    setEditData(updatedData);
    setSelectedRows({});
  };

  const defaultColumn: Partial<ColumnDef<Parameter>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue() as string;

      return (
        <input
          className="h-full w-full outline-none focus:ring-2 focus:ring-primary"
          defaultValue={initialValue}
          onBlur={(event) => {
            if (event.target.value === initialValue) return;
            table.options.meta?.updateData(index, id, event.target.value);
          }}
        />
      );
    },
  };

  const table = useReactTable<Parameter>({
    columns: editable
      ? [
          {
            id: "selection",
            cell: ({ row }) => (
              <Checkbox
                aria-label={`Selecionar linha ${row.index + 1}`}
                id={`row-${row.index}`}
                {...{
                  checked: row.getIsSelected(),
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected(),
                  onCheckedChange: row.getToggleSelectedHandler(),
                }}
              />
            ),
          },
          ...columns,
        ]
      : columns,

    data: editData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    defaultColumn: editable ? defaultColumn : undefined,
    enableRowSelection: editable,
    state: {
      rowSelection: selectedRows,
    },
    onRowSelectionChange: setSelectedRows,
    meta: {
      // Fica responsável por atualizar os dados da tabela
      updateData: useCallback(
        (
          rowIndex: number,
          columnId: string,
          value: number | string | undefined,
        ) => {
          setEditData(
            editData.map((row, index) => {
              if (index === rowIndex) {
                return { ...row, [columnId]: value };
              }
              return row;
            }),
          );
          onRowChange?.(rowIndex, columnId, value);
        },
        [editData, onRowChange],
      ),
    },
  });

  useEffect(() => {
    setEditData(data);
  }, [data]);

  return (
    <div>
      {editable && (
        <div className="sticky left-0 top-0 z-10 flex flex-col items-center justify-start gap-2 rounded-t-md border-b border-gray-200 bg-gray-100 p-4 md:flex-row">
          <Button
            onClick={handleAddRow}
            className=" w-full items-center rounded-lg bg-blue-400 p-2 text-white transition md:max-w-[50%]"
          >
            <Plus className="h-6 w-6" />
            Adicionar Linha
          </Button>
          {table.getIsSomeRowsSelected() && (
            <Button
              onClick={handleDeleteRows}
              className=" h-min w-full items-center rounded-lg bg-red-400 p-2 text-white  transition "
            >
              <Trash className="h-6 w-6" />
              Deletar Linhas
            </Button>
          )}
        </div>
      )}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="rounded-t-md">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  aria-label={`Coluna ${header.column.columnDef.header}`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum dado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Tabela;
