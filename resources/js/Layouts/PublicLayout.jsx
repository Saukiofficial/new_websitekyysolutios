import Navbar from '@/Components/Shared/Navbar';
import Footer from '@/Components/Shared/Footer';
import { LanguageProvider } from '@/Context/LanguageContext';

export default function PublicLayout({ children }) {
    return (
        <LanguageProvider>
            <div className="min-h-screen bg-white">
                <Navbar />
                <main>
                    {children}
                </main>
                <Footer />
            </div>
        </LanguageProvider>
    );
}
