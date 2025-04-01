"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import CustomFormField from "@/components/CustomFormField";

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

  console.log("form:", form);

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="form space-y-8"
          >
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
            <Button type="submit" className="button">
              {isSignIn ? "Sign in" : "Create an account"}
            </Button>
            <p className="text-center">
              {isSignIn ? "No account yet?" : "Have an account already?"}
              <Link
                href={isSignIn ? "/sign-up" : "sign-in"}
                className="underline underline-offset-2 ml-1"
              >
                {isSignIn ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
