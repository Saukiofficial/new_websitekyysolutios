export const fadeInUp = {
    hidden: { 
        opacity: 0, 
        y: 40 
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const fadeIn = {
    hidden: { 
        opacity: 0 
    },
    visible: { 
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

export const scaleIn = {
    hidden: { 
        opacity: 0, 
        scale: 0.8 
    },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

export const slideInLeft = {
    hidden: { 
        opacity: 0, 
        x: -60 
    },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const slideInRight = {
    hidden: { 
        opacity: 0, 
        x: 60 
    },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

export const staggerItem = {
    hidden: { 
        opacity: 0, 
        y: 20 
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.5
        }
    }
};

export const hoverScale = {
    scale: 1.05,
    transition: {
        duration: 0.3,
        ease: "easeInOut"
    }
};

export const hoverLift = {
    y: -8,
    transition: {
        duration: 0.3,
        ease: "easeInOut"
    }
};
