import { Box, Pagination, PaginationItem, useMediaQuery, useTheme } from "@mui/material";
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: isSmallScreen ? 'flex-start' : 'center',
        marginBottom: isSmallScreen ? '2em' : '6em',
        padding: isSmallScreen ? '0 1em' : '0'
      }}
    >
      <Pagination
        count={totalPages}       // 전체 페이지 수
        page={currentPage}        // 현재 페이지 번호
        onChange={handlePageChange} // 페이지 변경 핸들러
        color="primary"
        size={isSmallScreen ? 'small' : 'large'} // 화면 크기에 따른 크기 설정
        renderItem={(item) => (
          <PaginationItem
            {...item}
            onMouseEnter={() => item.page !== null && handlePageHover(item.page)} // Hover 시 prefetch 실행
          />
        )}
      />
    </Box>
  );
}

export default Pagenation;
