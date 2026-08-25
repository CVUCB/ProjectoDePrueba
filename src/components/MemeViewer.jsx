import { useEffect, useRef, useState } from 'react';

const MEME_API_URL = 'https://meme-api.com/gimme';

function MemeViewer() {
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const mountedRef = useRef(false);
  const requestControllerRef = useRef(null);

  async function loadMeme() {
    requestControllerRef.current?.abort();
    const controller = new AbortController();
    requestControllerRef.current = controller;
    setLoading(true);
    setError('');
    setMeme(null);
    try {
      const response = await fetch(MEME_API_URL, { signal: controller.signal });
      if (!response.ok) throw new Error('No se pudo obtener el meme');
      const data = await response.json();
      if (!data?.url || !data?.title || !data?.postLink) throw new Error('La respuesta no tiene un formato válido');
      if (mountedRef.current && requestControllerRef.current === controller) setMeme(data);
    } catch (requestError) {
      if (requestError.name !== 'AbortError' && mountedRef.current && requestControllerRef.current === controller) {
        setError('No pudimos cargar un meme. Inténtalo de nuevo.');
      }
    } finally {
      if (mountedRef.current && requestControllerRef.current === controller) {
        requestControllerRef.current = null;
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    mountedRef.current = true;
    let timeoutId;

    async function refreshMeme() {
      await loadMeme();
      if (mountedRef.current) timeoutId = setTimeout(refreshMeme, 30000);
    }

    refreshMeme();
    return () => {
      mountedRef.current = false;
      clearTimeout(timeoutId);
      requestControllerRef.current?.abort();
    };
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