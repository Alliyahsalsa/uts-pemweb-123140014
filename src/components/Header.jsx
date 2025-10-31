import React from 'react';

function Header({ categories, activeCategory, onCategoryChange }) {
  const visibleCategories = categories.slice(0, 3); 

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <h1 className="header-title">News Portal</h1> 
        </div>
        {/* Wajib 1: Navigation bar dengan kategori */}
        <nav className="navbar">
          {visibleCategories.map((cat) => (
            <button
              key={cat}
              className={`nav-item ${activeCategory.toLowerCase() === cat.toLowerCase() ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.toLowerCase())}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;