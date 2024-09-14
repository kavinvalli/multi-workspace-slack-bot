import { SignOutBtn } from "@/components/SignOutBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const SlackPage = async () => {
  const session = await getAuthSession();
  if (!session) return redirect("/");

  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return redirect("/");

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Slack</CardTitle>
          <CardDescription>Slack</CardDescription>
        </CardHeader>
        {user.slack_access_token ? (
          <CardContent>
            <Button asChild>
              <a href="">Connect Slack</a>
            </Button>
          </CardContent>
        ) : (
          <CardContent>
            <Button>Connect Slack</Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default SlackPage;
