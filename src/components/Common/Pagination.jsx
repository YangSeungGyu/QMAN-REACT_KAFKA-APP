import 'src/style/components/Common/Pagination.css'


const Pagination = ({ 
  currentPage, 
  totalCnt, 
  pageSize, 
  pageBlockSize, 
  onPageChange 
}) => {
  
  const totalPages = Math.ceil(totalCnt / pageSize);
  const currentBlock = Math.floor((currentPage - 1) / pageBlockSize);
  const startPage = currentBlock * pageBlockSize + 1;
  const endPage = Math.min(startPage + pageBlockSize - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (totalCnt === 0) return null;

 return (
    <div className="pagination-container">
      <button 
        className="page-button"
        onClick={() => onPageChange(startPage - 1)} 
        disabled={startPage === 1}
      >
        &laquo;
      </button>

      <div className="pagination-list">
        {pageNumbers.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={'page-button ' + (currentPage === num ? 'active' : '')}
          >
            {num}
          </button>
        ))}
      </div>

      <button 
        className="page-button"
        onClick={() => onPageChange(endPage + 1)} 
        disabled={endPage >= totalPages}
      >
       &raquo;
      </button>
    </div>
  );
};

export default Pagination;