"use server";

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export type FormState =
  | {
      errors?: {
        channelId?: string[];
      };
      message?: string;
    }
  | undefined;

export const getSlackChannels = async (accessToken?: string) => {
  if (!accessToken) return [];

  try {
    const response = await fetch(
      "https://slack.com/api/conversations.list?limit=1000&types=public_channel,private_channel",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await response.json();
    return data.channels;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const selectSlackChannel = async (
  state: FormState,
  formData: FormData
) => {
  const session = await getAuthSession();
  if (!session) return redirect("/");

  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return redirect("/");

  const channelId = formData.get("channelId");

  if (!channelId) {
    return {
      errors: {
        channelId: ["Channel ID is required"],
      },
    };
  }

  const response = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.slack_access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channel: channelId,
      text: "Test message",
    }),
  });

  const data = await response.json();
  if (!data.ok) {
    return {
      errors: {
        channelId: ["Failed to post message"],
      },
    };
  }

  return {
    message: "Channel selected successfully",
  };
};

export const postTestMessage = async (formData: FormData) => {
  const session = await getAuthSession();
  if (!session) return redirect("/");

  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
  });

  if (!user) return redirect("/");

  const channelId = user.slack_channel_id;

  if (!channelId) {
    return {
      errors: {
        channelId: ["Channel ID is required"],
      },
    };
  }
};
