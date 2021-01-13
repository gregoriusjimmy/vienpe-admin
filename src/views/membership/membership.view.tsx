import React, { useEffect, useState } from 'react'
import { Grid, Box } from '@material-ui/core'
import AddButton from '../../components/add-button/add-button.component'
import Modal from '../../components/modal/modal.component'
import MembershipFormAdd from '../../components/membership-form-add/membership-form-add.component'
import MembershipFormUpdate from '../../components/membership-form-update/membership-form-update.component'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import { connect } from 'react-redux'
import { loadAllTipeMembershipStartAsync } from '../../redux/tipe-membership/tipe-membership.actions'
import { loadAllMemberStartAsync } from '../../redux/member/member.actions'
import { selectIsAllTipeMembershipLoaded } from '../../redux/tipe-membership/tipe-membership.selectors'
import { selectAllMember, selectIsAllMemberLoaded } from '../../redux/member/member.selectors'
import { RootState } from '../../redux/root-reducer'
import {
  selectAllMembership,
  selectIsAllMembershipLoaded,
} from '../../redux/membership/membership.selectors'
import { MembershipType } from '../../redux/membership/membership.types'
import { loadAllMembershipStartAsync } from '../../redux/membership/membership.actions'
import UpdateButton from '../../components/update-button/update-button.component'
import { combineAllMembershipWithMember } from '../../utils/utils'
import { MemberType } from '../../redux/member/member.types'
import { ColDef } from '@material-ui/data-grid'
import TableCard from '../../components/table-card/table-card.component'
import CustomDataGrid from '../../components/custom-data-grid/custom-data-grid.component'
import CustomNowRowsOverlay from '../../components/custom-no-rows-overlay/custom-no-rows-overlay.component'

type Props = {
  allMembership: Array<MembershipType> | null
  loadAllMemberStartAsync: () => void
  loadAllTipeMembershipStartAsync: () => void
  loadAllMembershipStartAsync: () => void
  isAllTipeMembershipLoaded: boolean
  isAllMemberLoaded: boolean
  isAllMembershipLoaded: boolean
  allMember: Array<MemberType> | null
}
const Membership: React.FC<Props> = ({
  allMembership,
  allMember,
  loadAllTipeMembershipStartAsync,
  loadAllMembershipStartAsync,
  loadAllMemberStartAsync,
  isAllTipeMembershipLoaded,
  isAllMemberLoaded,
  isAllMembershipLoaded,
}) => {
  const [openAdd, setOpenAdd] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)

  const handleOpenAdd = () => {
    setOpenAdd(true)
  }
  const handleOpenUpdate = () => {
    setOpenUpdate(true)
  }
  useEffect(() => {
    loadAllTipeMembershipStartAsync()
    loadAllMemberStartAsync()
    loadAllMembershipStartAsync()
  }, [loadAllTipeMembershipStartAsync, loadAllMemberStartAsync, loadAllMembershipStartAsync])

  const handleCloseAdd = () => {
    setOpenAdd(false)
  }
  const handleCloseUpdate = () => {
    setOpenUpdate(false)
  }
  const isAllLoaded = () => {
    return isAllMemberLoaded && isAllTipeMembershipLoaded && isAllMembershipLoaded
  }

  const columns: ColDef[] = [
    { field: 'id', headerName: 'ID', type: 'number' },
    { field: 'id_member', headerName: 'ID Member', flex: 0.18, type: 'number' },
    { field: 'nama_member', headerName: 'Nama', flex: 0.22 },
    { field: 'tipe_membership', headerName: 'Tipe Memberhsip', flex: 0.2 },
    { field: 'tgl_mulai', headerName: 'Tgl Mulai', flex: 0.2, type: 'date' },
    { field: 'tgl_selesai', headerName: 'Tgl Selesai', flex: 0.2, type: 'date' },
    { field: 'sisa_point', headerName: 'Sisa Point', flex: 0.15, type: 'number' },
  ]

  return isAllLoaded() ? (
    <Grid container spacing={3}>
      <Grid item xs={6}></Grid>
      <Grid container item justify='flex-end' xs={6}>
        <Box m={1}>
          <UpdateButton text='Update Membership' handleClick={handleOpenUpdate} />
          <Modal open={openUpdate} handleClose={handleCloseUpdate} ariaLabel='modal-update'>
            <MembershipFormUpdate handleModalClose={handleCloseUpdate} />
          </Modal>
        </Box>
        <Box m={1}>
          <AddButton text='Tambah Membership' handleClick={handleOpenAdd} />
          <Modal open={openAdd} handleClose={handleCloseAdd} ariaLabel='modal-add'>
            <MembershipFormAdd handleModalClose={handleCloseAdd} />
          </Modal>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {allMembership && allMember ? (
          <TableCard>
            <CustomDataGrid
              components={{ noRowsOverlay: CustomNowRowsOverlay }}
              rows={combineAllMembershipWithMember(allMembership, allMember)}
              columns={columns}
            />
          </TableCard>
        ) : null}
      </Grid>
    </Grid>
  ) : (
    <CircularLoading />
  )
}
const mapStateToProps = (state: RootState) => ({
  isAllTipeMembershipLoaded: selectIsAllTipeMembershipLoaded(state),
  isAllMemberLoaded: selectIsAllMemberLoaded(state),
  isAllMembershipLoaded: selectIsAllMembershipLoaded(state),
  allMembership: selectAllMembership(state),
  allMember: selectAllMember(state),
})

const mapDispatchToProps = (dispatch) => ({
  loadAllTipeMembershipStartAsync: () => dispatch(loadAllTipeMembershipStartAsync()),
  loadAllMemberStartAsync: () => dispatch(loadAllMemberStartAsync()),
  loadAllMembershipStartAsync: () => dispatch(loadAllMembershipStartAsync()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Membership)
