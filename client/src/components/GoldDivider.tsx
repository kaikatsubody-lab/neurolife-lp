export default function GoldDivider() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#3B6FA0]/50" />
      <div className="mx-4 w-2 h-2 rotate-45 bg-[#3B6FA0]" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#3B6FA0]/50" />
    </div>
  );
}
