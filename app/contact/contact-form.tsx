"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon, SendIcon } from "lucide-react";
import { submitContactForm } from "./actions";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";

export default function ContactForm() {
  return (
    <div className="bg-background p-4 lg:p-6 rounded-lg border shadow-md">
      <form
        action={async (formData) => {
          const { error } = await submitContactForm(formData);
          if (error) {
            toast.error(error.message);
          } else {
            toast.success("Thank you for your message!");
          }
        }}
      >
        <FormChildren />
      </form>
    </div>
  );
}

function FormChildren() {
  const { pending } = useFormStatus();

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-2.5">
        <Label>Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="email@example.com"
          required
          disabled={pending}
        />
      </div>
      <div className="grid grid-cols-1 gap-2.5">
        <Label>Message / Feedback</Label>
        <Textarea
          name="message"
          placeholder="Your honest opinion"
          required
          disabled={pending}
        />
      </div>
      <div>
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <SendIcon className="size-4" />
          )}
          Submit
        </Button>
      </div>
    </div>
  );
}
