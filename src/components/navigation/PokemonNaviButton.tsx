import { Button } from "@mui/material";
import PokemonImage from "../common/PokemonImage";
import { useNavigate } from "react-router-dom";
import { usePokemonPrefetch } from "../../hooks/usePokemonPrefetch";

interface NavigationButtonProps {
  disabled: boolean; 
  id: number; 
  name: string | null; 
}
  
const NavigationButton = ({ disabled, id, name }: NavigationButtonProps) => {
  const navigate = useNavigate();
  const prefetchPokemonData = usePokemonPrefetch();

  const handleClick = () => {
    navigate(`/detail/${id}`)
  }

  const handleHover = () => {
    prefetchPokemonData(id);
  }

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#f59e0b',
        '&:hover': {
          backgroundColor: '#d97706', 
        },
        fontWeight: 'bold',
      }}
      onClick={handleClick}
      onMouseEnter={handleHover}
      disabled={disabled}
      startIcon={name && <PokemonImage id={id} name={name} width={40} height={40} />}
    >
      {name ? `No. ${id}` : 'No Pokemon'}
    </Button>
  )
};

export default NavigationButton;