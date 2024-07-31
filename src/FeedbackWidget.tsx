import React, { KeyboardEventHandler, useCallback, useState } from "react";
import { Megaphone } from "~/components/icons/Megaphone";
import { X } from "~/components/icons/X";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";

import { Textarea } from "~/components/ui/textarea";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";
import { AnalyticsProvider } from "~/Providers";

type FeedbackWidgetProps = {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  provider: AnalyticsProvider;
};

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({
  position = "bottom-right",
  provider,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    provider.send(feedback);
    setFeedback("");
    setIsOpen(false);
    toast({
      title: "Feedback submitted",
      description: "Thank you!",
      variant: "success",
      duration: 2000,
    });
  };

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };
  const handleKeyDown: KeyboardEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  return (
    <>
      <Toaster />
      <div className={`fixed ${positionClasses[position]} z-50`}>
        {/* <FeedbackToast open={toastOpen} setOpen={setToastOpen} /> */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {isOpen && (
            <Card className="w-64">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3">
                <h3 className="font-semibold">Feedback</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="pr-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                <CardContent>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Your feedback..."
                    className="w-full"
                    autoFocus
                  />
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
        </div>
        {!isOpen && (
          <Button
            size="icon"
            className="rounded-full w-12 h-12 shadow-lg"
            onClick={() => setIsOpen(true)}
            aria-label="Open feedback form"
          >
            <Megaphone className="h-6 w-6" />
          </Button>
        )}
      </div>
    </>
  );
};
