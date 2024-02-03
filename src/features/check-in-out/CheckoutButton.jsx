import Button from "../../ui/Button";
import { useCheckedout } from "./useCheckedout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingout } = useCheckedout();
  return (
    <Button
      $variation="primary"
      $size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
