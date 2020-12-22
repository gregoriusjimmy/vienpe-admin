import { createSelector } from 'reselect'
import { RootState } from '../root-reducer'
import { KelasState } from './kelas.types'

export const selectKelas = (state: RootState): KelasState => state.kelas

export const selectAllKelas = createSelector([selectKelas], (kelas) => kelas.allKelas)

export const selectIsAllKelasLoaded = createSelector([selectKelas], (kelas) => kelas.isLoaded)

export const selectIsKelasFetching = createSelector([selectKelas], (kelas) => kelas.isFetching)
