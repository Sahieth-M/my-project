import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import LiveDemo from './components/LiveDemo';
import Features from './components/Features';
import TechnicalArchitecture from './components/TechnicalArchitecture';
import ComparisonTable from './components/ComparisonTable';
import ResultsStats from './components/ResultsStats';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Hero />
      <HowItWorks />
      <LiveDemo />
      <Features />
      <TechnicalArchitecture />
      <ComparisonTable />
      <ResultsStats />
      <Footer />
    </div>
  );
}

export default App;
