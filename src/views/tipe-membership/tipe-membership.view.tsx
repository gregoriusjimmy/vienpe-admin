import React, { useEffect } from 'react'
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
import FormDaftarTipeMembership from '../../components/form-daftar-tipe-membership/formDaftarTipeMembership.component'
import {
  selectIsAllTipeMembershipLoaded,
  selectTipeMembership,
} from '../../redux/tipe-membership/tipe-membership.selectors'
import { connect } from 'react-redux'
import { RootState } from '../../redux/root-reducer'
import { loadAllTipeMembershipStartAsync } from '../../redux/tipe-membership/tipe-membership.actions'
import { TipeMembershipState } from '../../redux/tipe-membership/tipe-membership.types'
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
  isTipeMembershipLoaded: boolean
  loadAllTipeMembershipStartAsync: () => void
}
const TipeMembership: React.FC<Props> = ({
  isTipeMembershipLoaded,
  loadAllTipeMembershipStartAsync,
}) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    console.log('tipe firing')
    loadAllTipeMembershipStartAsync()
  }, [loadAllTipeMembershipStartAsync])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return isTipeMembershipLoaded ? (
    <Grid container spacing={3}>
      <Grid item xs={6}></Grid>
      <Grid container item justify='flex-end' xs={6}>
        <Box m={1}>
          <AddButton text='Tambah tipe' handleClick={handleOpen} />
          <Modal open={open} handleClose={handleClose} ariaLabel='modal-add'>
            <FormDaftarTipeMembership />
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
  isTipeMembershipLoaded: selectIsAllTipeMembershipLoaded(state),
})

const mapDispatchToProps = (dispatch) => ({
  loadAllTipeMembershipStartAsync: () => dispatch(loadAllTipeMembershipStartAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TipeMembership)
