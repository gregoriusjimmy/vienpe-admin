import React from 'react'
import { ColDef, DataGrid, DataGridProps, RowsProp } from '@material-ui/data-grid'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: 0,
      WebkitFontSmoothing: 'auto',

      '& .MuiDataGrid-columnsContainer': {
        backgroundColor: theme.palette.type === 'light' ? '#fafafa' : '#1d1d1d',
        borderRight: '0px ',
      },
      '& .MuiDataGrid-iconSeparator': {
        display: 'none',
      },
      '& .MuiDataGrid-toolbar': {
        marginBottom: theme.spacing(2),
      },
      '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
        borderRight: `0px solid`,
      },
    },
  })
)

interface Props {
  rows: RowsProp
  columns: ColDef[]
  [otherProps: string]: any
}

const CustomDataGrid = React.memo(
  ({ rows, columns, showToolbar = true, ...otherProps }: Props & DataGridProps) => {
    const classes = useStyles()
    return (
      <DataGrid
        className={classes.root}
        disableSelectionOnClick
        rows={rows}
        columns={columns}
        showToolbar={showToolbar}
        {...otherProps}
      />
    )
  },
  (prevProps, nextProps) => prevProps.rows === nextProps.rows
)

export default CustomDataGrid
