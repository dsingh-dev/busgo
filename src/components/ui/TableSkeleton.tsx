import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "./table";

interface TableSkeletonProps {
  className?: string;
  rows?: number;
}

export const TableSkeleton = ({
  className,
  rows = 5,
}: TableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <TableRow key={index} className={cn(className)}>
          <TableCell>
            <Skeleton className="h-4 w-[120px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[160px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[80px]" />
          </TableCell>

          <TableCell>
            <Skeleton className="h-4 w-[80px]" />
          </TableCell>

          <TableCell className="text-right">
            <Skeleton className="h-8 w-8 rounded-md ml-auto" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};