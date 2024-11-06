import { useMediaQuery, useTheme, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { regionUrls } from '../utils/constants';
import CustomLabel from './common/CustomLabel';
import { queryClient } from '../api/queryClient';
import { queries } from '../api/queries';

interface SelectRegionProps {
  handleRegions: (e: SelectChangeEvent<string>) => void;
  selectedRegion: string;
}

function SelectRegion({ handleRegions, selectedRegion }: SelectRegionProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // 지역 Hover 시 prefetch
  const handleRegionHover = (region: string) => {
    const regionUrl = regionUrls[region];
    queryClient.prefetchQuery({
      queryKey: ['regionData', region],
      queryFn: () => queries.getPrefetchedRegionData(region, regionUrl),
    });
  };

  return (
    <FormControl sx={{ width: '100%' }}>
      <FormLabel component="legend" id="regions-label" >Regions</FormLabel>

      {isSmallScreen ? (
        // 화면이 작을 때는 Select를 사용
        <Select
          labelId="regions-label"
          value={selectedRegion}
          onChange={handleRegions}
        >
          {Object.keys(regionUrls).map((region) => (
            <MenuItem 
              key={region} 
              value={region} 
              onMouseEnter={() => handleRegionHover(region)}
            >
              {region}
            </MenuItem>
          ))}
        </Select>
      ) : (
        // 화면이 클 때는 RadioGroup을 사용
        <RadioGroup
          name="regions"
          value={selectedRegion}
          onChange={handleRegions}
          sx={{
            marginLeft: 1,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {Object.keys(regionUrls).map((region) => (
            <FormControlLabel
              key={region}
              value={region}
              control={<Radio sx={{ display: 'none' }} />}
              onMouseEnter={() => handleRegionHover(region)}
              label={<CustomLabel region={region} selectedRegion={selectedRegion} />}
            />
          ))}
        </RadioGroup>
      )}
    </FormControl>
  );
}

export default SelectRegion;
