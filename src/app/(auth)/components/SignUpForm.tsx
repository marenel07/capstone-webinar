'use client';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import AuthSocialButton from './AuthSocialButton';
import { Icons } from '@/components/ui/icons';
import { useRouter } from 'next/navigation';
import PasswordInput from './PasswordInput';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { signIn, useSession } from 'next-auth/react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email().toLowerCase(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormValues = z.infer<typeof formSchema>;

const SignUpForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const session = useSession();

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.push('/');
    }
  }, [session?.status, router]);

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    axios
      .post('/api/register', values)
      .catch((error) => {
        toast({
          description: error.response.data,
          variant: 'destructive',
        });
      })
      .finally(() => {
        setLoading(false);
        toast({
          title: 'Account created successfully',
          description: 'You can now sign in to your account',
          variant: 'default',
        });
        router.push('/sign-in');
      });
  };

  const socialAction = async (provider: string) => {
    try {
      setLoading(true);
      await signIn(provider, {
        callbackUrl: '/',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white w-full relative p-4 md:p-6 lg:p-8 max-w-md rounded-3xl'>
      <div className='absolute -top-12 left-1/2 transform -translate-x-1/2 md:hidden'>
        <Image src={'/images/ssu-logo.png'} width={100} height={100} alt='' />
      </div>
      <div className='flex flex-col mt-12 md:mt-0'>
        <div className='flex flex-col justify-center items-center text-base md:text-lg font-semibold'>
          Sorsogon State University <span>Bulan Campus</span>
        </div>
        <h3 className='text-xl text-maroon font-bold self-center'>
          Webinar Management System
        </h3>
      </div>

      {/* form here */}
      <div className='flex flex-col gap-4 mt-8'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='text-sm cursor-pointer justify-center w-full text-center'>
              <p className='text-neutral-500 hover:text-neutral-800 mx-auto'>
                Forgot your password?
              </p>
            </div>
            <Button
              type='submit'
              disabled={loading}
              className='w-full bg-maroon hover:bg-[#be0000]'
            >
              Sign up
            </Button>
          </form>
        </Form>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-center gap-[4px]'>
            <div className='h-px bg-neutral-300 w-14' />
            <p className='text-neutral-500'>or continue with</p>
            <div className='h-px bg-neutral-300 w-14'></div>
          </div>
          <div className='flex gap-4'>
            <AuthSocialButton
              disabled={loading}
              onClick={() => socialAction('google')}
              icon={Icons.google}
            />
            <AuthSocialButton
              disabled={loading}
              onClick={() => socialAction('github')}
              icon={Icons.github}
            />
          </div>
        </div>

        <div
          onClick={() => router.push('/sign-in')}
          className='group text-sm cursor-pointer justify-center w-full text-center'
        >
          <p className='text-neutral-500  mx-auto'>
            Already have an account?{' '}
            <span className='group-hover:text-neutral-800 group-hover:underline underline-offset-2'>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
