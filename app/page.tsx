'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'section-1', label: '01', title: '소개' },
  { id: 'section-2', label: '02', title: '디자인' },
  { id: 'section-3', label: '03', title: '언어/기피재료' },
  { id: 'section-4', label: '04', title: 'AI분석/결과' },
  { id: 'section-5', label: '05', title: '분석 완료' }
] as const;

type SlideItem = {
  src: string;
  alt: string;
};

const loginSidebarSlides = [
  {
    src: '/images/login.png',
    alt: 'SafePlate 로그인 화면'
  },
  {
    src: '/images/sidebar.png',
    alt: 'SafePlate 사이드바 화면'
  }
] as const;

const languageAvoidSlides = [
  {
    src: '/images/language.png',
    alt: 'SafePlate 언어 변경 화면'
  },
  {
    src: '/images/avoid.png',
    alt: 'SafePlate 기피재료 입력 화면'
  }
] as const;

const analysisResultSlides = [
  {
    src: '/images/history.png',
    alt: 'SafePlate 분석 기록 화면'
  },
  {
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
  const section3Index = showcaseTick % languageAvoidSlides.length;
  const section4Index = showcaseTick % analysisResultSlides.length;

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
        <div className="content overview-layout">
          <div className="overview-header">
            <h1>SafePlate</h1>
            <p className="overview-subtitle">
              낯선 메뉴판에서도 기피 재료를 기준으로 더 안전한 메뉴 선택을 돕는
              AI 기반 모바일 서비스
            </p>
            <p className="overview-description">
              메뉴판 이미지를 분석해 음식별 위험도를 표시하고, 사용자의 알레르기·종교·식습관 정보를
              반영해 안심 메뉴를 빠르게 확인할 수 있습니다.
            </p>
          </div>

          <div className="pipeline-box">
            메뉴판 이미지 입력 → 텍스트 추출 및 AI 분석 → 기피재료 위험 메뉴
            표시 → 안전한 선택 가이드 제공
          </div>

          <div className="overview-features">
            <article className="overview-feature-card">
              <span>🌿</span>
              <h3>기피재료 기반 분석</h3>
              <p>개인/팀 기준으로 위험 메뉴를 필터링</p>
            </article>
            <article className="overview-feature-card">
              <span>🌐</span>
              <h3>다국어 지원</h3>
              <p>언어 설정과 변경으로 글로벌 환경 대응</p>
            </article>
            <article className="overview-feature-card">
              <span>🤖</span>
              <h3>AI 문장 이해</h3>
              <p>문장 입력에서 기피재료 자동 추출</p>
            </article>
            <article className="overview-feature-card">
              <span>📚</span>
              <h3>분석 기록 저장</h3>
              <p>이전 결과를 다시 확인해 빠른 재판단</p>
            </article>
          </div>

          <div className="platform-row">
            <span>지원 플랫폼</span>
            <div className="platform-items">
              <p>🍎 macOS</p>
              <p>🐧 Linux</p>
              <p>🪟 Windows</p>
            </div>
          </div>

          <div className="cta-row centered">
            <a
              className="btn primary"
              href="https://github.com/GDGoC-CAU-Team-9/frontend"
              target="_blank"
              rel="noreferrer"
            >
              GitHub에서 보기
            </a>
            <a className="btn ghost" href="#section-2">
              자세히 보기
            </a>
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
          title="눈이 편한 색감과 쉬운 화면 설계"
          description="글래스모피즘 기반의 부드러운 색감과 단순한 정보 구조로, 누구나 처음 실행해도 로그인부터 탐색까지 자연스럽게 사용할 수 있도록 설계했습니다."
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
          title="언어 지원과 기피재료 설정"
          description="한국어·영어·스페인어를 포함한 다국어 지원을 제공하고, 사용자가 입력한 문장에서 AI가 기피재료를 추출합니다. 또한 종교·임신 등 프리셋으로 필요한 기피재료를 쉽게 추가할 수 있습니다."
          slides={languageAvoidSlides}
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
          title="AI 메뉴판 분석과 결과 제공"
          description="AI가 메뉴판 이미지를 OCR로 추출하고, 설정한 기피재료와 매칭해 위험 메뉴를 분석합니다. 분석 결과는 기록으로 저장되어 이후 재확인과 비교에 활용할 수 있습니다."
          slides={analysisResultSlides}
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
            <h2>분석 후 기존 메뉴판에서 안전한 메뉴 표시</h2>
            <p>AI 분석 이후 원본 메뉴판에서 안전한 메뉴를 직관적으로 확인할 수 있습니다.</p>
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
