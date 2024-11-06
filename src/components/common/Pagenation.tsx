import { Pagination, PaginationItem, useMediaQuery, useTheme } from "@mui/material";
import { ChangeEvent } from "react";

interface PagenationProps {
  totalPages: number,
  currentPage: number,
  handlePageChange: (e: ChangeEvent<unknown>, page: number) => void,
  handlePageHover: (page: number) => void,
}

function Pagenation({ totalPages, currentPage, handlePageChange, handlePageHover }: PagenationProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={`flex ${isSmallScreen ? 'justify-start mb-8 px-4' : 'justify-center mb-24'}`} >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size={isSmallScreen ? 'small' : 'large'}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            onMouseEnter={() => item.page !== null && handlePageHover(item.page)}
          />
        )}
      />
    </div>
  );
}

export default Pagenation;
