import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from './services/api';
import swal from 'sweetalert';
import './styles.css';

function App() {
  
  let randomColor;
  let isBoolean = false;
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});
  const shouldApplyStyle = Object.keys(cep).length > 0;

  if(Object.keys(cep).length > 0 && input.length == 0 ){
    randomColor = "#"+((1<<24)*Math.random()|0).toString(16); 
    document.documentElement.style.setProperty('--main-bg-color', randomColor);
  }

  async function handleSearch(){
    
    if(input === ''){
      swal("Alerta!", "Nenhum CEP informado.", "warning");
      setCep({});
      return;
    }

    try{
      setCep({});
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
      isBoolean = true;
    }catch{
      swal("Erro", "Nenhum endereço encontrado", "error" );
      setInput("");
      setCep({});
    }

  }

  return (
    <div className="container">
      
      <div className="reactLogo">
        <img src={process.env.PUBLIC_URL+"React_logo_wordmark.png"}  alt="Powered by ReactJs"/>
      </div>

      <h1 className="title">Buscador de CEP</h1>
      
      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu CEP..."
        value={input}
        onChange={(event) => setInput(event.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>

      
        
        {Object.keys(cep).length > 0 && (
          <main className="main" style={{ backgroundColor: randomColor }} >
              
            <h2>CEP: {cep.cep}</h2>
    
            { !!cep.logradouro && (<span>Rua:  {cep.logradouro}</span>
            )}
            <span>Cidade: {cep.localidade}</span>
            { !!cep.bairro && (<span>Bairro: {cep.bairro}</span>
            )}
            <span>Estado: {cep.uf}</span>
            <span>DDD: {cep.ddd}</span>
          </main>
        )}

    </div>
  );
}

export default App;
