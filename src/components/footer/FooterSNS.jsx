// Imges
import facebook from "../../assets/icons/ic_facebook.svg";
import twitter from "../../assets/icons/ic_twitter.svg";
import youtube from "../../assets/icons/ic_youtube.svg";
import instagram from "../../assets/icons/ic_instagram.svg";

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

export default function FooterSNS({ className }) {
  return (
    <ul className={className}>
      {SNS_DATA.map((sns) => (
        <SNSItem key={sns.id} {...sns} />
      ))}
    </ul>
  );
}

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
