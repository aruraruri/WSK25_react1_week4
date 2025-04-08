import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'

const Single = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  console.log(state)
  //const {item} = state;
  // or
  const item = state.item
  return (
    <>
       {item.media_type.includes('video') ? <video src={item.filename} controls/> : <img src={item.filename} alt={item.title} />}
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <button onClick={() => navigate(-1)}>Go back</button>
    </>

  )
}

Single.propTypes = {}

export default Single
