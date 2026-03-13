export default function GoldDivider() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#D4A853]/60" />
      <div className="mx-4 w-2 h-2 rotate-45 bg-[#D4A853]" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#D4A853]/60" />
    </div>
  );
}
