"use client";

import { useFormState } from "react-dom";
import { selectSlackChannel } from "../actions/slack";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type ConnectedProps = {
  channels: {
    id: string;
    name: string;
  }[];
  defaultChannelId?: string;
};

const Connected = ({ channels, defaultChannelId }: ConnectedProps) => {
  const [state, action] = useFormState(selectSlackChannel, undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.errors) {
      toast({
        title: "Error",
        description: state.errors.channelId?.join(", "),
        variant: "destructive",
      });
    }
  }, [state?.errors]);

  useEffect(() => {
    if (state?.message) {
      toast({
        title: "Success",
        description: state.message,
      });
    }
  }, [state?.message]);

  return (
    <form action={action} className="flex flex-col gap-4">
      <Select defaultValue={defaultChannelId} name="channelId">
        <SelectTrigger>
          <SelectValue placeholder="Select a channel" />
        </SelectTrigger>
        <SelectContent>
          {channels.map((channel) => (
            <SelectItem key={channel.id} value={channel.id}>
              {channel.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit">Post Test Message</Button>
    </form>
  );
};

export default Connected;
