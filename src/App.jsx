import React, { useState, useEffect } from 'react';
import newsData from './newsData.json'; 

// Import komponen lainnya
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ArticleCard from './components/ArticleCard';
import Pagination from './components/Pagination';
import './App.css';

// Variabel Statis
const PAGE_SIZE = 10; 
const ALL_ARTICLES = newsData.articles || []; 

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Default ke kategori 'technology'
  const [category, setCategory] = useState('technology'); 
  const [keyword, setKeyword] = useState('');
  const [fromDate, setFromDate] = useState(''); 
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // FUNGSI FILTER DATA LOKAL
  const filterLocalArticles = () => {
    setLoading(true);
    setError(null);
    
    let filtered = ALL_ARTICLES;
    const lowerKeyword = keyword.trim().toLowerCase();

    // 1. Validasi Tanggal Tanpa Keyword
    if (fromDate && !lowerKeyword) {
        setError("Filter tanggal harus disertai dengan Kata Kunci (Keyword) sesuai skema API.");
        filtered = [];
    } 
    
    // 2. Filter Berdasarkan Keyword dan Tanggal
    else if (lowerKeyword || fromDate) {
        
        filtered = ALL_ARTICLES.filter(article => {
            let matchesKeyword = true;
            let matchesDate = true;

            const articleTitle = (article.title || '').toLowerCase();
            const articleDescription = (article.description || '').toLowerCase();
            const articleDate = article.publishedAt ? article.publishedAt.substring(0, 10) : '';

            // Filter Keyword
            if (lowerKeyword) {
                matchesKeyword = articleTitle.includes(lowerKeyword) || articleDescription.includes(lowerKeyword);
            }
            
            // Filter Tanggal
            if (fromDate) {
                 matchesDate = articleDate >= fromDate; 
            }

            return matchesKeyword && matchesDate;
        });
        
        // Penanganan jika hasil pencarian keyword 0
        if (filtered.length === 0) {
             setError(`Tidak ditemukan berita yang cocok dengan kata kunci "${keyword}" pada tanggal ${fromDate || 'apapun'}.`);
        }
        
    } 
    
    // 3. Filter KATEGORI
    else {
        // Logika utama perbaikan kategori ada di sini:
        const lowerCategory = category.toLowerCase();
        
        filtered = ALL_ARTICLES.filter(article => {
             return article.category && article.category.toLowerCase() === lowerCategory;
        });
        
        // Penanganan jika kategori tidak memiliki data
        if (filtered.length === 0) {
             setError(`Tidak ada artikel yang tersedia untuk kategori ${category} di data statis.`);
        }
    }
    
    // PAGINATION
    const offset = (page - 1) * PAGE_SIZE;
    const paginatedArticles = filtered.slice(offset, offset + PAGE_SIZE);

    setArticles(paginatedArticles);
    setTotalResults(filtered.length);
    
    setTimeout(() => {
        setLoading(false);
    }, 500); 
  };
  
  useEffect(() => {
    if (!keyword.trim()) {
      filterLocalArticles();
    } else {
      filterLocalArticles();
    }
  }, [category, keyword, fromDate, page]); 

  // Handler Category Change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setKeyword(''); 
    setFromDate(''); 
    setPage(1); 
  };
  
  // Handler Search and Filter
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
