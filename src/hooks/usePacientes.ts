import { useState } from 'react';
import { Paciente, NovoPaciente } from '../types';
import { CatheterService } from '../services/CatheterService';


const calcularData = (diasOffset: number): string => {
  const data = new Date();
  data.setDate(data.getDate() + diasOffset);
  
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  
  return `${dia}/${mes}/${ano}`;
};


const dadosIniciais: Paciente[] = [
  { 
    id: 1, 
    nome: 'Maria Silva', 
    quarto: '101A', 
    tipoCateter: 'Venoso Central', 
    dataInsercao: calcularData(-7),
    horarioInsercao: '08:30',
    dataRemocao: calcularData(0),
    horarioRemocao: '14:30', 
    diasAtivo: 7, 
    proximaTroca: calcularData(0) 
  },
  { 
    id: 2, 
    nome: 'João Santos', 
    quarto: '203B', 
    tipoCateter: 'PICC', 
    dataInsercao: calcularData(-14),
    horarioInsercao: '09:45',
    dataRemocao: calcularData(1),
    horarioRemocao: '10:15', 
    diasAtivo: 14, 
    proximaTroca: calcularData(1)
  },
  { 
    id: 3, 
    nome: 'Ana Oliveira', 
    quarto: '105C', 
    tipoCateter: 'Periférico', 
    dataInsercao: calcularData(-3),
    horarioInsercao: '13:20',
    dataRemocao: calcularData(5),
    horarioRemocao: '08:45', 
    diasAtivo: 3, 
    proximaTroca: calcularData(5)
  },
  { 
    id: 4, 
    nome: 'Carlos Mendes', 
    quarto: '204A', 
    tipoCateter: 'Periférico', 
    dataInsercao: calcularData(-2),
    horarioInsercao: '10:15',
    dataRemocao: calcularData(6),
    horarioRemocao: '11:30', 
    diasAtivo: 2, 
    proximaTroca: calcularData(6)
  },
  { 
    id: 5, 
    nome: 'Patricia Lima', 
    quarto: '307B', 
    tipoCateter: 'Venoso Central', 
    dataInsercao: calcularData(-5),
    horarioInsercao: '14:45',
    dataRemocao: calcularData(2),
    horarioRemocao: '15:00', 
    diasAtivo: 5, 
    proximaTroca: calcularData(2)
  },
  { 
    id: 6, 
    nome: 'Roberto Alves', 
    quarto: '110D', 
    tipoCateter: 'PICC', 
    dataInsercao: calcularData(-10),
    horarioInsercao: '09:20',
    dataRemocao: calcularData(4),
    horarioRemocao: '10:00', 
    diasAtivo: 10, 
    proximaTroca: calcularData(4)
  },
  { 
    id: 7, 
    nome: 'Fernanda Costa', 
    quarto: '215A', 
    tipoCateter: 'Totalmente Implantado', 
    dataInsercao: calcularData(-25),
    horarioInsercao: '11:30',
    dataRemocao: calcularData(5),
    horarioRemocao: '12:15', 
    diasAtivo: 25, 
    proximaTroca: calcularData(5)
  },
  { 
    id: 8, 
    nome: 'Lucas Martins', 
    quarto: '103B', 
    tipoCateter: 'Periférico', 
    dataInsercao: calcularData(-1),
    horarioInsercao: '16:00',
    dataRemocao: calcularData(2),
    horarioRemocao: '08:30', 
    diasAtivo: 1, 
    proximaTroca: calcularData(2)
  }
];

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>(dadosIniciais);
  const [termoPesquisa, setTermoPesquisa] = useState('');

  const pacientesFiltrados = CatheterService.filtrarPacientes(pacientes, termoPesquisa);
  

  const totalTrocasPendentes = pacientes.filter(p => 
    CatheterService.precisaAtencao(p)
  ).length;


  const adicionarPaciente = (novoPaciente: NovoPaciente) => {
    const pacienteCompleto = CatheterService.criarNovoPaciente(
      novoPaciente, 
      pacientes.length
    );
    
    setPacientes([...pacientes, pacienteCompleto]);
  };


  const removerPaciente = (id: number) => {
    setPacientes(pacientes.filter(paciente => paciente.id !== id));
  };

  return {
    pacientes,
    setPacientes,
    pacientesFiltrados,
    termoPesquisa,
    setTermoPesquisa,
    totalTrocasPendentes,
    adicionarPaciente,
    removerPaciente
  };
} 