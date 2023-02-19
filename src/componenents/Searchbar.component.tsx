import { FormControl, Input, InputAdornment, InputLabel } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchbarProps {
    onChange: (value: string) => void;
    value: string;
}

export const Searchbar: React.FC<SearchbarProps> = ({onChange, value}) => {

  return (
    <FormControl variant="standard">
      <InputLabel htmlFor="searchbar">Search beneficiary</InputLabel>
      <Input
        id="searchbar"
        value={value}
        onChange={(event) => onChange(event.target.value)}

        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};
