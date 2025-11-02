// src/App.jsx (Revisi Logika)

import React, { useState, useEffect } from 'react';
// Import data JSON lokal
import newsData from './newsData.json'; // PASTIKAN NAMA FILE JSON BENAR
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ArticleCard from './components/ArticleCard';
import Pagination from './components/Pagination';
import './App.css';

// Hapus API_KEY dan BASE_URL karena kita pakai data lokal
const PAGE_SIZE = 10; 
const ALL_ARTICLES = newsData.articles; // Array semua artikel statis
const TOTAL_STATIC_RESULTS = newsData.totalResults; // Jumlah total data statis

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('technology'); 
  const [keyword, setKeyword] = useState('');
  const [fromDate, setFromDate] = useState(''); 
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // --- FUNGSI BARU: FILTER DATA LOKAL ---
  const filterLocalArticles = () => {
    setLoading(true);
    setError(null);

    // Filter berdasarkan Kategori atau Keyword
    let filtered = ALL_ARTICLES.filter(article => {
        let matchesCategory = true;
        let matchesKeyword = true;
        let matchesDate = true;

        const articleTitle = (article.title || '').toLowerCase();
        const articleDescription = (article.description || '').toLowerCase();
        
        // 1. Filter Kategori (Jika TIDAK ada keyword, kita anggap filter kategori aktif)
        if (!keyword.trim() && category) {
            // Karena data statis, kita tidak tahu kategori aslinya.
            // Kita bisa mengasumsikan data Anda adalah data "general" atau membuat mapping manual.
            // Untuk kesederhanaan, kita abaikan filter kategori pada data statis
            // dan hanya menggunakan filter keyword/pencarian.
            // JIKA MAU FILTER KATEGORI, Anda harus memiliki properti "category" di setiap objek artikel.
        }

        // 2. Filter Keyword
        if (keyword.trim()) {
            const lowerKeyword = keyword.trim().toLowerCase();
            matchesKeyword = articleTitle.includes(lowerKeyword) || articleDescription.includes(lowerKeyword);
        }

        // 3. Filter Tanggal
        if (fromDate) {
            // Ambil tanggal artikel (misal: 2025-10-31)
            const articleDate = article.publishedAt ? article.publishedAt.substring(0, 10) : '';
            // Pastikan artikel dipublikasikan pada atau setelah tanggal filter
            matchesDate = articleDate >= fromDate; 
        }

        return matchesCategory && matchesKeyword && matchesDate;
    });
    
    // Penanganan Error Kustom
    if (fromDate && !keyword.trim()) {
        setError("Filter tanggal harus disertai dengan Kata Kunci (Keyword). Silakan masukkan kata kunci.");
        filtered = [];
    } else if (filtered.length === 0) {
        setError("Tidak ditemukan berita yang cocok dengan kriteria pencarian Anda.");
    }
    
    // Pagination (Slice Data)
    const offset = (page - 1) * PAGE_SIZE;
    const paginatedArticles = filtered.slice(offset, offset + PAGE_SIZE);

    setArticles(paginatedArticles);
    setTotalResults(filtered.length);
    setLoading(false);
  };
  
  // Ganti useEffect agar memanggil fungsi filter lokal
  useEffect(() => {
    // Memberi sedikit delay agar terasa seperti memuat dari API
    const timer = setTimeout(() => {
        filterLocalArticles();
    }, 500); 

    return () => clearTimeout(timer); // Cleanup
  }, [category, keyword, fromDate, page]); 

  // ... (Sisa handler handleCategoryChange, handleSearchAndFilter, dll. tetap sama) ...
  // ... (Pastikan handler Anda mereset 'page' ke 1 saat filter berubah) ...

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setKeyword(''); 
    setFromDate(''); 
    setPage(1); 
  };
  
  const handleSearchAndFilter = ({ searchKeyword, dateFilter }) => {
    setKeyword(searchKeyword);
    setFromDate(dateFilter);
    setCategory(''); 
    setPage(1); 
  };
  
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0); 
  };


  return (
    // ... (Kembalikan struktur return Anda seperti sebelumnya) ...
    <div className="App">
      <Header 
        categories={['Technology', 'Business', 'Sports']}
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
