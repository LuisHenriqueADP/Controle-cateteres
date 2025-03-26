interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="pesquisa">
      <input 
        type="text" 
        placeholder="Buscar paciente, quarto ou tipo de cateter..." 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
} 