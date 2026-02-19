// Components
import FooterLayout from "./FooterLayout";
import FooterContainer from "./FooterContainer";
import FooterCopyright from "./FooterCopyright";
import FooterLinks from "./FooterLinks";
import FooterSNS from "./FooterSNS";

export default function Footer() {
  return (
    <FooterLayout>
      <FooterContainer>
        <FooterCopyright className="order-3 mt-6 w-full text-left md:order-0 md:mt-0 md:w-auto">
          @codeit - 2024
        </FooterCopyright>

        <FooterLinks className="order-1 flex gap-4 md:order-0" />

        <FooterSNS className="order-2 flex gap-3 md:order-0" />
      </FooterContainer>
    </FooterLayout>
  );
}
