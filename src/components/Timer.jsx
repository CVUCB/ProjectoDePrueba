import { useEffect, useState } from 'react';

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;

    const intervalId = setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [running]);

  return (
    <section className="timer" aria-label="Cronómetro">
      <div>
        <span className="timer-label">Tiempo de enfoque</span>
        <strong className="timer-display" aria-live="polite">{formatTime(seconds)}</strong>
      </div>
      <div className="timer-actions">
        <button className="timer-button" type="button" onClick={() => setRunning(!running)}>
          {running ? 'Pausar' : 'Iniciar'}
        </button>
        <button className="timer-reset" type="button" onClick={() => setSeconds(0)}>
          Reiniciar
        </button>
      </div>
    </section>
  );
}

export default Timer;