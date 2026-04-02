import { Link } from "react-router-dom";
import "./HomePage.css";

import pandaImage from "../../assets/images/panda.png";
import card1Image from "../../assets/images/card1.png";
import card2Image from "../../assets/images/card2.png";
import card3Image from "../../assets/images/card3.png";
import bottomImage from "../../assets/images/bottom.png";
import facebookLogo from "../../assets/images/facebook-logo.svg";
import twitterLogo from "../../assets/images/twitter-logo.svg";
import youtubeLogo from "../../assets/images/youtube-logo.svg";
import instagramLogo from "../../assets/images/instagram-logo.svg";

const featureList = [
  {
    id: 1,
    label: "Hot item",
    title: ["인기 상품을", "확인해 보세요"],
    description: ["가장 HOT한 중고거래 물품을", "판다 마켓에서 확인해 보세요"],
    image: card1Image,
    alt: "인기 상품 이미지",
    reverse: false,
  },
  {
    id: 2,
    label: "Search",
    title: ["구매를 원하는", "상품을 검색하세요"],
    description: ["구매하고 싶은 물품은 검색으로", "쉽게 찾아보세요"],
    image: card2Image,
    alt: "검색 이미지",
    reverse: true,
  },
  {
    id: 3,
    label: "Register",
    title: ["판매를 원하는", "상품을 등록하세요"],
    description: ["어떤 물건이든 판매하고 싶은 상품을", "쉽게 등록하세요"],
    image: card3Image,
    alt: "상품 등록 이미지",
    reverse: false,
  },
];

const socialLinks = [
  {
    id: 1,
    href: "https://www.facebook.com/",
    icon: facebookLogo,
    alt: "페이스북",
  },
  {
    id: 2,
    href: "https://twitter.com/",
    icon: twitterLogo,
    alt: "트위터",
  },
  {
    id: 3,
    href: "https://www.youtube.com/",
    icon: youtubeLogo,
    alt: "유튜브",
  },
  {
    id: 4,
    href: "https://www.instagram.com/",
    icon: instagramLogo,
    alt: "인스타그램",
  },
];

function HomePage() {
  return (
    <>
      {/* 상단 배너 */}
      <section className="panda-top-main">
        <div className="home-section panda-container">
          <div className="panda-inner">
            <p className="panda-text">
              일상의 모든 물건을
              <br />
              거래해 보세요
            </p>

            <Link to="/items" className="panda-button">
              구경하러 가기
            </Link>
          </div>

          <div className="panda-image-box">
            <img className="panda-image" src={pandaImage} alt="판다 이미지" />
          </div>
        </div>
      </section>

      {/* 카드 영역 */}
      <main className="features">
        {featureList.map((feature) => (
          <section
            key={feature.id}
            className={`home-section card ${feature.reverse ? "card-reverse" : ""}`}
          >
            <div className="card-image">
              <img src={feature.image} alt={feature.alt} />
            </div>

            <div className="card-text">
              <h2 className="card-abbreviation">{feature.label}</h2>
              <h2 className="card-title">
                {feature.title[0]}
                <br />
                {feature.title[1]}
              </h2>
              <p className="card-desc">
                {feature.description[0]}
                <br />
                {feature.description[1]}
              </p>
            </div>
          </section>
        ))}
      </main>

      {/* 하단 배너 */}
      <section className="bottom-banner">
        <div className="home-section bottom-inner">
          <h2 className="bottom-text">
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h2>

          <div className="bottom-image-box">
            <img src={bottomImage} alt="판다 두 마리 이미지" className="bottom-image" />
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="footer">
        <div className="home-section footer-inner">
          <div className="copyright">©codeit - 2024</div>

          <div className="footer-menu">
            <a href="/privacy">Privacy Policy</a>
            <a href="/faq">FAQ</a>
          </div>

          <div className="social-media">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={social.icon} alt={social.alt} width="20" height="20" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;