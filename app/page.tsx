'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'section-1', title: '소개' },
  { id: 'section-2', title: '디자인' },
  { id: 'section-3', title: '언어/기피재료' },
  { id: 'section-4', title: 'AI분석/결과' },
  { id: 'section-5', title: '분석 완료' }
] as const;

const topMenuLinks = [
  { href: '#section-1', label: '소개' },
  { href: '#section-2', label: '디자인' },
  { href: '#section-3', label: '설정' },
  { href: '#section-4', label: '분석' },
  { href: '#section-5', label: '결과' }
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
  title,
  descriptionPrimary,
  descriptionSecondary,
  slides,
  currentIndex
}: {
  title: string;
  descriptionPrimary: string;
  descriptionSecondary: string;
  slides: readonly SlideItem[];
  currentIndex: number;
}) {
  return (
    <div className="content showcase-layout">
      <div className="showcase-copy">
        <h2>{title}</h2>
        <p>{descriptionPrimary}</p>
        <p>{descriptionSecondary}</p>
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
  const [showcaseTick, setShowcaseTick] = useState(0);
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const section2Index = showcaseTick % loginSidebarSlides.length;
  const section3Index = showcaseTick % languageAvoidSlides.length;
  const section4Index = showcaseTick % analysisResultSlides.length;

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;

    const mediaQuery = window.matchMedia('(max-width: 860px), (hover: none) and (pointer: coarse)');
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);

    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  useEffect(() => {
    const firstSection = sectionRefs.current[0];
    if (firstSection) {
      firstSection.classList.add('is-visible');
    }

    if (isMobileViewport) {
      sectionRefs.current.forEach((section) => section?.classList.add('is-visible'));
      return;
    }

    const revealVisibleSections = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const revealStart = viewportHeight * 0.88;
      const revealEnd = viewportHeight * 0.12;

      sectionRefs.current.forEach((section) => {
        if (!section || section.classList.contains('is-visible')) return;

        const rect = section.getBoundingClientRect();
        const isInRevealRange = rect.top <= revealStart && rect.bottom >= revealEnd;
        if (isInRevealRange) section.classList.add('is-visible');
      });
    };

    revealVisibleSections();
    window.addEventListener('scroll', revealVisibleSections, { passive: true });
    window.addEventListener('resize', revealVisibleSections);

    return () => {
      window.removeEventListener('scroll', revealVisibleSections);
      window.removeEventListener('resize', revealVisibleSections);
    };
  }, [isMobileViewport]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setShowcaseTick((prev) => prev + 1);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isAutoScrollEnabled) return;

    const getCurrentSectionIndexFromScroll = () => {
      // Use the top-edge scroll position so we do not advance too early on shorter sections.
      const anchorY = window.scrollY + 1;
      let currentIndex = 0;

      for (let idx = 0; idx < sections.length; idx += 1) {
        const sectionEl = document.getElementById(sections[idx].id);
        if (!sectionEl) continue;

        if (sectionEl.offsetTop <= anchorY) {
          currentIndex = idx;
          continue;
        }

        break;
      }

      return currentIndex;
    };

    const timer = window.setInterval(() => {
      const currentIndex = getCurrentSectionIndexFromScroll();
      const nextSection = sections[(currentIndex + 1) % sections.length];
      document.getElementById(nextSection.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isAutoScrollEnabled]);

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
          {topMenuLinks.map((menu) => (
            <a key={menu.label} href={menu.href}>
              {menu.label}
            </a>
          ))}
        </nav>
      </header>

      <nav className="scroll-nav" aria-label="자동 스크롤 제어">
        <button
          type="button"
          className={`auto-scroll-trigger ${isAutoScrollEnabled ? 'is-active' : ''}`}
          aria-label={isAutoScrollEnabled ? '자동 스크롤 일시정지' : '자동 스크롤 시작'}
          aria-pressed={isAutoScrollEnabled}
          title={isAutoScrollEnabled ? '클릭해서 자동 스크롤 정지' : '클릭해서 자동 스크롤 시작 (6초 간격)'}
          onClick={() => setIsAutoScrollEnabled((prev) => !prev)}
        >
          <span aria-hidden="true">{isAutoScrollEnabled ? '❚❚' : '▶'}</span>
        </button>
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
              낯선 언어의 메뉴판에서도 기피 재료를 기준으로 더 안전한 메뉴 선택을 돕는
              AI 기반 모바일 서비스
            </p>
            <p className="overview-description">
              메뉴판 이미지를 분석해 음식별 위험도를 표시하고, 사용자의 알레르기·종교·식습관 정보를
              반영해 안심 메뉴를 빠르게 확인할 수 있습니다.
            </p>
          </div>

          <div className="overview-features">
            <article className="overview-feature-card">
              <span>🌐</span>
              <h3>다국어 지원</h3>
              <p>언어 설정과 변경으로 글로벌 환경 대응</p>
            </article>
            <article className="overview-feature-card">
              <span>🤖</span>
              <h3>AI 기피재료 추출</h3>
              <p>문장 입력에서 기피재료 자동 추출</p>
            </article>
            <article className="overview-feature-card">
              <span>🌿</span>
              <h3>기피재료 기반 AI 메뉴 분석</h3>
              <p>개인/팀 기준으로 위험 메뉴를 필터링</p>
            </article>
            <article className="overview-feature-card">
              <span>📚</span>
              <h3>분석기록 저장</h3>
              <p>분석 결과 재확인 가능</p>
            </article>
          </div>

          <div className="platform-row">
            <span>지원 플랫폼</span>
            <div className="platform-items">
              <p>🍎 macOS</p>
              <p>🤖 Android</p>
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
          title="눈이 편한 색감과 쉬운 화면 설계"
          descriptionPrimary="글래스모피즘 기반의 부드러운 색감과 낮은 대비 피로도로, 화면을 오래 봐도 부담이 적은 UI를 구성했습니다."
          descriptionSecondary="누구나 처음 실행해도 로그인부터 탐색까지 자연스럽게 이해할 수 있도록, 기능 진입 흐름을 단순하고 직관적으로 설계했습니다."
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
          descriptionPrimary="한국어·영어·스페인어 다국어 지원으로 사용자 환경에 맞춰 앱을 사용할 수 있고, 앱 내에서 언어 변경도 가능합니다."
          descriptionSecondary="사용자가 입력한 문장에서 AI가 기피재료를 추출하며, 종교·임신·비건 등 프리셋을 통해 필요한 기피재료를 손쉽게 추가할 수 있습니다."
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
          descriptionPrimary="AI가 메뉴판 이미지를 OCR로 추출한 뒤, 설정한 기피재료와 메뉴 텍스트를 매칭하여 위험 메뉴를 분석합니다."
          descriptionSecondary="분석 결과는 기록으로 저장되어 이전 결과를 다시 확인할 수 있고, 반복 주문이나 비교 판단에 활용할 수 있습니다."
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

              <div className="scan-bar" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
