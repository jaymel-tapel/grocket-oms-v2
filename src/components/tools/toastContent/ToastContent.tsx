import toast from "react-hot-toast";
import "./ToastContent.scss";

const ToastContent = (t, message: string) => (
  <span>
    {message}
    <button
      onClick={() => toast.dismiss(t.id)}
      className="toast-close-button"
      type="button"
    >
      ×
    </button>
  </span>
);

export default ToastContent;
