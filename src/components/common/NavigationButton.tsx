import { Button } from "@mui/material";
import PokemonImage from "./PokemonImage";

interface NavigationButtonProps {
  onClick: () => void; 
  disabled: boolean; 
  id: number; 
  name: string | null; 
}
  
const NavigationButton = ({ onClick, disabled, id, name }: NavigationButtonProps) => (
  <Button
    variant="contained"
    sx={{
      backgroundColor: '#f59e0b',
      '&:hover': {
        backgroundColor: '#d97706', 
      },
      fontWeight: 'bold',
    }}
    onClick={onClick}
    disabled={disabled}
    startIcon={name && <PokemonImage id={id} name={name} width={40} height={40} />}
  >
    {name ? `No. ${id}` : 'No Pokemon'}
  </Button>
);

export default NavigationButton;