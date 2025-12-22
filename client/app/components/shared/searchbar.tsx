import styled from "@emotion/styled";
import { InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "10px",
  backgroundColor: "#fffff",
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({}) => ({
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: "10px",
  },
}));

const PokeSearchbar = () => {
  const [text, setText] = useState("");
  const [debouncedText] = useDebounce(text, 1000);

  useEffect(() => {
    console.log(debouncedText);
  }, [debouncedText]);

  return (
    <Search>
      <SearchIconWrapper>search icon</SearchIconWrapper>
      <StyledInputBase
        placeholder="Search by pokemon name…"
        inputProps={{ "aria-label": "search" }}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </Search>
  );
};

export default PokeSearchbar;
