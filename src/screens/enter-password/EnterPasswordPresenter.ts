import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MidelClient from "../../services/MidelClient";

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

  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      if (!isSubscribed) return;
      if (!signInRequest) return;
      setBusy(true);
      const client = new MidelClient();
      try {
        const signInSuccess = await client.authenticate(
          signInRequest.email,
          signInRequest.password
        );

        if (signInSuccess) {
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
  }, [signInRequest, navigate]);

  return {
    busy,
    setSignInRequest,
    error,
  };
};

export default EnterPasswordPresenter;
