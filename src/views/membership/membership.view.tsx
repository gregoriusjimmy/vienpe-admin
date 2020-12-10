import React, { useEffect } from 'react'
import { Grid, Box } from '@material-ui/core'
import AddButton from '../../components/add-button/add-button.component'
import Modal from '../../components/containers/modal/modal.component'
import FormDaftarMembership from '../../components/form-daftar-membership/formDaftarMembership.component'
import CircularLoading from '../../components/circular-loading/circular-loading.component'
import EnhancedTable from '../../components/table/enhanced-table/enhanced-table.component'
import { connect } from 'react-redux'
import { loadAllTipeMembershipStartAsync } from '../../redux/tipe-membership/tipe-membership.actions'
import { loadAllMemberStartAsync } from '../../redux/member/member.actions'
import { selectIsAllTipeMembershipLoaded } from '../../redux/tipe-membership/tipe-membership.selectors'
import {
  selectAllMemberNameWithId,
  selectIsAllMemberLoaded,
} from '../../redux/member/member.selectors'
import { RootState } from '../../redux/root-reducer'
import {
  selectAllMembership,
  selectIsAllMembershipLoaded,
} from '../../redux/membership/membership.selectors'
import { MembershipType } from '../../redux/membership/membership.types'
import { loadAllMembershipStartAsync } from '../../redux/membership/membership.actions'

type Props = {
  allMembership: Array<MembershipType> | null
  loadAllMemberStartAsync: () => void
  loadAllTipeMembershipStartAsync: () => void
  loadAllMembershipStartAsync: () => void
  isAllTipeMembershipLoaded: boolean
  isAllMemberLoaded: boolean
  isAllMembershipLoaded: boolean
  allMemberNameWithId: Array<{ id: string; nama: string }> | null
}
const Membership: React.FC<Props> = ({
  allMembership,
  loadAllMemberStartAsync,
  loadAllTipeMembershipStartAsync,
  loadAllMembershipStartAsync,
  isAllTipeMembershipLoaded,
  isAllMemberLoaded,
  isAllMembershipLoaded,
  allMemberNameWithId,
}) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  useEffect(() => {
    loadAllTipeMembershipStartAsync()
    loadAllMemberStartAsync()
    loadAllMembershipStartAsync()
  }, [loadAllTipeMembershipStartAsync, loadAllMemberStartAsync, loadAllMembershipStartAsync])

  const handleClose = () => {
    setOpen(false)
  }
  const isAllLoaded = () => {
    return isAllMemberLoaded && isAllTipeMembershipLoaded && isAllMembershipLoaded
  }
  // need better algorithm and refactoring
  const mapAllMembershipWithMemberName = () => {
    return allMembership!.map((membership) => {
      const { id, id_member, tipe_membership, tgl_mulai, tgl_selesai, sisa_point } = membership
      const findMatch = allMemberNameWithId?.find((member) => id_member === member.id)
      const orderedData = {
        id,
        id_member,
        nama: findMatch!.nama,
        tipe_membership,
        tgl_mulai,
        tgl_selesai,
        sisa_point,
      }
      return orderedData
    })
  }
  const headData: Array<{ id: string; label: string }> = [
    { id: 'id', label: 'ID' },
    { id: 'id_member', label: 'ID Member' },
    { id: 'nama', label: 'Nama' },
    { id: 'tipe_membership', label: 'Tipe Memberhsip' },
    { id: 'tgl_mulai', label: 'Tgl Mulai' },
    { id: 'tgl_selesai', label: 'Tgl Selesai?' },
    { id: 'sisa_point', label: 'Sisa Point' },
  ]
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
      <Grid item xs={12}>
        {allMembership ? (
          <EnhancedTable
            title='Membership'
            data={mapAllMembershipWithMemberName()}
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
  isAllTipeMembershipLoaded: selectIsAllTipeMembershipLoaded(state),
  isAllMemberLoaded: selectIsAllMemberLoaded(state),
  isAllMembershipLoaded: selectIsAllMembershipLoaded(state),
  allMembership: selectAllMembership(state),
  allMemberNameWithId: selectAllMemberNameWithId(state),
})

const mapDispatchToProps = (dispatch) => ({
  loadAllTipeMembershipStartAsync: () => dispatch(loadAllTipeMembershipStartAsync()),
  loadAllMemberStartAsync: () => dispatch(loadAllMemberStartAsync()),
  loadAllMembershipStartAsync: () => dispatch(loadAllMembershipStartAsync()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Membership)
