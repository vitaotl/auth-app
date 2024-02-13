"use client"

import * as z from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { CardWrapper } from "./card-wrapper"
import { LoginSchema } from "@/schemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import FormError from "../form-error"
import FormSuccess from "../form-success"
import { login } from "@/actions/login"
import { useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use!"
      : ""

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <CardWrapper
      headeLabel="Welcome back"
      backButtonLabel="Don't have an account? Sign up"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john.doe@example.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="******"
                        disabled={isPending}
                      />
                      {showPassword ? (
                        <FaEyeSlash
                          className="absolute top-2/4 right-0 bottom-2/4 
                      -translate-x-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <FaEye
                          className="absolute top-2/4 right-0 bottom-2/4 
                      -translate-x-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
