import React from 'react';
import styled from 'styled-components';

const Price = styled.p`
  margin: 0;
`;

const Company = styled.p`
  margin: 0;
  font-weight: bold;
`;

const CompanyInfo = ({ quote }) => {
  const { companyName, latestPrice } = quote;

  if (companyName) {
    return (
      <div>
        <Company>{companyName}</Company>
        <Price>{latestPrice} USD</Price>
      </div>
    );
  }

  return <div />;
};

export default CompanyInfo;
