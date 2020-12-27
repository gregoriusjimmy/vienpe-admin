import React from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import {
  Paper,
  Table,
  TableContainer,
  TableCell,
  TablePagination,
  TableRow,
  TableBody,
  IconButton,
  Switch,
} from '@material-ui/core'

import { green } from '@material-ui/core/colors'
import EnhancedTableToolbar from '../enchanced-table-toolbar/enchanced-table-toolbar.component'
import EnhancedTableHead from '../enchanced-table-head/enchanced-table-head.component'
import EditAttributesIcon from '@material-ui/icons/EditAttributes'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CloseIcon from '@material-ui/icons/Close'
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

const getComparator = <Key extends keyof any>(
  order: Order,
  orderBy: Key
): ((a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const stableSort = <T extends unknown>(array: T[], comparator: (a: T, b: T) => number) => {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(0, 2),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
    },
    table: {
      minWidth: 750,
    },
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

type Data = {
  id?: string
  [other: string]: any
}
type Props = {
  data: Array<Data> | any
  arrayDataColumn: Array<{ id: string; label: string }>
  title: string
  placeholder: string
  inputSearch: string
  searchBasedOnId: string
  onSearchFieldChange: (e) => void
  handleAction?: (data) => void
  handleActionSwitch?: (data) => void
  [other: string]: any
}

const EnhancedTable: React.FC<Props> = ({
  data,
  arrayDataColumn,
  title,
  placeholder,
  inputSearch,
  searchBasedOnId,
  onSearchFieldChange,
  handleAction,
  handleActionSwitch,
}) => {
  const classes = useStyles()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const filterItemBySearch = (input: string, data: Array<Data>) => {
    if (input)
      return data.filter((element) =>
        element[searchBasedOnId].toUpperCase().includes(input.toUpperCase())
      )
    return data
  }

  const booleanToIcon = (value) => {
    if (value === 'true') return <CheckBoxIcon />
    else return <CloseIcon />
  }
  const convertToBoolean = (value) => {
    if (typeof value === 'boolean') return value
    else return value === 'true'
  }
  const generateTableCell = (id, key, value) => {
    let displayedValue
    if (key === 'status_membership') displayedValue = booleanToIcon(value)
    else if (key === 'aktif' && handleActionSwitch) {
      let convertedValue = convertToBoolean(value)

      displayedValue = (
        <Switch
          checked={convertedValue}
          onChange={(e) => handleActionSwitch({ id: id, aktif: !convertedValue })}
          size='small'
          color='primary'
          name='aktif'
        />
      )
    } else displayedValue = value

    return <TableCell key={`${id}-${key}`}>{displayedValue}</TableCell>
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

  return data ? (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          title={title}
          placeholder={placeholder}
          handleSearchChange={onSearchFieldChange}
        />

        <TableContainer>
          <Table className={classes.table} aria-labelledby='tableTitle' aria-label='enhanced table'>
            <EnhancedTableHead
              action={handleAction ? true : false}
              arrayDataColumn={arrayDataColumn}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(filterItemBySearch(inputSearch, data), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const id = Object.values(row)[0]
                  return (
                    <TableRow key={id}>
                      {Object.entries(row).map(([key, value]) => {
                        const tableCell = generateTableCell(id, key, value)
                        return tableCell
                      })}
                      {handleAction && (
                        <TableCell key={`edit-${Object.values(row)[0]}`}>
                          <IconButton
                            aria-label='edit'
                            size='small'
                            onClick={(e) => handleAction(row)}
                          >
                            <EditAttributesIcon style={{ color: green[500] }} />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length }]}
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  ) : null
}

export default EnhancedTable
