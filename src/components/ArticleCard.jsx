import React from 'react';

function ArticleCard({ article }) {
  const { urlToImage, title, source, publishedAt, url, description } = article;
  
  const formattedDate = publishedAt 
    ? new Date(publishedAt).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Tanggal tidak diketahui';

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="article-card">
      <div className="card-image-container">
        {/* Thumbnail */}
        {urlToImage 
          ? <img src={urlToImage} alt={title} className="card-image" />
          : <div className="no-image">Gambar Tidak Tersedia</div>
        }
      </div>
      <div className="card-content">
        {/* Judul */}
        <h3>{title}</h3>
        {/* Source dan Tanggal */}
        <p className="card-source-date">
          **{source?.name || 'Sumber Tidak Diketahui'}** | {formattedDate}
        </p>
        <p className="card-description">{description ? description.substring(0, 150) + '...' : 'Baca selengkapnya...'}</p>
      </div>
    </a>
  );
}

export default ArticleCard;