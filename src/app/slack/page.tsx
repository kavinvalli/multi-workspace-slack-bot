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
import NotConnected from "./NotConnected";
import { getSlackChannels } from "../actions/slack";
import Connected from "./Connected";
import PostTestMessage from "./PostTestMessage";

const SlackPage = async () => {
  const session = await getAuthSession();
  if (!session) return redirect("/");

  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return redirect("/");

  const channels = await getSlackChannels(user.slack_access_token ?? "");

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Slack</CardTitle>
          <CardDescription>Slack</CardDescription>
        </CardHeader>
        <CardContent>
          {user.slack_access_token ? (
            <div className="flex flex-col gap-4">
              <Connected
                channels={channels}
                defaultChannelId={user.slack_channel_id ?? ""}
              />
              <SignOutBtn />
            </div>
          ) : (
            <NotConnected />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SlackPage;
