import React from 'react'

function StarCount(props) {
  return(
    <div className="star-wrapper">
      <span label="a yellow star" role="img">⭐</span>
      <span className="star-count">{props.starNum}</span>
    </div>
  )
}

export default StarCount
