import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, Authenticated, Unauthenticated } from "convex/react";
import AuthProcedure from "@/components/AuthProcedure";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

if (!publishableKey) {
  throw new Error("Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env");
}

export default function ConvexClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Unauthenticated>
          <AuthProcedure />
        </Unauthenticated>
        <Authenticated>{children}</Authenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
