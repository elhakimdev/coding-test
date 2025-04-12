import React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationComponentProps {
  pageIndex: number
  pageSize: number
  totalItems: number
  onPageChange: (newPage: number) => void
  siblingCount?: number // how many pages to show around current
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => i + start)

export function PaginationComponent({
  pageIndex,
  pageSize,
  totalItems,
  onPageChange,
  siblingCount = 1,
}: PaginationComponentProps) {
  const totalPages = Math.ceil(totalItems / pageSize)
  const currentPage = pageIndex + 1 // UI is 1-indexed

  const paginationRange = (): (number | "ellipsis")[] => {
    const totalPageNumbers = siblingCount * 2 + 5

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const showLeftEllipsis = leftSiblingIndex > 2
    const showRightEllipsis = rightSiblingIndex < totalPages - 1

    const pages: (number | "ellipsis")[] = []

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftItemCount = 3 + 2 * siblingCount
      pages.push(...range(1, leftItemCount), "ellipsis", totalPages)
    } else if (showLeftEllipsis && !showRightEllipsis) {
      const rightItemCount = 3 + 2 * siblingCount
      pages.push(1, "ellipsis", ...range(totalPages - rightItemCount + 1, totalPages))
    } else if (showLeftEllipsis && showRightEllipsis) {
      pages.push(1, "ellipsis", ...range(leftSiblingIndex, rightSiblingIndex), "ellipsis", totalPages)
    }

    return pages
  }

  return (
    <Pagination className="font-normal text-slate-700">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage > 1) onPageChange(currentPage - 2)
            }}
          />
        </PaginationItem>

        {paginationRange().map((item, idx) => (
          <PaginationItem key={idx}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={item === currentPage}
                onClick={(e) => {
                  e.preventDefault()
                  if (item !== currentPage) onPageChange(item - 1)
                }}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (currentPage < totalPages) onPageChange(currentPage)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
