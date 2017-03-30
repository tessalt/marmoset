import React from 'react';

const Errors = (props) => {
  if (!props.errors || !props.errors.length) {
    return null;
  }
  const errors = props.errors.map((error, key) => {
    return (
      <p key={key}>{error}</p>
    )
  });
  return (
    <div>
      <h4>errors</h4>
      {errors}
    </div>
  )
}
export default Errors;
