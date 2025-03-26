import { useState } from 'react'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { SearchBar } from './components/SearchBar'
import { CatheterForm } from './components/CatheterForm'
import { PatientList } from './components/PatientList'
import { Footer } from './components/Footer'
import { usePacientes } from './hooks/usePacientes'
import { NovoPaciente } from './types'
import './App.css'


function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  const { 
    pacientes, 
    pacientesFiltrados, 
    termoPesquisa, 
    setTermoPesquisa,
    totalTrocasPendentes,
    adicionarPaciente,
    removerPaciente
  } = usePacientes();

  const handleSubmitCatheter = (novoPaciente: NovoPaciente) => {
    adicionarPaciente(novoPaciente);
    setMostrarFormulario(false);
  };

  return (
    <div className="sife-line-container">
      <Header />
      
      <main className="dashboard">
        <Dashboard 
          totalPacientes={pacientes.length} 
          trocasPendentes={totalTrocasPendentes} 
        />
        
        <div className="acoes">
          <SearchBar 
            value={termoPesquisa} 
            onChange={setTermoPesquisa} 
          />
          
          <button 
            className="botao-principal" 
            onClick={() => setMostrarFormulario(true)}
          >
            + Novo Cateter
          </button>
        </div>
        
        {mostrarFormulario && (
          <CatheterForm 
            onSubmit={handleSubmitCatheter}
            onCancel={() => setMostrarFormulario(false)}
          />
        )}
        
        <PatientList 
          pacientes={pacientesFiltrados} 
          onRemoverPaciente={removerPaciente}
        />
      </main>
      
      <Footer />
    </div>
  )
}

export default App
