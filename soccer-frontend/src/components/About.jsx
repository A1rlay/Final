import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4">Acerca del gestor de ligas</h2>
            <p className="lead">La solucion defintiva para organizar y manejar tus ligas deportivas</p>
            <p>Nuesta plataforma ha sido diseña por entusiastas del deportes. Entendemos los desafios de manejar equipos, calendarios y resultados, por lo que hemos creado una herramienta para simplificar estas tareas.</p>
            <p>Ya sea que estás a cargo de una pequeña liga local o un gran torneo competitivo, nuestro sistema escala para satisfacer tus necesidades.</p>
            <a href="/manage" className="btn btn-primary mt-3">Comienza a manejar tu liga</a>
          </div>
          <div className="col-lg-6">
            <img src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" alt="Team huddle" className="img-fluid rounded shadow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
