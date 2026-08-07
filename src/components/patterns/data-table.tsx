import * as React from "react";
import { Columns3 } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

export type DataTableColumn<T> = {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

export type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  pageSize?: number;
  /** Colonne nascoste all'apertura (per `key`) — l'utente può comunque riattivarle dal menu "Colonne". */
  initialHiddenColumns?: string[];
  getRowId?: (row: T, index: number) => string | number;
  className?: string;
};

export function DataTable<T>({
  columns,
  data,
  pageSize = 10,
  initialHiddenColumns,
  getRowId,
  className,
}: DataTableProps<T>) {
  const [hidden, setHidden] = React.useState<Set<string>>(() => new Set(initialHiddenColumns));
  const [page, setPage] = React.useState(0);

  const visibleColumns = columns.filter((column) => !hidden.has(column.key));
  const pageCount = Math.max(1, Math.ceil(data.length / pageSize));
  const currentPage = Math.min(page, pageCount - 1);
  const start = currentPage * pageSize;
  const pageRows = data.slice(start, start + pageSize);

  const toggleColumn = (key: string) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const goToPage = (next: number) => setPage(Math.max(0, Math.min(pageCount - 1, next)));

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Columns3 className="mr-2 h-4 w-4" aria-hidden="true" />
              Colonne
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.key}
                checked={!hidden.has(column.key)}
                onCheckedChange={() => toggleColumn(column.key)}
                // Impedisce la chiusura del menu al click, così si possono
                // attivare/disattivare più colonne in un'unica apertura.
                onSelect={(event) => event.preventDefault()}
              >
                {column.header}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.map((column) => (
              <TableHead key={column.key} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody striped>
          {pageRows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={visibleColumns.length || 1}
                className="h-24 text-center text-muted-foreground"
              >
                Nessun risultato.
              </TableCell>
            </TableRow>
          ) : (
            pageRows.map((row, i) => (
              <TableRow key={getRowId ? getRowId(row, start + i) : start + i}>
                {visibleColumns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {pageCount > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  goToPage(currentPage - 1);
                }}
                aria-disabled={currentPage === 0}
                className={currentPage === 0 ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="px-2 text-sm text-muted-foreground" aria-live="polite">
                Pagina {currentPage + 1} di {pageCount}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  goToPage(currentPage + 1);
                }}
                aria-disabled={currentPage >= pageCount - 1}
                className={
                  currentPage >= pageCount - 1 ? "pointer-events-none opacity-50" : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
