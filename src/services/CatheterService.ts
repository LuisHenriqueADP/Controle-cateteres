import { Paciente, NovoPaciente, DIAS_PARA_TROCA } from '../types';

export class CatheterService {
  static obterDataHoje(): string {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const ano = hoje.getFullYear();
    
    return `${dia}/${mes}/${ano}`;
  }
  

  static obterDataHojeObj(): Date {
    return new Date();
  }


  static precisaAtencao(paciente: Paciente): boolean {
    const hoje = this.obterDataHojeObj();
    

    let dataRemocao: Date;
    
    if (paciente.dataRemocao && paciente.dataRemocao.includes('/')) {
      const [dia, mes, ano] = paciente.dataRemocao.split('/');
      dataRemocao = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
      
 
      if (paciente.horarioRemocao) {
        const [hora, minuto] = paciente.horarioRemocao.split(':');
        dataRemocao.setHours(parseInt(hora), parseInt(minuto));
      }
    } else if (paciente.dataRemocao) {
      dataRemocao = new Date(paciente.dataRemocao);
    } else {

      dataRemocao = this.converterDataBrParaDate(paciente.proximaTroca);
    }
    

    const diferencaMilissegundos = dataRemocao.getTime() - hoje.getTime();
    const diferencaDias = Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24));
    

    return diferencaDias <= 1;
  }


  static converterDataBrParaDate(dataBr: string): Date {
    if (!dataBr || !dataBr.includes('/')) {
      return new Date(dataBr);
    }
    
    const [dia, mes, ano] = dataBr.split('/');
    return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
  }


  static calcularProximaTroca(tipoCateter: string, dataInsercao: string): string {

    let dataObj: Date;
    
 
    if (dataInsercao.includes('/')) {
      const [dia, mes, ano] = dataInsercao.split('/');
      dataObj = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
    } 

    else if (dataInsercao.includes('-')) {
      const [ano, mes, dia] = dataInsercao.split('-');
      dataObj = new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
    }

    else {
      dataObj = new Date(dataInsercao);
    }
    

    const diasParaTroca = DIAS_PARA_TROCA[tipoCateter] || 3; // Default para periférico
    dataObj.setDate(dataObj.getDate() + diasParaTroca);
    

    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    
    return `${dia}/${mes}/${ano}`;
  }


  static criarNovoPaciente(novoPaciente: NovoPaciente, idAtual: number): Paciente {

    let dataInsercao = novoPaciente.dataInsercao;
    let dataRemocao = novoPaciente.dataRemocao;
    

    if (dataInsercao.includes('-')) {
      const [ano, mes, dia] = dataInsercao.split('-');
      dataInsercao = `${dia}/${mes}/${ano}`;
    }
    
    if (dataRemocao.includes('-')) {
      const [ano, mes, dia] = dataRemocao.split('-');
      dataRemocao = `${dia}/${mes}/${ano}`;
    }
    

    const dataInsObj = this.converterDataBrParaDate(dataInsercao);
    const dataRemObj = this.converterDataBrParaDate(dataRemocao);
    
    const diferenca = Math.floor(
      (dataRemObj.getTime() - dataInsObj.getTime()) / (1000 * 60 * 60 * 24)
    );
    

    const proximaTroca = this.calcularProximaTroca(
      novoPaciente.tipoCateter, 
      dataInsercao
    );
    
    return {
      ...novoPaciente,
      dataInsercao,
      dataRemocao,
      id: idAtual + 1,
      diasAtivo: diferenca > 0 ? diferenca : 0,
      proximaTroca
    };
  }


  static filtrarPacientes(pacientes: Paciente[], termo: string): Paciente[] {
    if (!termo.trim()) return pacientes;
    
    const termoBusca = termo.toLowerCase();
    return pacientes.filter(paciente => 
      paciente.nome.toLowerCase().includes(termoBusca) ||
      paciente.quarto.toLowerCase().includes(termoBusca) ||
      paciente.tipoCateter.toLowerCase().includes(termoBusca)
    );
  }
} 