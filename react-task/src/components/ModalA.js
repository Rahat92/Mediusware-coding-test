import { createPortal } from 'react-dom';
const ModalA = ({ children, wrapperId, modalName }) => {
    return createPortal(children, document.getElementById(wrapperId));
  }
  export default ModalA;