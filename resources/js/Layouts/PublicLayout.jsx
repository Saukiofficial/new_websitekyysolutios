import Navbar from '@/Components/Shared/Navbar';
import Footer from '@/Components/Shared/Footer';

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}
