import React from 'react';
import Pagination from '@mui/material/Pagination';
import { scrollToTop } from '../../helpers/scrollToTop';

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const paginationStyles = {
  '& .MuiButtonBase-root': {
    backgroundColor: '#ECEDF0',
    border: 'none',
    width: '32px',
    height: '32px',
    margin: '0 6px',
  },
  '& .MuiButtonBase-root.Mui-disabled': {
    opacity: '1',
  },
  '& .MuiButtonBase-root.Mui-disabled svg': {
    fill: '#808080',
  },
  '& .MuiButtonBase-root.Mui-selected': {
    backgroundColor: '#081E37',
    color: '#fff',
  },
  '& .MuiButtonBase-root.Mui-selected:hover': {
    backgroundColor: '#081E37',
    color: '#fff',
  },
  '& .MuiPaginationItem-ellipsis': {
    backgroundColor: '#ECEDF0',
    border: 'none',
    width: '32px',
    height: '32px',
    margin: '0 6px',
    borderRadius: '4px',
    paddingTop: '8px',
  },
};

const PaginationComponent = ({ totalPages, currentPage, setCurrentPage }: PaginationComponentProps) => {
  const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    // We need to add setTimeout without it on arrow click scroll not working
    setTimeout(() => {
      scrollToTop();
    }, 0);
  };

  return (
    <div className="mt-5 flex justify-center">
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={changePage}
        variant="outlined"
        shape="rounded"
        sx={paginationStyles}
      />
    </div>
  );
};

export default PaginationComponent;
