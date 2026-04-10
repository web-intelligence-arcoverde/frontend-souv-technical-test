"use client";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationDemoProps {
	currentPage: number;
	handleNextPage: () => void;
	handlePreviuesPage: () => void;
}

export const PaginationProductList = ({
	currentPage,
	handleNextPage,
	handlePreviuesPage,
}: PaginationDemoProps) => {
	return (
		<Pagination className="mt-3">
			<PaginationContent>
				<PaginationItem
					className="bg-purple-medium text-white rounded-md"
					onClick={handlePreviuesPage}
				>
					<PaginationPrevious href="#" />
				</PaginationItem>

				<PaginationItem className="bg-purple-medium text-white rounded-md">
					<PaginationLink>{currentPage}</PaginationLink>
				</PaginationItem>

				<PaginationItem
					className="bg-purple-medium text-white rounded-md"
					onClick={handleNextPage}
				>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
