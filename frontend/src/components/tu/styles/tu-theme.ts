/**
 * SCOPED TAILWIND DESIGN TOKENS FOR ADMIN TATA USAHA (TU)
 * Principal UI/UX Design System — High-Contrast Swiss Editorial + Axiom Dark Shell
 * Zero external CSS leakage — 100% compatible with Next.js Turbopack HMR
 */

export const tuStyles = {
  // Root Shell & Layout
  axiomWorkspaceRoot:
    "min-h-screen w-full bg-[#0E0F12] text-[#141518] font-sans text-[14px] leading-[1.5] flex flex-col lg:flex-row p-2 sm:p-3 gap-2 sm:gap-3 box-border antialiased selection:bg-[#FFE11D] selection:text-[#111215]",

  // Sticky Left Dark Sidebar
  axiomSidebar:
    "w-full lg:w-[264px] shrink-0 bg-[#0E0F12] text-[#FFFFFF] flex flex-col justify-between px-3 py-3.5 select-none lg:sticky lg:top-3 lg:h-[calc(100vh-24px)] lg:overflow-y-auto",

  axiomBrandHeader:
    "flex items-center justify-between gap-2 px-1.5 pt-0.5 pb-4 mb-3 border-b border-white/[0.07]",

  axiomBrandIdentity:
    "flex items-center gap-2.5 no-underline text-[#FFFFFF] min-w-0 group",

  axiomLogoCircle:
    "w-9 h-9 rounded-xl bg-[#FFE11D] text-[#111215] flex items-center justify-center font-extrabold shadow-[0_4px_16px_rgba(255,225,29,0.28),inset_0_1px_0_rgba(255,255,255,0.6)] shrink-0 transition-transform duration-200 group-hover:scale-105",

  axiomBrandTitle:
    "text-[16.5px] font-extrabold tracking-tight text-[#FFFFFF] leading-tight whitespace-nowrap",

  sidebarCollapseBtn:
    "w-8 h-8 rounded-lg bg-[#181A20] border border-white/[0.08] text-[#8E94A0] flex items-center justify-center shrink-0 transition-all duration-150 hover:bg-[#22252D] hover:text-white hover:border-white/15 active:scale-95 cursor-pointer",

  sidebarSearchBox:
    "flex items-center gap-2.5 bg-[#17191F] border border-white/[0.08] rounded-xl px-3 py-2 mb-5 transition-all duration-150 focus-within:border-[#FFE11D]/60 focus-within:bg-[#1C1F26] focus-within:shadow-[0_0_0_3px_rgba(255,225,29,0.12)]",

  sidebarSearchInput:
    "bg-transparent border-none outline-none text-[#FFFFFF] text-[12.5px] font-medium w-full placeholder:text-[#6E7480]",

  sidebarKbdBadge:
    "text-[10.5px] font-mono font-semibold text-[#8E94A0] bg-[#23262F] border border-white/[0.06] px-1.5 py-0.5 rounded-md shrink-0",

  sidebarSectionLabel:
    "text-[10px] font-extrabold tracking-[0.11em] uppercase text-[#636875] px-3 mb-1.5",

  sidebarNavList:
    "flex flex-col gap-1 mb-5",

  sidebarMenuItem:
    "group flex items-center justify-between gap-2 w-full h-10 px-3.5 rounded-xl border border-transparent bg-transparent text-[#9CA2AE] text-[13px] font-medium text-left whitespace-nowrap transition-all duration-150 hover:bg-[#181A20] hover:text-[#FFFFFF] hover:border-white/[0.05] active:scale-[0.99] cursor-pointer",

  sidebarMenuItemActive:
    "group flex items-center justify-between gap-2 w-full h-10 px-3.5 rounded-xl border border-[#F2D200] bg-[#FFE11D] text-[#111215] text-[13px] font-extrabold text-left whitespace-nowrap shadow-[0_6px_20px_rgba(255,225,29,0.22),inset_0_1px_0_rgba(255,255,255,0.5)] transition-all duration-150 cursor-pointer",

  sidebarMenuCountBadge:
    "min-w-[22px] h-[20px] px-1.5 rounded-full bg-[#22252E] border border-white/[0.07] text-[#D5D9E2] text-[11px] font-mono font-bold flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#2C303B] group-hover:text-white",

  sidebarMenuCountBadgeActive:
    "min-w-[22px] h-[20px] px-1.5 rounded-full bg-[#111215] text-[#FFE11D] text-[11px] font-mono font-extrabold flex items-center justify-center shrink-0 shadow-2xs",

  sidebarUpcomingCard:
    "bg-gradient-to-b from-[#1A1D24] to-[#14161C] border border-white/[0.08] rounded-2xl p-3.5 mt-auto shadow-[0_8px_24px_rgba(0,0,0,0.3)]",

  sidebarUpcomingTag:
    "inline-flex items-center gap-1 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#22C55E]/15 text-[#4ADE80] border border-[#22C55E]/25",

  sidebarYellowArrowBtn:
    "w-8 h-8 rounded-xl bg-[#FFE11D] text-[#111215] border border-[#E5C700] flex items-center justify-center font-extrabold shrink-0 shadow-[0_4px_12px_rgba(255,225,29,0.25),inset_0_1px_0_rgba(255,255,255,0.5)] transition-all duration-150 hover:bg-[#F5D500] hover:scale-105 active:scale-95 cursor-pointer",

  // Right Main White Rounded Canvas
  axiomMainCanvas:
    "flex-1 min-w-0 bg-[#F8F9FB] rounded-[24px] lg:rounded-[28px] p-4 sm:p-6 lg:p-7 overflow-x-hidden flex flex-col shadow-[0_16px_48px_rgba(0,0,0,0.32)] border border-white/80",

  topHeaderRow:
    "flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#E6E8EF] mb-6",

  greetingHeading:
    "text-[22px] sm:text-[26px] font-extrabold tracking-tight text-[#111317] m-0 leading-tight",

  greetingSubtext:
    "text-[13px] text-[#666C78] mt-1 mb-0 font-medium",

  headerRightTools:
    "flex items-center gap-2.5",

  headerCircleBtn:
    "w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#E2E5ED] text-[#23262F] flex items-center justify-center relative shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-150 hover:bg-[#F2F4F8] hover:border-[#CFD4E0] active:scale-95 cursor-pointer",

  profilePill:
    "flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E2E5ED] shadow-[0_1px_2px_rgba(16,24,40,0.04)]",

  // KPI Summary Cards
  kpiGrid:
    "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5",

  kpiCard:
    "group bg-[#FFFFFF] border border-[#E5E8F0] rounded-2xl p-5 shadow-[0_1px_3px_rgba(16,24,40,0.03)] transition-all duration-200 hover:border-[#141518]/25 hover:shadow-[0_10px_28px_rgba(16,24,40,0.07)] hover:-translate-y-0.5 cursor-pointer",

  kpiCardTop:
    "flex items-center justify-between gap-2 mb-3",

  kpiCardLabel:
    "text-[12.5px] font-semibold text-[#666C78] tracking-tight",

  kpiCardIconCircle:
    "w-9 h-9 rounded-xl bg-[#F4F6F9] border border-[#E6E9F0] text-[#23262F] flex items-center justify-center transition-colors duration-200 group-hover:bg-[#FFE11D] group-hover:border-[#E5C700] group-hover:text-[#111215]",

  kpiCardValue:
    "text-[26px] font-extrabold tracking-tight text-[#111317] leading-none mb-3 font-mono",

  kpiTrendRow:
    "flex items-center flex-wrap gap-1.5 text-[11.5px]",

  // 12-Column Bento Layout
  bentoGrid:
    "grid grid-cols-1 lg:grid-cols-12 gap-5",

  bentoLeftCol:
    "lg:col-span-7 flex flex-col gap-5 min-w-0",

  bentoRightCol:
    "lg:col-span-5 flex flex-col gap-5 min-w-0",

  // Surface Cards
  surfaceCard:
    "bg-[#FFFFFF] border border-[#E5E8F0] rounded-2xl p-5 sm:p-6 shadow-[0_1px_3px_rgba(16,24,40,0.03),0_1px_2px_rgba(16,24,40,0.02)]",

  surfaceCardHeader:
    "flex flex-wrap items-center justify-between gap-3 mb-4",

  surfaceCardTitle:
    "text-[16px] font-extrabold tracking-tight text-[#111317] m-0",

  // Enterprise Button System
  btnPrimaryYellow:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFE11D] px-4 py-2.5 text-[13px] font-extrabold text-[#111215] border border-[#E2C400] shadow-[0_2px_8px_rgba(255,225,29,0.28),inset_0_1px_0_rgba(255,255,255,0.55)] transition-all duration-150 hover:bg-[#F5D60A] hover:shadow-[0_4px_14px_rgba(255,225,29,0.38)] active:scale-[0.98] cursor-pointer disabled:opacity-50",

  btnPrimaryDark:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-[#141518] px-4 py-2.5 text-[13px] font-bold text-[#FFFFFF] border border-[#2A2D35] shadow-[0_2px_8px_rgba(16,24,40,0.16),inset_0_1px_0_rgba(255,255,255,0.14)] transition-all duration-150 hover:bg-[#23262E] hover:shadow-[0_4px_14px_rgba(16,24,40,0.24)] active:scale-[0.98] cursor-pointer disabled:opacity-50",

  btnSecondaryOutline:
    "inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FFFFFF] px-3.5 py-2 text-[12.5px] font-bold text-[#1E2028] border border-[#D5DAE3] shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-150 hover:bg-[#F4F6F9] hover:border-[#BFC6D4] active:scale-[0.98] cursor-pointer",

  btnSuccessSoft:
    "inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#ECFDF3] px-3 py-1.5 text-[11.5px] font-bold text-[#067647] border border-[#ABEFC6] shadow-[0_1px_2px_rgba(6,118,71,0.05)] transition-all duration-150 hover:bg-[#D1FADF] hover:border-[#75E0A7] active:scale-[0.97] cursor-pointer",

  btnDangerSoft:
    "inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FEF3F2] px-4 py-2.5 text-[13px] font-bold text-[#B42318] border border-[#FECDCA] shadow-[0_1px_2px_rgba(180,35,24,0.06)] transition-all duration-150 hover:bg-[#FEE4E2] hover:border-[#FDA29B] active:scale-[0.98] cursor-pointer",

  btnGhostSubtle:
    "inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#F4F6F9] px-3 py-1.5 text-[12px] font-bold text-[#343844] border border-[#E5E8F0] transition-all duration-150 hover:bg-[#E9ECF2] hover:text-[#111317] active:scale-[0.98] cursor-pointer",

  // Segmented Filter Control
  segmentedTrack:
    "inline-flex flex-wrap items-center gap-1 rounded-xl bg-[#F0F2F6] p-1 border border-[#E2E5ED]",

  segmentedTab:
    "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-[#5E6470] transition-all duration-150 hover:text-[#111317] cursor-pointer",

  segmentedTabActive:
    "inline-flex items-center gap-1.5 rounded-lg bg-[#141518] px-3 py-1.5 text-[12px] font-bold text-[#FFFFFF] shadow-[0_1px_3px_rgba(16,24,40,0.18)] cursor-pointer",

  // Standardized Form Inputs & Selects
  formLabel:
    "block text-[12px] font-bold text-[#2C303B] mb-1.5",

  formInput:
    "w-full rounded-xl border border-[#D5DAE3] bg-[#FFFFFF] px-3.5 py-2.5 text-[13px] font-medium text-[#111317] placeholder:text-[#98A1B0] shadow-[0_1px_2px_rgba(16,24,40,0.03)] transition-all duration-150 focus:border-[#141518] focus:outline-none focus:ring-3 focus:ring-[#FFE11D]/40",

  formSelect:
    "w-full rounded-xl border border-[#D5DAE3] bg-[#FFFFFF] px-3.5 py-2.5 text-[13px] font-semibold text-[#111317] shadow-[0_1px_2px_rgba(16,24,40,0.03)] transition-all duration-150 focus:border-[#141518] focus:outline-none focus:ring-3 focus:ring-[#FFE11D]/40 cursor-pointer",

  tableSelect:
    "rounded-lg border border-[#D5DAE3] bg-[#FFFFFF] px-2.5 py-1.5 text-[12px] font-bold text-[#141518] shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-all duration-150 hover:border-[#B4BCCB] focus:border-[#141518] focus:outline-none focus:ring-2 focus:ring-[#FFE11D]/40 cursor-pointer",

  // Charts & Progress Bars
  chartBarsContainer:
    "grid grid-cols-12 gap-2 sm:gap-2.5 items-end h-[200px] pt-10 relative",

  chartBarColumn:
    "flex flex-col items-center gap-2 h-full justify-end relative cursor-pointer group",

  chartBarTrack:
    "w-full max-w-[20px] h-[145px] bg-[#F1F3F7] rounded-full flex items-end overflow-hidden p-[2px] border border-[#E6E9F0]",

  chartBarFill:
    "w-full bg-[#FFE11D] rounded-full transition-all duration-200 group-hover:bg-[#F5D200]",

  chartFloatingTooltip:
    "absolute bottom-[calc(100%-26px)] left-1/2 -translate-x-1/2 bg-[#141518] text-[#FFFFFF] rounded-xl px-3.5 py-2 flex gap-3 whitespace-nowrap z-20 shadow-[0_12px_28px_rgba(0,0,0,0.28)] border border-white/10",

  thickYellowBarTrack:
    "w-full h-8 bg-[#F1F3F7] border border-[#E6E9F0] rounded-xl overflow-hidden my-3 p-0.5",

  thickYellowBarFill:
    "h-full bg-[#FFE11D] rounded-[9px] transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]",

  calendarDayCircle:
    "w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-bold text-[#23252B] border border-transparent bg-transparent transition-all hover:bg-[#F1F3F7] cursor-pointer",

  calendarDayCircleActive:
    "w-9 h-9 rounded-xl flex items-center justify-center text-[13px] font-extrabold bg-[#FFE11D] text-[#111215] border border-[#E5C700] shadow-[0_4px_12px_rgba(255,225,29,0.35)] cursor-pointer",
} as const;
