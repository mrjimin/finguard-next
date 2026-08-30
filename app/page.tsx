import Header from "@/components/Header";
import Footer from "@/components/Footer";

import HeroSection from "@/components/landing/HeroSection";
import WhySection from "@/components/landing/WhySection";
import CheckSection from "@/components/landing/CheckSection";
import AnalyzeSection from "@/components/landing/AnalyzeSection";
import {ResponseSection} from "@/components/landing/ResponseSection";
import StartSection from "@/components/landing/StartSection";

export default function Home() {
    return (
        <div className="page">
            <Header />

            <main>
                <HeroSection />
                <WhySection />
                <CheckSection />
                <AnalyzeSection />
                <ResponseSection />
                <StartSection />
            </main>

            <Footer />
        </div>
    );
}
