interface DashboardProps {
  totalPacientes: number;
  trocasPendentes: number;
}

export function Dashboard({ totalPacientes, trocasPendentes }: DashboardProps) {
  return (
    <div className="dashboard-resumo">
      <div className="card-info">
        <h3>Total de Pacientes</h3>
        <p className="numero-destaque">{totalPacientes}</p>
      </div>
      <div className="card-info alerta">
        <h3>Trocas Pendentes</h3>
        <p className="numero-destaque">{trocasPendentes}</p>
      </div>
    </div>
  );
} 