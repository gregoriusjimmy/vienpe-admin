import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import AddButton from '../../components/add-button/add-button.component'
import Modal from '../../components/containers/modal/modal.component'
import FormDaftarMembership from '../../components/form-daftar-membership/formDaftarMembership.component'
import { connect } from 'react-redux'
import { loadAllTipeMembershipStartAsync } from '../../redux/tipe-membership/tipe-membership.actions'
import { loadAllMemberStartAsync } from '../../redux/member/member.actions'
import { selectIsAllTipeMembershipLoaded } from '../../redux/tipe-membership/tipe-membership.selectors'
import { selectIsAllMemberLoaded } from '../../redux/member/member.selectors'
import { RootState } from '../../redux/root-reducer'
import CircularLoading from '../../components/circular-loading/circular-loading.component'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

type Props = {
  loadAllMemberStartAsync: () => void
  loadAllTipeMembershipStartAsync: () => void
  isAllTipeMembershipLoaded: boolean
  isAllMemberLoaded: boolean
}
const Membership: React.FC<Props> = ({
  loadAllMemberStartAsync,
  loadAllTipeMembershipStartAsync,
  isAllTipeMembershipLoaded,
  isAllMemberLoaded,
}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  useEffect(() => {
    loadAllTipeMembershipStartAsync()
    loadAllMemberStartAsync()
  }, [loadAllTipeMembershipStartAsync, loadAllMemberStartAsync])

  const handleClose = () => {
    setOpen(false)
  }
  const isAllLoaded = () => {
    return isAllMemberLoaded && isAllTipeMembershipLoaded
  }
  return isAllLoaded() ? (
    <Grid container spacing={3}>
      <Grid item xs={6}></Grid>
      <Grid container item justify='flex-end' xs={6}>
        <Box m={1}>
          <AddButton text='Tambah membership' handleClick={handleOpen} />
          <Modal open={open} handleClose={handleClose} ariaLabel='modal-add'>
            <FormDaftarMembership />
          </Modal>
        </Box>
      </Grid>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align='right'>Calories</TableCell>
              <TableCell align='right'>Fat&nbsp;(g)</TableCell>
              <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
              <TableCell align='right'>Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.calories}</TableCell>
                <TableCell align='right'>{row.fat}</TableCell>
                <TableCell align='right'>{row.carbs}</TableCell>
                <TableCell align='right'>{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  ) : (
    <CircularLoading />
  )
}
const mapStateToProps = (state: RootState) => ({
  isAllTipeMembershipLoaded: selectIsAllTipeMembershipLoaded(state),
  isAllMemberLoaded: selectIsAllMemberLoaded(state),
})

const mapDispatchToProps = (dispatch) => ({
  loadAllTipeMembershipStartAsync: () => dispatch(loadAllTipeMembershipStartAsync()),
  loadAllMemberStartAsync: () => dispatch(loadAllMemberStartAsync()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Membership)
