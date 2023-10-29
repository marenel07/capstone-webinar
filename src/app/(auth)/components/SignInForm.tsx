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
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  idNumber: z.string().min(1, "name is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof formSchema>;

const SignInForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idNumber: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }

    if (
      session?.status === "authenticated" &&
      session?.data?.user?.role === "ADMIN"
    ) {
      router.push("/admin/users");
    }
  }, [router, session]);

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    await signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        } else if (callback?.ok) {
          toast.success("Successfully logged in");
          router.push("/");
        }
      })
      .finally(() => {
        setLoading(false);
      });
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

      {/* Form */}
      <div className="flex flex-col gap-4 mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
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
                    <Input {...field} type="password" disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-sm cursor-pointer flex justify-center gap-x-2 items-center">
              <p className="text-neutral-500 hover:text-neutral-800">
                Forgot your password?
              </p>
              <HoverCard>
                <HoverCardTrigger>
                  <AlertCircle size={18} className="text-rose-500" />
                </HoverCardTrigger>
                <HoverCardContent side="top">
                  If you add your email address to your account, we can send you
                  a password reset email.
                </HoverCardContent>
              </HoverCard>
            </div>
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-maroon hover:bg-[#be0000]"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
