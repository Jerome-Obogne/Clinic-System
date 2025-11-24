import "react-international-phone/style.css";

import {
  type BaseTextFieldProps,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import {
  type CountryIso2,
  defaultCountries,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import type { FieldError } from "react-hook-form";


const countries = defaultCountries.filter((country) => {
  const { iso2 } = parseCountry(country);
  return ["ph"].includes(iso2);
});

export interface MUIPhoneProps extends BaseTextFieldProps {
  value: string;
  onChange: (phone: string) => void;
  errorData: FieldError | undefined;
  helperMessage: string | undefined;
}

export const MuiPhone: React.FC<MUIPhoneProps> = ({
  value,
  onChange,
  errorData,
  helperMessage,
  ...restProps
}) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "ph",
      value,
      forceDialCode: true,
      countries: countries,
      onChange: (data) => {
        onChange(data.phone);
      },
      disableFormatting: false,
    });

  return (
    <TextField
      fullWidth
      variant="outlined"
      label="contact_no"
      id="contact_no_outline"
      color="primary"
      placeholder="Phone number"
      value={inputValue}
      onChange={handlePhoneValueChange}
      type="tel"
      error={errorData && true}
      helperText={helperMessage}
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            style={{ marginRight: "2px", marginLeft: "-8px" }}
          >
            <Select
              MenuProps={{
                style: {
                  height: "300px",
                  width: "360px",
                  top: "10px",
                  left: "-34px",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
              }}
              sx={{
                width: "max-content",
                // Remove default outline (display only on focus)
                fieldset: {
                  display: "none",
                },
                '&.Mui-focused:has(div[aria-expanded="false"])': {
                  fieldset: {
                    display: "block",
                  },
                },
                // Update default spacing
                ".MuiSelect-select": {
                  padding: "8px",
                  paddingRight: "24px !important",
                },
                svg: {
                  right: 0,
                },
              }}
              value={country.iso2}
              onChange={(e) => setCountry(e.target.value as CountryIso2)}
              renderValue={(value) => (
                <FlagImage iso2={value} style={{ display: "flex" }} />
              )}
            >
              {
                <MenuItem key={country.iso2} value={country.iso2}>
                  <FlagImage
                    iso2={country.iso2}
                    style={{ marginRight: "8px" }}
                  />
                  <Typography marginRight="8px">{country.name}</Typography>
                  <Typography color="gray">+{country.dialCode}</Typography>
                </MenuItem>
              }
            </Select>
          </InputAdornment>
        ),
      }}
      {...restProps}
    />
  );
};
