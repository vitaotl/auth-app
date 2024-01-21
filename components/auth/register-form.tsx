"use client"

import * as z from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { CardWrapper } from "./card-wrapper"
import { RegisterSchema } from "@/schemas"
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
import { register } from "@/actions/register"
import { useState, useTransition } from "react"

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <CardWrapper
      headeLabel="Create an account"
      backButtonLabel="Already have an account? Sign"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="John Doe"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input
                      {...field}
                      type="password"
                      placeholder="******"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" disabled={isPending} className="w-full">
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
