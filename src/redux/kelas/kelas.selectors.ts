import { createSelector } from 'reselect'
import { RootState } from '../root-reducer'
import { KelasState } from './kelas.types'

export const selectKelas = (state: RootState): KelasState => state.kelas
