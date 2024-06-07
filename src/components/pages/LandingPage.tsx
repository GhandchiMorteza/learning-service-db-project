import Service from "../comp/Service"


function LandingPage() {
  return <>
    <div className="text-center p-10 " >
        <h1 className="font-bold text-4xl mb-4">سرویس خدمات آموزشی</h1>
        <h1 className="text-3xl">Tailwind CSS</h1>
    </div>
    <div className="bg-slate-200 p-10">
        <Service/>
    </div>
  </>
}

export default LandingPage