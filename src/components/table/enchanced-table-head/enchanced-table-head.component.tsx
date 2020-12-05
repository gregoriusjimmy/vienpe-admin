import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { TableHead, TableRow, TableCell, TableSortLabel } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  })
)

interface HeadCell {
  id: string
  label: string
  numeric: boolean
}

const headCells: Array<HeadCell> = [
  { id: 'name', numeric: false, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, label: 'Calories' },
  { id: 'fat', numeric: true, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, label: 'Protein (g)' },
]

type Props = {
  firstData: {}
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void
  order: 'asc' | 'desc'
  orderBy: string | number
  rowCount: number
}

export const EnhancedTableHead: React.FC<Props> = ({
  order,
  orderBy,
  onRequestSort,
  firstData,
}) => {
  const classes = useStyles()
  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }
  const generateHeadCells = () => {
    const headCellsArray: Array<{ id: string; label: string; numeric: boolean }> = []
    let isNumberic = false
    for (const [key, value] of Object.entries(firstData)) {
      typeof value === 'number' ? (isNumberic = true) : (isNumberic = false)
      headCellsArray.push({ id: key, label: key, numeric: isNumberic })
    }
    return headCellsArray
  }
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default EnhancedTableHead
