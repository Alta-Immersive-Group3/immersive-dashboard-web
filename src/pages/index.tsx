import React from 'react';
import { Layout, Section } from '../components/Layout';

const Homepage = () => {
  return (
    <Layout>
      <Section
        id="section-dashboard"
        addClass="flex flex-col items-center p-3"
      >
        <div
          id="header"
          className="w-full h-[20%]"
        >
          Header
        </div>
        <div className="w-full h-[80%] bg-base-300 rounded-xl">content</div>
      </Section>
    </Layout>
  );
};

export default Homepage;
