
export interface Paciente {
  id: number;
  nome: string;
  quarto: string;
  tipoCateter: string;
  dataInsercao: string;
  horarioInsercao: string;
  dataRemocao: string;
  horarioRemocao: string;
  diasAtivo: number;
  proximaTroca: string;
}


export interface NovoPaciente {
  nome: string;
  quarto: string;
  tipoCateter: string;
  dataInsercao: string;
  horarioInsercao: string;
  dataRemocao: string;
  horarioRemocao: string;
}


export enum TipoCateter {
  PERIFERICO = 'Periférico',
  VENOSO_CENTRAL = 'Venoso Central',
  PICC = 'PICC',
  TOTALMENTE_IMPLANTADO = 'Totalmente Implantado'
}


export const DIAS_PARA_TROCA: Record<string, number> = {
  [TipoCateter.PERIFERICO]: 3,
  [TipoCateter.VENOSO_CENTRAL]: 7,
  [TipoCateter.PICC]: 14,
  [TipoCateter.TOTALMENTE_IMPLANTADO]: 30
}; 