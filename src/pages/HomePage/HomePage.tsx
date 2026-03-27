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

function HomePage() {
  return (
    <>
      {/* 상단 배너 */}
      <section className="panda-top-main">
        <div className="container panda-container">
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

          <img
            className="panda-image"
            src={pandaImage}
            alt="판다 이미지"
          />
        </div>
      </section>

      <div className="features">
        <section className="container card">
          <div className="card-image">
            <img src={card1Image} alt="인기 상품 이미지" />
          </div>

          <header className="card-text">
            <h2 className="card-abbreviation">Hot item</h2>
            <h2 className="card-title">
              인기 상품을
              <br />
              확인해 보세요
            </h2>
            <h2 className="card-desc">
              가장 HOT한 중고거래 물품을
              <br />
              판다 마켓에서 확인해 보세요
            </h2>
          </header>
        </section>

        <section className="container card">
          <div className="card-text">
            <h2 className="card-abbreviation">Search</h2>
            <h2 className="card-title">
              구매를 원하는
              <br />
              상품을 검색하세요
            </h2>
            <h2 className="card-desc">
              구매하고 싶은 물품은 검색으로
              <br />
              쉽게 찾아보세요
            </h2>
          </div>

          <div className="card-image">
            <img src={card2Image} alt="검색 이미지" />
          </div>
        </section>

        <section className="container card">
          <div className="card-image">
            <img src={card3Image} alt="상품 등록 이미지" />
          </div>

          <div className="card-text">
            <h2 className="card-abbreviation">Register</h2>
            <h2 className="card-title">
              판매를 원하는
              <br />
              상품을 등록하세요
            </h2>
            <h2 className="card-desc">
              어떤 물건이든 판매하고 싶은 상품을
              <br />
              쉽게 등록하세요
            </h2>
          </div>
        </section>
      </div>

      <div className="bottom-banner">
        <div className="container bottom-inner">
          <h2 className="bottom-text">
            믿을 수 있는
            <br />
            판다마켓 중고 거래
          </h2>

          <div className="bottom-image">
            <img src={bottomImage} alt="판다 두 마리 이미지" />
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="copyright">©codeit - 2024</div>

        <div className="footerMenu">
          <a href="/privacy">Privacy Policy</a>
          <a href="/faq">FAQ</a>
        </div>

        <div className="socialMedia">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebookLogo} alt="페이스북" width="20" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitterLogo} alt="트위터" width="20" />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={youtubeLogo} alt="유튜브" width="20" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagramLogo} alt="인스타그램" width="20" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default HomePage;