import React from 'react';
import styled from 'styled-components';
import { IoMenu } from 'react-icons/io5';
import { ReactComponent as Logo } from 'assets/Logo.svg';

const NewHeader = () => {
  const todayDate = React.useMemo(() => new Date(), []);
  const today = todayDate.toLocaleDateString();

  const menuOpenHandler = () => {
    console.log('OPEN');
  };

  return (
    <HeaderWrapper>
      <Wrapper>
        <LogoWrapper>
          <StyledLogo />
        </LogoWrapper>
        <IoMenu fontSize={'2rem'} onClick={menuOpenHandler} />
      </Wrapper>
      <Contents>
        {today}
        {' ☀️ 맑음'}
      </Contents>
    </HeaderWrapper>
  );
};

export default React.memo(NewHeader);

const HeaderWrapper = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.commonColors.black};
  background-color: #fff;
  padding: 2rem 1rem 1rem;
`;

const LogoWrapper = styled.div`
  width: 30%;
`;

const StyledLogo = styled(Logo)`
  width: 100%;
  height: 100%;
`;

const Contents = styled.div`
  margin-top: 0.2rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;