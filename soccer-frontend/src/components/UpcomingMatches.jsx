import React, { useState, useEffect } from 'react';

const UpcomingMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchMatches = async () => {
      try {
        // In a real app, you would fetch from your API
        const mockMatches = [
          { id: 1, homeTeam: 'Equipo A', awayTeam: 'Equipo B', date: '2023-10-15', time: '19:00' },
          { id: 2, homeTeam: 'Equipo C', awayTeam: 'Equipo D', date: '2023-10-16', time: '20:30' },
          { id: 3, homeTeam: 'Equipo E', awayTeam: 'Equipo F', date: '2023-10-17', time: '18:00' }
        ];
        setMatches(mockMatches);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching matches:", error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <section id="matches" className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Partidos cercanos</h2>
          <p className="text-muted">Revisa los siguientes juegos emocionantes en nuestra liga.</p>
        </div>
        <div className="row g-4">
          {loading ? (
            <div className="col-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : (
            matches.map(match => (
              <div className="col-md-4" key={match.id}>
                <div className="card match-card h-100 border-0 shadow-sm">
                  <div className="card-body text-center p-4">
                    <h5>{match.homeTeam} vs {match.awayTeam}</h5>
                    <p className="text-muted">{match.date} a las {match.time}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-4">
          <a href="/manage" className="btn btn-outline-primary">Ver todos los partidos</a>
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatches;
