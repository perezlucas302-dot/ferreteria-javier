import React, { useState } from 'react';

/**
 * Tarjeta de categoría con un efecto "pop": salta/escala al pasar el mouse
 * (desktop) o al tocarla (mobile).
 */
const ServiceCard = ({ icon: Icon, label }) => {
  const [popped, setPopped] = useState(false);

  // En mobile no hay :hover confiable, así que el tap dispara el mismo
  // efecto "a mano" por un instante.
  const handleTap = () => {
    setPopped(true);
    setTimeout(() => setPopped(false), 300);
  };

  return (
    <div
      onClick={handleTap}
      className={`flex flex-col items-center p-4 bg-zinc-800 rounded border border-zinc-700 cursor-pointer
        transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-1 hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/10
        ${popped ? 'scale-110 -translate-y-1 border-yellow-500' : ''}`}
    >
      <Icon className="mb-2 text-yellow-500" />
      <span className="font-semibold text-zinc-200">{label}</span>
    </div>
  );
};

export default ServiceCard;
