import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { absoluteUrl } from "@/lib/utils";
import { redirect } from "next/navigation";

const SlackCallbackPage = async ({
  searchParams,
}: {
  searchParams: { code: string };
}) => {
  const session = await getAuthSession();
  if (!session) return redirect("/");

  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return redirect("/");

  const { code } = searchParams;

  if (code) {
    const slackRedirectURI = absoluteUrl("/slack/callback");
    const response = await fetch("https://slack.com/api/oauth.v2.access", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.SLACK_CLIENT_ID ?? "",
        client_secret: process.env.SLACK_CLIENT_SECRET ?? "",
        code,
        redirect_uri: slackRedirectURI.startsWith("http://")
          ? `https://redirectmeto.com/${slackRedirectURI}`
          : slackRedirectURI,
      }),
    });

    const data = await response.json();
    if (data.ok) {
      user.slack_access_token = data.access_token;
      await db.user.update({
        where: { id: user.id },
        data: { slack_access_token: data.access_token },
      });
      return redirect("/slack");
    }
    console.error(data.error);
  } else {
    console.error("No code provided");
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          There was an error connecting to Slack. Please try again.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SlackCallbackPage;
