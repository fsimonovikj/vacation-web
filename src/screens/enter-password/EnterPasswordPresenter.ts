import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MidelClient from "../../services/MidelClient";
import { useAuth } from "../../auth/core/Auth";
import { AuthModel } from "../../auth/core/AuthModels";

interface ViewModel {
  busy: boolean;
  setSignInRequest: (val: SignInRequest) => void;
  error: string | null;
}

type SignInRequest = {
  email: string;
  password: string;
};

const EnterPasswordPresenter = (): ViewModel => {
  const [busy, setBusy] = useState(false);
  const [signInRequest, setSignInRequest] = useState<SignInRequest>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { saveAuth, saveUser } = useAuth();

  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      if (!isSubscribed) return;
      if (!signInRequest) return;
      setBusy(true);
      const client = new MidelClient();
      try {
        const response: AuthModel = await client.authenticate(
          signInRequest.email,
          signInRequest.password
        );

        if (response) {
          saveAuth(response);
          saveUser(response.user);
          navigate("/main");
        } else {
          setError("Invalid credentials");
        }
        setBusy(false);
      } catch (err) {
        setBusy(false);
      }
    })();
    return () => {
      isSubscribed = false;
    };
  }, [signInRequest, navigate, saveAuth, saveUser]);

  return {
    busy,
    setSignInRequest,
    error,
  };
};

export default EnterPasswordPresenter;
