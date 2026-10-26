import Marquee from "react-fast-marquee";
import AuthenticProducts from "../cards/marqueCards/authenticProducts";
import FastDelivery from "../cards/marqueCards/fastDelivery";
import CashOnDelivery from "../cards/marqueCards/cashOnDelivery";
import SecurePayment from "../cards/marqueCards/securePayment";

export default function MarqueePage() {
  return (
    <Marquee
      className={`mx-auto max-w-screen-2xl`}
      speed={60}
      gradient={true}
      gradientColor="#FFF9F2"
      gradientWidth={600}
      autoFill
    >
      <AuthenticProducts />
      <FastDelivery />
      <CashOnDelivery />
      <SecurePayment />
    </Marquee>
  );
}
