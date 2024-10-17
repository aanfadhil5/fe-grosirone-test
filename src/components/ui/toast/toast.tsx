import toast, { ToastBar, Toaster } from "react-hot-toast";

const ToastComponent = () => {
  return (
    <div>
      <Toaster
        reverseOrder={false}
        position="top-right"
        toastOptions={{
          style: {
            border: "2px solid #D2DDEB",
            padding: "12px",
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== "loading" && (
                  <button
                    className="rounded-full p-1 ring-primary-400 transition hover:bg-[#f5f5f5] focus:outline-none focus-visible:ring"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <span className="sr-only">Close</span>
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
};

export default ToastComponent;
