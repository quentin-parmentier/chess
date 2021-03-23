import { useToast } from "vue-toastification";
const toast = useToast();

const settings = {
    timeout: 2000,
    position: "top-center",
    closeOnClick: true,
    icon: true
}

export function showError(message){
    toast.error(message, settings);
}

export function showSuccess(message){
    toast.success(message, settings);
}