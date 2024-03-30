"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Service } from "@/services/services";
import { ResponseStatus } from "@/utils/constants";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader2 from "@/app/loader2";

const loginSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(5, { message: "Username must be 5 or more characters long" })
    .regex(/^\S+$/, "Space is not allowed")
    .max(20, { message: "Username must be 20 or fewer characters long" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(5, { message: "Password must be 5 or more characters long" })
    .regex(/^\S+$/, "Space is not allowed")
    .max(30, "Password must be 30 or fewer characters long"),
});

export default function Login() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    const response = await Service.login(values);
    if (response.status === ResponseStatus.Ok) {
      router.push("/feed");
      toast({
        description: "Successfully Logged In 😊",
      });
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.res.message,
      });
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader2 />;
  }

  return (
    <div className="h-full w-full flex">
      <div className="w-1/3 h-full hidden md:flex">
        <img src="/images/pattern.jpg" className="object-fit" />
      </div>
      <div className="w-full md:w-2/3 bg-rose-100 dark:bg-sdColor p-5 overflow-y-auto flex flex-col items-center justify-center gap-10">
        <img src="/images/profile.png" className="h-2/6 w-auto" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-4xl">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Username" {...field} />
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
                  <FormLabel className="text-4xl">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
