import { useState } from "react";
import { Bus, BusIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/dateTime";

interface Bus {
  id?: number;
  name: string;
  fromCityId: number,
  toCityId: number,
  price: string;
  type: "AC" | "NONAC";
  totalSeats: number;
  departure: string;
  arrival: string;

  fromCity?: {name: string};
  toCity?: {name: string};
}

interface BusTabelProps {
  buses?: Bus[];
  onEdit: (bus: Bus) => void;
  onDelete: () => void;
}

export default function BusList({ buses, onEdit, onDelete }: BusTabelProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/admin/buses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("bus_admin_token")}`,
      },
    });

    const data = await res.json();

    toast({
      title: data.status,
      description: data.message,
    });

    onDelete();
  };

  return (
    <>
        {buses && buses.length > 0 ? (
          buses.map((bus: Bus) => (
          <TableRow key={bus.id}>
            <TableCell className="font-medium flex gap-2 align-middle">
              <BusIcon />
              <div className="flex items-center">{bus.name}</div>
            </TableCell>
            <TableCell>{bus.fromCity?.name} → {bus.toCity?.name}</TableCell>
            <TableCell>{formatDate(bus.departure)}</TableCell>
            <TableCell>{formatDate(bus.arrival)}</TableCell>
            <TableCell>{bus.price}</TableCell>
            <TableCell>{bus.totalSeats}</TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreVerticalIcon />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(bus)}>
                  <PencilIcon className="h-4 w-4 me-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={() => setOpen(true)}>
                  <TrashIcon className="h-4 w-4 me-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction
                    onClick={() => {
                      handleDelete(bus.id);
                      setOpen(false);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
        </TableRow>
        )) 
      ) : ( 
        <TableRow>
        <TableCell colSpan={5} className="h-24 text-muted-foreground text-center">
          No records found.
        </TableCell>
        </TableRow>
      )}
    </>
  );
}
