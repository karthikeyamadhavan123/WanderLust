"use client"
import React, { useEffect } from "react"
import EmptyState from "./components/EmptyState"
interface ErrorProps{
    error:Error
}
const ErrorState:React.FC<ErrorProps> = ({error}) => {
  return (
  <EmptyState title="Uh Oh" subtitle="Something went wrong!"/>
  )
}

export default ErrorState
