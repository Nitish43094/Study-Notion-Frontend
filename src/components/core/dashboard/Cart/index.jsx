import { useSelector } from "react-redux"
import RenderTotalAmount from "./RenderTotalAmount"
import RenderCartCourse from "./RenderCartCourse"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Cart</h1>
            <p className="text-sm text-slate-300">
              {totalItems} Course{totalItems === 1 ? "" : "s"} in Cart
            </p>
          </div>
        </header>

        {total > 0 ? (
          <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <section className="space-y-4">
              <RenderCartCourse />
            </section>
            <aside>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-900/50">
                <RenderTotalAmount />
              </div>
            </aside>
          </div>
        ) : (
          <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 p-10 text-center shadow-lg shadow-slate-900/40">
            <p className="text-lg text-slate-200">Your cart is empty</p>
            <p className="mt-2 text-sm text-slate-400">
              Add some courses to get started!
            </p>
            <button className="mt-6 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950">
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </div>
  )
}