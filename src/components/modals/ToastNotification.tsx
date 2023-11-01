import React from "react";
import toast, { Toaster, ToastBar } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import "material-react-toastify/dist/ReactToastify.css";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

export const ToastNotification: React.FC = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: "#ebfdf4",
              color: "#3d9073",
            },
          },
          loading: {
            style: {
              background: "#eef6ff",
              color: "#456ddf",
            },
          },
          error: {
            style: {
              background: "#fef1f2",
              color: "#bf2f2e",
            },
          },
          style: {
            margin: "15px",
            padding: "20px",
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                <Box sx={{ paddingRight: 5 }}>{message}</Box>
                {t.type !== "loading" && (
                  <Button
                    sx={{ m: -1 }}
                    color="inherit"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <CloseIcon />
                  </Button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </>
  );
};
