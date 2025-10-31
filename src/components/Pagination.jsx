import React from 'react';

function Pagination({ currentPage, totalResults, pageSize, onPageChange }) {
    const totalPages = Math.min(Math.ceil(totalResults / pageSize), 10); 
    
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);
    
    if (totalPages <= 1) return null;

    return (
        <div className="pagination">
            {/* Tombol 'Previous' */}
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {startPage > 1 && (
                <>
                    <button onClick={() => onPageChange(1)}>1</button>
                    {startPage > 2 && <span className="dots">...</span>}
                </>
            )}

            {/* Tombol Halaman */}
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={page === currentPage ? 'active' : ''}
                >
                    {page}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="dots">...</span>}
                    <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
                </>
            )}

            {/* Tombol 'Next' */}
            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
