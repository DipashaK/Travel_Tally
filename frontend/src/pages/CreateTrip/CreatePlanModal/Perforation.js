import { T } from "./constants";

const Perforation = () => {
  return (
    <div
      className="relative shrink-0"
      style={{
        borderTop: `2px dashed ${T.line}`,
      }}
    >
      {/* Vertical dashed line for desktop */}
      <div
        className="hidden md:block h-full"
        style={{
          borderLeft: `2px dashed ${T.line}`,
        }}
      />

      {/* Top notch */}
      <div
        className="gt-notch"
        style={{
          top: -13,
        }}
      />

      {/* Bottom notch */}
      <div
        className="gt-notch"
        style={{
          bottom: -13,
          top: "auto",
        }}
      />
    </div>
  );
};

export default Perforation;