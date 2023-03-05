import { Suspense, useEffect } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import { AuthProvider } from "../../hooks/useAuth";

export const AuthLayout = () => {
  const outlet = useOutlet();
  const { userPromise } = useLoaderData();
  useEffect(() => {
    console.log("userPromise", userPromise);
  }, [userPromise]);
  return (
    <Suspense fallback={<LinearProgress variant="determinate" />}>
      <Await
        resolve={userPromise}
        errorElement={<Alert severity="error">Something went wrong!</Alert>}
        children={(user) => (
          <AuthProvider userData={user}>{outlet}</AuthProvider>
        )}
      />
    </Suspense>
  );
};
