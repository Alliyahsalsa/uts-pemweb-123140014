// src/App.jsx (Revisi Final Filter)

import React, { useState, useEffect } from 'react';
import newsData from './newsData.json'; 

import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ArticleCard from './components/ArticleCard';
import Pagination from './components/Pagination';
import './App.css';

const PAGE_SIZE = 10; 
const ALL_ARTICLES = newsData.articles || []; 

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State: Default ke kategori pertama, tapi TIDAK akan dipakai untuk memfilter data
  const [category, setCategory] = useState('technology'); 
  const [keyword, setKeyword] = useState('');
  const [fromDate, setFromDate] = useState(''); 
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // --- FUNGSI FILTER DATA LOKAL ---
  const filterLocalArticles = () => {
    setLoading(true);
    setError(null);
    let filtered = ALL_ARTICLES;

    // --- LOGIKA VALIDASI DAN FILTER ---
    
    const lowerKeyword = keyword.trim().toLowerCase();

    // 1. Validasi Tanggal Tanpa Keyword (Error Utama)
    if (fromDate && !lowerKeyword) {
        setError("Filter tanggal harus disertai dengan Kata Kunci (Keyword) sesuai skema API.");
        filtered = [];
    } 
    
    // 2. Jika Ada Keyword, Lakukan Pencarian/Filter
    else if (lowerKeyword) {
        filtered = ALL_ARTICLES.filter(article => {
            let matchesKeyword = true;
            let matchesDate = true;

            const articleTitle = (article.title || '').toLowerCase();
            const articleDescription = (article.description || '').toLowerCase();
            const articleDate = article.publishedAt ? article.publishedAt.substring(0, 10) : '';

            // Filter Keyword
            matchesKeyword = articleTitle.includes(lowerKeyword) || articleDescription.includes(lowerKeyword);
            
            // Filter Tanggal
            if (fromDate) {
                 matchesDate = articleDate >= fromDate; 
            }

            return matchesKeyword && matchesDate;
        });
        
        // Cek hasil setelah keyword/date filter
        if (filtered.length === 0) {
             setError(`Tidak ditemukan berita yang cocok dengan kata kunci "${keyword}" pada tanggal ${fromDate || 'apapun'}.`);
        }
        
    } else {
        // 3. Jika TIDAK ada keyword (Mode Kategori)
        // Tampilkan semua data statis untuk kategori yang aktif
        filtered = ALL_ARTICLES; 
        
        // Tambahkan logika opsional: Tampilkan pesan khusus saat beralih kategori tanpa keyword
        if (category !== 'technology') {
             // Opsional: Anda bisa memberikan notifikasi kecil jika mau
        }
    }
    
    // --- PAGINATION (Slice Data) ---
    const offset = (page - 1) * PAGE_SIZE;
    const paginatedArticles = filtered.slice(offset, offset + PAGE_SIZE);

    setArticles(paginatedArticles);
    setTotalResults(filtered.length);
    
    setTimeout(() => {
        setLoading(false);
    }, 500); 
  };
  
  // Memanggil filter lokal setiap kali dependency berubah
  useEffect(() => {
    filterLocalArticles();
  }, [category, keyword, fromDate, page]); 

  // Handler Kategori tetap memastikan keyword bersih
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setKeyword(''); 
    setFromDate(''); 
    setPage(1); 
  };
  
  // Handler Pencarian
  const handleSearchAndFilter = ({ searchKeyword, dateFilter }) => {
    setKeyword(searchKeyword);
    // Format tanggal DD/MM/YYYY dari input ke YYYY-MM-DD
    const parts = dateFilter.split('-');
    const formattedDate = parts.length === 3 ? `${parts[0]}-${parts[1]}-${parts[2]}` : ''; // Asumsi input date sudah YYYY-MM-DD
    setFromDate(dateFilter); // Gunakan dateFilter asli (YYYY-MM-DD)
    setCategory(''); 
    setPage(1); 
  };
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0); 
  };


  return (
    <div className="App">
       <Header 
        categories={['Technology', 'Business', 'Sports']}
        // Highlight kategori yang aktif, tapi jika ada keyword, jangan highlight kategori
        activeCategory={!keyword ? category : ''}
        onCategoryChange={handleCategoryChange}
      />
      <div className="container">
        <SearchForm 
          onSearch={handleSearchAndFilter} 
          currentKeyword={keyword}
          currentDate={fromDate} 
        />

        {loading && <p className="status-message">Memuat artikel...</p>}
        {error && <p className="status-message error">{error}</p>}
        
        <div className="articles-list">
          {!loading && articles.length > 0 ? (
            articles.map((article, index) => (
              <ArticleCard key={index} article={article} /> 
            ))
          ) : !loading && !error && <p className="status-message">Tidak ada artikel ditemukan. Coba ubah kriteria pencarian.</p>}
        </div>

        {articles.length > 0 && totalResults > PAGE_SIZE && (
          <Pagination
            currentPage={page}
            totalResults={totalResults}
            pageSize={PAGE_SIZE}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;
