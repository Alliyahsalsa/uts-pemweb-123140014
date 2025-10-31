import React, { useState, useEffect } from 'react';

function SearchForm({ onSearch, currentKeyword, currentDate }) {
  const [keyword, setKeyword] = useState(currentKeyword || '');
  const [date, setDate] = useState(currentDate || ''); 
  
  // Sinkronisasi state lokal dengan props
  useEffect(() => {
    setKeyword(currentKeyword || '');
  }, [currentKeyword]);

  useEffect(() => {
    setDate(currentDate || '');
  }, [currentDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ searchKeyword: keyword.trim(), dateFilter: date });
  };
  
  const handleClearAll = () => {
      setKeyword('');
      setDate('');
      onSearch({ searchKeyword: '', dateFilter: '' });
  };

  const isFormDirty = keyword.trim() || date.trim();

  return (
    <div className="search-form-container">
        <form className="search-form" onSubmit={handleSubmit}>
          
          <div className="search-input-group">
            {/* Ikon di sini jika Anda menggunakannya */}
            <input
              type="text"
              placeholder="Cari artikel berdasarkan keyword..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="date-input-group">
            {/* Ikon di sini jika Anda menggunakannya */}
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              title="Filter mulai dari tanggal ini (Memerlukan Keyword)"
              className="date-input"
            />
          </div>
          
          <button type="submit" className="search-submit-btn">
            Cari
          </button>
          
          {isFormDirty && (
              <button 
                  type="button" 
                  onClick={handleClearAll} 
                  className="clear-all-btn"
              >
                  Reset
              </button>
          )}

        </form>
    </div>
  );
}

export default SearchForm;