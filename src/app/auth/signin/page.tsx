'use client'

import React, { useEffect } from 'react';
import { useSession, signIn } from "next-auth/react";
import { Button } from '~/components/ui/button';
import { FaGoogle } from "react-icons/fa";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter } from 'next/navigation';
import RootLayout from '~/app/layout';

export default function Signin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If the user is already signed in, redirect them to the homepage
    if (session) {
      router.push('/'); // Redirect to homepage
    }
  }, [session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Optionally, show a loading indicator while checking the session
  }

  return (
    <Card className="w-[450px]" >
      <CardHeader className="items-center">
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign In into your Account</CardDescription>
      </CardHeader>
      <CardContent>
        {/* You can add additional content here if needed */}
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Button onClick={() => signIn()} className="w-full">
          <FaGoogle />
          Sign In
        </Button>
      </CardFooter>
    </Card>
  );
}
