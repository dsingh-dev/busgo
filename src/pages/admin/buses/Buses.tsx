import { useCallback, useEffect, useState } from "react";
import BusList from "@/components/admin/buses/BusList";
import BusFormModal from "@/components/admin/buses/BusForm";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import BusFilter from "@/components/admin/buses/BusFilter";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/hooks/use-toast";
import AdminPagination from "@/components/layout/AdminPagination";

const BusesPage = () => {
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [buses, setBuses] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState(null);
  const [sort, setSort] = useState({
    field: null,
    order: 'desc',
  });
  const [filters, setFilters] = useState({
    name: null,
    from: null,
    to: null,
    departure: null,
  });
  const [meta, setMeta] = useState({
    page: 1,
    totalPages: 1,
    limit: 10,
  });
  const debouncedFilters = useDebounce(filters, 500);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);

  const fetchBuses = useCallback(
    async (filtersParam?: typeof filters, pageParam?: number) => {
      const f = filtersParam ?? filters;
      const p = pageParam ?? meta.page;

      const params = new URLSearchParams();
  
      if (f.name)
        params.append("name", f.name);
  
      if (f.from)
        params.append("from", f.from);
  
      if (f.to)
        params.append("to", f.to);
  
      if (f.departure)
        params.append(
          "date",
          f.departure.toISOString()
        );
  
      if (sort.field && sort.order) {
        params.append("sortField", sort.field);
        params.append("sortOrder", sort.order);
      }
  
      params.append("page", String(p));
      params.append("limit", "10");
  
      try {
        setLoading(true);
  
        const res = await fetch(
          `/api/admin/buses?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "bus_admin_token"
              )}`,
            },
          }
        );
  
        const data = await res.json();
  
        setBuses(data.data);
        setMeta(data.meta);
      } catch (err) {
        toast({
          title: "Something is wrong",
          description:
            err instanceof Error ? err.message : "Try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
        setSearchLoading(false);
      }
    },
    [filters, meta.page, sort]
  );

  useEffect(() => {
    fetchBuses({
      ...debouncedFilters,
      name: debouncedSearch,
    }, 1);
  }, [debouncedFilters, debouncedSearch, sort, fetchBuses]);
  
  const handleClose = () => {
    setOpen(false);
    setSelectedBus(null);
  };

  const handleSort = (field) => {
    setSort((prev) => {
      if (prev.field !== field) {
        return { field, order: "asc" };
      }
  
      if (prev.order === "asc") {
        return { field, order: "desc" };
      }
  
      return { field: null, order: null };
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Buses</h1>
        <p className="text-muted-foreground">Manage your buses here.</p>
      </div>
      <Dialog
        open={open}
        onOpenChange={(val) => {
          setOpen(val);
          if (!val) setSelectedBus(null); 
        }}
      >
        <div className="flex justify-between gap-x-96">
          <Field orientation="horizontal" className="relative">
          <Input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setSearchLoading(true);
              }}
            />

            {searchLoading ? (
              <div className="absolute end-0 me-3">
                <Spinner />
              </div>
            ) : ''}
            
          </Field>
          <div className="flex justify-end gap-3">
            <BusFilter onChange={setFilters}/>
          <DialogTrigger asChild>
            <Button variant="default" onClick={() => setOpen(true)}><PlusIcon className="h-4 w-4" /> Add Bus</Button>
          </DialogTrigger>
          </div>
        </div>

        <DialogContent className="container">
          <DialogHeader>
            <DialogTitle>{selectedBus ? "Edit Bus" : "Add Bus"}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
            <BusFormModal
            key={selectedBus?.id ?? "new"}
            open={open}
            bus={selectedBus}
            onClose={handleClose}
            onSuccess={fetchBuses}
          />  
        </DialogContent>  
      </Dialog>

      <Table>
      <TableHeader>
        <TableRow>
            <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
              Name {sort.field === "name" ? (sort.order === "asc" ? "↑" : "↓") : ""}
            </TableHead>
            <TableHead>Route</TableHead>
            <TableHead onClick={() => handleSort("departure")} className="cursor-pointer">
              Departure {sort.field === "departure" ? (sort.order === "asc" ? "↑" : "↓") : ""}
            </TableHead>
            <TableHead onClick={() => handleSort("arrival")} className="cursor-pointer">
              Arrival {sort.field === "arrival" ? (sort.order === "asc" ? "↑" : "↓") : ""}
            </TableHead>
            <TableHead onClick={() => handleSort("price")} className="cursor-pointer">
              Price {sort.field === "price" ? (sort.order === "asc" ? "↑" : "↓") : ""}
            </TableHead>
            <TableHead>Seats</TableHead>
            <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {loading ? (
        <TableSkeleton className="mt-2" />
      ) : (
          <BusList
            buses={buses}
            onEdit={(bus) => {
              setSelectedBus(bus);
              setOpen(true);
            }}
            onDelete={fetchBuses}
          />
      )}
      </TableBody>
      </Table>
      {!loading ? (
        <div className="mt-4 flex justify-end items-center">
        <AdminPagination 
          page={meta.page}
          totalPages={meta.totalPages}
          onChange={(newPage) => fetchBuses(filters, newPage)}
        />
      </div>
      ): undefined}
    </div>
  );
};

export default BusesPage;