export default function HeroSkeleton() {
  return (
    <div className="min-h-screen bg-[#020b1c] flex items-center justify-center">
      <div className="animate-pulse space-y-6 w-full max-w-2xl px-6">
        <div className="h-4 w-48 bg-white/5 rounded-full mx-auto" />
        <div className="h-12 w-3/4 bg-white/5 rounded-lg mx-auto" />
        <div className="h-4 w-1/2 bg-white/5 rounded-full mx-auto" />
        <div className="h-12 w-full bg-white/5 rounded-full mx-auto mt-8" />
      </div>
    </div>
  )
}
