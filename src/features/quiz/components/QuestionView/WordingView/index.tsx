import React, { memo } from 'react'
import { WordingViewProps } from './types'

/**
 * Wording constructor
 * @see Wording - wording type
 */
const WordingView: React.FC<WordingViewProps> = ({
  wording,
  data,
}) => {
  return <>
    {wording.map(({type, content}, index) => {
      
      switch (type) {
        case "raw":
          return <React.Fragment key={index}>{content}</React.Fragment>
        case "field": 
          return <React.Fragment key={index}>{String(data[content]) || "-"}</React.Fragment>
        default:
          return <React.Fragment key={index}>{"{Error: unknown fragment}"}</React.Fragment>
      }
    })}
  </>
  
}

export default memo(WordingView);