import { Paciente } from '../../types';
import { CatheterService } from '../../services/CatheterService';

interface PatientListProps {
  pacientes: Paciente[];
  onRemoverPaciente: (id: number) => void;
}

export function PatientList({ pacientes, onRemoverPaciente }: PatientListProps) {
  return (
    <div className="lista-pacientes">
      <h3>Pacientes com Cateteres Ativos</h3>
      
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Quarto</th>
            <th>Tipo de Cateter</th>
            <th>Data e Hora de Inserção</th>
            <th>Data e Hora de Remoção</th>
            <th>Dias Ativo</th>
            <th>Próxima Troca</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.length > 0 ? (
            pacientes.map((paciente) => (
              <PatientRow 
                key={paciente.id} 
                paciente={paciente}
                onRemover={onRemoverPaciente}
              />
            ))
          ) : (
            <tr>
              <td colSpan={9} className="sem-resultados">Nenhum paciente encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}


interface PatientRowProps {
  paciente: Paciente;
  onRemover: (id: number) => void;
}

function PatientRow({ paciente, onRemover }: PatientRowProps) {
  const precisaAtencao = CatheterService.precisaAtencao(paciente);
  
  const handleRemover = () => {
    if (window.confirm(`Tem certeza que deseja excluir o cateter do paciente ${paciente.nome}?`)) {
      onRemover(paciente.id);
    }
  };
  
  return (
    <tr className={precisaAtencao ? 'linha-alerta' : ''}>
      <td>{paciente.nome}</td>
      <td>{paciente.quarto}</td>
      <td>{paciente.tipoCateter}</td>
      <td>{`${paciente.dataInsercao} ${paciente.horarioInsercao}`}</td>
      <td>{`${paciente.dataRemocao} ${paciente.horarioRemocao}`}</td>
      <td>{paciente.diasAtivo}</td>
      <td>{paciente.proximaTroca}</td>
      <td>
        <span className={`status ${precisaAtencao ? 'status-alerta' : 'status-ok'}`}>
          {precisaAtencao ? 'Atenção' : 'Normal'}
        </span>
      </td>
      <td>
        <button className="botao-excluir" onClick={handleRemover}>
          Excluir
        </button>
      </td>
    </tr>
  );
} 