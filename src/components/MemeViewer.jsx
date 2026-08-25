import { useEffect, useState } from 'react';

const MEME_API_URL = 'https://meme-api.com/gimme';

function MemeViewer() {
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadMeme() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(MEME_API_URL);
      setMeme(await response.json());
    } catch {
      setError('No pudimos cargar un meme. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMeme();
    setInterval(loadMeme, 30000);
  }, []);

  return (
    <section className="meme-viewer" aria-live="polite">
      <div className="meme-heading">
        <div>
          <div className="panel-label">Pausa visual <span>cada 30 s</span></div>
          <h2>Un meme para despejar la mente.</h2>
        </div>
        <button className="primary meme-button" type="button" onClick={loadMeme} disabled={loading}>
          {loading ? 'Cargando...' : 'Otro meme'} <span aria-hidden="true">↗</span>
        </button>
      </div>
      <div className="meme-stage">
        {loading && <p className="meme-status">Buscando un meme...</p>}
        {!loading && error && (
          <div className="meme-status">
            <p>{error}</p>
            <button className="tab active" type="button" onClick={loadMeme}>Reintentar</button>
          </div>
        )}
        {!loading && !error && meme && (
          <figure className="meme-card">
            <img src={meme.url} alt={meme.title} />
            <figcaption>
              <strong>{meme.title}</strong>
              <a href={meme.postLink} target="_blank" rel="noreferrer">Ver publicación original ↗</a>
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}

export default MemeViewer;