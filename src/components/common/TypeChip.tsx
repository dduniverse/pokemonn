import { Chip, useTheme, useMediaQuery } from '@mui/material';
import { typeColorMap } from '../../utils/colorUtils';
import { Type } from '../../types/types';

interface TypeChipProps {
  type: Type;
}

const TypeChip = ({ type }: TypeChipProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Chip
      key={type.type.name}
      label={type.type.name}
      sx={{
        backgroundColor: typeColorMap[type.type.name] || '#E0E0E0',
        color: 'white',
        fontSize: isSmallScreen ? '0.2em' : '1.0em',  // 글씨 크기
        height: isSmallScreen ? 16 : 36,              // Chip 높이
        paddingY: isSmallScreen ? 0.5 : 1,            // 수직 패딩 조정
        paddingX: isSmallScreen ? 0 : 0.5,            // 수평 패딩 조정
        textTransform: 'capitalize',
      }}
    />
  );
};

export default TypeChip;
