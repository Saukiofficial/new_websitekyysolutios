import { createContext, useContext, useState } from 'react';

const ContactModalContext = createContext({
    isOpen: false,
    openContact: () => {},
    closeContact: () => {},
});

export function ContactModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const openContact = () => setIsOpen(true);
    const closeContact = () => setIsOpen(false);

    return (
        <ContactModalContext.Provider value={{ isOpen, openContact, closeContact }}>
            {children}
        </ContactModalContext.Provider>
    );
}

export function useContactModal() {
    return useContext(ContactModalContext);
}
