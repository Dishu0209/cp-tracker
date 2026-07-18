function WelcomeBanner({user}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-3xl font-bold text-white">
        👋 Welcome,{user?.name||"User"} 
      </h2>

      <p className="mt-2 text-slate-400">
        Track your competitive programming journey.
      </p>
    </div>
  );
}

export default WelcomeBanner;