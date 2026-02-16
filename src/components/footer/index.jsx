import { Link } from "react-router";

// Imges
import facebook from "../../assets/icons/ic_facebook.svg";
import twitter from "../../assets/icons/ic_twitter.svg";
import youtube from "../../assets/icons/ic_youtube.svg";
import instagram from "../../assets/icons/ic_instagram.svg";

// Components
import FooterLayout from "../layout/FooterLayout";

const SNS_DATA = [
  {
    id: "facebook",
    href: "https://facebook.com",
    src: facebook,
    alt: "페이스북",
  },
  { id: "twitter", href: "https://twitter.com", src: twitter, alt: "트위터" },
  { id: "youtube", href: "https://youtube.com", src: youtube, alt: "유튜브" },
  {
    id: "instagram",
    href: "https://instagram.com",
    src: instagram,
    alt: "인스타그램",
  },
];

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

const FooterContainer = ({ children }) => {
  return (
    <div className="flex flex-wrap items-center justify-between w-full max-w-280 px-8 md:justify-around lg:justify-between lg:px-6">
      {children}
    </div>
  );
};

const FooterCopyright = ({ children, className }) => (
  <span
    className={`text-gray-400 font-pretendard text-base leading-4.75 ${className}`}
  >
    {children}
  </span>
);

const FooterLinks = ({ className }) => (
  <div
    className={`text-gray-200 font-pretendard text-base leading-4.75 ${className}`}
  >
    <Link to="/privacy" className="hover:underline">
      Privacy Policy
    </Link>
    <Link to="/faq" className="hover:underline">
      FAQ
    </Link>
  </div>
);

const FooterSNS = ({ className }) => (
  <ul className={className}>
    {SNS_DATA.map((sns) => (
      <SNSItem key={sns.id} {...sns} />
    ))}
  </ul>
);

const SNSItem = ({ href, src, alt }) => (
  <li>
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img
        src={src}
        alt={`${alt} 바로가기`}
        className="w-5 h-5 lg:w-6 lg:h-6"
      />
    </a>
  </li>
);
