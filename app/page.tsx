'use client';

import Image from 'next/image';
import { type CSSProperties, useEffect, useMemo, useState } from 'react';

const sections = [
  { id: 'section-1', label: '01' },
  { id: 'section-2', label: '02' },
  { id: 'section-3', label: '03' },
  { id: 'section-4', label: '04' },
  { id: 'section-5', label: '05' }
] as const;

export default function Home() {
  const [activeSection, setActiveSection] = useState('section-1');
  const [compareValue, setCompareValue] = useState(58);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      { threshold: [0.3, 0.6, 0.9] }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const sliderStyle = useMemo(
    () => ({ '--compare-width': `${compareValue}%` } as CSSProperties),
    [compareValue]
  );

  return (
    <main className="page">
      <div className="bg-blobs" aria-hidden="true">
        <span className="blob blob-a"></span>
        <span className="blob blob-b"></span>
        <span className="blob blob-c"></span>
      </div>

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

      <section className="panel" id="section-1">
        <div className="content reveal">
          <div className="intro-copy">
            <p className="eyebrow">Flutter Application</p>
            <h1>SafePlate</h1>
            <p className="lead">
              알러지, 종교, 식습관에 따른 기피 재료를 반영해 메뉴판을 분석하고,
              더 안전한 메뉴 선택을 돕는 앱입니다.
            </p>
            <div className="actions">
              <a
                className="btn primary"
                href="https://github.com/GDGoC-CAU-Team-9/frontend"
                target="_blank"
                rel="noreferrer"
              >
                GitHub 저장소 보기
              </a>
              <a className="btn ghost" href="#section-2">
                스크롤로 기능 보기
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <Image
              src="/images/Logo.png"
              alt="SafePlate 로고"
              width={540}
              height={540}
              priority
            />
          </div>
        </div>
      </section>

      <section className="panel" id="section-2">
        <div className="content reveal">
          <div className="section-title-wrap">
            <p className="eyebrow">Step 1</p>
            <h2>로그인과 언어 변경</h2>
            <p>
              이메일 로그인 후, 한국어/영어를 포함한 다국어 설정으로 팀 환경에
              맞춘 UX를 제공합니다.
            </p>
          </div>
          <div className="phone-grid">
            <article className="phone-card">
              <h3>로그인 화면</h3>
              <Image
                src="/images/login.png"
                alt="SafePlate 로그인 화면"
                width={420}
                height={900}
              />
            </article>
            <article className="phone-card">
              <h3>언어 변경 화면</h3>
              <Image
                src="/images/language.png"
                alt="SafePlate 언어 변경 화면"
                width={420}
                height={900}
              />
            </article>
          </div>
        </div>
      </section>

      <section className="panel" id="section-3">
        <div className="content reveal">
          <div className="section-title-wrap">
            <p className="eyebrow">Step 2</p>
            <h2>사이드바 기반 탐색</h2>
            <p>
              홈, 분석 기록, 팀, 설정으로 빠르게 이동하며 주요 기능을 한 번에
              접근할 수 있습니다.
            </p>
          </div>
          <div className="single-showcase">
            <article className="phone-card wide">
              <h3>사이드바 화면</h3>
              <Image
                src="/images/sidebar.png"
                alt="SafePlate 사이드바 화면"
                width={420}
                height={900}
              />
            </article>
            <article className="phone-card wide">
              <h3>분석 기록 화면</h3>
              <Image
                src="/images/history.png"
                alt="SafePlate 분석 기록 화면"
                width={420}
                height={900}
              />
            </article>
          </div>
        </div>
      </section>

      <section className="panel" id="section-4">
        <div className="content reveal">
          <div className="section-title-wrap">
            <p className="eyebrow">Step 3</p>
            <h2>기피 재료 입력과 분석 결과</h2>
            <p>
              개인/팀 기준 기피 재료를 저장한 뒤 메뉴판 분석을 요청하면 결과를
              즉시 확인할 수 있습니다.
            </p>
          </div>
          <div className="phone-grid">
            <article className="phone-card">
              <h3>기피재료 입력</h3>
              <Image
                src="/images/avoid.png"
                alt="SafePlate 기피재료 입력 화면"
                width={420}
                height={900}
              />
            </article>
            <article className="phone-card">
              <h3>분석 결과</h3>
              <Image
                src="/images/result.png"
                alt="SafePlate 메뉴 분석 결과 화면"
                width={420}
                height={900}
              />
            </article>
          </div>
        </div>
      </section>

      <section className="panel" id="section-5">
        <div className="content reveal">
          <div className="section-title-wrap">
            <p className="eyebrow">Step 4</p>
            <h2>영문 메뉴 분석 완료 표시</h2>
            <p>
              메뉴 원본과 분석 후 결과를 한 화면에서 비교해, 안전하게 고를 수
              있는 메뉴를 직관적으로 보여줍니다.
            </p>
          </div>
          <div className="compare-card">
            <div className="compare-frame" style={sliderStyle}>
              <Image
                className="compare-image"
                src="/images/menu_english.png"
                alt="분석 전 영문 메뉴"
                width={1080}
                height={760}
              />
              <div className="after-layer">
                <Image
                  className="compare-image"
                  src="/images/menu_english_result.png"
                  alt="분석 후 영문 메뉴"
                  width={1080}
                  height={760}
                />
              </div>
              <div className="labels">
                <span>Before</span>
                <span>After</span>
              </div>
            </div>
            <label className="slider-wrap" htmlFor="compare-slider">
              <span>비교 슬라이더</span>
              <input
                id="compare-slider"
                type="range"
                min={0}
                max={100}
                value={compareValue}
                onChange={(event) => setCompareValue(Number(event.target.value))}
                aria-label="분석 전후 이미지 비교 슬라이더"
              />
            </label>
          </div>
        </div>
      </section>
    </main>
  );
}
