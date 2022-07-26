import React from 'react'
import CardCommessa from '../../components/CardCommessa'

export default function Commesse() {
  return (
    <>
        <CardCommessa id_lavoro={sessionStorage.id_employee} />
    </>
  )
}
