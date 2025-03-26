import { useState } from 'react';
import { NovoPaciente, TipoCateter } from '../../types';


interface CatheterFormProps {
  onSubmit: (novoPaciente: NovoPaciente) => void;
  onCancel: () => void;
}

export function CatheterForm({ onSubmit, onCancel }: CatheterFormProps) {
  const [novoPaciente, setNovoPaciente] = useState<NovoPaciente>({
    nome: '',
    quarto: '',
    tipoCateter: TipoCateter.PERIFERICO,
    dataInsercao: '',
    horarioInsercao: '',
    dataRemocao: '',
    horarioRemocao: ''
  });
  

  const [errors, setErrors] = useState({
    dataInsercao: '',
    dataRemocao: ''
  });


  const validarDatas = (): boolean => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    

    let dataInsObj;
    if (novoPaciente.dataInsercao.includes('-')) {

      const [ano, mes, dia] = novoPaciente.dataInsercao.split('-');
      dataInsObj = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
      

      if (novoPaciente.horarioInsercao) {
        const [hora, minuto] = novoPaciente.horarioInsercao.split(':');
        dataInsObj.setHours(parseInt(hora), parseInt(minuto));
      }
    } else {
      dataInsObj = new Date(novoPaciente.dataInsercao);
    }
    

    let dataRemObj;
    if (novoPaciente.dataRemocao.includes('-')) {
      const [ano, mes, dia] = novoPaciente.dataRemocao.split('-');
      dataRemObj = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
      

      if (novoPaciente.horarioRemocao) {
        const [hora, minuto] = novoPaciente.horarioRemocao.split(':');
        dataRemObj.setHours(parseInt(hora), parseInt(minuto));
      }
    } else {
      dataRemObj = new Date(novoPaciente.dataRemocao);
    }
    

    const dataInsObjApenasData = new Date(dataInsObj);
    dataInsObjApenasData.setHours(0, 0, 0, 0);
    

    if (dataInsObjApenasData < hoje) {
      setErrors(prev => ({
        ...prev,
        dataInsercao: 'A data de inserção não pode ser anterior a hoje'
      }));
      return false;
    }
    

    if (dataInsObj > new Date()) {
      setErrors(prev => ({
        ...prev,
        dataInsercao: 'A data de inserção não pode ser no futuro'
      }));
      return false;
    }
    

    if (dataRemObj < dataInsObj) {
      setErrors(prev => ({
        ...prev,
        dataRemocao: 'A data de remoção deve ser posterior à data de inserção'
      }));
      return false;
    }
    

    setErrors({
      dataInsercao: '',
      dataRemocao: ''
    });
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    

    if (!novoPaciente.nome || !novoPaciente.quarto || 
        !novoPaciente.dataInsercao || !novoPaciente.horarioInsercao ||
        !novoPaciente.dataRemocao || !novoPaciente.horarioRemocao) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    

    if (!validarDatas()) {
      return; 
    }
    

    let pacienteFormatado = { ...novoPaciente };
    
 
    if (pacienteFormatado.dataInsercao.includes('-')) {
      const [ano, mes, dia] = pacienteFormatado.dataInsercao.split('-');
      pacienteFormatado.dataInsercao = `${dia}/${mes}/${ano}`;
    }
    
    if (pacienteFormatado.dataRemocao.includes('-')) {
      const [ano, mes, dia] = pacienteFormatado.dataRemocao.split('-');
      pacienteFormatado.dataRemocao = `${dia}/${mes}/${ano}`;
    }
    

    onSubmit(pacienteFormatado);
    

    setNovoPaciente({
      nome: '',
      quarto: '',
      tipoCateter: TipoCateter.PERIFERICO,
      dataInsercao: '',
      horarioInsercao: '',
      dataRemocao: '',
      horarioRemocao: ''
    });
  };

  return (
    <div className="modal-overlay">
      <div className="formulario-container">
        <h3>Cadastrar Novo Cateter</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grupo">
            <label>Nome do Paciente</label>
            <input 
              type="text" 
              value={novoPaciente.nome}
              onChange={(e) => setNovoPaciente({...novoPaciente, nome: e.target.value})}
              required
            />
          </div>
          
          <div className="form-grupo">
            <label>Quarto/Leito</label>
            <input 
              type="text" 
              value={novoPaciente.quarto}
              onChange={(e) => setNovoPaciente({...novoPaciente, quarto: e.target.value})}
              required
            />
          </div>
          
          <div className="form-grupo">
            <label>Tipo de Cateter</label>
            <select 
              value={novoPaciente.tipoCateter}
              onChange={(e) => setNovoPaciente({...novoPaciente, tipoCateter: e.target.value})}
            >
              {Object.values(TipoCateter).map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>
          
          <div className="form-grupo">
            <label>Data e Hora de Inserção</label>
            <div className="campos-agrupados">
              <input 
                type="date" 
                value={novoPaciente.dataInsercao}
                onChange={(e) => {
                  setNovoPaciente({...novoPaciente, dataInsercao: e.target.value});
                  setErrors(prev => ({...prev, dataInsercao: ''}));
                }}
                min={new Date().toISOString().split('T')[0]} // Data mínima é hoje
                max={new Date().toISOString().split('T')[0]} // Data máxima é hoje
                required
                className={`campo-data ${errors.dataInsercao ? 'campo-erro' : ''}`}
              />
              <input 
                type="time" 
                value={novoPaciente.horarioInsercao}
                onChange={(e) => setNovoPaciente({...novoPaciente, horarioInsercao: e.target.value})}
                required
                className="campo-hora"
              />
            </div>
            {errors.dataInsercao && <small className="erro-mensagem">{errors.dataInsercao}</small>}
            <small className="campo-descricao">Informe quando o cateter foi inserido</small>
          </div>
          
          <div className="form-grupo">
            <label>Data e Hora de Remoção Prevista</label>
            <div className="campos-agrupados">
              <input 
                type="date" 
                value={novoPaciente.dataRemocao}
                onChange={(e) => {
                  setNovoPaciente({...novoPaciente, dataRemocao: e.target.value});
                  setErrors(prev => ({...prev, dataRemocao: ''}));
                }}
                min={novoPaciente.dataInsercao}
                required
                className={`campo-data ${errors.dataRemocao ? 'campo-erro' : ''}`}
              />
              <input 
                type="time" 
                value={novoPaciente.horarioRemocao}
                onChange={(e) => setNovoPaciente({...novoPaciente, horarioRemocao: e.target.value})}
                required
                className="campo-hora"
              />
            </div>
            {errors.dataRemocao && <small className="erro-mensagem">{errors.dataRemocao}</small>}
            <small className="campo-descricao">Informe quando o cateter deverá ser removido</small>
          </div>
          
          <div className="acoes-formulario">
            <button type="button" onClick={onCancel}>Cancelar</button>
            <button type="submit" className="botao-salvar">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
} 