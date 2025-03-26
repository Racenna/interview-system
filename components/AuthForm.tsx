"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CustomFormField from "./CustomFormField";
import { Button } from "@/components/ui/button";
import { Form } from "./ui/form";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(2) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const isSignIn = type === "sign-in";
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("values:", values); // TODO - delete console.log
      if (type === "sign-up") {
        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        toast.success("Sign in successfully.");
        router.push("/");
      }
    } catch (error) {
      toast.error(`There was an error: ${error}`);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {!isSignIn && (
            <CustomFormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Your name"
            />
          )}
          <CustomFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Your email address"
            type="email"
          />
          <CustomFormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
          <Button type="submit">
            {isSignIn ? "Sign in" : "Create an account"}
          </Button>
        </form>
      </Form>
      <p>
        {isSignIn ? "No account yet?" : "Have an account already?"}
        <Link href={isSignIn ? "/sign-up" : "sign-in"} className="ml-1">
          {isSignIn ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
