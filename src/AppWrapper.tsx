import { ReactNode, useContext, createContext } from "react";
import { useCycle, Cycle } from "framer-motion";

const NavigationState = createContext<NavigationBarProps>({
  isOpen: false,
  toggleOpen: () => {},
});

type AppWrapperProps = {
  children: ReactNode;
};

type NavigationBarProps = {
  isOpen: boolean;
  toggleOpen: Cycle;
};

export const useNavigationState = () => useContext(NavigationState);

export default function AppWrapper({ children }: AppWrapperProps) {
  const [isOpen, toggleOpen] = useCycle<boolean>(false, true);
  const props: NavigationBarProps = {
    isOpen,
    toggleOpen,
  };

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      <NavigationState.Provider value={props}>
        {children}
      </NavigationState.Provider>
    </div>
  );
}
