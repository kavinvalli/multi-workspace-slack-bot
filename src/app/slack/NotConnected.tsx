import { Button } from "@/components/ui/button";
import { absoluteUrl } from "@/lib/utils";

const NotConnected = async () => {
  const slackRedirectURI = absoluteUrl("/slack/callback");

  const slackURL = `https://slack.com/oauth/v2/authorize?scope=channels:read,groups:read,chat:write,chat:write.public&client_id=${
    process.env.SLACK_CLIENT_ID ?? ""
  }&redirect_uri=${
    slackRedirectURI.startsWith("http://")
      ? `https://redirectmeto.com/${slackRedirectURI}`
      : slackRedirectURI
  }`;
  return (
    <Button asChild>
      <a href={slackURL}>Connect Slack</a>
    </Button>
  );
};

export default NotConnected;
