import { ToastContainer, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MessagesProps {
    position?: ToastPosition | 'top-center';
}

const Messages = ({ position }: MessagesProps) => {
    return (
        <ToastContainer
            position={position}
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    );
}
 
export default Messages;