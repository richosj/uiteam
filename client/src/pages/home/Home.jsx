import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
          <span className="text-indigo-500">Creative Rebels.</span><br />
          Building Digital Masterpieces.
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-xl">
          We blend code and design into immersive web experiences that leave a mark.
        </p>
        <button
          onClick={() => navigate('/projects')}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-full text-lg font-semibold transition"
        >
          ⚡ Explore Our Projects
        </button>
      </section>

      {/* 최근 프로젝트 썸네일 */}
      <section className="py-20 px-6 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-10">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
              <div className="h-48 bg-gray-700 flex items-center justify-center text-gray-400 text-xl">
                Project {i} Thumbnail
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2">Project Title {i}</h3>
                <p className="text-gray-400 text-sm">Short project description goes here.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 클라이언트 로고 섹션 */}
      <section className="py-20 px-6 bg-black border-t border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-10">Our Clients</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center max-w-4xl mx-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-gray-800 h-20 flex items-center justify-center rounded-xl">
              <span className="text-gray-400 text-sm">Logo {i}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 팀 사진 섹션 */}
      <section className="py-20 px-6 bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-10">Meet The Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-800 h-60 flex items-center justify-center rounded-2xl text-gray-400">
              Team Member {i}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
