const WaveDivider = ({ flip = false }: { flip?: boolean }) => {
  return (
    <div
      className={`absolute bottom-0 left-0 w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}
      style={{ height: "120px" }}
    >
      {/* Animated wave layers */}
      <svg
        className="absolute bottom-0 w-[200%] animate-[wave-slide_8s_linear_infinite]"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        style={{ height: "100%" }}
      >
        <path
          fill="hsl(199 84% 52% / 0.15)"
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 C1680,100 1920,20 2160,60 C2400,100 2640,20 2880,60 L2880,120 L0,120 Z"
        />
      </svg>
      <svg
        className="absolute bottom-0 w-[200%] animate-[wave-slide_6s_linear_infinite_reverse]"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        style={{ height: "90%" }}
      >
        <path
          fill="hsl(168 100% 39% / 0.12)"
          d="M0,70 C200,30 400,90 720,50 C1040,10 1200,80 1440,50 C1680,20 1880,80 2160,50 C2440,20 2640,80 2880,50 L2880,120 L0,120 Z"
        />
      </svg>
      <svg
        className="absolute bottom-0 w-[200%] animate-[wave-slide_10s_linear_infinite]"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        style={{ height: "80%", animationDelay: "-2s" }}
      >
        <path
          fill="hsl(199 84% 52% / 0.1)"
          d="M0,80 C300,50 600,100 900,70 C1200,40 1440,90 1740,60 C2040,30 2340,80 2640,60 C2760,50 2820,55 2880,60 L2880,120 L0,120 Z"
        />
      </svg>
      {/* Solid base that matches background */}
      <svg
        className="absolute bottom-0 w-[200%] animate-[wave-slide_7s_linear_infinite]"
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        style={{ height: "70%" }}
      >
        <path
          className="fill-background"
          d="M0,80 C360,50 720,100 1080,70 C1440,40 1800,90 2160,60 C2520,30 2700,70 2880,60 L2880,120 L0,120 Z"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
