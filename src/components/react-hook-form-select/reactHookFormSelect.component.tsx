import React from 'react'
import { FormControl, InputLabel, Select, FormHelperText } from '@material-ui/core'
import { Controller } from 'react-hook-form'

type Props = {
  name: string
  label: string
  control: any
  defaultValue: any 
  children: React.ReactNode
  [otherProps: string]: any
}

const ReactHookFormSelect: React.FC<Props> = ({
  name,
  label,
  control,
  defaultValue,
  children,
  helperText,
  ...props
}) => {
  const labelId = `${name}-label`
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        as={
          <Select labelId={labelId} label={label}>
            {children}
          </Select>
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
      {}
      <FormHelperText id='my-helper-text'>{helperText ? helperText : ''}</FormHelperText>
    </FormControl>
  )
}
export default ReactHookFormSelect
