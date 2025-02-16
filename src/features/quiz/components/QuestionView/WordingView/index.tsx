import React from 'react'
import { WordingViewProps } from './types'

/**
 * Отображение формулировки
 * @see Wording - тип "формулировка"
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
          return <React.Fragment key={index}>{"{Неизвестный фрагмент}"}</React.Fragment>
      }
    })}
  </>
  
}

export default WordingView