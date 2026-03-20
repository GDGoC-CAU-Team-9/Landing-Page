'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'section-1', label: '01', title: '소개' },
  { id: 'section-2', label: '02', title: '로그인/사이드바' },
  { id: 'section-3', label: '03', title: '언어/분석기록' },
  { id: 'section-4', label: '04', title: '기피재료/결과' },
  { id: 'section-5', label: '05', title: '분석 완료' }
] as const;

type SlideItem = {
  title: string;
  src: string;
  alt: string;
};

const loginSidebarSlides = [
  {
    title: '로그인 화면',
    src: '/images/login.png',
    alt: 'SafePlate 로그인 화면'
  },
  {
    title: '사이드바 화면',
    src: '/images/sidebar.png',
    alt: 'SafePlate 사이드바 화면'
  }
] as const;

const languageHistorySlides = [
  {
    title: '언어 변경 화면',
    src: '/images/language.png',
    alt: 'SafePlate 언어 변경 화면'
  },
  {
    title: '분석 기록 화면',
    src: '/images/history.png',
    alt: 'SafePlate 분석 기록 화면'
  }
] as const;

const avoidResultSlides = [
  {
    title: '기피재료 입력 화면',
    src: '/images/avoid.png',
    alt: 'SafePlate 기피재료 입력 화면'
  },
  {
    title: '분석 결과 화면',
    src: '/images/result.png',
    alt: 'SafePlate 메뉴 분석 결과 화면'
  }
] as const;

function ShowcaseBlock({
  eyebrow,
  title,
  description,
  slides,
  currentIndex
}: {
  eyebrow?: string;
  title: string;
  description: string;
  slides: readonly SlideItem[];
  currentIndex: number;
}) {
  return (
    <div className="content showcase-layout">
      <div className="showcase-copy">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        <p>{description}</p>
        <p className="showcase-current">{slides[currentIndex].title}</p>
      </div>

      <div className="showcase-media">
        <div className="showcase-image-stack">
          {slides.map((slide, idx) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              width={420}
              height={900}
              className={`showcase-image ${idx === currentIndex ? 'is-active' : ''}`}
            />
          ))}
        </div>
        <div className="switch-dots" aria-hidden="true">
          {slides.map((item, idx) => (
            <span key={item.src} className={`switch-dot ${idx === currentIndex ? 'is-active' : ''}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('section-1');
  const [showcaseTick, setShowcaseTick] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const section2Index = showcaseTick % loginSidebarSlides.length;
  const section3Index = showcaseTick % languageHistorySlides.length;
  const section4Index = showcaseTick % avoidResultSlides.length;

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.target.id) return;
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.42 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) sectionObserver.observe(section);
    });

    return () => sectionObserver.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setShowcaseTick((prev) => prev + 1);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="page">
      <div className="bg-orb orb-a" aria-hidden="true" />
      <div className="bg-orb orb-b" aria-hidden="true" />
      <div className="bg-orb orb-c" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#section-1">
          SafePlate
        </a>
        <nav className="top-links" aria-label="메인 섹션">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </nav>
      </header>

      <nav className="scroll-nav" aria-label="섹션 이동">
        {sections.map((section) => (
          <a
            key={section.id}
            className={`dot ${activeSection === section.id ? 'is-active' : ''}`}
            href={`#${section.id}`}
          >
            {section.label}
          </a>
        ))}
      </nav>

      <section
        id="section-1"
        className="panel fade-section"
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
      >
        <div className="content intro-layout">
          <div className="intro-copy">
            <p className="eyebrow">SafePlate</p>
            <h1>SafePlate</h1>
            <p className="lead">
              알러지, 종교, 식습관에 따른 기피 재료를 반영해 메뉴판을 분석하고,
              더 안전한 메뉴 선택을 돕는 모바일 앱입니다.
            </p>
            <p className="lead secondary">
              기피재료 입력부터 분석 결과 확인까지, 필요한 정보가 빠르게 읽히는
              흐름으로 구성했습니다.
            </p>
            <div className="cta-row">
              <a
                className="btn primary"
                href="https://github.com/GDGoC-CAU-Team-9/frontend"
                target="_blank"
                rel="noreferrer"
              >
                GitHub 저장소
              </a>
              <a className="btn ghost" href="#section-2">
                자세히 보기
              </a>
            </div>
          </div>

          <div className="intro-visual">
            <div className="intro-logo-mask">
              <Image
                src="/images/Logo_noText.png"
                alt="SafePlate 로고"
                width={520}
                height={520}
                className="intro-logo"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="section-2"
        className="panel fade-section"
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
      >
        <ShowcaseBlock
          eyebrow="App Design"
          title="로그인과 사이드바"
          description="SafePlate의 첫 인상은 빠른 로그인과 직관적인 사이드바 탐색 흐름에 맞춰 설계했습니다."
          slides={loginSidebarSlides}
          currentIndex={section2Index}
        />
      </section>

      <section
        id="section-3"
        className="panel fade-section"
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
      >
        <ShowcaseBlock
          title="언어 변경과 분석기록"
          description="언어 설정과 과거 결과 이력 확인으로 분석 흐름을 자연스럽게 이어갈 수 있습니다."
          slides={languageHistorySlides}
          currentIndex={section3Index}
        />
      </section>

      <section
        id="section-4"
        className="panel fade-section"
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
      >
        <ShowcaseBlock
          title="기피재료 입력과 분석 결과"
          description="기피재료를 반영한 메뉴 분석 결과를 즉시 보여주어 실제 주문 전에 빠르게 판단할 수 있습니다."
          slides={avoidResultSlides}
          currentIndex={section4Index}
        />
      </section>

      <section
        id="section-5"
        className="panel fade-section"
        ref={(el) => {
          sectionRefs.current[4] = el;
        }}
      >
        <div className="content section-content scan-content">
          <div className="section-head">
            <h2>스캔 후 분석 완료 반영</h2>
            <p>검은 스캔 바가 지나간 영역이 분석 완료 상태로 바뀌는 연출입니다.</p>
          </div>

          <div className="scan-wrap">
            <div className="scan-stage">
              <div className="scan-layer before">
                <Image
                  src="/images/menu_english.png"
                  alt="분석 전 메뉴판"
                  fill
                  sizes="(max-width: 980px) 94vw, 1080px"
                  className="scan-image"
                />
              </div>

              <div className="scan-layer after">
                <Image
                  src="/images/menu_english_result.png"
                  alt="분석 후 메뉴판"
                  fill
                  sizes="(max-width: 980px) 94vw, 1080px"
                  className="scan-image"
                />
              </div>

              <div className="scan-glow" aria-hidden="true" />
              <div className="scan-bar" aria-hidden="true" />
            </div>
            <div className="scan-labels">
              <span>Before</span>
              <span>After</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
