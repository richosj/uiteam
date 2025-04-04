import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminRoute from './components/AdminRoute'
import Layout from './components/layout/Layout'
import Login from './pages/admin/Login'
import InternalProjectDetail from './pages/internalProject/InternalProjectDetail'
import InternalProjectAdmin from './pages/internalProject/admin/InternalProjectAdmin'
import ProjectDetail from './pages/project/ProjectDetail'
import Projects from './pages/project/Projects'



function App() {
  return (
    <div className="min-h-screen bg-white">
      <BrowserRouter>
        <Routes>
        <Route
            path="/projects"
            element={
              <Layout>
                <Projects />
              </Layout>
            }
          />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/internal-projects/:id" element={<InternalProjectDetail />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/internal-projects" element={
            <AdminRoute><InternalProjectAdmin /></AdminRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
