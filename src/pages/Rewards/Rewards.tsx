// rewards.tsx
import React from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import './rewards.scss';

const Rewards: React.FC = () => {
  return (
    <div className="rewards-page">
      <Header />

      {/* Three sections for rewards */}
      <section className="section">
        <h2>Section 1</h2>
        {/* Add content for section 1 here */}
      </section>

      <section className="section">
        <h2>Section 2</h2>
        {/* Add content for section 2 here */}
      </section>

      <section className="section">
        <h2>Section 3</h2>
        {/* Add content for section 3 here */}
      </section>

      <Footer />
    </div>
  );
};

export default Rewards;
