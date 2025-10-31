import React from 'react';

function Pagination({ currentPage, totalResults, pageSize, onPageChange }) {
    // Menghitung total halaman (maksimum 100 halaman sesuai batasan NewsAPI)
    const totalPages = Math.min(Math.ceil(totalResults / pageSize), 10); 
    
    // Tentukan rentang halaman yang akan ditampilkan (misalnya, 5 halaman di tengah)
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    // Sesuaikan startPage jika rentang terlalu pendek di akhir
    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // Buat array nomor halaman untuk di-render
    const pages = [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);
    
    if (totalPages <= 1) return null; // Sembunyikan jika hanya 1 halaman

    return (
        <div className="pagination">
            {/* Tombol 'Previous' */}
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            {/* Tampilkan '1' dan '...' jika startPage bukan halaman pertama */}
            {startPage > 1 && (
                <>
                    <button onClick={() => onPageChange(1)}>1</button>
                    {startPage > 2 && <span className="dots">...</span>}
                </>
            )}

            {/* Tombol Halaman (rentang tengah) */}
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={page === currentPage ? 'active' : ''}
                >
                    {page}
                </button>
            ))}

            {/* Tampilkan '...' dan halaman terakhir jika endPage bukan halaman terakhir */}
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