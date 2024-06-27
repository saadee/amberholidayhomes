import Dialog from '@mui/material/Dialog';
import { usePropertyContext } from 'src/context/PropertyContext';
import LoginBackgroundView from 'src/sections/auth/login-background-view';

export default function LoginModal() {
  const { openLoginModal } = usePropertyContext();

  const handleClose = () => {
    openLoginModal.onFalse();
  };

  return (
    <Dialog maxWidth="lg" open={openLoginModal.value} onClose={handleClose}>
      <LoginBackgroundView />
    </Dialog>
  );
}
