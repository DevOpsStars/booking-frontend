import React from 'react'
import Moment from 'react-moment';

export default function FormatedDate({ dateStr }) {
  return (
    <Moment format="DD/MM/YYYY">
        {dateStr}
    </Moment>
  )
}
