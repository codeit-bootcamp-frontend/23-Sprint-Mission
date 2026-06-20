import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import IconDropDown from '../../assets/icon/icon-dropdown.svg?react';
import IconSort from '../../assets/icon/icon-sort.svg?react';
import { DEVICE } from '../../styles/breakpoints';

const ORDER_LABEL = {
  recent: '최신순',
  favorite: '좋아요순',
};

export default function DropDown({ orderBy, onChangeOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    onChangeOrder(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropDownBox ref={dropdownRef}>
      <Button type="button" onClick={() => setIsOpen((prev) => !prev)}>
        {ORDER_LABEL[orderBy]}
        <PcItem $isOpen={isOpen}>
          <IconDropDown />
        </PcItem>
        <MobileItem>
          <IconSort />
        </MobileItem>
      </Button>
      {isOpen && (
        <DropDownList>
          <DropDownItem>
            <DropDownButton
              type="button"
              onClick={() => handleSelect('recent')}
            >
              최신순
            </DropDownButton>
          </DropDownItem>
          <DropDownItem>
            <DropDownButton
              type="button"
              onClick={() => handleSelect('favorite')}
            >
              좋아요순
            </DropDownButton>
          </DropDownItem>
        </DropDownList>
      )}
    </DropDownBox>
  );
}

const PcItem = styled.div`
  display: block;

  svg {
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }

  @media ${DEVICE.mobile} {
    display: none;
  }
`;
const MobileItem = styled.div`
  display: none;
  @media ${DEVICE.mobile} {
    display: block;
  }
`;

const DropDownBox = styled.div`
  position: relative;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  min-width: 130px;
  height: 100%;
  border-radius: 12px;
  border: 1px solid var(--gray-200);
  background: #fff;

  @media ${DEVICE.mobile} {
    font-size: 0;
    min-width: auto;
    width: 42px;
    height: 42px;
    padding: 0;
    justify-content: center;
  }
`;
const DropDownList = styled.ul`
  z-index: 1;
  position: absolute;
  top: calc(100% + 8px);
  width: 100%;
  background: #fff;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
  overflow: hidden;

  @media ${DEVICE.mobile} {
    top: calc(100% + 4px);
    right: 0;
    width: 130px;
  }
`;
const DropDownItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;

  &:hover {
    background: var(--gray-100);
  }

  & + li {
    border-top: 1px solid var(--gray-200);
  }
`;
const DropDownButton = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  font-size: 16px;
`;
