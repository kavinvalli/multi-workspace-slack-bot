import { SignInBtn } from "@/components/SignInBtn";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-2 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Multi Workspace Slack Bot</h1>
      <SignInBtn />
    </div>
  );
}
