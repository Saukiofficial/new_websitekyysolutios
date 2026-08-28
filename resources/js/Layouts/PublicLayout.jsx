import Navbar from '@/Components/Shared/Navbar';
import Footer from '@/Components/Shared/Footer';
import ContactModal from '@/Components/Public/ContactModal';
import { LanguageProvider } from '@/Context/LanguageContext';
import { ContactModalProvider, useContactModal } from '@/Context/ContactModalContext';

function PublicLayoutContent({ children }) {
    const { isOpen, openContact, closeContact } = useContactModal();

    return (
        <div className="min-h-screen bg-white">
            <Navbar onOpenContact={openContact} />
            <main>
                {children}
            </main>
            <Footer onOpenContact={openContact} />
            <ContactModal isOpen={isOpen} onClose={closeContact} />
        </div>
    );
}

export default function PublicLayout({ children }) {
    return (
        <LanguageProvider>
            <ContactModalProvider>
                <PublicLayoutContent>
                    {children}
                </PublicLayoutContent>
            </ContactModalProvider>
        </LanguageProvider>
    );
}
