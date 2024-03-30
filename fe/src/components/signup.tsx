"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ACCEPTED_FILE_TYPES,
  MAX_UPLOAD_SIZE,
  Professions,
  ResponseStatus,
} from "@/utils/constants";
import React, { useState } from "react";
import { Service } from "@/services/services";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Loader2 from "@/app/loader2";

const signUpSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required" })
      .min(5, { message: "Username must be 5 or more characters long" })
      .regex(/^\S+$/, "Space is not allowed")
      .max(20, { message: "Username must be 20 or fewer characters long" }),
    firstName: z
      .string({ required_error: "First name is required" })
      .min(1, { message: "First name must be 5 or more characters long" })
      .regex(/^\S+$/, "Space is not allowed")
      .max(20, { message: "First name must be 20 or fewer characters long" }),
    lastName: z
      .string({ required_error: "Last name is required" })
      .min(0, { message: "Last name must be 5 or more characters long" })
      .regex(/^\S+$/, "Space is not allowed")
      .max(20, { message: "Last name must be 20 or fewer characters long" }),
    email: z
      .string({ required_error: "Last name is required" })
      .email({ message: "Invalid email address" }),
    phonenumber: z
      .string({ required_error: "Phone number is required" })
      .length(10, { message: "Invalid phone number" })
      .regex(/^\S+$/, "Space is not allowed"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(5, { message: "Password must be 5 or more characters long" })
      .regex(/^\S+$/, "Space is not allowed")
      .max(30, "Password must be 30 or fewer characters long"),
    profession: z.string({
      required_error: "Professtion is required",
    }),
    passwordConfirm: z.string(),
    document: z
      .custom<FileList>()
      .transform((val) => {
        if (val instanceof File) return val;
        if (val instanceof FileList) return val[0];
        return null;
      })
      .superRefine((file, ctx) => {
        if (!(file instanceof File)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            fatal: true,
            message: "Document is required",
          });

          return z.NEVER;
        }

        if (file.size > MAX_UPLOAD_SIZE) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Max file size allowed is 5MB",
          });
        }

        if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Document must be of type either pdf, png or jpeg.",
          });
        }
      })
      .pipe(z.custom<File>()),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Password do not match.",
      path: ["passwordConfirm"],
    }
  );

export default function SignUp() {
  const router = useRouter();
  const [preview, setPreview] = useState<{
    url: string | ArrayBuffer | null;
    name: string;
  }>({ url: "", name: "" });
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
      phonenumber: "",
      profession: "",
      document: undefined,
    },
    mode: "onChange",
  });
  let fileRef = form.register("document", { required: true });
  const onSubmit = async (value: z.infer<typeof signUpSchema>) => {
    const data = new FormData();
    const { document, passwordConfirm, ...userData } = value;
    data.append("crazy", document);
    data.append("data", JSON.stringify(userData));
    setIsLoading(true);
    const response = await Service.signUp(data);
    if (response.status === ResponseStatus.Created) {
      toast({
        title: "Woohoo!",
        description: "Successfully Signed Up!",
      });
      router.push("/feed");
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: response.res?.message,
      });
      setIsLoading(false);
    }
  };
  const handlePreview = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const file = new FileReader();

    if (target.files[0].type === "application/pdf") {
      setPreview({ url: "/images/pdf.png", name: target.files[0].name });
      setIsUploaded(true);
    } else {
      try {
        file.readAsDataURL(target.files[0]);
        file.onload = () => {
          setPreview({ url: file.result, name: target.files[0].name });
          setIsUploaded(true);
        };
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDrag = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDrag(true);
  };
  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDrag(false);
  };
  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const target = event.dataTransfer;
    const file = new FileReader();

    if (target.files[0].type === "application/pdf") {
      setPreview({ url: "/images/pdf.png", name: target.files[0]?.name });
      setIsUploaded(true);
    } else {
      try {
        file.readAsDataURL(target.files[0]);
        file.onload = () => {
          setPreview({ url: file.result, name: target.files[0]?.name });
          setIsUploaded(true);
        };
      } catch (error) {
        console.log(error);
      }
    }
    form.setValue("document", event.dataTransfer.files[0]);
    setIsDrag(false);
  };
  const handleRemoval = () => {
    form.resetField("document");
    setIsUploaded(false);
  };
  if (isLoading) {
    return <Loader2 />;
  }
  return (
    <div className="h-full w-full flex">
      <div className="w-1/3 h-full bg-green-500 hidden md:flex">
        <img src="/images/pattern.jpg" className="object-fit" />
      </div>
      <div className="w-full md:w-2/3 bg-rose-100 dark:bg-sdColor p-5 overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 flex flex-col justify-center items-center px-5"
          >
            <div className="flex flex-col md:flex-row w-full gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-2xl md:text-base">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-2xl md:text-base">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-2xl md:text-base">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-2xl md:text-base">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormDescription>
                      Email linked with your account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-2xl md:text-base">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormDescription>
                      Set a password for your account.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-2xl md:text-base">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Re-Enter your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-5">
              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-2xl md:text-base">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter phone number"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormDescription>
                      Won't be displayed publicly.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-2xl md:text-base">
                      Profession
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className="placeholder-green-500"
                            placeholder="Select a profession"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="z-[4000]">
                        {Professions.map((profession) => {
                          return (
                            <SelectItem key={profession} value={profession}>
                              {profession}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select your profession.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem className="w-full flex-col">
                  <FormLabel className="text-2xl md:text-base">
                    Document
                  </FormLabel>
                  <FormControl>
                    {isUploaded ? (
                      <div className="w-full border-dashed border-2 border-rose-500 p-2 rounded-2xl h-32">
                        <div className="relative h-full flex gap-2 w-full items-center">
                          <img
                            src={preview.url as any}
                            className="h-full rounded-2xl"
                          />
                          <img
                            src="/images/cross.png"
                            className="w-auto h-5 absolute top-0 right-0 hover:cursor-pointer"
                            onClick={handleRemoval}
                          />
                          <p className="w-full overflow-y-hidden break-words whitespace-normal">
                            {preview.name}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <label
                          htmlFor="docs"
                          onDragOver={handleDrag}
                          onDrop={handleDrop}
                          onDragLeave={handleDragLeave}
                          className={`text-2xl transition w-full h-32 border-2 flex  border-dashed hover:cursor-pointer justify-center items-center p-2 rounded-2xl border-rose-500 relative ${
                            isDrag ? "bg-tlColor border-black" : ""
                          } `}
                        >
                          {!isDrag
                            ? "Click or Drag and Drop to upload"
                            : "Drop the file"}
                        </label>
                        <input
                          id="docs"
                          placeholder="Upload your document"
                          {...fileRef}
                          type="file"
                          className="invisible absolute top-0"
                          accept="application/pdf,image/jpeg,image/png"
                          onChangeCapture={handlePreview}
                        />
                      </>
                    )}
                  </FormControl>
                  <FormDescription>Upload your Document here.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Sign Up</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
