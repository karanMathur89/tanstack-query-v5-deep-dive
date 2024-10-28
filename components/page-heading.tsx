export default function PageHeading({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <h1 className="mb-8 text-balance bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-center text-2xl font-semibold tracking-tight text-transparent md:text-3xl">
      {children}
    </h1>
  )
}
