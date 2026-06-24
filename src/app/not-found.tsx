export default function NotFound() {
  return (
    <section>
      <div className="container flex flex-col items-center justify-center min-h-screen">
        <h1 className="drop-shadow-[0_0_1rem_var(--primary)] text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4">
          404 - 找不到頁面
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-(--muted)">
          抱歉，您所尋找的頁面不存在。
        </p>
      </div>
    </section>
  );
}
