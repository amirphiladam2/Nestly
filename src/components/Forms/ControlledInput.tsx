import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import InputField, { InputFieldProps } from './InputField';

type ControlledInputProps<T extends FieldValues> = Omit<InputFieldProps, 'value' | 'onChangeText' | 'error'> & {
    control: Control<T>;
    name: Path<T>;
};

export default function ControlledInput<T extends FieldValues>({
    control,
    name,
    ...inputProps
}: ControlledInputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <InputField
                    {...inputProps}
                    value={value as string}
                    onChangeText={onChange}
                    error={error?.message}
                />
            )}
        />
    );
}
