// Imges
import feature1 from "../../assets/features/feature_img1.svg";
import feature2 from "../../assets/features/feature_img2.svg";
import feature3 from "../../assets/features/feature_img3.svg";

export default function Features() {
  return (
    <FeatureContainer>
      <FeatureItem
        imageSrc={feature1}
        tag="Hot Item"
        title={
          <>
            인기 상품을 <br className="hidden lg:block" /> 확인해 보세요
          </>
        }
        description={
          <>
            가장 HOT한 중고거래 물품을
            <br /> 판다 마켓에서 확인해 보세요
          </>
        }
      />

      <FeatureItem
        imageSrc={feature2}
        tag="Search"
        title={
          <>
            구매를 원하는 <br className="hidden lg:block" /> 상품을 검색하세요
          </>
        }
        description={
          <>
            구매하고 싶은 물품은 검색해서 <br /> 쉽게 찾아보세요
          </>
        }
        reverse
      />

      <FeatureItem
        imageSrc={feature3}
        tag="Register"
        title={
          <>
            판매를 원하는 <br className="hidden lg:block" /> 상품을 등록하세요
          </>
        }
        description={
          <>
            어떤 물건이든 판매하고 싶은 상품을
            <br /> 쉽게 등록하세요
          </>
        }
      />
    </FeatureContainer>
  );
}

const FeatureContainer = ({ children }) => {
  return (
    <main className="px-6 py-12 flex flex-col items-center justify-center space-y-20 lg:space-y-40">
      {children}
    </main>
  );
};

const FeatureItem = ({
  imageSrc,
  tag,
  title,
  description,
  reverse = false,
}) => {
  return (
    <section
      className={`
      lg:bg-[#FCFCFC] w-full lg:w-247
      flex flex-col space-y-6 
      lg:flex-row lg:items-center lg:space-y-0 lg:space-x-16
      ${reverse ? "lg:flex-row-reverse lg:space-x-reverse" : ""}
    `}
    >
      <img
        src={imageSrc}
        className="rounded-[7px] w-full object-contain"
        alt={tag}
      />

      <div
        className={`
        flex flex-col w-full 
        ${reverse ? "items-end text-right lg:pr-0" : "items-start text-left lg:pl-0"}
      `}
      >
        <FeatureTag>{tag}</FeatureTag>
        <FeatureTitle>{title}</FeatureTitle>
        <FeatureDescription>{description}</FeatureDescription>
      </div>
    </section>
  );
};

const FeatureTag = ({ children }) => (
  <span className="text-primary lg:font-abhaya font-bold text-[16px] leading-6.5 inline-block mb-2 lg:mb-6">
    {children}
  </span>
);

const FeatureTitle = ({ children }) => (
  <h2 className="font-bold text-[24px] leading-8 lg:leading-[140%] lg:text-[40px] lg:tracking-[2%] text-gray-700 break-keep mb-2 lg:mb-6">
    {children}
  </h2>
);

const FeatureDescription = ({ children }) => (
  <p className="text-[16px] lg:text-[24px] leading-6.5 lg:leading-8 font-medium text-gray-700 break-keep">
    {children}
  </p>
);
