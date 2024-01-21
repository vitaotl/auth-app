import React from "react"
import { Card, CardFooter, CardHeader } from "../ui/card"
import { Header } from "./header"
import { BackButton } from "./back-button"

// import { Container } from './styles';

const ErrorCard: React.FC = () => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Oops! Something went wrong!" />
      </CardHeader>
      <CardFooter>
        <BackButton label="Backt to login" href="/auth/login" />
      </CardFooter>
    </Card>
  )
}

export default ErrorCard
