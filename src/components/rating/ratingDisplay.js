import React from 'react'
import RatingList from './ratingList'
import NewRating from './newRating'

export default function RatingDisplay({forId = 2}) {
    // todo: dodati na lodging - makar listu i srednju ocenu
    // todo: dodati na rezervaciju koja je prosla - new rating componentu - ako se trazi u spec
    // todo: DELETE DODAJ
  return (
    <div>
      <NewRating type="host" forId={forId} />
      <RatingList type="host" forId={forId} />
    </div>
  )
}
