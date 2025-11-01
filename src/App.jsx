import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import ArticleCard from './components/ArticleCard';
import Pagination from './components/Pagination';
import './App.css';

// Konfigurasi API
const API_KEY = '843278fddec04f52b89907fc44762a08';
const PAGE_SIZE = 10; 

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State untuk Filter & Pagination
  const [category, setCategory] = useState('technology'); 
  const [keyword, setKeyword] = useState('');
  const [fromDate, setFromDate] = useState(''); 
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Fungsi Fetch Data Utama
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    setArticles([]); 
    setTotalResults(0); 

    let url = '';
    let params = new URLSearchParams();
    params.append('apiKey', API_KEY);
    params.append('pageSize', PAGE_SIZE);
    params.append('page', page);

    if (fromDate && !keyword.trim()) {
        // Jika hanya tanggal yang diisi tanpa keyword
        setError("Filter tanggal harus disertai dengan Kata Kunci (Keyword) karena batasan API NewsAPI.");
        setLoading(false);
        return; // Hentikan panggilan API
    }

    if (keyword.trim()) { 
        url = `https://newsapi.org/v2/everything`;
        params.append('q', keyword.trim());
        
        if (fromDate) { 
            params.append('from', fromDate);
        }
        params.append('language', 'en'); 
        
    } else { // Pencarian Kategori (default)
        url = `https://newsapi.org/v2/top-headlines`;
        params.append('category', category || 'general'); 
        params.append('country', 'us'); 
    }

    if (!url) {
        setError("Tidak dapat membuat permintaan API. Coba reset pencarian.");
        setLoading(false);
        return;
    }

    const fullUrl = `${url}?${params.toString()}`;

    try {
      const response = await fetch(fullUrl);
      const data = await response.json();

      if (data.status !== 'ok') {
        throw new Error(`API Error: ${data.message || 'Gagal memuat artikel.'}`);
      }
      
      setArticles(data.articles);
      setTotalResults(data.totalResults);
      
      // Pemberitahuan kustom jika tidak ada hasil
      if (data.totalResults === 0 && !data.articles.length && (keyword || category)) {
          const searchParam = keyword ? `kata kunci "${keyword}"` : `kategori "${category}"`;
          setError(`Tidak ditemukan berita untuk ${searchParam} pada tanggal ${fromDate || 'apapun'}.`);
      }

    } catch (err) {
      setError('Gagal memuat artikel: ' + err.message);
      setArticles([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [category, keyword, fromDate, page]); 

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
          ) : !loading && !error && <p className="status-message">Tidak ada artikel ditemukan. Coba ubah kategori atau kata kunci.</p>}
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
