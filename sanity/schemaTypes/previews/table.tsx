import React from 'react'
import type { PreviewProps } from 'sanity'

interface TablePreviewProps extends PreviewProps {
  table?: {
    rows?: Array<{
      cells?: string[]
    }>
  }
}

const TablePreview = (props: TablePreviewProps) => {
  const { table } = props as any
  
  if (!table) {
    return <p>Table: Add Values</p>
  }
  const [head, ...rows] = table?.rows || []
  
  return (
    <table width="100%">
      {head?.cells?.filter(Boolean).length && (
        <thead>
          <tr>
            {head.cells.map((cell: string, index: number) => (
              <th style={{ textAlign: 'left' }} key={index}>
                {cell}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows?.map((row: any, index: number) => (
          <tr key={index}>
            {row.cells?.map((cell: string, cellIndex: number) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TablePreview
