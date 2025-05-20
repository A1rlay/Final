import React from 'react';

const HeroSection = () => {
  return (
    <section className="hero-section text-center">
      <div className="container">
        <h1 className="display-4 fw-bold mb-4">Gestiona tus ligas como un pro</h1>
        <p className="lead mb-5">Configura tus operaciones de liga con nuestras herramientas como un pro</p>
        <div className="d-flex justify-content-center gap-3">
          <a href="matches.html" className="btn btn-primary btn-lg px-4">Empecemos</a>
          <a href="#features" className="btn btn-outline-light btn-lg px-4">Mas</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
