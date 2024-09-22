/* eslint-disable @typescript-eslint/no-explicit-any */
// PaginationSection.tsx
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

interface PaginationSectionProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalProducts: number;
  productsPerPage: number;
}

function PaginationSection({
  currentPage,
  setCurrentPage,
  totalProducts,
  productsPerPage,
}: PaginationSectionProps) {
  const paginatorTemplate = {
    layout: 'PrevPageLink PageLinks NextPageLink',
    PageLinks: (options: any) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = `${options.className} p-1`;
        return (
          <span className={className} style={{ userSelect: 'none' }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={`${options.className} ${
            options.page === currentPage - 1
              ? 'ring-2 ring-blue-500 ring-offset-2'
              : 'hover:bg-primary'
          } transition-all duration-150`}
          onClick={options.onClick}
        >
          {options.page + 1}
        </button>
      );
    },
  };

  return (
    <div className="mt-auto bg-background py-4">
      <div className="container mx-auto flex justify-center">
        <Paginator
          first={(currentPage - 1) * productsPerPage}
          rows={productsPerPage}
          totalRecords={totalProducts}
          onPageChange={(e: PaginatorPageChangeEvent) =>
            setCurrentPage(e.page + 1)
          }
          className="rounded-lg bg-background p-4 text-text shadow-lg"
          template={paginatorTemplate}
        />
      </div>
    </div>
  );
}

export default PaginationSection;
