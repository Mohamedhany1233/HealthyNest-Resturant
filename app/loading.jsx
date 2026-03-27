export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#04462B]">
      {/* overlays */}
      <div className="pointer-events-none absolute inset-0 bg-[#04462B]/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#04462B]/60 via-transparent to-[#04462B]" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-[18%] right-[10%] h-[320px] w-[320px] rounded-full bg-[#64BB36]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[18%] left-[8%] h-[380px] w-[380px] rounded-full bg-[#EBDB0A]/10 blur-[140px]" />

      {/* subtle rotating ring */}
      <div className="pointer-events-none absolute h-[520px] w-[520px] rounded-full border border-white/10 lf-ring" />

      <div className="relative flex flex-col items-center gap-6 px-6 lf-fadeUp">
        {/* Logo */}
        <img
          src="/images/Logo.png"
          className="w-44 object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.55)] lf-float"
          draggable={false}
        />

        {/* Text (Arabic + English) */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-white">
            <span className="text-lg font-semibold tracking-wide">
              جاري التحميل
            </span>

            {/* dots */}
            <span className="inline-flex gap-1 text-white/70">
              <span className="lf-dot-1">•</span>
              <span className="lf-dot-2">•</span>
              <span className="lf-dot-3">•</span>
            </span>
          </div>

          <p className="mt-1 text-sm text-white/60">Just a moment...</p>
        </div>

        {/* Progress line */}
        <div
          className="w-72 overflow-hidden rounded-full bg-white/10"
          dir="ltr"
        >
          <div className="h-1 w-24 rounded-full bg-[#EBDB0A] lf-bar" />
        </div>

        {/* tiny hint line */}
        <p className="text-xs text-white/35">
          لحظات ونرجع لك — We’ll be right back.
        </p>
      </div>
    </div>
  );
}
