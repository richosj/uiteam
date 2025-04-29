// TeamIntro.jsx
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import React, { useEffect, useRef } from 'react'
import './team.scss'

gsap.registerPlugin(ScrollTrigger)

const members = [
  { name: '홍길동', role: 'Creative Director', img: 'https://dimg.donga.com/wps/NEWS/IMAGE/2015/05/27/71484581.3.jpg' },
  { name: '김영희', role: 'UI/UX Designer', img: 'https://dimg.donga.com/wps/NEWS/IMAGE/2015/05/27/71484581.3.jpg' },
  { name: '박철수', role: 'Front-end Dev', img: 'https://dimg.donga.com/wps/NEWS/IMAGE/2015/05/27/71484581.3.jpg' },
  { name: '이수진', role: 'Motion Graphic', img: 'https://dimg.donga.com/wps/NEWS/IMAGE/2015/05/27/71484581.3.jpg' },
]

const TeamIntro = () => {
  const container = useRef(null)

  useEffect(() => {
    const elems = container.current.querySelectorAll('.member')
    gsap.from(elems, {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      },
    })
  }, [])

  return (
    <section className="team-section" ref={container}>
      <h2 className="team-title">우리 팀을 소개합니다</h2>
      <div className="members">
        {members.map((m, i) => (
          <div className="member" key={i}>
            <div className="thumb">
              <img src={m.img} alt={m.name} />
            </div>
            <h3>{m.name}</h3>
            <p>{m.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TeamIntro
