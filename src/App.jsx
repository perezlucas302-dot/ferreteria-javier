import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, Hammer, Wrench, PaintBucket, Trash2, Plus, Send, Users, CheckCircle, Clock } from 'lucide-react';

const App = () => {
  // Estado para la lista de productos del presupuesto
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState('');
  const [currentQty, setCurrentQty] = useState('');

  // Datos de contacto de la ferretería
  const phoneNumber = "5491164026088"; 
  const email = "barrionuevo.online@gmail.com";
  const address = "Av. Avellaneda 3384, Virreyes, Bs. As.";

  // EFECTO DE PROTECCIÓN: Advertencia al intentar recargar o cerrar la página
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Solo activamos la alerta si hay items en la lista
      if (items.length > 0) {
        e.preventDefault();
        // Esto activa el mensaje estándar del navegador (Chrome/Edge no dejan personalizar el texto)
        e.returnValue = ''; 
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Limpieza del evento cuando el componente se desmonta
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [items]); // Se ejecuta cada vez que cambia la lista de items

  // Función para agregar item a la lista
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!currentItem) return;
    
    const newItem = {
      id: Date.now(),
      product: currentItem,
      qty: currentQty || 'A confirmar' 
    };
    
    setItems([...items, newItem]);
    setCurrentItem('');
    setCurrentQty('');
  };

  // Función para eliminar item
  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Función para generar el link de WhatsApp (Presupuesto)
  const sendBudgetToWhatsApp = () => {
    // VALIDACIÓN: Si el usuario escribió un producto pero se olvidó de darle al (+), no dejamos enviar.
    if (currentItem) {
      alert("⚠️ ¡Atención!\n\nTienes un producto escrito ('" + currentItem + "') que todavía no agregaste a la lista.\n\nPor favor, tocá el botón (+) para sumarlo o borralo antes de enviar.");
      return;
    }

    if (items.length === 0) return;

    let message = "Hola Ferretería Javier, me gustaría solicitar un presupuesto para los siguientes artículos:\n\n";
    items.forEach((item, index) => {
      message += `• ${item.product} (Cant: ${item.qty})\n`;
    });
    message += "\nQuedo a la espera de la confirmación y precios. ¡Gracias!";

    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Link para consultas generales (Header)
  const whatsappConsultasUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent("Hola Ferretería Javier, tengo una consulta:")}`;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-yellow-400">
      
      {/* --- HEADER / NAV --- */}
      <nav className="bg-zinc-900 text-white sticky top-0 z-50 border-b-4 border-yellow-500 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-500 p-2 rounded text-zinc-900">
              <Hammer size={24} strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">FERRETERÍA <span className="text-yellow-500">JAVIER</span></h1>
          </div>
          
          {/* Botón de WhatsApp Directo */}
          <a 
            href={whatsappConsultasUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-yellow-500 hover:bg-yellow-400 text-zinc-900 font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center gap-2"
          >
            {/* SVG Inline de WhatsApp para máxima fidelidad visual */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span className="hidden sm:inline">Contacto</span>
          </a>
        </div>
      </nav>

      {/* --- HERO SECTION (Limpio: Sin foto, con patrón de puntos) --- */}
      <header className="bg-zinc-900 text-white py-20 px-4 text-center relative overflow-hidden">
        {/* Fondo decorativo sutil (puntos amarillos) */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-yellow-500">
            SOLUCIONES SÓLIDAS <br/> <span className="text-white">PARA TU HOGAR</span>
          </h2>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Desde herramientas profesionales hasta el tornillo que te falta. 
            Atención personalizada y experiencia de verdad.
          </p>
          <a href="#presupuesto" className="inline-block bg-white text-zinc-900 hover:bg-yellow-500 hover:text-black font-bold text-lg py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-xl">
            Pedir Presupuesto Online
          </a>
        </div>
      </header>

      {/* --- NOSOTROS --- */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Users className="text-yellow-600" /> ¿Quiénes Somos?
            </h3>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
              Somos una ferretería de barrio con mentalidad moderna. Nos enorgullece no solo vender herramientas, 
              sino asesorarte para que tu proyecto salga perfecto.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            {/* Card Javier */}
            <div className="p-6 bg-zinc-50 rounded-xl shadow-sm border border-zinc-100 hover:border-yellow-500 transition-colors group">
              <div className="w-16 h-16 bg-zinc-900 group-hover:bg-yellow-500 transition-colors rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500 group-hover:text-zinc-900 font-bold text-2xl">J</div>
              <h4 className="text-xl font-bold mb-2">Javier</h4>
              <p className="text-xs font-bold text-yellow-600 mb-3 uppercase tracking-wide">Dueño & Fundador</p>
              <p className="text-zinc-600 text-sm">
                "Más de 30 años en el rubro. El capitán del barco que conoce cada rincón de la ferretería."
              </p>
            </div>

            {/* Card Jorge */}
            <div className="p-6 bg-zinc-50 rounded-xl shadow-sm border border-zinc-100 hover:border-yellow-500 transition-colors group">
              <div className="w-16 h-16 bg-zinc-900 group-hover:bg-yellow-500 transition-colors rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500 group-hover:text-zinc-900 font-bold text-2xl">J</div>
              <h4 className="text-xl font-bold mb-2">Jorge</h4>
              <p className="text-xs font-bold text-yellow-600 mb-3 uppercase tracking-wide">Ventas</p>
              <p className="text-zinc-600 text-sm">
                "Especialista en mostrador. Te ayuda a encontrar la solución exacta sin gastar de más."
              </p>
            </div>

            {/* Card Ezequiel */}
            <div className="p-6 bg-zinc-50 rounded-xl shadow-sm border border-zinc-100 hover:border-yellow-500 transition-colors group">
              <div className="w-16 h-16 bg-zinc-900 group-hover:bg-yellow-500 transition-colors rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500 group-hover:text-zinc-900 font-bold text-2xl">E</div>
              <h4 className="text-xl font-bold mb-2">Ezequiel</h4>
              <p className="text-xs font-bold text-yellow-600 mb-3 uppercase tracking-wide">Asistente</p>
              <p className="text-zinc-600 text-sm">
                "El complemento ideal del equipo. Refuerza la atención los días clave para que no esperes de más."
              </p>
            </div>

            {/* Card Lucas */}
            <div className="p-6 bg-zinc-50 rounded-xl shadow-sm border border-zinc-100 hover:border-yellow-500 transition-colors group">
              <div className="w-16 h-16 bg-zinc-900 group-hover:bg-yellow-500 transition-colors rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-500 group-hover:text-zinc-900 font-bold text-2xl">L</div>
              <h4 className="text-xl font-bold mb-2">Lucas</h4>
              <p className="text-xs font-bold text-yellow-600 mb-3 uppercase tracking-wide">Atención & Web</p>
              <p className="text-zinc-600 text-sm">
                "Modernizando la ferretería. Encargado de que tus pedidos online lleguen rápido y sin errores."
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* --- CATEGORÍAS RÁPIDAS (CORREGIDO: Sin Hover engañoso) --- */}
      <section className="bg-zinc-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-center text-2xl font-bold mb-8">Todo lo que buscas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* ÍTEMS ESTÁTICOS (Sin hover amarillo, cursor normal) */}
            <div className="flex flex-col items-center p-4 bg-zinc-800 rounded cursor-default border border-zinc-700">
              <PaintBucket className="mb-2 text-yellow-500" />
              <span className="font-semibold text-zinc-200">Pinturas</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-zinc-800 rounded cursor-default border border-zinc-700">
              <Wrench className="mb-2 text-yellow-500" />
              <span className="font-semibold text-zinc-200">Herramientas</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-zinc-800 rounded cursor-default border border-zinc-700">
              <CheckCircle className="mb-2 text-yellow-500" />
              <span className="font-semibold text-zinc-200">Fijaciones</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-zinc-800 rounded cursor-default border border-zinc-700">
              <Send className="mb-2 text-yellow-500" />
              <span className="font-semibold text-zinc-200">Electricidad</span>
            </div>

          </div>
        </div>
      </section>

      {/* --- ARMADOR DE PRESUPUESTO (CORE FEATURE) --- */}
      <section id="presupuesto" className="py-16 px-4 bg-yellow-50">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-yellow-200">
          <div className="bg-zinc-900 p-6 text-center">
            <h3 className="text-2xl font-bold text-white">Armá tu pedido</h3>
            <p className="text-yellow-500 text-sm mt-1">Te confirmamos precio y stock por WhatsApp</p>
          </div>
          
          <div className="p-6 md:p-8">
            {/* Input Form */}
            <form onSubmit={handleAddItem} className="flex flex-col md:flex-row gap-3 mb-6">
              <div className="flex-grow">
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Producto</label>
                <input 
                  type="text" 
                  placeholder="Ej: Tornillos T1 punta aguja" 
                  className="w-full p-3 border border-zinc-300 rounded focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  value={currentItem}
                  onChange={(e) => setCurrentItem(e.target.value)}
                />
              </div>
              <div className="md:w-1/3">
                <label className="block text-xs font-bold text-zinc-500 uppercase mb-1">Cantidad / Medida <span className="text-zinc-400 font-normal lowercase">(opcional)</span></label>
                <input 
                  type="text" 
                  placeholder="Ej: 100 u./ 2 lts." 
                  className="w-full p-3 border border-zinc-300 rounded focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  value={currentQty}
                  onChange={(e) => setCurrentQty(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <button 
                  type="submit"
                  disabled={!currentItem}
                  className={`w-full md:w-auto p-3 rounded font-bold transition-colors flex justify-center items-center gap-2
                    ${!currentItem 
                      ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed' 
                      : 'bg-zinc-900 text-white hover:bg-zinc-700'
                    }`}
                >
                  <Plus size={20} /> <span className="md:hidden">Agregar</span>
                </button>
              </div>
            </form>

            {/* List */}
            <div className="bg-zinc-50 rounded-lg border border-zinc-200 min-h-[150px] p-4 mb-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-400 py-8">
                  <Wrench size={48} className="mb-2 opacity-20" />
                  <p>Tu lista está vacía. Agregá productos arriba.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center bg-white p-3 rounded shadow-sm border-l-4 border-yellow-500 animate-in fade-in slide-in-from-bottom-2">
                      <div>
                        <span className="font-bold text-zinc-800 block">{item.product}</span>
                        <span className="text-sm text-zinc-500">Cantidad: {item.qty}</span>
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Action Button */}
            <button 
              onClick={sendBudgetToWhatsApp}
              disabled={items.length === 0}
              className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-md
                ${items.length === 0 
                  ? 'bg-zinc-300 text-zinc-500 cursor-not-allowed' 
                  : 'bg-[#25D366] text-white hover:bg-[#20bd5a] hover:shadow-lg transform hover:-translate-y-1'
                }`}
            >
              <Send size={20} /> Enviar pedido por WhatsApp
            </button>
            <p className="text-center text-xs text-zinc-400 mt-3">
              Al hacer click, se abrirá WhatsApp con tu lista lista para enviar.
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER / CONTACTO --- */}
      <footer id="contacto" className="bg-zinc-950 text-zinc-400 py-12 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          
          {/* Columna 1: Contacto (primero) */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Contacto & Ubicación</h4>
            <div className="flex items-start gap-3">
              <MapPin className="text-yellow-500 mt-1 flex-shrink-0" size={18} />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-yellow-500 flex-shrink-0" size={18} />
              <span className="hover:text-yellow-500 transition-colors cursor-pointer">11-6402-6088 (WhatsApp)</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-yellow-500 flex-shrink-0" size={18} />
              <span>{email}</span>
            </div>
          </div>
          
          {/* Columna 2: Horarios */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2 flex items-center gap-2">
              <Clock className="text-yellow-500" size={20} /> Horarios de Atención
            </h4>
            <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 text-sm">
              <div className="mb-3">
                <span className="text-yellow-500 font-bold block uppercase text-xs mb-1">Lunes a Sábados</span>
                <span className="block">8:00 a 13:00 hs</span>
                <span className="block">15:00 a 19:30 hs</span>
              </div>
              <div>
                <span className="text-yellow-500 font-bold block uppercase text-xs mb-1">Domingos y Feriados</span>
                <span className="block">9:00 a 13:00 hs</span>
              </div>
            </div>
          </div>

          {/* Columna 3: Marca de agua */}
          <div className="md:col-span-1">
            <h4 className="text-white text-xl font-bold mb-4">FERRETERÍA JAVIER</h4>
            <p className="mb-4 max-w-sm text-sm">
              Tu ferretería de confianza en Virreyes. Soluciones rápidas, precios justos y la mejor atención del barrio.
            </p>
            <div className="text-xs mt-4 pt-4 border-t border-zinc-900">
              <p>&copy; 2000 Ferretería Javier.</p>
              <p>Desarrollado por Lucas Ezequiel Perez.</p>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default App;