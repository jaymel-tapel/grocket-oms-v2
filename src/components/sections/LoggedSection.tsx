import { ReactNode } from "react";

interface IsProps {
  children: ReactNode;
  className?: string;
}

const LoggedSection: React.FC<IsProps> = ({ children, className = "" }) => {
  return (
    <section
      className={`${className} no-scrollbar bg-[#F1F5F9] min-h-[calc(100vh-4rem)] p-4 lg:p-8 lg:pl-[calc(18rem+2rem)]`}
    >
      {children}
    </section>
  );
};

export default LoggedSection;
