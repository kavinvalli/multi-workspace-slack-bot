import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Slack</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default SlackPage;
