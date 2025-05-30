export const useAnimation = () => {
  const observeElements = () => {
    if (import.meta.client) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fadeInUp");
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => observer.observe(el));
    }
  };

  return {
    observeElements,
  };
};
