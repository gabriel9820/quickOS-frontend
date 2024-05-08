import React, { RefCallback } from "react";
import { InputBaseComponentProps } from "@mui/material";
import { IMaskInput } from "react-imask";

interface Props {
  onChange?: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const MaskInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputBaseComponentProps, "onChange"> & Props & { mask: string }
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
      overwrite
      lazy={false}
    />
  );
});

export const DecimalInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputBaseComponentProps, "onChange"> & Props
>((props, ref) => {
  const { onChange, onBlur, ...rest } = props;

  return (
    <IMaskInput
      {...rest}
      mask={Number}
      unmask={true}
      inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
      onAccept={(value) => {
        onChange &&
          onChange({ target: { name: props.name, value: value as string } });
        onBlur &&
          onBlur({ target: { name: props.name, value: value as string } });
      }}
      overwrite
      lazy={false}
      thousandsSeparator="."
      radix=","
      scale={2}
      padFractionalZeros
    />
  );
});

export const IntegerInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputBaseComponentProps, "onChange"> & Props
>((props, ref) => {
  const { onChange, onBlur, ...rest } = props;

  return (
    <IMaskInput
      {...rest}
      mask={Number}
      unmask={true}
      inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
      onAccept={(value) => {
        onChange &&
          onChange({ target: { name: props.name, value: value as string } });
        onBlur &&
          onBlur({ target: { name: props.name, value: value as string } });
      }}
      overwrite
      lazy={false}
      scale={0}
    />
  );
});
