import { PropsWithChildren } from "react";

import bannerTop from "../../assets/banners/top_img.svg";
import bannerBottom from "../../assets/banners/bottom_img.svg";
import LinkBtn from "@/components/btns/LinkBtn";

export const LandingTop = () => {
  return (
    <LandingBannerLayout className="pt-12 md:pt-16">
      <LandingBannerText>
        <LandingBannerH2>
          일상의 모든 물건을 <br className="hidden lg:block" /> 거래해보세요
        </LandingBannerH2>

        <LinkBtn
          href="/items"
          className="bg-primary h-12 rounded-[40px] max-w-89.25 w-full"
        >
          구경하러 가기
        </LinkBtn>
      </LandingBannerText>
      <LandingBannerImg />
    </LandingBannerLayout>
  );
};

export const LandingBottom = () => {
  return (
    <LandingBannerLayout className="pt-36 md:pt-16">
      <LandingBannerText>
        <LandingBannerH2>
          믿을 수 있는 <br /> 판다마켓 중고거래
        </LandingBannerH2>
      </LandingBannerText>
      <LandingBannerBottomImg />
    </LandingBannerLayout>
  );
};

const LandingBannerLayout = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <section
      className={`bg-[#CFE5FF] flex justify-center items-end lg:h-135 ${className} lg:pt-0`}
    >
      <div className="space-y-40 w-full max-w-277.5 flex flex-col items-center lg:flex-row lg:justify-between lg:space-y-0">
        {children}
      </div>
    </section>
  );
};

const LandingBannerText = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-col items-center space-y-4.5 px-10 text-center lg:items-start lg:text-left lg:px-0 lg:mb-8">
      {children}
    </div>
  );
};

const LandingBannerH2 = ({ children }: PropsWithChildren) => {
  return (
    <h2 className="text-gray-700 font-bold text-[32px] lg:text-[40px] break-keep leading-[1.4]">
      {children}
    </h2>
  );
};

const LandingBannerImg = () => {
  return <img src={bannerTop} alt="" className="w-full max-w-186 lg:w-auto" />;
};

const LandingBannerBottomImg = () => {
  return (
    <img src={bannerBottom} alt="" className="w-full max-w-186 lg:w-auto" />
  );
};
