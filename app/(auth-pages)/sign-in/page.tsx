import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/auth/form-message";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <form
      action={signInAction}
      className="flex-1 flex flex-col w-full max-w-lg mx-auto justify-center mt-24"
    >
      <div className="space-y-6 w-full">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="you@example.com"
              type="email"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                className="text-sm text-primary hover:underline"
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <SubmitButton className="w-full">Sign in</SubmitButton>

          <p className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link
              className="text-primary hover:underline font-medium"
              href="/sign-up"
            >
              Create an account
            </Link>
          </p>

          <FormMessage message={searchParams} />
        </div>
      </div>
    </form>
  );
}
