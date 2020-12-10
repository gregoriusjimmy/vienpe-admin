import React, { useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import AddButton from '../../components/add-button/add-button.component'
import Modal from '../../components/containers/modal/modal.component'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import EnhancedTable from '../../components/table/enhanced-table/enhanced-table.component'
import FormDaftarTipeMembership from '../../components/form-daftar-tipe-membership/formDaftarTipeMembership.component'
import {
  selectAllTipeMembership,
  selectIsAllTipeMembershipLoaded,
} from '../../redux/tipe-membership/tipe-membership.selectors'
import { connect } from 'react-redux'
import { RootState } from '../../redux/root-reducer'
import { loadAllTipeMembershipStartAsync } from '../../redux/tipe-membership/tipe-membership.actions'
import { TipeMembershipType } from '../../redux/tipe-membership/tipe-membership.types'

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
  const headData: Array<{ id: string; label: string }> = [
    { id: 'tipe', label: 'Tipe' },
    { id: 'keterangan', label: 'Keterangan' },
  ]
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
            arrayDataColumn={headData}
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
