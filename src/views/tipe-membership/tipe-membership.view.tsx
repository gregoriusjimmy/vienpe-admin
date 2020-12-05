import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box } from '@material-ui/core'

import AddButton from '../../components/add-button/add-button.component'
import Modal from '../../components/containers/modal/modal.component'
import FormDaftarTipeMembership from '../../components/form-daftar-tipe-membership/formDaftarTipeMembership.component'
import {
  selectAllTipeMembership,
  selectIsAllTipeMembershipLoaded,
} from '../../redux/tipe-membership/tipe-membership.selectors'
import { connect } from 'react-redux'
import { RootState } from '../../redux/root-reducer'
import { loadAllTipeMembershipStartAsync } from '../../redux/tipe-membership/tipe-membership.actions'
import { TipeMembershipType } from '../../redux/tipe-membership/tipe-membership.types'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import EnhancedTable from '../../components/table/enhanced-table/enhanced-table.component'

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
  allTipeMembership: Array<TipeMembershipType> | null
  isTipeMembershipLoaded: boolean
  loadAllTipeMembershipStartAsync: () => void
}
const TipeMembership: React.FC<Props> = ({
  isTipeMembershipLoaded,
  allTipeMembership,
  loadAllTipeMembershipStartAsync,
}) => {
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
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
      <Grid item xs={12}>
        {allTipeMembership ? (
          <EnhancedTable
            title='Tipe Membership'
            data={allTipeMembership}
            arrayDataColumn={['tipe', 'keterangan']}
          />
        ) : null}
      </Grid>
    </Grid>
  ) : (
    <CircularLoading />
  )
}

const mapStateToProps = (state: RootState) => ({
  allTipeMembership: selectAllTipeMembership(state),
  isTipeMembershipLoaded: selectIsAllTipeMembershipLoaded(state),
})

const mapDispatchToProps = (dispatch) => ({
  loadAllTipeMembershipStartAsync: () => dispatch(loadAllTipeMembershipStartAsync()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TipeMembership)
