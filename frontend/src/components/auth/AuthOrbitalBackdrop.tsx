export function AuthOrbitalBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Sky Gradient Base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #99c8f7 0%, #bbdbfc 32%, #dcedff 65%, #f1f7ff 88%, #ffffff 100%)",
        }}
      />

      {/* Concentric Orbital Radial Arcs matching reference */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[1100px] w-[1100px] rounded-full border border-[#ffffff]/35 shadow-[0_0_80px_rgba(255,255,255,0.4)]" />
        <div className="absolute h-[880px] w-[880px] rounded-full border border-[#ffffff]/45" />
        <div className="absolute h-[680px] w-[680px] rounded-full border border-[#ffffff]/60" />
        <div className="absolute h-[480px] w-[480px] rounded-full border border-[#ffffff]/75" />
      </div>

      {/* Soft Cloud Bottom Texture Overlay */}
      <img
        src="/bevel/clouds.avif"
        alt=""
        width={1440}
        height={420}
        className="absolute inset-x-0 bottom-0 w-full object-cover object-bottom opacity-75 mix-blend-screen scale-110"
      />

      {/* Subtle Radial Glow Behind Login Card */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 46% 36% at 50% 50%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)",
        }}
      />
    </div>
  );
}
