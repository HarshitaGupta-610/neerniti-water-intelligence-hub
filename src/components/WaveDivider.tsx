import { useTheme } from "@/components/ThemeProvider";

const WaveDivider = ({ flip = false }: { flip?: boolean }) => {
  const { theme } = useTheme();
  // Must match --background in each theme
  const color = theme === "dark" ? "hsl(210, 40%, 7%)" : "hsl(210, 20%, 98%)";

  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[80px]"
      >
        <path
          fill={color}
          d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,100 L0,100 Z"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
