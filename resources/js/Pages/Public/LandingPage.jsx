import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Hero from '@/Components/Public/Hero';
import ServicesSection from '@/Components/Public/ServicesSection';
import MarketplacePreview from '@/Components/Public/MarketplacePreview';
import HowItWorks from '@/Components/Public/HowItWorks';
import PortfolioSection from '@/Components/Public/PortfolioSection';
import WhyChooseUs from '@/Components/Public/WhyChooseUs';
import Testimonials from '@/Components/Public/Testimonials';
import CTASection from '@/Components/Public/CTASection';

export default function LandingPage() {
    return (
        <PublicLayout>
            <Head>
                <title>KyySolutions — Digital Solutions for Modern Business</title>
                <meta name="description" content="KyySolutions builds modern websites, applications, custom software, and ready-made digital products for businesses and organizations." />
            </Head>
            
            {/* Visual Hierarchy Sequence (Section 32): Hero -> Services -> Marketplace -> Process -> Portfolio -> Why Choose Us -> Testimonials -> CTA */}
            <Hero />
            <ServicesSection />
            <MarketplacePreview />
            <HowItWorks />
            <PortfolioSection />
            <WhyChooseUs />
            <Testimonials />
            <CTASection />
        </PublicLayout>
    );
}
