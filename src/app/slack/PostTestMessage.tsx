"use client";

import { Button } from "@/components/ui/button";
import { postTestMessage } from "../actions/slack";

const PostTestMessage = () => {
  return (
    <form action={postTestMessage} className="w-full">
      <Button type="submit" className="w-full" variant="secondary">
        Post Test Message
      </Button>
    </form>
  );
};

export default PostTestMessage;
