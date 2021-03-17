import React from 'react'

const UserOutput = (props) => {
  return (
    <div>
      <p>Username: {props.userName}</p>
      <p>Another text</p>
      <p>{props.children}</p>
    </div>
  )
}

export default UserOutput;