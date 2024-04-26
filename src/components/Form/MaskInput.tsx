import React, { RefCallback } from "react";
import { InputBaseComponentProps } from "@mui/material";
import { IMaskInput } from "react-imask";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
}

export const MaskInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputBaseComponentProps, "onChange"> & CustomProps
>((props, ref) => {
  const { onChange, mask, ...rest } = props;

  return (
    <IMaskInput
      {...rest}
      mask={mask}
      inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
      onAccept={(value) =>
        onChange({ target: { name: props.name, value: value as string } })
      }
      overwrite
      lazy={false}
    />
  );
});
