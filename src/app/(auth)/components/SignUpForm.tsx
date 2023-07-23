"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input, InputProps } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import AuthSocialButton from "./AuthSocialButton";
import { Icons } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
import PasswordInput from "./PasswordInput";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="bg-white w-full relative p-4 md:p-6 lg:p-8 max-w-md rounded-3xl">
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 md:hidden">
        <Image src={"/images/ssu-logo.png"} width={100} height={100} alt="" />
      </div>
      <div className="flex flex-col mt-12 md:mt-0">
        <div className="flex flex-col justify-center items-center text-base md:text-lg font-semibold">
          Sorsogon State University <span>Bulan Campus</span>
        </div>
        <h3 className="text-xl text-maroon font-bold self-center">
          Webinar Management System
        </h3>
      </div>

      {/* form here */}
      <div className="flex flex-col gap-4 mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
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
                    <Input placeholder="example@email.com" {...field} />
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
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-sm cursor-pointer justify-center w-full text-center">
              <p className="text-neutral-500 hover:text-neutral-800 mx-auto">
                Forgot your password?
              </p>
            </div>
            <Button
              type="submit"
              className="w-full bg-maroon hover:bg-[#be0000]"
            >
              Sign up
            </Button>
          </form>
        </Form>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-[4px]">
            <div className="h-px bg-neutral-300 w-14" />
            <p className="text-neutral-500">or continue with</p>
            <div className="h-px bg-neutral-300 w-14"></div>
          </div>
          <div className="flex gap-4">
            <AuthSocialButton onClick={() => {}} icon={Icons.google} />
            <AuthSocialButton onClick={() => {}} icon={Icons.github} />
          </div>
        </div>

        <div className="group text-sm cursor-pointer justify-center w-full text-center">
          <p className="text-neutral-500  mx-auto">
            Already have an account?{" "}
            <span className="group-hover:text-neutral-800 group-hover:underline underline-offset-2">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
