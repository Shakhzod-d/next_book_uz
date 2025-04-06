"use client";

import React, { useContext, useMemo } from "react";
import { Dialog } from "@mui/material";
import { LayoutContext } from "@/layout/context";
import { DialogHeader, Login, SignUp, Verify } from "../components";
import { AuthStyled } from "./Auth.style";

export type TAuthState = "login" | "sign-up" | "verify";

interface IAuth {
  // open: boolean,
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Auth: React.FC<IAuth> = ({}) => {
  const [state, setState] = React.useState<TAuthState>("login");
  const [mounted, setMounted] = React.useState(false);

  const {
    state: { authOpen },
    actions: { setAuthOpen },
  } = useContext(LayoutContext);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  const form = (() => {
    switch (state) {
      case "verify":
        return <Verify {...{ setState, onClose: () => setAuthOpen(false) }} />;
      case "sign-up":
        return <SignUp {...{ setState }} />;
      default:
        return <Login {...{ setState }} />;
    }
  })();

  // const form = useMemo(() => {
  //   if (state === "verify")
  //     return <Verify {...{ setState, onClose: () => setAuthOpen(false) }} />;
  //   else if (state === "sign-up") return <SignUp {...{ setState }} />;
  //   else return <Login {...{ setState }} />;
  // }, [state, setState]);

  // const form = React.useMemo(() => {
  //   switch (state) {
  //     case "verify":
  //       return <Verify {...{ setState, onClose: () => setAuthOpen(false) }} />;
  //     case "sign-up":
  //       return <SignUp {...{ setState }} />;
  //     default:
  //       return <Login {...{ setState }} />;
  //   }
  // }, [state, setState]);

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={authOpen}
      onClose={() => setAuthOpen(false)}
    >
      {mounted && authOpen && (
        <AuthStyled className="p-4">
          <DialogHeader {...{ onClose: () => setAuthOpen(false) }} />
          {form}
        </AuthStyled>
      )}
    </Dialog>
  );
};

export default Auth;
