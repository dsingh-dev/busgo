import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

const AdminPagination = ({page, totalPages, onChange}) => {
    if(totalPages <= 1) return null;
    
    const getPages = () => {
        const range = [];
        
        const start = Math.max(1, page - 2);
        const end = Math.min(totalPages, page + 2);
        
        if (start > 1) {
            range.push(1);
            if (start > 2) range.push("...");
        }
        
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        
        if (end < totalPages) {
            if (end < totalPages - 1) range.push("...");
            range.push(totalPages);
        }
        
        return range;
    };

    return (
    <Pagination>
    <PaginationContent>
        <PaginationItem>
        <PaginationPrevious isActive={page > 1}  onClick={() => page > 1 && onChange(page - 1)} />
        </PaginationItem>
        {getPages().map((p, i) => (
            <PaginationItem key={i}>
                {p === "..." ? (
                <PaginationEllipsis />
                ) : (
                <PaginationLink
                    onClick={() => onChange(p)}
                    isActive={p === page}
                >
                    {p}
                </PaginationLink>
                )}
            </PaginationItem>
        ))}
        <PaginationItem>
        <PaginationNext
            isActive={page !== totalPages}
            onClick={() => page < totalPages && onChange(page + 1)}/>
        </PaginationItem>
    </PaginationContent>
    </Pagination>
    )
}

export default AdminPagination;