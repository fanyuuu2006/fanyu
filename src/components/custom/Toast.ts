import Swal from "sweetalert2";
import "@/styles/Alert.css";

export const Toast: typeof Swal = Swal.mixin({
  toast: true,
  position: "center",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
  iconColor: "white",
  color: "#FFFFFF",
  customClass: {
    popup: "toast-color",
  },
});
