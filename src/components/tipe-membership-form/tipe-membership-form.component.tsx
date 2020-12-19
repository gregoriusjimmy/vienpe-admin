import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import FormCard from '../form-card/form-card.component'
import useStyles from './tipe-membership-form.styles'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { connect } from 'react-redux'

import { addTipeMembershipStartAsync } from '../../redux/tipe-membership/tipe-membership.actions'

import { selectAllTipeMembership } from '../../redux/tipe-membership/tipe-membership.selectors'

import { RootState } from '../../redux/root-reducer'
import { TipeMembershipType } from '../../redux/tipe-membership/tipe-membership.types'

type FORM_DATA = {
  tipe: string
  keterangan: string
}

type Props = {
  allTipeMembership: [] | null
  addTipeMembershipStartAsync: (tipeMembership: FORM_DATA) => void
}

const TipeMembershipForm: React.FC<Props> = ({
  allTipeMembership,
  addTipeMembershipStartAsync,
}) => {
  const { root, submitBtn } = useStyles()
  const [nextAvailableTipe, setNextAvailableTipe] = useState('')

  const schema = yup.object().shape({
    keterangan: yup.string().required(),
  })

  const { register, errors, handleSubmit } = useForm<FORM_DATA>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    const findNextAvailableTipe = () => {
      const ALPHABHET = 'ABCDEFGHIJKLMNOPQRSTVWXYZ'
      const findAlphabetType = ALPHABHET.charAt(allTipeMembership!.length)
      setNextAvailableTipe(findAlphabetType)
    }
    findNextAvailableTipe()
  }, [allTipeMembership])

  const onSubmit = async (formValues: FORM_DATA) => {
    formValues.tipe = nextAvailableTipe
    addTipeMembershipStartAsync(formValues)
  }
  return (
    <FormCard title='Daftar Tipe Membership'>
      <form className={root} noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <TextField
              inputRef={register}
              value={nextAvailableTipe}
              name='tipe'
              disabled
              fullWidth
              label='tipe'
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              inputRef={register}
              error={!!errors.keterangan}
              name='keterangan'
              fullWidth
              label='keterangan'
              helperText={errors.keterangan?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Button className={submitBtn} type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormCard>
  )
}
const mapStateToProps = (state: RootState) => ({
  allTipeMembership: selectAllTipeMembership(state),
})
const mapDispatchToProps = (dispatch) => ({
  addTipeMembershipStartAsync: (tipeMembership: TipeMembershipType) =>
    dispatch(addTipeMembershipStartAsync(tipeMembership)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TipeMembershipForm)