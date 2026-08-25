import { useState } from 'react';

const starterFindings = [
  {
    id: 1,
    pattern: 'Estado duplicado',
    evidence: 'La misma información se deriva en varios estados independientes.',
    location: 'src/App.jsx',
    severity: 'Alta',
    status: 'Pendiente',
  },
  {
    id: 2,
    pattern: 'Identificador no determinista',
    evidence: 'Date.now() puede producir colisiones al crear elementos rápidamente.',
    location: 'src/App.jsx',
    severity: 'Media',
    status: 'Pendiente',
  },
];

const emptyFinding = { pattern: '', evidence: '', location: '', severity: 'Media' };

function AntipatternPanel() {
  const [findings, setFindings] = useState(starterFindings);
  const [form, setForm] = useState(emptyFinding);
  const [filter, setFilter] = useState('Todos');

  const visibleFindings = findings.filter((finding) => (
    filter === 'Todos' || finding.status === filter || finding.severity === filter
  ));

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function addFinding(event) {
    event.preventDefault();
    if (!form.pattern.trim() || !form.evidence.trim()) return;

    setFindings((current) => [...current, {
      ...form,
      id: Date.now(),
      pattern: form.pattern.trim(),
      evidence: form.evidence.trim(),
      location: form.location.trim() || 'Ubicación no indicada',
      status: 'Pendiente',
    }]);
    setForm(emptyFinding);
  }

  function toggleStatus(id) {
    setFindings((current) => current.map((finding) => finding.id === id
      ? { ...finding, status: finding.status === 'Pendiente' ? 'Revisado' : 'Pendiente' }
      : finding));
  }

  return (
    <section className="antipattern-area" aria-labelledby="antipattern-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 · Calidad de código</p>
          <h2 id="antipattern-title">Radar de antipatrones</h2>
        </div>
        <div className="finding-count"><strong>{findings.filter((finding) => finding.status === 'Pendiente').length}</strong> hallazgos pendientes</div>
      </div>
      <p className="section-note">Registra malas prácticas con evidencia concreta para que el agente de IA pueda verificarlas en cada Pull Request.</p>

      <div className="antipattern-grid">
        <form className="panel finding-form" onSubmit={addFinding}>
          <div className="panel-label"><span>Nuevo hallazgo</span><span>03</span></div>
          <label htmlFor="pattern">Antipatrón detectado</label>
          <input id="pattern" name="pattern" value={form.pattern} onChange={updateField} placeholder="Ej. Función demasiado larga" />
          <label htmlFor="evidence">Evidencia para el agente</label>
          <textarea id="evidence" name="evidence" value={form.evidence} onChange={updateField} placeholder="Describe qué debe comprobar en el PR" rows="3" />
          <div className="form-row">
            <div>
              <label htmlFor="location">Archivo o ubicación</label>
              <input id="location" name="location" value={form.location} onChange={updateField} placeholder="src/components/..." />
            </div>
            <div>
              <label htmlFor="severity">Severidad</label>
              <select id="severity" name="severity" value={form.severity} onChange={updateField}>
                <option>Alta</option>
                <option>Media</option>
                <option>Baja</option>
              </select>
            </div>
          </div>
          <button className="primary" type="submit">Registrar hallazgo <span aria-hidden="true">↗</span></button>
        </form>

        <div className="finding-list-wrap">
          <div className="finding-toolbar">
            <span className="list-label">Hallazgos marcados</span>
            <div className="tabs" role="tablist" aria-label="Filtrar antipatrones">
              {['Todos', 'Pendiente', 'Alta'].map((option) => (
                <button key={option} className={`tab ${filter === option ? 'active' : ''}`} onClick={() => setFilter(option)} type="button">
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="finding-list">
            {visibleFindings.length ? visibleFindings.map((finding) => (
              <article className={`finding severity-${finding.severity.toLowerCase()}`} key={finding.id}>
                <div className="finding-topline"><span className="severity">{finding.severity}</span><span className="finding-location">{finding.location}</span></div>
                <h3>{finding.pattern}</h3>
                <p>{finding.evidence}</p>
                <button className={`status ${finding.status === 'Revisado' ? 'is-reviewed' : ''}`} onClick={() => toggleStatus(finding.id)} type="button">
                  {finding.status === 'Pendiente' ? 'Marcar como revisado' : 'Reabrir hallazgo'}
                </button>
              </article>
            )) : <div className="empty">No hay hallazgos con este filtro.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AntipatternPanel;
