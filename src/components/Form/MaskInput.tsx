import React, { RefCallback } from "react";
import { InputBaseComponentProps } from "@mui/material";
import { IMaskInput } from "react-imask";

interface Props {
  onChange?: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
}

export const MaskInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputBaseComponentProps, "onChange"> & Props
>((props, ref) => {
  const { onChange, mask, ...rest } = props;

  return (
    <IMaskInput
      {...rest}
      mask={mask}
      inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
      onAccept={(value) =>
        onChange &&
        onChange({ target: { name: props.name, value: value as string } })
      }
      onFocus={(e) => {
        e.target.select();
      }}
      overwrite
      lazy={false}
    />
  );
});
