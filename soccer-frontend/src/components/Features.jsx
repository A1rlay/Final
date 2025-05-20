import React from 'react';
import { FaCalendarAlt, FaTable, FaChartLine } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaCalendarAlt />,
      title: "Agendado de partidos",
      description: "Agenda partidos facilmente, pon los lugares y maneja las fechas con nuestra interfaz intuitiva."
    },
    {
      icon: <FaTable />,
      title: "Tabla de ligas",
      description: "Generacion automatica de tablas de ligas basado en los resultados del partido y el desempeño de los jugadores."
    },
    {
      icon: <FaChartLine />,
      title: "Estadisticas de jugadores",
      description: "Sigue el desempeño de los jugadores con estadisticas y análisis precisos."
    }
  ];

  return (
    <section id="features" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Poderosas funciones</h2>
          <p className="text-muted">Todo lo que necesitas para manejar tu liga de manera eficiente</p>
        </div>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="feature-icon">
                    {feature.icon}
                  </div>
                  <h4>{feature.title}</h4>
                  <p className="text-muted">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
