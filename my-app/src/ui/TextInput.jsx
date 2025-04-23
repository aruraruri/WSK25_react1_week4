import React from 'react'

export const TextInput = (props) => {
  return (
    <div classname="flex flex-col w-9/12">
        <label htmlFor="title">{props.label}</label>
        <input
            type="text"
            {...props}
            classname="my-2.5 rounded border-1"
        />
    </div>
  )
}

export default TextInput
