"use client"

import { CardWrapper } from "./card-wrapper"
import { BeatLoader } from "react-spinners"

import { useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"

const NewVerificationForm: React.FC = () => {
  const searchParams = useSearchParams()

  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    console.log(token)
  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      headeLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        <BeatLoader />
      </div>
    </CardWrapper>
  )
}

export default NewVerificationForm
