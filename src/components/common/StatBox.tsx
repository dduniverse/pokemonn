import { Box, Stack } from '@mui/material';

// 공통 스타일 변수
const boxStyle = {
    fontWeight: 'bold',
    paddingBottom: '0.6em',
    padding: '0.5em',
    paddingLeft: '1.2em',
    paddingRight: '1.2em',
    backgroundColor: 'white',
    borderRadius: '8px',
  };
  
// Height, Weight Box 컴포넌트로 분리
const StatBox = ({ label, value }: { label: string; value: string }) => (
    <Stack alignItems="center" sx={{ ...boxStyle }}>
        <Box sx={{ fontWeight: 'bold' }}>{label}</Box>
        <Box sx={{ fontWeight: 'normal' }}>{value}</Box>
    </Stack>
    );

export default StatBox;