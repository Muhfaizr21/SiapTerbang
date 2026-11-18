/**
 * SCOPED TAILWIND DESIGN TOKENS FOR ADMIN TATA USAHA (TU)
 * Zero external CSS leakage - 100% compatible with Next.js Turbopack HMR
 * Visual Reference: Axiom Dark Sidebar + Signal Yellow Pill + White Rounded Canvas
 */

export const tuStyles = {
  axiomWorkspaceRoot:
    "min-h-screen w-full bg-[#111215] text-[#151619] font-sans text-[14px] leading-[1.45] flex flex-col lg:flex-row p-2 sm:p-3.5 box-border antialiased selection:bg-[#ffe11d] selection:text-[#111215]",

  axiomSidebar:
    "w-full lg:w-[260px] shrink-0 bg-[#111215] text-[#ffffff] flex flex-col justify-between px-3.5 py-4 select-none",

  axiomBrandHeader:
    "flex items-center justify-between px-2 pt-1 pb-5",

  axiomBrandIdentity:
    "flex items-center gap-2.5 no-underline text-[#ffffff]",

  axiomLogoCircle:
    "w-9 h-9 rounded-full bg-[#ffe11d] text-[#111215] flex items-center justify-center font-extrabold shadow-[0_4px_14px_rgba(255,225,29,0.28)] shrink-0",

  axiomBrandTitle:
    "text-[18px] font-bold tracking-tight text-[#ffffff] leading-none",

  sidebarCollapseBtn:
    "w-8 h-8 rounded-lg bg-[#1b1d22] border border-white/10 text-[#9ca1ab] flex items-center justify-center transition-colors hover:bg-[#252830] hover:text-white",

  sidebarSearchBox:
    "flex items-center gap-2 bg-[#1b1d22] border border-white/8 rounded-full px-3.5 py-2.5 mb-6",

  sidebarSearchInput:
    "bg-transparent border-none outline-none text-[#ffffff] text-[13px] w-full placeholder:text-[#777c87]",

  sidebarKbdBadge:
    "text-[11px] font-semibold text-[#8f95a2] bg-[#252830] px-1.5 py-0.5 rounded-md shrink-0",

  sidebarSectionLabel:
    "text-[10.5px] font-bold tracking-[0.08em] uppercase text-[#6b707b] px-3.5 mb-2",

  sidebarNavList:
    "flex flex-col gap-1 mb-6",

  sidebarMenuItem:
    "flex items-center justify-between w-full px-4 py-2.5 rounded-full border-none bg-transparent text-[#9ca1ab] text-[13.5px] font-medium text-left transition-all hover:bg-[#1b1d22] hover:text-white",

  sidebarMenuItemActive:
    "flex items-center justify-between w-full px-4 py-2.5 rounded-full border-none bg-[#ffe11d] text-[#111215] text-[13.5px] font-bold text-left shadow-[0_6px_20px_rgba(255,225,29,0.22)]",

  sidebarMenuCountBadge:
    "text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-[#d1d5db]",

  sidebarMenuCountBadgeActive:
    "text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#111215]/15 text-[#111215]",

  sidebarUpcomingCard:
    "bg-[#1b1d22] border border-white/8 rounded-[20px] p-4 mt-3",

  sidebarUpcomingTag:
    "text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#31ce01]/16 text-[#46e018]",

  sidebarYellowArrowBtn:
    "w-8 h-8 rounded-full bg-[#ffe11d] text-[#111215] border-none flex items-center justify-center font-extrabold shrink-0 transition-transform hover:scale-105",

  axiomMainCanvas:
    "flex-1 bg-[#ffffff] rounded-[24px] lg:rounded-[30px] p-5 sm:p-7 lg:p-8 overflow-x-hidden flex flex-col shadow-[0_12px_40px_rgba(0,0,0,0.25)]",

  topHeaderRow:
    "flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#f1f2f5] mb-6",

  greetingHeading:
    "text-[24px] sm:text-[28px] font-bold tracking-tight text-[#141518] m-0 leading-tight",

  greetingSubtext:
    "text-[13.5px] text-[#777b84] mt-1 mb-0",

  headerRightTools:
    "flex items-center gap-3",

  headerCircleBtn:
    "w-10 h-10 rounded-full bg-[#f6f7f9] border border-[#eceef2] text-[#23252b] flex items-center justify-center relative transition-colors hover:bg-[#eceef2]",

  profilePill:
    "flex items-center gap-2.5 pl-1.5 pr-3.5 py-1 rounded-full bg-[#f9fafb] border border-[#eceef2]",

  kpiGrid:
    "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5",

  kpiCard:
    "bg-[#ffffff] border border-[#eceef2] rounded-[20px] p-5 transition-all hover:border-[#cfd4de] hover:shadow-[0_8px_24px_rgba(20,21,24,0.05)] cursor-pointer",

  kpiCardTop:
    "flex items-center justify-between mb-2.5",

  kpiCardLabel:
    "text-[13px] font-medium text-[#72767f]",

  kpiCardIconCircle:
    "w-8.5 h-8.5 rounded-full bg-[#f6f7f9] text-[#363942] flex items-center justify-center",

  kpiCardValue:
    "text-[28px] font-extrabold tracking-tight text-[#141518] leading-tight mb-2.5",

  kpiTrendRow:
    "flex items-center gap-1.5 text-[12px]",

  bentoGrid:
    "grid grid-cols-1 lg:grid-cols-12 gap-5",

  bentoLeftCol:
    "lg:col-span-7 flex flex-col gap-5",

  bentoRightCol:
    "lg:col-span-5 flex flex-col gap-5",

  surfaceCard:
    "bg-[#ffffff] border border-[#eceef2] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.015)]",

  surfaceCardHeader:
    "flex flex-wrap items-center justify-between gap-2 mb-4",

  surfaceCardTitle:
    "text-[17px] font-bold tracking-tight text-[#141518] m-0",

  chartBarsContainer:
    "grid grid-cols-12 gap-2 sm:gap-2.5 items-end h-[200px] pt-10 relative",

  chartBarColumn:
    "flex flex-col items-center gap-2 h-full justify-end relative cursor-pointer group",

  chartBarTrack:
    "w-full max-w-[18px] h-[145px] bg-[#f4f5f8] rounded-full flex items-end overflow-hidden p-[2px]",

  chartBarFill:
    "w-full bg-[#ffe11d] rounded-full transition-all duration-200 group-hover:bg-[#f5d200]",

  chartFloatingTooltip:
    "absolute bottom-[calc(100%-28px)] left-1/2 -translate-x-1/2 bg-[#141518] text-[#ffffff] rounded-xl px-3 py-2 flex gap-3 whitespace-nowrap z-20 shadow-[0_10px_25px_rgba(0,0,0,0.25)]",

  thickYellowBarTrack:
    "w-full h-9 bg-[#f4f5f8] rounded-[10px] overflow-hidden my-3",

  thickYellowBarFill:
    "h-full bg-[#ffe11d] rounded-[10px] transition-all duration-300",

  calendarDayCircle:
    "w-9 h-9 rounded-full flex items-center justify-center text-[13.5px] font-semibold text-[#23252b] border-none bg-transparent transition-colors hover:bg-[#f4f5f8]",

  calendarDayCircleActive:
    "w-9 h-9 rounded-full flex items-center justify-center text-[13.5px] font-extrabold bg-[#ffe11d] text-[#111215] border-none shadow-[0_4px_12px_rgba(255,225,29,0.38)]",
} as const;
