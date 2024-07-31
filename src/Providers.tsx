import { isNullOrUndefined } from "~/util/typecheck";

export type AnalyticsProvider = {
  send: (feedback: string) => void;
};

export namespace FeedbackProviders {
  export function GoogleAnalytics(gaId: string) {
    return {
      send(feedback: string) {
        if (isNullOrUndefined(window)) {
          console.error(
            `Error sending analytics event, missing window (window=${window})`
          );
          return;
        }
        if (
          !("gtag" in window) ||
          isNullOrUndefined(window.gtag) ||
          typeof window.gtag !== "function"
        ) {
          console.error(
            `Error sending analytics event, missing gtag (windowKeys=${Object.keys(
              window
            )}, window.gtag=${(window as any).gtag})`
          );
          return;
        }

        window.gtag("event", "feedback", { value: feedback });
      },
    };
  }
}
